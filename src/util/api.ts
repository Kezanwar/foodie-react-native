export const parseFiltersToParams: (
  name: string,
  filters: string[] | string
) => string = (name, filters) => {
  if (typeof filters === "string") {
    return `&${name}=${filters}`;
  } else
    return filters?.length
      ? filters.map((filter) => `&${name}=${filter}`).join("")
      : "";
};
