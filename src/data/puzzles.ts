export type Collection = "ron-magill" | "cherp-studio" | "wild-in-color";

export type PuzzleVariant = {
  pieces: number;
  price: number;
};

export type Puzzle = {
  slug: string;
  title: string;
  subtitle?: string;
  collection: Collection;
  image: string;
  packaging?: string;
  pieces: number;
  price: number;
  variants: PuzzleVariant[];
  material?: string;
  dimensions?: string;
   addToCartUrl?: string;
};

const cardboardVariants: PuzzleVariant[] = [
  { pieces: 300, price: 19.99 },
  { pieces: 500, price: 24.99 },
  { pieces: 1000, price: 34.99 },
];

const RON_MAGILL_PACKAGING =
  "/puzzles/ron-magill/RM26_Koala_Puzzle in Room Setting.jpg";

const ronMagillPuzzleList: Puzzle[] = [
  {
    slug: "lion",
    title: "African Lion",
    subtitle: "Panthera leo",
    file: "lion",
    addToCartUrl:
      "https://app.innovat3solutions.com/v2/preview/Pm6eHzF5W99lcJvYZvGN/product/69fcb135b4f5114b0bacc4c3?variant=69fcb135b4f51172e5acc4d8",
  },
  {
    slug: "elephant",
    title: "African Elephant",
    subtitle: "Loxodonta africana",
    file: "elephant",
    addToCartUrl:
      "https://app.innovat3solutions.com/v2/preview/Pm6eHzF5W99lcJvYZvGN/product/69fcc12cc23ecf52ae035baf?variant=69fcc12cc23ecf980e035bb4",
  },
  {
    slug: "leopard",
    title: "African Leopard",
    subtitle: "Panthera pardus",
    file: "leopard",
    addToCartUrl:
      "https://app.innovat3solutions.com/v2/preview/Pm6eHzF5W99lcJvYZvGN/product/69fcfce6c23ecf0f170ecc9b?variant=69fcfce6c23ecf3dd50eccaa",
  },
  {
    slug: "rhinoceros",
    title: "Black Rhinoceros",
    subtitle: "Diceros bicornis",
    file: "rhinoceros",
    addToCartUrl:
      "https://app.innovat3solutions.com/v2/preview/Pm6eHzF5W99lcJvYZvGN/product/69fcfd7156effbc5e67932c5?variant=69fcfd7156effbc6cc7932ca",
  },
].map(({ slug, title, subtitle, file, addToCartUrl }) => ({
  slug: `ron-${slug}`,
  title,
  subtitle,
  collection: "ron-magill" as Collection,
  image: `/puzzles/ron-magill/${file}.jpeg`,
  packaging: RON_MAGILL_PACKAGING,
  pieces: 500,
  price: 24.99,
  variants: cardboardVariants,
  material: "Cardboard",
  dimensions: '8" × 10"',
  addToCartUrl,
}));

const CHERP_PACKAGING =
  "/puzzles/cherp-studio/Red Panda_500pieces_Final_Composition_Layered.jpg";

const cherpCardboard: Puzzle[] = [
  {
    slug: "cherp-red-panda",
    title: "Red Panda",
    file: "CherpStudio_RedPanda_19_25x26_625in.jpg",
  },
  {
    slug: "cherp-gorilla",
    title: "Western Gorilla",
    file: "CherpStudio_Gorilla_19_25x26_625in.jpg",
  },
  {
    slug: "cherp-elephant",
    title: "Asian Elephant",
    file: "CherpStudio_Adult_Elephant_19_25x26_625in.jpg",
  },
  {
    slug: "cherp-macaws",
    title: "Macaws in Flight",
    file: "CherpStudio_Parrots_19_25x26_625in.jpg",
  },
].map(({ slug, title, file }) => ({
  slug,
  title,
  subtitle: "Cherp Studio",
  collection: "cherp-studio" as Collection,
  image: `/puzzles/cherp-studio/${file}`,
  packaging: CHERP_PACKAGING,
  pieces: 500,
  price: 24.99,
  variants: cardboardVariants,
  material: "Cardboard",
  dimensions: "8\" × 10\"",
}));

const cherpWood: Puzzle[] = [
  {
    slug: "cherp-tiger-wood",
    title: "Tiger",
    file: "CherpStudio_WOOD_Tiger_12x12in_REV.jpg",
  },
  {
    slug: "cherp-giraffe-wood",
    title: "Giraffe",
    file: "CherpStudio_WOOD_giraffe_12x12in_REV2.jpg",
  },
].map(({ slug, title, file }) => ({
  slug,
  title,
  subtitle: "Cherp Studio · Wood",
  collection: "cherp-studio" as Collection,
  image: `/puzzles/cherp-studio/${file}`,
  packaging: CHERP_PACKAGING,
  pieces: 48,
  price: 6.99,
  variants: [{ pieces: 48, price: 6.99 }],
  material: "Wood",
  dimensions: "12\" × 12\"",
}));

const cherpStudioPuzzleList: Puzzle[] = [...cherpCardboard, ...cherpWood];

const WIC_PACKAGING =
  "/puzzles/wild-in-color/Wild in Color_300Pieces_Tiger Puzzle_Mockup.jpg";

const wildInColorList: Puzzle[] = [
  {
    slug: "wic-axolotl",
    title: "Axolotl",
    file: "Wild in Color_Axelotl_100 pieces_13_25x16_56in.jpg",
  },
  {
    slug: "wic-chameleon",
    title: "Chameleon",
    file: "Wild in Color_Chameleon_100 pieces_13_25x16_56in.jpg",
  },
  {
    slug: "wic-tigers",
    title: "Tigers",
    file: "Wild in Color_tigers_100 pieces_13_25x16_56in.jpg",
  },
  {
    slug: "wic-orangutans",
    title: "Orangutans",
    file: "Wild in Color_Orangs_19_25x26_625in.jpg",
  },
].map(({ slug, title, file }) => ({
  slug,
  title,
  subtitle: "Wild in Color",
  collection: "wild-in-color" as Collection,
  image: `/puzzles/wild-in-color/${file}`,
  packaging: WIC_PACKAGING,
  pieces: 500,
  price: 24.99,
  variants: cardboardVariants,
  material: "Cardboard",
  dimensions: "8\" × 10\"",
}));

export const puzzles: Puzzle[] = [
  ...ronMagillPuzzleList,
  ...cherpStudioPuzzleList,
  ...wildInColorList,
];

export const ronMagillPuzzles = ronMagillPuzzleList;
export const cherpStudioPuzzles = cherpStudioPuzzleList;
export const wildInColorPuzzles = wildInColorList;

export const collectionMeta: Record<
  Collection,
  { name: string; href: string; tagline: string }
> = {
  "ron-magill": {
    name: "Ron Magill",
    href: "/collections/ron-magill",
    tagline: "Signature wildlife portraits from four decades in the field",
  },
  "cherp-studio": {
    name: "Cherp Studio",
    href: "/collections/cherp-studio",
    tagline: "Vibrant wildlife — cardboard 8\" × 10\" and wood 12\" × 12\" puzzles",
  },
  "wild-in-color": {
    name: "Wild in Color",
    href: "/collections/wild-in-color",
    tagline: "Saturated, joyful nature on premium 8\" × 10\" cardboard",
  },
};
