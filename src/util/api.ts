export const parseFiltersToParams: (
  name: string,
  filters: string[]
) => string = (name, filters) => {
  return filters.map((filter) => `&${name}=${filter}`).join("");
};
