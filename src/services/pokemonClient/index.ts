import { api } from "../api";
import type { GetPokemonRequest, GetPokemonResponse, ListPaginatedPokemonsRequest, ListPaginatedPokemonsResponse } from "./types";

export const pokemonClient = {
  async getPokemonCursorsPage(props: ListPaginatedPokemonsRequest) {
    const { params } = props;

    try {
      const data = await api.get<ListPaginatedPokemonsResponse>({ path: "pokemon", params });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async getPokemon(props: GetPokemonRequest) {
    const { name } = props;

    try {
      const data = await api.get<GetPokemonResponse>({ path: `pokemon/${name}` });

      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
}
