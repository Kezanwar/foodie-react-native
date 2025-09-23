export const FILTER_ROUTES = {
  ROOT: "FILTER_ROOT",
  CUISINES: "FILTER_CUISINES",
  DIETARY_REQUIREMENTS: "FILTER_DIETARY_REQUIREMENTS",
};

export const ALPHABET = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
] as const;

export type AlphabetOptions = (typeof ALPHABET)[number];
