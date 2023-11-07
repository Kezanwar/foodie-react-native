import * as React from "react";
import Svg, { Path, Ellipse } from "react-native-svg";
import tw from "theme/tailwind";

type Props = {
  height?: number;
  width?: number;
  color?: string;
};

const FilterIcon: React.FC<Props> = ({
  height = 23,
  width = 18,
  color = tw.color("primary-main"),
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 16" fill="none">
      <Path
        d="M7 4h10M1 12h10"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Ellipse
        cx={4}
        cy={4}
        rx={3}
        ry={3}
        transform="rotate(90 4 4)"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <Ellipse
        cx={14}
        cy={12}
        rx={3}
        ry={3}
        transform="rotate(90 14 12)"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
};

export default FilterIcon;
