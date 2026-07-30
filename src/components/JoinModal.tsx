import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, MessageCircle, Heart } from "lucide-react";

interface JoinModalProps {
  children: React.ReactNode;
}

export default function JoinModal({ children }: JoinModalProps) {
  const [open, setOpen] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      label: "Call Us",
      value: "+44 7723 953174",
      href: "tel:+447723953174",
      color: "bg-primary",
      description: "Best for immediate conversation",
    },
    {
      icon: Mail,
      label: "Email Us",
      value: "info@ijebuigbodescendants.org",
      href: "mailto:info@ijebuigbodescendants.org",
      color: "bg-primary",
      description: "Best for full details and formal onboarding",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+44 7723 953174",
      href: "https://wa.me/447723953174",
      color: "bg-primary",
      description: "Best for quick chat and fastest reply",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          {/* Welcome icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
            <Heart className="w-8 h-8 text-accent" fill="currentColor" />
          </div>

          <DialogTitle className="text-2xl sm:text-3xl font-display text-center">
            Ẹ̀ wẹ̀ sọ̀ọ́ Ọmọ Alárè! 
          </DialogTitle>
          
          <DialogDescription className="text-center text-base sm:text-lg !mt-2">
            <span className="block text-foreground/80 mb-4">
              Welcome, proud son or daughter of Ijebu Igbo!
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Warm message */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-5">
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
              We are thrilled that you want to join the{" "}
              <strong className="text-primary font-semibold">
                Ijebu Igbo Descendants in Diaspora (IID)
              </strong>
              . Together, we're building a stronger community, preserving our heritage,
              and driving development back home.
            </p>
          </div>

          {/* Direct WhatsApp CTA — fastest path to join, no form required */}
          <a
            href="https://wa.me/447496933887?text=Hello%2C%20I%27d%20like%20to%20join%20the%20IID%20community."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold rounded-xl transition-colors duration-200 touch-manipulation"
          >
            <MessageCircle className="w-5 h-5" />
            Join Now via WhatsApp
          </a>

          {/* Message clarity + expectation setting */}
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5 space-y-3">
            <h3 className="font-display font-bold text-lg">What Happens Next</h3>
            <ul className="space-y-2 text-sm sm:text-base text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg leading-none">1</span>
                <span>Choose any contact channel below.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg leading-none">2</span>
                <span>Share your name, location, and interest in joining IID.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg leading-none">3</span>
                <span>Our team guides you into the community and upcoming activities.</span>
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-foreground/70">
              Tip: For the fastest response, use WhatsApp.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg">Why Join IID?</h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✓</span>
                <span>Connect with Ijebu Igbo descendants worldwide</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✓</span>
                <span>Contribute to meaningful community development projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✓</span>
                <span>Preserve and celebrate our rich cultural heritage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-lg mt-0.5">✓</span>
                <span>Access exclusive events and networking opportunities</span>
              </li>
            </ul>
          </div>

          {/* Contact methods */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg">Get in Touch</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Reach out to us through any of these channels to start your membership journey:
            </p>
            
            <div className="space-y-3">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.label === "WhatsApp" ? "_blank" : undefined}
                  rel={method.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/50 active:scale-[0.98] transition-all duration-200 touch-manipulation group"
                >
                  <div className={`w-12 h-12 rounded-lg ${method.color} border border-accent/30 flex items-center justify-center flex-shrink-0`}>
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors text-sm sm:text-base">
                      {method.label}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {method.description}
                    </p>
                    <p className="text-xs sm:text-sm text-foreground/85 font-medium mt-0.5 truncate">
                      {method.value}
                    </p>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-accent bg-accent/10 px-2 py-1 rounded-full">
                    Contact
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer message */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
            <p className="text-sm text-foreground/70 italic">
              "United by heritage, driven by purpose, building a greater Ijebu Igbo for all."
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
