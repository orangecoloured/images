export const convertObjectValuesToString = (obj: Record<string, unknown>) => {
  const objConverted: Record<string, string> = {};

  Object.entries(obj).forEach(([key, value]) => {
    objConverted[key] = `${value}`;
  });

  return objConverted;
}
