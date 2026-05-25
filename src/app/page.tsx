"use client";

import { useMemo, useState, useEffect, useRef } from "react";

function buildFullMatchRegex(pattern: string) {
  return new RegExp(`^(?:${pattern})$`);
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "sr">("sr");

  type Translations = {
    badge: string;
    title: string;
    desc: string;
    regexLabel: string;
    regexPlaceholder: string;
    regexHint: string;
    textLabel: string;
    textPlaceholderLocked: string;
    textPlaceholder: string;
    liveStatus: string;
    statusLocked: string;
    statusPass: string;
    statusFail: string;
    emptyString: string;
    usefulLinks: string;
    enteredN: (n: number) => string;
    invalidRegex: string;
  };

  const t = useMemo<Translations>(() => {
    const dict: Record<"en" | "sr", Translations> = {
      en: {
        badge: "Live regex check",
        title: "Regex checker that reacts to every input in real time.",
        desc: "Enter a regex, then type text character by character. The second field is locked until a regex is provided, and the status updates on every change.",
        regexLabel: "Regex",
        regexPlaceholder: "e.g. b(bb|aa)*|a+(b(a|aaa))*",
        regexHint: "The regex is applied to the whole string, not a substring.",
        textLabel: "Text",
        textPlaceholderLocked: "Enter a regex first",
        textPlaceholder: "Type text here...",
        liveStatus: "Live status",
        statusLocked: "Enter a regex to enable checking.",
        statusPass: "Text passes the check.",
        statusFail: "Text does not pass the check.",
        emptyString: "Entered: empty string",
        usefulLinks: "Useful links",
        enteredN: (n: number) => `Entered: ${n} characters`,
        invalidRegex: "Regex is invalid.",
      },
      sr: {
        badge: "Live regex check",
        title: "Regex checker koji reaguje na svaki unos u realnom vremenu.",
        desc: "Unesi regex, zatim kucaj tekst karakter po karakter. Drugo polje je zaključano dok prvi input nije popunjen, a status se odmah menja po svakoj izmeni.",
        regexLabel: "Regex",
        regexPlaceholder: "npr. b(bb|aa)*|a+(b(a|aaa))*",
        regexHint: "Regex se primenjuje na ceo tekst, ne samo na deo unosa.",
        textLabel: "Tekst",
        textPlaceholderLocked: "Unesi regex prvo",
        textPlaceholder: "Kucaj tekst ovde...",
        liveStatus: "Live status",
        statusLocked: "Unesi regex da otključaš proveru.",
        statusPass: "Tekst prolazi check.",
        statusFail: "Tekst ne prolazi check.",
        emptyString: "Uneto: prazan string",
        usefulLinks: "Korisni linkovi",
        enteredN: (n: number) => `Uneto: ${n} karaktera`,
        invalidRegex: "Regex nije validan.",
      },
    };

    return dict[lang];
  }, [lang]);

  const [isSliding, setIsSliding] = useState(false);
  const slideTimerRef = useRef<number | null>(null);

  function changeLang(newLang: "en" | "sr") {
    if (newLang === lang) return;
    // start slide-up, then switch language and slide back in
    setIsSliding(true);
    if (slideTimerRef.current) {
      clearTimeout(slideTimerRef.current);
    }
    slideTimerRef.current = window.setTimeout(() => {
      setLang(newLang);
      setIsSliding(false);
      slideTimerRef.current = null;
    }, 320);
  }

  useEffect(() => {
    return () => {
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current);
      }
    };
  }, []);

  const [pattern, setPattern] = useState("b(bb|aa)*|a+(b(a|aaa))*");
  const [text, setText] = useState("");

  const validation = useMemo(() => {
    const normalizedPattern = pattern.trim();

    if (!normalizedPattern) {
      return {
        enabled: false,
        valid: false,
        matches: false,
        error: t.statusLocked,
      };
    }

    try {
      const regex = buildFullMatchRegex(normalizedPattern);

      return {
        enabled: true,
        valid: true,
        matches: regex.test(text),
        error: "",
      };
    } catch {
      return {
        enabled: true,
        valid: false,
        matches: false,
        error: t.invalidRegex ?? "Regex is invalid.",
      };
    }
  }, [pattern, text, t]);

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_35%),linear-gradient(135deg,_#07111f_0%,_#0f172a_45%,_#111827_100%)] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-5xl items-start px-4 py-4 sm:items-center sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <section className="w-full rounded-[1.75rem] border border-white/10 bg-white/8 p-5 shadow-[0_24px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex items-start justify-between gap-4">
              <span
                className={`inline-flex w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-emerald-200 transform transition-all duration-220 ${isSliding ? '-translate-x-3 opacity-40' : 'translate-x-0 opacity-100'}`}
                style={{ transitionDelay: '0ms' }}
              >
                {t.badge}
              </span>
              <div className={`inline-flex items-center gap-2 transform transition-all duration-220 ${isSliding ? '-translate-x-3 opacity-40' : 'translate-x-0 opacity-100'}`} style={{ transitionDelay: '30ms' }}>
                <button
                  onClick={() => changeLang("en")}
                  aria-pressed={lang === "en"}
                  className={`inline-flex h-8 items-center gap-2 justify-center rounded-full px-3 text-sm font-medium transition cursor-pointer border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/50 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-400/20 ${lang === "en" ? "bg-white/6" : ""}`}
                >
                  <span aria-hidden>🇬🇧</span>
                  <span>ENG</span>
                </button>
                <button
                  onClick={() => changeLang("sr")}
                  aria-pressed={lang === "sr"}
                  className={`inline-flex h-8 items-center gap-2 justify-center rounded-full px-3 text-sm font-medium transition cursor-pointer border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/50 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-400/20 ${lang === "sr" ? "bg-white/6" : ""}`}
                >
                  <span aria-hidden>🇷🇸</span>
                  <span>SRB</span>
                </button>
                <a
                  href="https://github.com/mihajloslav/regexcheck"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open GitHub repository"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/50 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-400/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="currentColor"
                  >
                    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.4-4.04-1.4-.54-1.36-1.32-1.72-1.32-1.72-1.08-.73.08-.72.08-.72 1.19.09 1.82 1.23 1.82 1.23 1.06 1.83 2.79 1.3 3.47.99.11-.77.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.91 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.6-5.47 5.9.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className={`space-y-3 transform transition-all duration-300 ${isSliding ? '-translate-x-8 opacity-40' : 'translate-x-0 opacity-100'}`} style={{ transitionDelay: '40ms' }}>
                <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {t.title}
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7 lg:text-lg">
                  {t.desc}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className={`space-y-2 transform transition-all duration-300 ${isSliding ? '-translate-x-8 opacity-40' : 'translate-x-0 opacity-100'}`} style={{ transitionDelay: '90ms' }}>
                <label htmlFor="pattern" className="text-sm font-medium text-slate-200">
                  {t.regexLabel}
                </label>
                <input
                  id="pattern"
                  value={pattern}
                  onChange={(event) => setPattern(event.target.value)}
                  placeholder={t.regexPlaceholder}
                  spellCheck={false}
                  className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10 sm:text-base"
                />
                <p className="text-xs text-slate-400">{t.regexHint}</p>
              </div>

              <div className={`space-y-2 transform transition-all duration-300 ${isSliding ? '-translate-x-8 opacity-40' : 'translate-x-0 opacity-100'}`} style={{ transitionDelay: '140ms' }}>
                <label htmlFor="text" className="text-sm font-medium text-slate-200">
                  {t.textLabel}
                </label>
                <textarea
                  id="text"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder={validation.enabled ? t.textPlaceholder : t.textPlaceholderLocked}
                  disabled={!validation.enabled}
                  rows={6}
                  spellCheck={false}
                  className="h-40 w-full resize-none rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:bg-white/10 focus:ring-4 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:bg-white/4 disabled:text-slate-400 sm:h-48 sm:text-base"
                />
              </div>

              <div
                className={`rounded-2xl border p-4 transform transition-all duration-300 ${isSliding ? '-translate-x-8 opacity-40' : 'translate-x-0 opacity-100'} ${
                  !validation.enabled
                    ? "border-slate-700 bg-slate-900/60 text-slate-300"
                    : validation.valid
                      ? validation.matches
                        ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
                        : "border-rose-400/30 bg-rose-400/10 text-rose-100"
                      : "border-rose-400/30 bg-rose-400/10 text-rose-100"
                }`}
                style={{ transitionDelay: '190ms' }}
              >
                <div className="text-xs uppercase tracking-[0.22em] opacity-70">{t.liveStatus}</div>
                <div className="mt-2 text-base font-semibold sm:text-lg transition-opacity duration-150">
                  {!validation.enabled
                    ? t.statusLocked
                    : validation.valid
                      ? validation.matches
                        ? t.statusPass
                        : t.statusFail
                      : validation.error}
                </div>
                <div className="mt-2 text-sm leading-6 opacity-80">
                  {!validation.enabled
                    ? t.statusLocked
                    : validation.valid
                      ? text.length === 0
                        ? t.emptyString
                        : t.enteredN(text.length)
                      : t.invalidRegex}
                </div>

                
              </div>
            </div>

            <div className={`mt-3 transform transition-all duration-300 ${isSliding ? '-translate-x-8 opacity-35' : 'translate-x-0 opacity-100'}`} style={{ transitionDelay: '180ms' }}>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="text-xs uppercase tracking-[0.22em] opacity-70">{t.usefulLinks}</div>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="https://regexr.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/50 hover:bg-white/10 hover:text-white"
                    aria-label="Open RegExr"
                  >
                    RegExr
                  </a>
                  <a
                    href="https://regex101.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400/50 hover:bg-white/10 hover:text-white"
                    aria-label="Open regex101"
                  >
                    regex101
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
