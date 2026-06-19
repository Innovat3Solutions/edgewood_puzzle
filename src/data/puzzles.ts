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
    slug: "Penguin",
    title: "Gentoo Penguin",
    subtitle: "Gentoo Penguin",
    file: "gentoo-penguin",
    addToCartUrl:
      "https://store.edgewoodpuzzle.co/product-details/product/69fcc12cc23ecf52ae035baf",
  },
  {
    slug: "giraffe",
    title: "Giraffe and Calf",
    subtitle: "Giraffe and Calf",
    file: "giraffe",
    addToCartUrl:
      "https://store.edgewoodpuzzle.co/product-details/product/6a172099bf042c1b7b0bb126",
  },
  {
    slug: "leopard",
    title: "African Leopard",
    subtitle: "Panthera pardus",
    file: "leopard",
    addToCartUrl:
      "https://store.edgewoodpuzzle.co/product-details/product/6a171e44ce3bad65babccb97",
  },
  {
    slug: "Koala",
    title: "Koala and Joey",
    subtitle: "Koala and Joey",
    file: "koala",
    addToCartUrl:
      "https://store.edgewoodpuzzle.co/product-details/product/6a171fc5be87b62a1aea9783",
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
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a1759513e1d77b4cd6a26cb", // Add this line
  },
  {
    slug: "cherp-gorilla",
    title: "Western Gorilla",
    file: "CherpStudio_Gorilla_19_25x26_625in.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a1757953e1d77380b6a1eaf",
  },
  {
    slug: "cherp-elephant",
    title: "Asian Elephant",
    file: "CherpStudio_Adult_Elephant_19_25x26_625in.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a17291802a06b5706a8d609",
  },
  {
    slug: "cherp-macaws",
    title: "Macaws in Flight",
    file: "CherpStudio_Parrots_19_25x26_625in.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a172c88b465a17938660c2f",
  },
].map(({ slug, title, file, addToCartUrl }) => ({
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
  addToCartUrl,
}));

const cherpWood: Puzzle[] = [
  {
    slug: "cherp-tiger-wood",
    title: "Tiger",
    file: "CherpStudio_WOOD_Tiger_12x12in_REV.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a1733e5bf042ca8940c0c36",
  },
  {
    slug: "cherp-giraffe-wood",
    title: "Giraffe",
    file: "CherpStudio_WOOD_giraffe_12x12in_REV2.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a175319a607c95b1cc8bc2f",
  },
].map(({ slug, title, file, addToCartUrl }) => ({
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
  addToCartUrl,
}));

const cherpStudioPuzzleList: Puzzle[] = [...cherpCardboard, ...cherpWood];

const WIC_PACKAGING =
  "/puzzles/wild-in-color/Wild in Color_300Pieces_Tiger Puzzle_Mockup.jpg";

const wildInColorList: Puzzle[] = [
  {
    slug: "wic-axolotl",
    title: "Axolotl",
    file: "Wild in Color_Axelotl_100 pieces_13_25x16_56in.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a17383ebf042c62590c2710",
  },
  {
    slug: "wic-chameleon",
    title: "Chameleon",
    file: "Wild in Color_Chameleon_100 pieces_13_25x16_56in.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a172b02b465a1d2926605e8",
  },
  {
    slug: "wic-tigers",
    title: "Tigers",
    file: "Wild in Color_tigers_100 pieces_13_25x16_56in.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a172eb42830ddceedb378a7",
  },
  {
    slug: "wic-orangutans",
    title: "Orangutans",
    file: "Wild in Color_Orangs_19_25x26_625in.jpg",
    addToCartUrl: "https://store.edgewoodpuzzle.co/product-details/product/6a1735b05a13a74ac7f0dd7a",
  },
].map(({ slug, title, file, addToCartUrl }) => ({
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
  addToCartUrl,
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
