"use client";

import Image from "next/image";
import { animate, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { slotBackground, works, type Work } from "@/lib/works";

const LETTERS = ["A", "B", "C"];
const NUMBERS = ["1", "2", "3", "4"];
const READY = "FREE PLAY\nPICK A SLOT";
const TICKER =
  "FREE PLAY     NO EXACT CHANGE NEEDED     NO REFUNDS     DO NOT SHAKE THE MACHINE     THE EGG IS FINE     GERALD IS NOT FOR SALE     ";

const SIGN = [
  { word: "PENNY", tiles: ["bg-lime", "bg-paper", "bg-tomato", "bg-paper", "bg-lime"] },
  { word: "DROPP", tiles: ["bg-paper", "bg-tomato", "bg-lime", "bg-paper", "bg-tomato"] },
];
const TILT = [-3, 2, -2, 3, -1, 2, -3, 1, 3, -2];

const keyButton =
  "border-4 border-ink bg-paper font-display shadow-hard-sm transition-[translate,box-shadow] duration-75 hover:bg-lime active:translate-x-1 active:translate-y-1 active:shadow-none";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function Shop() {
  const reduceMotion = useReducedMotion();
  const machineRef = useRef<HTMLDivElement>(null);
  const binRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const slotImages = useRef(new Map<string, HTMLImageElement>());
  const hiddenImage = useRef<HTMLImageElement | null>(null);
  const busy = useRef(false);

  const [message, setMessage] = useState(READY);
  const [letter, setLetter] = useState<string | null>(null);
  const [current, setCurrent] = useState<Work | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (current && dialog && !dialog.open) dialog.showModal();
  }, [current]);

  const drop = useCallback(
    async (work: Work) => {
      if (busy.current) return;
      busy.current = true;
      setLetter(null);
      setMessage(`${work.code} ${work.title.toUpperCase()}\nFALLING`);

      const image = slotImages.current.get(work.code);
      const bin = binRef.current;

      if (!reduceMotion && image && bin) {
        const from = image.getBoundingClientRect();
        const to = bin.getBoundingClientRect();
        const clone = image.cloneNode(true) as HTMLImageElement;
        clone.alt = "";
        clone.setAttribute("aria-hidden", "true");
        clone.style.cssText = `position:fixed;left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px;z-index:60;pointer-events:none;margin:0;max-width:none;transition:none;`;
        document.body.appendChild(clone);
        image.style.visibility = "hidden";
        hiddenImage.current = image;

        const distance = to.top + to.height / 2 - (from.top + from.height / 2);
        const landedScale = Math.min(0.85, (to.height * 1.2) / from.height);
        const spin = (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 16);

        await animate(clone, { rotate: [0, -5, 4, 0], y: [0, -8, 0] }, { duration: 0.32, ease: "easeInOut" });
        await animate(
          clone,
          { y: distance, rotate: spin, scale: landedScale },
          { duration: Math.min(0.7, 0.26 + Math.max(distance, 0) / 1300), ease: [0.5, 0, 1, 0.6] },
        );
        if (machineRef.current) animate(machineRef.current, { y: [0, 10, -4, 0] }, { duration: 0.3 });
        if (flapRef.current) animate(flapRef.current, { scaleY: [1, 0.72, 1] }, { duration: 0.4 });
        await animate(clone, { y: [distance, distance - 38, distance] }, { duration: 0.32, ease: "easeOut" });
        await wait(140);
        clone.remove();
      }

      setMessage(`${work.code} ${work.title.toUpperCase()}\nALL YOURS`);
      setCurrent(work);
      busy.current = false;
    },
    [reduceMotion],
  );

  const surprise = useCallback(
    (exclude?: string) => {
      const pool = works.filter((work) => work.code !== exclude);
      void drop(pool[Math.floor(Math.random() * pool.length)]);
    },
    [drop],
  );

  const press = useCallback(
    (key: string) => {
      if (LETTERS.includes(key)) {
        setLetter(key);
        setMessage(`${key}_\nNOW PICK A NUMBER`);
        return;
      }
      if (!letter) {
        setMessage("PICK A LETTER FIRST");
        return;
      }
      const work = works.find((item) => item.code === `${letter}${key}`);
      if (work) void drop(work);
    },
    [letter, drop],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || dialogRef.current?.open) return;
      const key = event.key.toUpperCase();
      if (LETTERS.includes(key) || NUMBERS.includes(key)) press(key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  const handleClosed = () => {
    setCurrent(null);
    setMessage(READY);
    const image = hiddenImage.current;
    if (image) {
      image.style.visibility = "";
      hiddenImage.current = null;
      if (!reduceMotion) {
        image.style.transition = "none";
        void animate(image, { scale: [0.5, 1.12, 1] }, { duration: 0.35 }).then(() => {
          image.style.transition = "";
          image.style.transform = "";
        });
      }
    }
  };

  const dropAnother = async () => {
    const code = current?.code;
    dialogRef.current?.close();
    await wait(80);
    surprise(code);
  };

  return (
    <>
      <section id="machine" aria-label="Vending machine" className="relative scroll-mt-4 px-3 pb-0 md:px-6">
        <div
          ref={machineRef}
          className="relative z-10 mx-auto max-w-[1240px] border-[6px] border-ink bg-bubble shadow-hard md:shadow-hard-lg"
        >
          <div className="@container px-3 pb-4 pt-5 md:px-5 lg:py-4">
            <h1
              aria-label="Penny Dropp"
              className="flex flex-col items-center gap-[1.4cqw] font-display leading-none text-ink @3xl:flex-row @3xl:justify-center @3xl:gap-[2.4cqw]"
            >
              {SIGN.map(({ word, tiles }, wordIndex) => (
                <span key={word} aria-hidden="true" className="flex gap-[1cqw] @3xl:gap-[0.6cqw]">
                  {word.split("").map((character, index) => {
                    const order = wordIndex * 5 + index;
                    const style = {
                      rotate: `${TILT[order]}deg`,
                      animationDelay: `${order * 55}ms`,
                    } as CSSProperties;
                    return (
                      <span
                        key={`${word}-${index}`}
                        style={style}
                        className={`flex aspect-square w-[17.5cqw] animate-tile-drop items-center justify-center border-[3px] border-ink pb-[0.06em] text-[13.5cqw] shadow-hard-sm transition-[translate] duration-150 hover:-translate-y-2 motion-reduce:animate-none @3xl:w-[7.8cqw] @3xl:border-[5px] @3xl:text-[6.4cqw] @3xl:shadow-[6px_6px_0_#000] ${tiles[index]}`}
                      >
                        {character}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h1>
          </div>

          <div aria-hidden="true" className="overflow-hidden border-y-[6px] border-ink bg-ink py-1.5">
            <div className="flex w-max animate-ticker font-led text-base font-black text-lime motion-reduce:animate-none md:text-xl">
              <span className="whitespace-pre">{TICKER}</span>
              <span className="whitespace-pre">{TICKER}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <div className="relative grid grid-cols-4 border-b-[6px] border-ink">
                {works.map((work) => (
                  <button
                    key={work.code}
                    type="button"
                    onClick={() => void drop(work)}
                    data-umami-event="Slot tapped"
                    data-umami-event-slot={work.code}
                    aria-label={`${work.code}, ${work.title}`}
                    className={`group relative h-[clamp(112px,16vh,150px)] overflow-hidden border-[3px] border-ink focus-visible:z-20 lg:h-[clamp(104px,calc((100dvh-428px)/3),230px)] ${slotBackground[work.color]}`}
                  >
                    <Image
                      ref={(element) => {
                        if (element) slotImages.current.set(work.code, element);
                      }}
                      src={work.image}
                      alt=""
                      fill
                      loading="eager"
                      sizes="(max-width: 1024px) 25vw, 240px"
                      className="object-contain px-1.5 pb-3.5 pt-5 transition-transform duration-150 group-hover:scale-110 group-hover:-rotate-3 group-active:scale-95 md:px-3 md:pb-5 lg:pt-1.5"
                    />
                    <span className="absolute left-0 top-0 z-20 bg-ink px-1.5 py-0.5 font-led text-sm font-black leading-none text-lime md:px-2 md:py-1 md:text-lg">
                      {work.code}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-2 border-t-[3px] border-ink bg-[repeating-linear-gradient(105deg,#000_0_3px,transparent_3px_9px)] md:h-3"
                    />
                  </button>
                ))}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(115deg,transparent_22%,rgba(255,255,255,0.28)_22%_27%,transparent_27%_30%,rgba(255,255,255,0.28)_30%_31%,transparent_31%)]"
                />
              </div>

              <div className="p-3 md:p-4">
                <div ref={binRef} aria-hidden="true" className="relative h-20 border-[6px] border-ink bg-ink">
                  <div
                    ref={flapRef}
                    className="absolute inset-1.5 flex origin-top items-center justify-center border-4 border-ink bg-lime font-display text-3xl leading-none md:text-5xl"
                  >
                    PUSH
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t-[6px] border-ink bg-tomato p-3 md:p-4 lg:border-l-[6px] lg:border-t-0">
              <div
                role="status"
                className="flex min-h-[84px] items-center whitespace-pre-line border-4 border-ink bg-ink px-3 py-2 font-led text-lg font-black leading-tight text-lime md:text-xl"
              >
                {message}
              </div>
              <div className="grid grid-cols-3 gap-2 lg:flex-1">
                {LETTERS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-label={`Row ${key}`}
                    aria-pressed={letter === key}
                    onClick={() => press(key)}
                    data-umami-event="Keypad"
                    data-umami-event-key={key}
                    className={`${keyButton} min-h-14 text-3xl lg:text-5xl ${letter === key ? "bg-lime" : ""}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-2 lg:flex-1">
                {NUMBERS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-label={`Slot ${key}`}
                    onClick={() => press(key)}
                    data-umami-event="Keypad"
                    data-umami-event-key={key}
                    className={`${keyButton} min-h-14 text-3xl lg:text-5xl`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => surprise()}
                data-umami-event="Surprise me"
                className={`${keyButton} min-h-14 px-3 py-2 text-2xl lg:flex-1 lg:text-3xl`}
              >
                Surprise me
              </button>
              <p className="text-base font-bold leading-snug">
                A letter and a number make a code. Your keyboard works too. Or just tap a slot.
              </p>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="-mx-3 -mt-12 h-28 border-y-[6px] border-ink bg-[repeating-conic-gradient(#000_0_25%,#fff_0_50%)] bg-size-[48px_48px] md:-mx-6 md:-mt-16 md:h-36"
        />
      </section>

      <section id="everything" className="scroll-mt-0 border-b-[6px] border-ink bg-lime px-3 py-14 md:px-6 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <h2 className="font-display text-5xl leading-[0.95] md:text-8xl">Everything in the machine</h2>
          <p className="mt-4 max-w-[52ch] text-xl font-bold md:text-2xl">The same twelve objects, with no gravity.</p>
          <ul className="mt-8 border-[6px] border-ink bg-paper shadow-hard md:mt-12">
            {works.map((work) => (
              <li key={work.code} className="border-b-4 border-ink last:border-b-0">
                <button
                  type="button"
                  onClick={() => setCurrent(work)}
                  data-umami-event="List item opened"
                  data-umami-event-slot={work.code}
                  aria-label={`${work.code}, ${work.title}, ${work.price}`}
                  className="grid w-full grid-cols-[64px_minmax(0,1fr)] items-center gap-x-3 p-2 text-left hover:bg-ink hover:text-lime focus-visible:relative focus-visible:z-10 md:grid-cols-[84px_56px_minmax(0,1.1fr)_minmax(0,1.5fr)_64px_minmax(0,0.9fr)] md:gap-x-5"
                >
                  <span className={`relative row-span-2 block h-16 w-16 border-[3px] border-ink md:row-span-1 md:h-20 md:w-20 ${slotBackground[work.color]}`}>
                    <Image src={work.image} alt="" fill sizes="80px" className="object-contain p-1" />
                  </span>
                  <span className="hidden font-led text-xl font-black md:block">{work.code}</span>
                  <span className="font-display text-2xl leading-none md:text-3xl">{work.title}</span>
                  <span className="hidden text-base md:block">{work.madeOf}</span>
                  <span className="hidden text-base font-bold md:block">{work.year}</span>
                  <span className="text-base font-bold leading-snug">{work.price}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        onClose={handleClosed}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
        aria-label={current?.title ?? "Object"}
        className="m-auto max-h-[94dvh] w-[min(940px,calc(100vw-24px))] overflow-y-auto border-[6px] border-ink bg-paper p-0 text-ink backdrop:bg-ink/80"
      >
        {current && (
          <article className="grid md:grid-cols-2">
            <div
              className={`relative h-[34dvh] border-b-[6px] border-ink md:h-auto md:min-h-[560px] md:border-b-0 md:border-r-[6px] ${slotBackground[current.color]}`}
            >
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 92vw, 470px"
                className="object-contain p-5 md:p-8"
              />
              <span className="absolute left-0 top-0 bg-ink px-2.5 py-1.5 font-led text-2xl font-black leading-none text-lime">
                {current.code}
              </span>
              <span className="absolute bottom-3 right-3 max-w-[58%] -rotate-3 border-4 border-ink bg-paper px-2.5 py-1.5 text-right font-display text-lg leading-tight shadow-hard-sm md:bottom-5 md:right-5 md:max-w-[70%] md:px-3 md:py-2 md:text-3xl">
                {current.price}
              </span>
            </div>
            <div className="flex flex-col gap-5 p-5 md:p-8">
              <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">{current.title}</h2>
              <p className="max-w-[40ch] text-xl leading-snug md:text-2xl">{current.story}</p>
              <dl className="border-y-4 border-ink py-3 text-lg">
                <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-2 py-1">
                  <dt className="font-bold">Made of</dt>
                  <dd>{current.madeOf}</dd>
                </div>
                <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-2 py-1">
                  <dt className="font-bold">Year</dt>
                  <dd>{current.year}</dd>
                </div>
              </dl>
              <div className="mt-auto flex gap-3">
                <button
                  type="button"
                  autoFocus
                  onClick={() => dialogRef.current?.close()}
                  data-umami-event="Close object"
                  className={`${keyButton} min-h-12 flex-1 whitespace-nowrap px-4 py-2 text-xl`}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => void dropAnother()}
                  data-umami-event="Drop another"
                  className={`${keyButton} min-h-12 flex-1 whitespace-nowrap px-4 py-2 text-xl`}
                >
                  Drop another
                </button>
              </div>
            </div>
          </article>
        )}
      </dialog>
    </>
  );
}
