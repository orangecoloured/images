const base = "https://pokeapi.co/api/v2/";

type ApiMethodProps = {
  path: string;
  params?: Record<string, string>;
}

export const api = {
  get: async <T>({ path, params }: ApiMethodProps) => {
    let query = new URLSearchParams(params).toString();

    if (query) {
      query = `?${query}`;
    }

    return await (await fetch(`${base}${path}${query}`)).json() as T;
  }
}
