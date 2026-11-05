import type { StaticImageData } from "next/image";
import sadEgg from "@/assets/works/a1-sad-egg.webp";
import chairBoots from "@/assets/works/a2-chair-boots.webp";
import mouthLamp from "@/assets/works/a3-mouth-lamp.webp";
import breadPhone from "@/assets/works/a4-bread-phone.webp";
import brickSweater from "@/assets/works/b1-brick-sweater.webp";
import sardineBag from "@/assets/works/b2-sardine-bag.webp";
import discoSink from "@/assets/works/b3-disco-sink.webp";
import doNotEat from "@/assets/works/b4-do-not-eat.webp";
import cactusMittens from "@/assets/works/c1-cactus-mittens.webp";
import cloudCan from "@/assets/works/c2-cloud-can.webp";
import angryPeas from "@/assets/works/c3-angry-peas.webp";
import lemonMask from "@/assets/works/c4-lemon-mask.webp";

export type SlotColor = "cobalt" | "paper" | "lime" | "bubble" | "tomato";

export type Work = {
  code: string;
  title: string;
  image: StaticImageData;
  alt: string;
  color: SlotColor;
  madeOf: string;
  year: number;
  price: string;
  story: string;
};

export const slotBackground: Record<SlotColor, string> = {
  cobalt: "bg-cobalt",
  paper: "bg-paper",
  lime: "bg-lime",
  bubble: "bg-bubble",
  tomato: "bg-tomato",
};

export const works: Work[] = [
  {
    code: "A1",
    title: "Big Sad Egg",
    image: sadEgg,
    alt: "A giant fried egg cushion in white velvet with a satin yolk that has a sad embroidered face",
    color: "cobalt",
    madeOf: "White velvet, satin yolk, a sack of rice for weight",
    year: 2024,
    price: "$900 and an apology",
    story: "A fried egg two metres wide, made for sitting on. Nobody sits on it, because of the face.",
  },
  {
    code: "A2",
    title: "Chair In Boots",
    image: chairBoots,
    alt: "A painted wooden chair with each leg wearing a tiny red glitter platform boot",
    color: "paper",
    madeOf: "Pine, house paint, red glitter, four tiny boots",
    year: 2023,
    price: "$640",
    story: "Penny found this chair on a kerb and felt it had given up. The boots took eleven weeks. It now stands nine centimetres taller and will not discuss it.",
  },
  {
    code: "A3",
    title: "Mouth Lamp",
    image: mouthLamp,
    alt: "A pink ceramic lamp shaped like an open mouth with a glowing bulb on the tongue",
    color: "lime",
    madeOf: "Glazed stoneware, one 40 watt bulb",
    year: 2025,
    price: "$310",
    story: "It lights a room and looks like it is about to say something. Three people have returned it. One of them came back for it.",
  },
  {
    code: "A4",
    title: "Bread Line",
    image: breadPhone,
    alt: "A rotary telephone sculpted to look like a golden loaf of bread with a baguette handset",
    color: "bubble",
    madeOf: "Glazed stoneware, a real coiled cord",
    year: 2022,
    price: "$480",
    story: "A working telephone in the shape of a loaf. It rings about once a year, and it is always her mother.",
  },
  {
    code: "B1",
    title: "Brick In A Sweater",
    image: brickSweater,
    alt: "A red clay brick wearing a hand knitted blue and yellow striped turtleneck sweater",
    color: "paper",
    madeOf: "One brick, merino wool",
    year: 2021,
    price: "$75. It is a brick.",
    story: "The brick came out of the wall of her first studio. It looked cold.",
  },
  {
    code: "B2",
    title: "Sardine Bag",
    image: sardineBag,
    alt: "A handbag shaped like an open sardine tin, with sequin fish and a gold chain strap",
    color: "lime",
    madeOf: "Tin, 11,000 sequins, gold chain",
    year: 2024,
    price: "$1,200",
    story: "Holds a phone, a lipstick and no sense of shame. It opens with the key on the side.",
  },
  {
    code: "B3",
    title: "Disco Sink",
    image: discoSink,
    alt: "A pedestal sink covered in small mirror tiles like a disco ball, with a hot pink tap",
    color: "tomato",
    madeOf: "Bathroom sink, 6,000 mirror tiles, pink tap",
    year: 2025,
    price: "$2,200",
    story: "Plumbed in at a bar for one night. The bar still has the water bill and would like a word.",
  },
  {
    code: "B4",
    title: "Do Not Eat",
    image: doNotEat,
    alt: "A three tier plaster cake in pink, turquoise and yellow with steel nails as sprinkles",
    color: "paper",
    madeOf: "Plaster, house paint, three kilos of steel nails",
    year: 2023,
    price: "$850",
    story: "Made for her own birthday party. The title was added afterwards, for insurance reasons.",
  },
  {
    code: "C1",
    title: "Mittens For Gerald",
    image: cactusMittens,
    alt: "A potted cactus with two arms, each wearing a rainbow striped knitted mitten",
    color: "bubble",
    madeOf: "One cactus, rainbow wool",
    year: 2022,
    price: "Not for sale. Gerald is family.",
    story: "Gerald is the cactus. He lives on the studio windowsill and his hands are fine now.",
  },
  {
    code: "C2",
    title: "Cloud Soup",
    image: cloudCan,
    alt: "An open blue tin can with a huge fluffy white cotton cloud bursting out of it",
    color: "tomato",
    madeOf: "Tin can, cotton wool, enamel paint",
    year: 2024,
    price: "$95",
    story: "A tin of weather. Shake before opening. Do not open.",
  },
  {
    code: "C3",
    title: "Five Angry Peas",
    image: angryPeas,
    alt: "A green felt pea pod holding five round peas with furious embroidered faces",
    color: "lime",
    madeOf: "Felt, embroidery thread, dried beans",
    year: 2021,
    price: "$260",
    story: "Each pea has a name and a different complaint. The one on the left is about parking.",
  },
  {
    code: "C4",
    title: "The Lemon Speaks",
    image: lemonMask,
    alt: "A papier mache lemon mask with a wide screaming mouth, mounted on a wooden stick",
    color: "cobalt",
    madeOf: "Papier mache, old newspapers, acrylic, a broom handle",
    year: 2023,
    price: "$340",
    story: "Worn once, in a parade she was not invited to. It is louder than it looks.",
  },
];
