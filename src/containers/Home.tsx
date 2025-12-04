import { useEffect, useRef, useState } from "react";
import { ViewToggle } from "../components/ViewToggle";
import styles from "./styles.module.scss";
import type { ViewMode } from "../types";
import { Cards } from "../components/Cards";
import { Feed } from "../components/Feed";
import { List } from "../components/List";
import { Carousel } from "../components/Carousel";
import { useGetPokemonsPage } from "../hooks";
import { Loading } from "../components/Loading";

export const Home = () => {
  const refWrapper = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("carousel");
  const [enoughPokemons, setEnoughPokemons] = useState(false);
  const pokemons = useGetPokemonsPage({ enabled: !enoughPokemons, limit: 40 });

  useEffect(() => {
    if (!enoughPokemons && pokemons.data && !!pokemons.data.length) {
      setEnoughPokemons(true);
    }
  }, [pokemons.data, pokemons.isSuccess, enoughPokemons]);

  useEffect(() => {
    if (refWrapper.current) {
      refWrapper.current.scrollTop = 0;
    }
  }, [viewMode]);

  const renderView = (mode: ViewMode) => {
    if (pokemons.isLoading) {
      return (
        <Loading className={styles.loading} />
      );
    }

    switch (mode) {
      case "cards": return <Cards data={pokemons.data} />;
      case "feed": return <Feed data={pokemons.data} />;
      case "list": return <List data={pokemons.data} />;
      case "carousel": return <Carousel data={pokemons.data} />;
    }
  }

  return (
    <div ref={refWrapper} className={styles.wrapper}>
      {renderView(viewMode)}
      <ViewToggle onChange={setViewMode} />
    </div>
  );
}
