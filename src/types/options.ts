export type Option = {
  name: string;
  slug: string;
};

export type IOptions = {
  cuisines: Option[];
  dietary_requirements: Option[];
};

export type IFilters = {
  cuisines: string[];
  dietary_requirements: string[];
};
