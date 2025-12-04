import type { Pokemon } from "../../services/pokemonClient/types";
import styles from "./styles.module.scss";

export const Cards = ({ data }: { data?: Pokemon[] }) => {
  return (
    <ul className={styles.wrapper}>
      {data?.map(pokemon => (
        <li key={pokemon.id}>
          <img src={pokemon.sprites.other?.["official-artwork"]?.["front_default"] || pokemon.sprites.front_default} alt={pokemon.name} />
          <div className={styles.info}>
            <h4>{pokemon.name}</h4>
            <div className={styles.bottom}>
              <div>
                <p>Height: <b>{pokemon.height}</b> cm</p>
                <p>Weight: <b>{pokemon.weight}</b> kg</p>
              </div>
              <div className={styles.experience}>
                {pokemon.base_experience}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
