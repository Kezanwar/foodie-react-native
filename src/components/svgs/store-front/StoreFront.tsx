import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
};

const StoreFront: React.FC<Props> = ({ color = "#000" }) => {
  return (
    <Svg width={17} height={17} viewBox="0 0 26 24" fill="none">
      <Path
        d="M3 13.449V22a1 1 0 001 1h18a1 1 0 001-1V13.45M3.754 1h18.492a1 1 0 01.961.725L25 8H1l1.793-6.275A1 1 0 013.754 1z"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 8v2a4 4 0 11-8 0V8M17 8v2a4 4 0 11-8 0V8M25 8v2a4 4 0 11-8 0V8"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default StoreFront;
