import { useQuery } from "@tanstack/react-query";
import type { UseGetPokemonsParams } from "./types";
import { pokemonClient } from "../services";
import { convertObjectValuesToString } from "../helpers/convertObjectValuesToString";

export function useGetPokemonsPage({ enabled, ...params }: UseGetPokemonsParams) {
  return useQuery({
    queryKey: ["pokemons", params.limit, params.offset],
    queryFn: async () => {
      const response = await pokemonClient.getPokemonCursorsPage({ params: convertObjectValuesToString(params) });
      const pokemons = (await Promise.allSettled(response.results.map(({ name }) => pokemonClient.getPokemon({ name })))).map(result => result.status === "fulfilled" ? result.value : null).filter(item => !!item);

      return Promise.resolve(pokemons);
    },
    enabled,
  });
}
