import { View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { ALPHABET, AlphabetOptions } from "../constants";
import { Typography } from "components/typography";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

type Props = {
  onAlphabetClick: (letter: AlphabetOptions) => void;
};

const Alphabet: FC<Props> = ({ onAlphabetClick }) => {
  return (
    <View style={tw`h-[94%]`}>
      {ALPHABET.map((letter) => (
        <TouchableOpacity
          key={letter}
          style={tw`flex-1`}
          onPressIn={() => onAlphabetClick(letter)}
        >
          <Typography
            style={" text-center font-regular pr-4"}
            variant="body2"
            color="primary.main"
          >
            {letter}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Alphabet;
