import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-start justify-center gap-6 bg-tomato px-5 py-12 md:px-16">
      <h1 className="font-display text-[20vw] leading-[0.85] lg:text-[15rem]">Slot empty.</h1>
      <p className="max-w-[34ch] text-2xl font-bold leading-snug md:text-3xl">
        Nothing is stocked at this address. The machine has twelve other things.
      </p>
      <Link
        href="/"
        className="border-4 border-ink bg-paper px-4 py-3 font-display text-2xl leading-none shadow-hard-sm transition-[translate,box-shadow] duration-75 hover:bg-lime active:translate-x-1 active:translate-y-1 active:shadow-none"
      >
        Go to the machine
      </Link>
    </main>
  );
}
