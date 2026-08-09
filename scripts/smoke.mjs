import { chromium } from "playwright";

const BASE = "http://localhost:4173";
const browser = await chromium.launch();
const failures = [];

function check(name, condition, detail = "") {
  if (condition) {
    console.log(`✓ ${name}`);
  } else {
    console.log(`✗ ${name} ${detail}`);
    failures.push(name);
  }
}

async function newPage() {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") {
      const t = m.text();
      if (!/favicon|open-meteo|sanity|net::ERR|Failed to load resource/i.test(t)) errors.push(t);
    }
  });
  return { page, errors };
}

/* --- King profile with a real slug -------------------------------------- */
{
  const { page, errors } = await newPage();
  await page.goto(`${BASE}/heritage/orimolusi/jaiyeoba-adebajo`, { waitUntil: "networkidle" });
  const text = await page.locator("body").innerText();
  check("King profile renders", text.length > 500 && !text.includes("Profile not found"), `(${text.length} chars)`);
  check("King profile has no JS errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* --- Find Your Roots: full quiz flow ------------------------------------ */
{
  const { page, errors } = await newPage();
  await page.goto(`${BASE}/roots`, { waitUntil: "networkidle" });

  // Step 1: pick Atikori
  await page.getByRole("button", { name: "Atikori", exact: true }).click();
  await page.getByRole("button", { name: /Continue/ }).click();

  // Step 2: a real Atikori compound
  await page.locator('input[placeholder="e.g. Bogije"]').fill("Bogije");
  await page.getByRole("button", { name: /Continue/ }).click();

  // Step 3: a surname that exists in the records
  await page.locator('input[placeholder="e.g. Solaja"]').fill("Solaja");
  await page.getByRole("button", { name: /Continue/ }).click();

  // Step 4: location, then submit
  await page.getByRole("button", { name: "United Kingdom" }).click();
  await page.getByRole("button", { name: /Find my roots/ }).click();
  await page.waitForTimeout(900);

  const result = await page.locator("body").innerText();
  check("Roots quiz reaches a result", /your town/i.test(result), "");
  check("Roots result names Atikori", result.includes("Atikori"), "");
  check("Roots result shows matching evidence", /why we matched you here/i.test(result), "");
  check("Roots result names the Oba", /Keegbo|Solaja/.test(result), "");
  check("Roots quiz has no JS errors", errors.length === 0, errors.join(" | "));

  // Town should now be persisted for /my-iid
  const stored = await page.evaluate(() => localStorage.getItem("iid:profile:v1"));
  check("Roots quiz persists town to profile", stored?.includes('"town":"atikori"'), stored ?? "null");

  // Follow through to the dashboard in the same browser context
  await page.goto(`${BASE}/my-iid`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const dash = await page.locator("body").innerText();
  check("Dashboard shows the saved town", dash.includes("Atikori") && /your town/i.test(dash), "");
  check("Dashboard shows a next-event block", /Next event/i.test(dash), "");
  await page.close();
}

/* --- Save a business, confirm it reaches the dashboard ------------------ */
{
  const { page, errors } = await newPage();
  await page.goto(`${BASE}/businesses`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const bookmark = page.locator('button[aria-label^="Save business"]').first();
  await bookmark.click();
  await page.waitForTimeout(300);
  const stored = await page.evaluate(() => localStorage.getItem("iid:profile:v1"));
  const parsed = JSON.parse(stored ?? "{}");
  check("Bookmark saves a business", (parsed.savedBusinesses ?? []).length === 1, stored ?? "null");

  await page.goto(`${BASE}/my-iid`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const dash = await page.locator("body").innerText();
  check("Saved business appears on dashboard", /Saved businesses \(1\)/.test(dash), "");
  check("Bookmark flow has no JS errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* --- Identity card canvas actually draws -------------------------------- */
{
  const { page, errors } = await newPage();
  await page.goto(`${BASE}/identity-card`, { waitUntil: "networkidle" });
  await page.locator("#card-name").fill("Adebayo Ogunye");
  await page.selectOption("#card-town", "japara");
  await page.waitForTimeout(600);

  // A blank canvas serialises to a tiny data URL; a drawn one is far larger.
  const size = await page.evaluate(() => document.querySelector("canvas")?.toDataURL("image/png").length ?? 0);
  check("Identity card canvas renders artwork", size > 20000, `(data URL ${size} bytes)`);
  check("Identity card has no JS errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* --- Blog: start-here path, reading progress, save ---------------------- */
{
  const { page, errors } = await newPage();
  await page.goto(`${BASE}/blog`, { waitUntil: "networkidle" });
  const blog = await page.locator("body").innerText();
  check("Blog shows the Start Here path", /start here/i.test(blog), "");

  await page.goto(`${BASE}/blog/history-of-ijebu-igbo`, { waitUntil: "networkidle" });
  check("Article shows a reading progress bar", await page.locator('[role="progressbar"]').count() > 0, "");
  check("Article shows next-on-path", /next on the start here path/i.test(await page.locator("body").innerText()), "");

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await page.waitForTimeout(4600); // let the 4s persistence interval fire
  const stored = await page.evaluate(() => localStorage.getItem("iid:profile:v1"));
  check("Reading progress is recorded", (stored ?? "").includes("history-of-ijebu-igbo"), stored ?? "null");
  check("Blog reading has no JS errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* --- Guided tour appears for a first-time visitor ----------------------- */
{
  const { page, errors } = await newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForSelector('[aria-label="Welcome tour"]', { timeout: 8000 }).catch(() => {});
  check("Guided tour shows on first visit", await page.locator('[aria-label="Welcome tour"]').count() > 0, "");

  await page.getByRole("button", { name: "Close welcome tour" }).click();
  await page.waitForTimeout(400);
  check("Guided tour dismisses", await page.locator('[aria-label="Welcome tour"]').count() === 0, "");

  const stored = await page.evaluate(() => localStorage.getItem("iid:profile:v1"));
  check("Tour dismissal persists", (stored ?? "").includes('"tourCompleted":true'), stored ?? "null");

  // Second visit: must not reappear
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2600);
  check("Guided tour stays hidden on return", await page.locator('[aria-label="Welcome tour"]').count() === 0, "");
  check("Guided tour has no JS errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* --- Search finds blog posts and towns (the old gap) -------------------- */
{
  const { page, errors } = await newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.keyboard.press("Meta+k");
  await page.waitForTimeout(500);
  await page.keyboard.type("oriki");
  await page.waitForTimeout(600);
  const results = await page.locator("body").innerText();
  check("Search returns blog articles", /Article/.test(results), "");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  await page.keyboard.press("Meta+k");
  await page.waitForTimeout(400);
  await page.keyboard.type("japara");
  await page.waitForTimeout(600);
  check("Search returns towns", /Town/.test(await page.locator("body").innerText()), "");
  check("Search has no JS errors", errors.length === 0, errors.join(" | "));
  await page.close();
}

/* --- Mobile viewport sanity on the new pages ---------------------------- */
{
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  for (const route of ["/", "/roots", "/my-iid", "/identity-card", "/blog"]) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    check(`No horizontal overflow on ${route} (375px)`, overflow <= 1, `(${overflow}px)`);
  }
  await page.close();
}

await browser.close();
console.log(failures.length ? `\n${failures.length} FAILURES` : "\nAll interactive checks passed");
if (failures.length) process.exit(1);
