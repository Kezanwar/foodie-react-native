import React, { FC } from "react";
import { ChipContainer, ChipSelect } from "components/chip";

import { SelectChipFormObj } from "types/form";

type Props = {
  onDietarySelect: (slug: string) => void;
  dietary_requirements: SelectChipFormObj[];
};

const DietarySelectForm: FC<Props> = ({
  dietary_requirements,
  onDietarySelect,
}) => {
  return (
    <ChipContainer>
      {dietary_requirements?.map((c) => (
        <ChipSelect
          slug={c.slug}
          selected={c.selected}
          key={c.slug}
          label={c.name}
          onSelect={onDietarySelect}
        />
      ))}
    </ChipContainer>
  );
};

export default DietarySelectForm;
