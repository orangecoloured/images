import type { Pokemon } from "../../services/pokemonClient/types";
import styles from "./styles.module.scss";

export const Feed = ({ data }: { data?: Pokemon[] }) => {
  return (
    <ul className={styles.wrapper}>
      {data?.map(pokemon => (
        <li key={pokemon.id}>
          <img src={pokemon.sprites.other?.["official-artwork"]?.["front_default"] || pokemon.sprites.front_default} alt={pokemon.name} />
        </li>
      ))}
    </ul>
  );
}
