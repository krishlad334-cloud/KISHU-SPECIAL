import { useEffect, useMemo, useState } from "react";
import heroBalloons from "@/assets/hero-balloons.jpg";
import cakeImg from "@/assets/cake.png";
import {
  Confetti,
  FloatingBalloons,
  FloatingPetalsAndHearts,
  Sparkles,
} from "@/components/birthday/Decor";
import { Reveal } from "@/components/birthday/Reveal";
import {
  Heart,
  Sparkles as SparkleIcon,
  Gift,
  Share2,
  Mail,
  MailOpen,
  Wand2,
  Check,
  Star,
} from "lucide-react";

const quotes = [
  {
    text: "You are the kind of person who makes ordinary days feel like celebrations.",
    author: "For Kishu 💕",
  },
  {
    text: "Count your age by friends, not years. Count your life by smiles, not tears.",
    author: "John Lennon",
  },
  {
    text: "A soft heart, a bright mind and a laugh that lights up rooms — that's you.",
    author: "For Kishu 💕",
  },
  {
    text: "The more you praise and celebrate your life, the more there is in life to celebrate.",
    author: "Oprah Winfrey",
  },
  {
    text: "Some people make the world more beautiful just by being in it. Happy birthday, Kishu.",
    author: "For Kishu 💕",
  },
  {
    text: "You don't just add years to your life, you add warmth, laughter and pure magic to everyone around you.",
    author: "For Kishu 💕",
  },
];

const wishes = [
  {
    emoji: "🌸",
    title: "A Year of Softness",
    text: "May this year be gentle with you — full of slow mornings, warm chai and moments that feel like a warm hug.",
  },
  {
    emoji: "✨",
    title: "Dreams That Come True",
    text: "Every quiet wish you keep in your heart — may it find its way to you, sooner than you ever expect.",
  },
  {
    emoji: "💜",
    title: "Endless Laughter",
    text: "May your days be filled with the kind of laughter that makes your cheeks hurt and your soul lighter.",
  },
  {
    emoji: "🎀",
    title: "Love All Around",
    text: "May you always be surrounded by people who see how special you are and never let you forget it.",
  },
  {
    emoji: "🌟",
    title: "Courage to Shine",
    text: "Never dim your light for anyone. The world is a whole lot brighter simply because you're in it.",
  },
  {
    emoji: "🎂",
    title: "Sweetest Memories",
    text: "May this birthday become one of those cherished memories you smile about years from now.",
  },
];

const secretWishesPool = [
  "May your cup always overflow with warmth, peace, and sweet surprises 💕",
  "Wishing you 365 days of unexpected smiles, stargazing nights, and cozy moments 🌸",
  "May every path you walk lead you closer to your grandest and most beautiful dreams ✨",
  "Sending you a giant virtual hug wrapped in soft sunshine and lavender fields 💜",
  "You deserve a lifetime of love that feels as natural and effortless as breathing 👑",
  "May your heart be lighter than a butterfly wing and happier than ever before 🦋",
];

const steps = [
  { n: "01", label: "Make a wish", icon: SparkleIcon },
  { n: "02", label: "Blow candles", icon: Gift },
  { n: "03", label: "Read letter", icon: Mail },
];

export default function BirthdayPage() {
  const [opened, setOpened] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [candlesOut, setCandlesOut] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [secretWish, setSecretWish] = useState(null);
  const [wishAnim, setWishAnim] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setQuoteIndex((i) => (i + 1) % quotes.length), 5500);
    return () => clearInterval(id);
  }, []);

  const quote = useMemo(() => quotes[quoteIndex] ?? quotes[0], [quoteIndex]);

  const open = () => {
    if (typeof window !== "undefined" && window.playBirthdayMusic) {
      window.playBirthdayMusic();
    }
    setOpened(true);
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 9000);
    window.setTimeout(
      () => document.getElementById("wishes")?.scrollIntoView({ behavior: "smooth" }),
      900,
    );
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Happy Birthday, Kishu!", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const getRandomSecretWish = () => {
    setWishAnim(true);
    const randomIndex = Math.floor(Math.random() * secretWishesPool.length);
    setSecretWish(secretWishesPool[randomIndex]);
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 4000);
    window.setTimeout(() => setWishAnim(false), 500);
  };

  if (!opened) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
        <FloatingBalloons count={10} />
        <FloatingPetalsAndHearts count={16} />
        <Sparkles count={30} />

        <div className="glass-card animate-pop-in relative z-10 w-full max-w-lg rounded-[2.5rem] px-8 py-14 text-center shadow-2xl backdrop-blur-xl border border-white/60">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-primary/20 to-accent/30 shadow-inner">
            <Heart className="h-8 w-8 text-primary animate-heart-beat" fill="currentColor" />
          </div>

          <p className="text-xs uppercase tracking-[0.4em] font-semibold text-primary/80">
            A Special Surprise For You
          </p>
          <h1 className="font-display text-gradient mt-2 text-6xl leading-tight sm:text-7xl">
            Kishu
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Someone made a magical little corner of the internet filled with love, just for your
            birthday.
          </p>

          <button
            onClick={open}
            className="glow-soft mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary via-rose to-accent px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
          >
            <Gift className="h-5 w-5 animate-bounce" />
            <span>Tap to open your surprise</span>
          </button>

          <p className="mt-6 flex items-center justify-center gap-2 text-[12px] font-medium tracking-wide text-muted-foreground/90">
            <span>Best enjoyed with sound on</span>
            <span className="inline-block animate-pulse">🎵 💕</span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden min-h-screen">
      <Confetti active={confetti} />
      <FloatingBalloons count={14} />
      <FloatingPetalsAndHearts count={22} />

      {/* Hero Section */}
      <section className="relative flex min-h-[95vh] flex-col items-center justify-center px-5 py-20 text-center">
        <Sparkles count={25} />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 backdrop-blur-md animate-pop-in">
            <SparkleIcon className="h-4 w-4 text-primary" />
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-primary">
              2 July · Her Day
            </p>
            <SparkleIcon className="h-4 w-4 text-primary" />
          </div>

          <h1 className="font-display text-gradient mt-5 text-[3.6rem] leading-[1.08] sm:text-7xl md:text-8xl filter drop-shadow-sm">
            Happy Birthday
            <br />
            Kishu
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Today the world gets to celebrate the extraordinary person who makes everything softer,
            warmer, brighter and a whole lot more wonderful. Scroll gently — your birthday journey
            awaits. 💕
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#wishes"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-sm font-bold text-white shadow-dreamy transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              <span>Begin the journey</span>
              <Heart className="h-4 w-4 fill-white" />
            </a>
            <button
              onClick={share}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/90 px-7 py-4 text-sm font-bold text-foreground backdrop-blur-md transition-all duration-300 hover:bg-secondary hover:scale-105"
            >
              <Share2 className="h-4 w-4 text-primary" />
              <span>{copied ? "Link copied ✓" : "Share this page"}</span>
            </button>
          </div>

          {/* Interactive Steps Bar */}
          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-5">
            {steps.map((s, i) => {
              const IconComp = s.icon;
              return (
                <Reveal key={s.n} delay={i * 140}>
                  <div className="glass-card glass-card-hover rounded-2xl px-3 py-5 text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <p className="font-display text-2xl font-bold text-primary">{s.n}</p>
                    <p className="mt-1 text-[11px] font-semibold tracking-wide text-muted-foreground sm:text-xs">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <img
          src={heroBalloons}
          alt="Watercolour pink and lavender birthday balloons with confetti"
          width={1536}
          height={1024}
          className="animate-float pointer-events-none absolute -bottom-10 left-0 w-full max-w-5xl opacity-40 mix-blend-multiply sm:opacity-50"
        />
      </section>

      {/* Wishes Section */}
      <section id="wishes" className="relative px-5 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-secondary/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Step 01
          </span>
          <h2 className="font-display text-gradient mt-4 text-5xl sm:text-6xl">
            Six Wishes For Kishu
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Six special blessings for every reason you deserve the sweetest, happiest year ahead.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishes.map((w, i) => (
            <Reveal key={w.title} delay={i * 100}>
              <article className="glass-card glass-card-hover group relative h-full rounded-[2rem] p-7 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm">
                    {w.emoji}
                  </span>
                  <span className="text-[11px] font-bold tracking-wider text-muted-foreground/60 uppercase">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {w.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interactive Birthday Cake Section */}
      <section className="relative px-5 py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="rounded-full bg-secondary/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Step 02
          </span>
          <h2 className="font-display text-gradient mt-4 text-5xl sm:text-6xl">Blow The Candles</h2>
          <p className="mt-4 text-base text-muted-foreground">
            Close your eyes, make your deepest wish, then tap Kishu's cake to blow out the candles!
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-lg" delay={150}>
          <div className="glass-card relative w-full rounded-[2.5rem] p-8 text-center shadow-2xl border border-white/70">
            <button
              onClick={() => {
                setCandlesOut(true);
                setConfetti(true);
                window.setTimeout(() => setConfetti(false), 9000);
              }}
              className="group relative mx-auto w-full focus:outline-none cursor-pointer"
              aria-label="Blow out the birthday candles"
            >
              <div className="relative mx-auto w-full max-w-xs transition-transform duration-500 group-hover:scale-[1.03]">
                <img
                  src={cakeImg}
                  alt="Pastel pink birthday cake with lit candles for Kishu"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className={`w-full transition-all duration-700 ${
                    candlesOut
                      ? "brightness-105 filter drop-shadow-xl"
                      : "animate-float filter drop-shadow-lg"
                  }`}
                />

                {/* Candle Flames Overlay */}
                {!candlesOut && (
                  <div className="pointer-events-none absolute inset-x-0 top-[12%] mx-auto flex w-3/5 justify-between">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="animate-flicker h-4 w-4 rounded-full bg-gold blur-[2px] shadow-[0_0_12px_#ffc107]"
                        style={{ animationDelay: `${i * 0.18}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col items-center gap-2">
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                    candlesOut
                      ? "bg-primary text-white shadow-lg"
                      : "bg-secondary text-primary group-hover:bg-primary group-hover:text-white"
                  }`}
                >
                  <Gift className="h-4 w-4" />
                  <span>
                    {candlesOut
                      ? "Wish made! 🎉 May every dream come true for Kishu."
                      : "Tap the cake to blow out the candles 🎂"}
                  </span>
                </span>

                {candlesOut && (
                  <p className="text-xs font-semibold text-muted-foreground animate-pop-in">
                    Sparkles & love sent directly to your heart 💕
                  </p>
                )}
              </div>
            </button>
          </div>
        </Reveal>
      </section>

      {/* Secret Romantic Wish Generator */}
      <section className="relative px-5 py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="glass-card relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 text-center shadow-xl border border-primary/20">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-accent text-white shadow-md">
              <Wand2 className="h-7 w-7 animate-pulse" />
            </div>

            <h3 className="font-display text-gradient text-4xl sm:text-5xl">
              Kishu's Magic Wish Wand
            </h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
              Tap the magic wand below to unlock a secret, sweet fortune written just for you!
            </p>

            <button
              onClick={getRandomSecretWish}
              className={`mt-7 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary via-rose to-accent px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                wishAnim ? "scale-95 opacity-80" : ""
              }`}
            >
              <SparkleIcon className="h-4 w-4" />
              <span>Unlock Secret Wish</span>
            </button>

            {secretWish && (
              <div className="mt-8 animate-pop-in rounded-2xl bg-secondary/70 p-6 backdrop-blur-sm border border-primary/30">
                <p className="font-serif italic text-base sm:text-lg text-foreground font-semibold leading-relaxed">
                  “{secretWish}”
                </p>
                <span className="mt-3 block text-xs font-bold text-primary tracking-wider uppercase">
                  ✨ Secret Wish Unlocked for Kishu ✨
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Sealed Wax Envelope Letter Section */}
      <section className="relative px-5 py-24">
        <Reveal className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <span className="rounded-full bg-secondary/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Step 03
            </span>
            <h2 className="font-display text-gradient mt-4 text-5xl sm:text-6xl">
              A Sealed Letter For Kishu
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {isLetterOpen
                ? "Read your birthday letter below 💌"
                : "Tap the envelope to break the seal and read your message 💕"}
            </p>
          </div>

          <div className="relative">
            {!isLetterOpen ? (
              <button
                onClick={() => {
                  setIsLetterOpen(true);
                  setConfetti(true);
                  window.setTimeout(() => setConfetti(false), 5000);
                }}
                className="glass-card group relative w-full rounded-[2.5rem] p-10 text-center shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-primary/30 cursor-pointer"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent text-white shadow-xl group-hover:scale-110 transition-transform">
                  <Mail className="h-12 w-12" />
                </div>
                <h3 className="font-display text-3xl text-foreground mt-6">
                  For Kishu's Eyes Only 💌
                </h3>
                <p className="mt-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Tap to unseal letter
                </p>
              </button>
            ) : (
              <div className="glass-card animate-pop-in relative rounded-[2.5rem] p-8 sm:p-14 shadow-2xl border border-white/80">
                <div className="flex items-center justify-between border-b border-border/80 pb-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MailOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest font-bold text-primary">
                        Birthday Letter
                      </p>
                      <p className="text-sm font-semibold text-foreground">2 July · To Kishu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsLetterOpen(false)}
                    className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                  >
                    Close Letter ✕
                  </button>
                </div>

                <div className="space-y-5 font-sans text-base leading-relaxed text-foreground/90 sm:text-lg">
                  <p className="font-display text-4xl text-primary font-bold">Dearest Kishu,</p>
                  <p>
                    Happy Birthday! Today isn't just another date on the calendar —{" "}
                    <strong>2 July</strong> is the day the world was blessed with someone who has a
                    heart this gentle, a soul this genuine, and a smile that lights up every room.
                  </p>
                  <p>
                    Thank you for all the little things: the way you listen attentively, the way you
                    show up with warmth, and the effortless way you make everyone around you feel
                    seen, cherished, and valued.
                  </p>
                  <p>
                    I hope this year brings you everything your humble heart hesitates to ask for —
                    inner peace, beautiful plans that work out effortlessly, people who love you
                    unconditionally, and continuous moments of unannounced joy.
                  </p>
                  <p>
                    Eat the extra slice of cake, take endless pictures, laugh until your stomach
                    hurts, and let yourself be celebrated completely today. You deserve all the
                    happiness in the universe.
                  </p>
                  <div className="pt-6">
                    <p className="font-display text-4xl text-primary font-bold">
                      With all my love & warmest wishes 💕
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* Quotes Slider Section */}
      <section className="relative px-5 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-secondary/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Words For You
          </span>
          <div className="glass-card mt-8 rounded-[2.5rem] px-8 py-14 sm:px-14 shadow-2xl border border-white/70">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Star className="h-6 w-6 fill-primary" />
            </div>

            <p
              key={quoteIndex}
              className="animate-pop-in font-serif italic text-2xl leading-relaxed text-foreground sm:text-3xl font-semibold"
            >
              “{quote.text}”
            </p>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.35em] text-primary">
              — {quote.author}
            </p>

            <div className="mt-10 flex justify-center gap-2.5">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  aria-label={`Show quote ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === quoteIndex ? "w-10 bg-primary" : "w-2.5 bg-border hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer Section */}
      <footer className="relative px-5 pb-20 pt-10 text-center">
        <Reveal>
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent text-white shadow-lg mb-6">
            <Heart className="h-8 w-8 animate-heart-beat" fill="currentColor" />
          </div>

          <h2 className="font-display text-gradient text-5xl sm:text-7xl">
            Happiest Birthday, Kishu!
          </h2>
          <p className="mt-4 text-base font-semibold text-muted-foreground max-w-md mx-auto">
            Here's to a year as wonderful, gentle, and lovely as you are. 💕
          </p>

          <button
            onClick={share}
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary via-rose to-accent px-9 py-4 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            <span>{copied ? "Link copied ✓" : "Share this surprise"}</span>
          </button>

          <p className="mt-10 text-xs tracking-wider font-semibold text-muted-foreground/80">
            Made with endless love, light pink & soft lavender 🌸
          </p>
        </Reveal>
      </footer>
    </main>
  );
}
