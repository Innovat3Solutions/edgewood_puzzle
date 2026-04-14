export type Collection =
  | "space"
  | "ron-magill"
  | "butterfly"
  | "gregory-laysak"
  | "kia"
  | "wild-in-color";

export type Puzzle = {
  slug: string;
  title: string;
  subtitle?: string;
  collection: Collection;
  image: string;
  pieces: number;
  price: number;
};

const pieceCycle = [500, 1000, 1500];
const pricePack = {
  space: [28, 34, 42],
  "ron-magill": [32, 38, 46],
  butterfly: [28, 34, 42],
  "gregory-laysak": [32, 38, 46],
  kia: [30, 36, 44],
  "wild-in-color": [28, 34, 42],
} as const;

const spaceTitles = [
  "Nebula Drift",
  "Orion's Promise",
  "Crimson Eclipse",
  "Starforge",
  "Galactic Horizon",
  "Lunar Tide",
  "Cosmic Bloom",
  "Event Horizon",
  "Supernova Song",
  "Andromeda Dawn",
  "Celestial Mirage",
  "Void Gardens",
  "Parallax",
  "Stellar Veil",
  "Horsehead",
  "Pillars of Dawn",
  "Gravity Well",
  "Aurora Silence",
  "Helix Drift",
  "Deep Field",
  "Kepler's Echo",
  "Solstice",
  "Quasar Light",
  "Outer Rim",
];

const spaceExt = (i: number) => (i + 1 === 22 ? "png" : "jpeg");

const spacePuzzleList: Puzzle[] = spaceTitles.map((title, i) => ({
  slug: `space-${i + 1}`,
  title,
  collection: "space",
  image: `/puzzles/space/space-${i + 1}.${spaceExt(i)}`,
  pieces: pieceCycle[i % 3],
  price: pricePack.space[i % 3],
}));

const ronMagillPuzzleList: Puzzle[] = [
  { slug: "lion", title: "African Lion", subtitle: "Panthera leo", file: "lion" },
  { slug: "elephant", title: "African Elephant", subtitle: "Loxodonta africana", file: "elephant" },
  { slug: "leopard", title: "African Leopard", subtitle: "Panthera pardus", file: "leopard" },
  { slug: "rhinoceros", title: "Black Rhinoceros", subtitle: "Diceros bicornis", file: "rhinoceros" },
  { slug: "cheetah", title: "Cheetah", subtitle: "Acinonyx jubatus", file: "cheetah" },
  { slug: "crabeater-seal", title: "Crabeater Seal", subtitle: "Lobodon carcinophagus", file: "crabeater-seal" },
  { slug: "gentoo-penguin", title: "Gentoo Penguin", subtitle: "Pygoscelis papua", file: "gentoo-penguin" },
  { slug: "giant-panda", title: "Giant Panda", subtitle: "Ailuropoda melanoleuca", file: "giant-panda" },
  { slug: "koala", title: "Koala", subtitle: "Phascolarctos cinereus", file: "koala" },
  { slug: "giraffe", title: "Reticulated Giraffe", subtitle: "Giraffa reticulata", file: "giraffe" },
].map(({ slug, title, subtitle, file }, i) => ({
  slug: `ron-${slug}`,
  title,
  subtitle,
  collection: "ron-magill" as Collection,
  image: `/puzzles/ron-magill/${file}.jpeg`,
  pieces: pieceCycle[i % 3],
  price: pricePack["ron-magill"][i % 3],
}));

const butterflyTitles = [
  "Monarch Flight",
  "Blue Morpho",
  "Swallowtail",
  "Painted Lady",
  "Glasswing",
  "Peacock Pansy",
  "Ulysses",
  "Sulphur Drift",
  "Emerald Swallowtail",
  "Zebra Longwing",
  "Crimson Patch",
  "Atlas Moth",
  "Silver Spot",
  "Cairns Birdwing",
  "Question Mark",
  "Iridescent Dawn",
  "Mourning Cloak",
  "Tiger's Wing",
];

const butterflyList: Puzzle[] = butterflyTitles.map((title, i) => ({
  slug: `butterfly-${i + 1}`,
  title,
  collection: "butterfly",
  image: `/puzzles/butterfly/butterfly-${i + 1}.jpeg`,
  pieces: pieceCycle[i % 3],
  price: pricePack.butterfly[i % 3],
}));

const laysakTitles = [
  "Golden Hour",
  "Red Rock Study",
  "Quiet Shoreline",
  "Backcountry Pass",
  "Alpine Bloom",
  "Summit Light",
  "Open Plains",
];

const laysakList: Puzzle[] = laysakTitles.map((title, i) => ({
  slug: `laysak-${i + 1}`,
  title,
  subtitle: "Gregory Laysak",
  collection: "gregory-laysak",
  image: `/puzzles/gregory-laysak/laysak-${i + 1}.jpeg`,
  pieces: pieceCycle[i % 3],
  price: pricePack["gregory-laysak"][i % 3],
}));

const kiaTitles = [
  "Studio One",
  "Studio Two",
  "Studio Three",
  "Studio Four",
  "Studio Five",
  "Studio Six",
  "Studio Seven",
  "Studio Eight",
];

const kiaList: Puzzle[] = kiaTitles.map((title, i) => ({
  slug: `kia-${i + 1}`,
  title,
  subtitle: "Kevin Kia",
  collection: "kia",
  image: `/puzzles/kia/kia-${i + 1}.jpeg`,
  pieces: pieceCycle[i % 3],
  price: pricePack.kia[i % 3],
}));

const wicTitles = [
  "Electric Jungle",
  "Prism Reef",
  "Neon Plumes",
  "Feathered Flame",
  "Color Riot",
  "Tropic Pulse",
  "Canopy Dream",
  "Painted Sky",
  "Vivid Field",
  "Chromatic Wild",
];

const wildInColorList: Puzzle[] = wicTitles.map((title, i) => ({
  slug: `wic-${i + 1}`,
  title,
  collection: "wild-in-color",
  image: `/puzzles/wild-in-color/wic-${i + 1}.jpeg`,
  pieces: pieceCycle[i % 3],
  price: pricePack["wild-in-color"][i % 3],
}));

export const puzzles: Puzzle[] = [
  ...spacePuzzleList,
  ...ronMagillPuzzleList,
  ...butterflyList,
  ...laysakList,
  ...kiaList,
  ...wildInColorList,
];

export const spacePuzzles = spacePuzzleList;
export const ronMagillPuzzles = ronMagillPuzzleList;
export const butterflyPuzzles = butterflyList;
export const gregoryLaysakPuzzles = laysakList;
export const kiaPuzzles = kiaList;
export const wildInColorPuzzles = wildInColorList;

export const collectionMeta: Record<
  Collection,
  { name: string; href: string; tagline: string }
> = {
  space: {
    name: "Space",
    href: "/collections/space",
    tagline: "Nebulae, eclipses, and deep-field vistas",
  },
  "ron-magill": {
    name: "Ron Magill",
    href: "/collections/ron-magill",
    tagline: "Signature wildlife portraits from four decades in the field",
  },
  butterfly: {
    name: "Butterfly",
    href: "/collections/butterfly",
    tagline: "Iridescent wings, captured in motion",
  },
  "gregory-laysak": {
    name: "Gregory Laysak",
    href: "/collections/gregory-laysak",
    tagline: "Landscape photography across the American West",
  },
  kia: {
    name: "Kevin Kia",
    href: "/collections/kia",
    tagline: "Studio work and conceptual portraiture",
  },
  "wild-in-color": {
    name: "Wild in Color",
    href: "/collections/wild-in-color",
    tagline: "Saturated, joyful nature — turned up to eleven",
  },
};
