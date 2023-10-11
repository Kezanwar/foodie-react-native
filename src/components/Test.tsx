import React, { FC, useEffect } from "react";
import { Text } from "react-native";

import tw from "theme/tailwind";

import { useAppSelector } from "hooks/useAppSelector";
import { getOptions } from "lib/api/api";

const Test: FC = () => {
  const count = useAppSelector((state) => state.auth.count);

  useEffect(() => {
    getOptions()
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Text style={tw`font-black text-3xl mb-8 dark:text-white`}>
      foodieeee {count}
    </Text>
  );
};

export default Test;
