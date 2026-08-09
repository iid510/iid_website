import { useEffect, useRef, useState, useCallback } from "react";

interface SoundConfig {
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

interface UseSoundReturn {
  play: () => void;
  pause: () => void;
  stop: () => void;
  isPlaying: boolean;
  volume: number;
  setVolume: (volume: number) => void;
}

export function useSound(src: string, config: SoundConfig = {}): UseSoundReturn {
  const { volume: initialVolume = 0.5, loop = false, autoplay = false } = config;
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(src);
    audio.volume = initialVolume;
    audio.loop = loop;
    audioRef.current = audio;

    // Event listeners
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Autoplay if specified
    if (autoplay) {
      audio.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audio.src = "";
    };
  }, [src, loop, autoplay, initialVolume]);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.log("Play prevented:", err);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  }, []);

  return { play, pause, stop, isPlaying, volume, setVolume };
}

// Global sound manager for background ambience and sound toggle
export function useSoundManager() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("ijidd-sound-enabled");
    return saved !== null ? saved === "true" : true;
  });

  const [ambienceEnabled, setAmbienceEnabled] = useState(() => {
    const saved = localStorage.getItem("ijidd-ambience-enabled");
    return saved !== null ? saved === "true" : false;
  });

  useEffect(() => {
    localStorage.setItem("ijidd-sound-enabled", String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("ijidd-ambience-enabled", String(ambienceEnabled));
  }, [ambienceEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev);
  }, []);

  const toggleAmbience = useCallback(() => {
    setAmbienceEnabled((prev) => !prev);
  }, []);

  const playSound = useCallback((audioSrc: string, volumeOverride?: number) => {
    if (!soundEnabled) return;
    
    const audio = new Audio(audioSrc);
    audio.volume = volumeOverride ?? 0.3;
    audio.play().catch((err) => {
      console.log("Sound play prevented:", err);
    });
  }, [soundEnabled]);

  return {
    soundEnabled,
    ambienceEnabled,
    toggleSound,
    toggleAmbience,
    playSound,
  };
}
