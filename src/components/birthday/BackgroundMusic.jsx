import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX, Disc } from "lucide-react";

export function BackgroundMusic() {
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75; // Ambient romantic volume level

    // Function to force play audio with sound
    const forcePlay = async () => {
      try {
        // Unlock Web Audio Context if available
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) {
            audioCtxRef.current = new AudioContextClass();
          }
        }
        if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
          await audioCtxRef.current.resume();
        }

        audio.muted = false;
        await audio.play();
        setIsPlaying(true);
        setIsMuted(false);
        return true;
      } catch (err) {
        // Fallback: Try playing muted if browser blocks unmuted audio on load
        try {
          audio.muted = true;
          await audio.play();
          setIsPlaying(true);
          setIsMuted(true);
        } catch (mutedErr) {
          console.warn("Autoplay attempt waiting for first gesture:", mutedErr);
        }
        return false;
      }
    };

    // Expose global helper so any component (e.g. Index page "Tap to open" button) can trigger music instantly
    window.playBirthdayMusic = () => {
      forcePlay();
    };

    // 1. Immediate play attempt
    forcePlay();

    // 2. Aggressive auto-play listeners on ANY document event (mousemove, pointerdown, touchstart, scroll, click, focus)
    const handleAnyUserGesture = () => {
      if (audio.paused || audio.muted) {
        forcePlay();
      }
    };

    const events = [
      "click",
      "touchstart",
      "touchend",
      "pointerdown",
      "pointermove",
      "mousemove",
      "scroll",
      "keydown",
      "focus",
      "mouseenter",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, handleAnyUserGesture, { passive: true });
      document.addEventListener(evt, handleAnyUserGesture, { passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleAnyUserGesture);
        document.removeEventListener(evt, handleAnyUserGesture);
      });
      delete window.playBirthdayMusic;
    };
  }, []);

  const togglePlay = (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch((err) => console.error("Playback error:", err));
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !audio.muted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/tum-se-hi.mp3"
        loop
        preload="auto"
        autoPlay
        playsInline
        aria-hidden="true"
      />

      {/* Floating Romantic Music Widget */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        <div
          className={`glass-card group relative flex items-center gap-3 rounded-full border border-primary/20 bg-card/85 p-2 shadow-2xl backdrop-blur-md transition-all duration-300 ${
            isExpanded ? "pr-4" : "hover:pr-4"
          }`}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Vinyl / Record Spinning Icon */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause background music" : "Play Tum Se Hi"}
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-md transition-transform active:scale-90"
          >
            <Disc
              className={`h-6 w-6 ${isPlaying && !isMuted ? "animate-spin-slow" : "opacity-90"}`}
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full opacity-0 hover:opacity-100 transition-opacity">
              {isPlaying && !isMuted ? (
                <Pause className="h-4 w-4 fill-white text-white" />
              ) : (
                <Play className="h-4 w-4 fill-white text-white ml-0.5" />
              )}
            </span>
          </button>

          {/* Song Info & Controls */}
          <div className="flex items-center gap-3 pr-1">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-foreground">Tum Se Hi</span>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-medium text-primary">
                  Jab We Met
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {isPlaying
                  ? isMuted
                    ? "Muted — Tap for Kishu's song 🎵"
                    : "Playing romantic track 💕"
                  : "Paused"}
              </span>
            </div>

            {/* Sound Wave Animation (shown when playing and unmuted) */}
            {isPlaying && !isMuted && (
              <div className="flex items-end gap-0.5 h-4 px-1" aria-hidden="true">
                <span className="w-0.5 rounded-full bg-primary animate-bar-1" />
                <span className="w-0.5 rounded-full bg-primary animate-bar-2" />
                <span className="w-0.5 rounded-full bg-primary animate-bar-3" />
                <span className="w-0.5 rounded-full bg-primary animate-bar-4" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-1 ml-1">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                className="rounded-full p-1.5 text-foreground/80 hover:bg-secondary hover:text-primary transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute music" : "Mute music"}
                className="rounded-full p-1.5 text-foreground/80 hover:bg-secondary hover:text-primary transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
