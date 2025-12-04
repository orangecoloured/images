type ReqctQueryParamsBase = {
  enabled: boolean;
}

export type UseGetPokemonsParams = ReqctQueryParamsBase & {
  limit?: number;
  offset?: number;
}
