type PokemonCursor = {
  name: string;
  url: string;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
  other?: Record<string, Record<string, string | null>>;
  versions?: Record<string, Record<string, Record<string, string>>>;
}

// Partial Pokemon type
export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  sprites: PokemonSprites;
}

export type ListPaginatedPokemonsRequest = {
  params?: Record<string, string>;
}
export type ListPaginatedPokemonsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonCursor[];
}

export type GetPokemonRequest = {
  name: string;
}
export type GetPokemonResponse = Pokemon;
