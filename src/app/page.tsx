import Image from "next/image";
import portrait from "@/assets/works/portrait-paper-bag.webp";
import { Shop } from "@/components/shop";

const navLink =
  "border-4 border-ink bg-paper px-2.5 py-2 font-display text-base leading-none text-ink shadow-hard-sm transition-[translate,box-shadow] duration-75 hover:bg-lime active:translate-x-1 active:translate-y-1 active:shadow-none md:px-3 md:text-xl";

const NUTRITION = [
  { label: "Hot glue", value: "310%" },
  { label: "Glitter", value: "400%" },
  { label: "Clay under nails", value: "90%" },
  { label: "Unfinished projects", value: "640%" },
  { label: "Naps", value: "100%" },
  { label: "Patience", value: "2%" },
];

const LET_IN = [
  { year: 2025, place: "Museum of Minor Regrets, group show" },
  { year: 2024, place: "Car Park Level 3 Biennial" },
  { year: 2024, place: "The Gallery Upstairs From The Dentist, solo show" },
  { year: 2023, place: "The back room at Dot's Bakery" },
  { year: 2022, place: "Her mother's hallway, a retrospective" },
];

const ASKED_TO_LEAVE = [
  { year: 2025, place: "Museum of Minor Regrets. The sink was plumbed in without asking." },
  { year: 2024, place: "Two craft fairs, one of them twice" },
  { year: 2023, place: "Dot's Bakery. The cake was not for eating." },
  { year: 2021, place: "Art school, after one semester. She kept the scissors." },
];

export default function Home() {
  return (
    <main>
      <header className="px-3 py-5 text-paper md:px-6 lg:py-4">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <p className="max-w-[46ch] text-lg font-bold leading-snug md:text-xl">
            Penny Dropp is an imaginary artist who makes useless objects very carefully. Pick a slot and one falls out.
          </p>
          <nav aria-label="On this page" className="flex flex-wrap gap-2">
            <a href="#everything" data-umami-event="See the list" className={navLink}>
              See the list
            </a>
            <a href="#penny" data-umami-event="About Penny" className={navLink}>
              About Penny
            </a>
            <a href="#buy" data-umami-event="Buy one" className={navLink}>
              Buy one
            </a>
          </nav>
        </div>
      </header>

      <Shop />

      <section id="penny" className="border-b-[6px] border-ink bg-cobalt px-3 py-14 text-paper md:px-6 md:py-24">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.95fr)]">
          <div className="relative border-[6px] border-ink bg-bubble pt-6 shadow-hard md:shadow-hard-lg lg:-rotate-2">
            <Image
              src={portrait}
              alt="Penny, a woman in paint splattered overalls and a pink striped top, with a paper bag over her head that has a smile drawn on it in red crayon, holding a fat paintbrush"
              sizes="(max-width: 1024px) 92vw, 400px"
              className="mx-auto h-auto w-[88%]"
            />
          </div>

          <div>
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">What Penny is made of</h2>
            <div className="mt-6 max-w-[46ch] space-y-4 text-xl leading-snug md:text-2xl">
              <p>
                Penny went to art school for one semester and left with the scissors. She works out of a dead laundromat
                in a town she will not name, with a kiln called Gary.
              </p>
              <p>
                She makes things nobody asked for and finishes them properly. She does not do photographs of her face.
                She also does not exist, which has not slowed her down.
              </p>
            </div>
          </div>

          <div className="border-[6px] border-ink bg-paper p-4 text-ink shadow-hard md:shadow-hard-lg lg:rotate-1">
            <h3 className="border-b-[10px] border-ink pb-1 text-[2.6rem] font-bold leading-none tracking-tight">
              Nutrition Facts
            </h3>
            <dl className="text-lg">
              <div className="flex justify-between gap-4 border-b border-ink py-1.5">
                <dt>Serving size</dt>
                <dd className="font-bold">1 artist</dd>
              </div>
              <div className="flex justify-between gap-4 border-b-[10px] border-ink py-1.5">
                <dt>Servings per studio</dt>
                <dd className="font-bold">Too many</dd>
              </div>
              <div className="flex items-end justify-between gap-4 border-b-[5px] border-ink py-2">
                <dt className="text-3xl font-bold leading-none">Calories</dt>
                <dd className="text-5xl font-bold leading-none">0</dd>
              </div>
              <p className="border-b border-ink py-1 text-right text-sm font-bold">% Daily Value</p>
              {NUTRITION.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 border-b border-ink py-1.5">
                  <dt className="font-bold">{row.label}</dt>
                  <dd className="font-bold">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="pt-3 text-base leading-snug">
              Contains strong opinions. May contain traces of Gary. Zero calories because she is imaginary.
            </p>
          </div>
        </div>
      </section>

      <section id="shows" className="border-b-[6px] border-ink bg-bubble px-3 py-14 md:px-6 md:py-24">
        <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="border-[6px] border-ink bg-paper p-5 shadow-hard md:shadow-hard-lg md:p-8">
            <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">Places that let her in</h2>
            <ul className="mt-6">
              {LET_IN.map((show) => (
                <li key={show.place} className="grid grid-cols-[64px_1fr] gap-3 border-t-4 border-ink py-3 text-lg leading-snug md:text-xl">
                  <span className="font-bold">{show.year}</span>
                  <span>{show.place}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-[6px] border-ink bg-lime p-5 shadow-hard md:shadow-hard-lg md:p-8">
            <h2 className="font-display text-4xl leading-[0.95] md:text-6xl">Places that asked her to leave</h2>
            <ul className="mt-6">
              {ASKED_TO_LEAVE.map((show) => (
                <li key={show.place} className="grid grid-cols-[64px_1fr] gap-3 border-t-4 border-ink py-3 text-lg leading-snug md:text-xl">
                  <span className="font-bold">{show.year}</span>
                  <span>{show.place}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="buy" className="border-b-[6px] border-ink bg-tomato px-3 py-14 md:px-6 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <p className="text-2xl font-bold md:text-4xl">Can I buy one?</p>
          <h2 className="font-display text-[34vw] leading-[0.82] lg:text-[26rem]">No.</h2>
          <p className="mt-6 max-w-[40ch] text-2xl font-bold leading-snug md:text-4xl">
            Penny is made up, so she cannot post you a sad egg. A real artist near you can make something better. Go and
            pay one.
          </p>
          <a href="#machine" data-umami-event="Back to the machine" className={`${navLink} mt-8 inline-block !text-2xl !leading-none`}>
            Back to the machine
          </a>
        </div>
      </section>

      <footer className="bg-ink px-3 py-8 text-paper md:px-6">
        <p className="mx-auto max-w-[1240px] text-base leading-snug">
          Penny Dropp is a fictional artist. Her objects, shows and prices are invented, and the pictures were made with
          an AI image generator. This site is not about any real person. Visits here, including clicks and scrolling, are
          recorded with Umami, without cookies.
        </p>
      </footer>
    </main>
  );
}
