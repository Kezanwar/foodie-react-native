import { SelectChipFormObj } from "types/form";
import { ALPHABET, AlphabetOptions } from "../constants";

export type IAlphabetSearchMap = {
  [key: string]: number;
};

export const createAlphabetCuisinesSearchMap = (
  cuisines: SelectChipFormObj[]
): IAlphabetSearchMap => {
  return cuisines.reduce((acc, curr, index) => {
    if (typeof acc?.[curr.name.charAt(0).toUpperCase()] !== "number") {
      acc[curr.name.charAt(0).toUpperCase()] = index;
    }
    return acc;
  }, {} as IAlphabetSearchMap);
};

export const findClosestCuisineAlphabetIndex = (
  letter: AlphabetOptions,
  map: IAlphabetSearchMap
): number | null => {
  // if it exists in the map return it
  if (typeof map[letter] === "number") return map[letter];

  // if it doesnts exist search down the alphabet from the letter given
  const alphPosition = ALPHABET.indexOf(letter);

  for (let i = alphPosition; i <= ALPHABET.length; i++) {
    if (typeof map[ALPHABET[i]] === "number") {
      return map[ALPHABET[i]];
    }
  }
  // if search down doesnts exist search up the alphabet from the letter
  for (let i = alphPosition; i >= 0; i--) {
    if (typeof map[ALPHABET[i]] === "number") {
      return map[ALPHABET[i]];
    }
  }

  return null;
};
