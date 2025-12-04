import type { Pokemon } from "../../services/pokemonClient/types";
import chevronRight from "../../assets/chevron-right.svg";
import styles from "./styles.module.scss";
import { Button } from "../Button";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks";

export const Carousel = ({ data }: { data?: Pokemon[] }) => {
  const refList = useRef<HTMLUListElement>(null);
  const refScrollPosition = useRef(0);
  const [constrolsState, setConstrolsState] = useState({ prev: false, next: false });
  const [currentIndex, setCurrentIndex] = useState(1);
  const updateUiOnScroll = () => {
    if (!refList.current) {
      return;
    }

    const list = refList.current;
    const index = Math.trunc(Math.abs(refScrollPosition.current / list.offsetWidth));
    const elementCurrent = list.children[index];
    const elementPrev = elementCurrent.previousElementSibling;
    const elementNext = elementCurrent.nextElementSibling;

    setCurrentIndex(index + 1);
    setConstrolsState({
      prev: !!elementPrev,
      next: !!elementNext,
    })
  }
  const updateUiOnScrollDebounced = useDebounce(updateUiOnScroll, 50);
  const isReady = useRef(false);

  useEffect(() => {
    if (isReady.current || !data?.length) {
      return;
    }

    isReady.current = true;
    updateUiOnScroll();
  }, [data]);

  const onScroll = (event: Event) => {
    const list = event.target as HTMLUListElement;

    refScrollPosition.current = Math.max(list.scrollLeft, 0);
    updateUiOnScrollDebounced();
  }

  useEffect(() => {
    if (!refList.current) {
      return;
    }

    const list = refList.current;

    list.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      list.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onShow = (dir: "prev" | "next") => () => {
    if (!refList.current) {
      return;
    }

    const list = refList.current;
    const index = Math.trunc(Math.abs(refScrollPosition.current / list.offsetWidth));
    const elementCurrent = list.children[index];

    switch (dir) {
      case "prev": {
        const elementPrev = elementCurrent.previousElementSibling;

        if (!elementPrev) {
          return;
        }

        elementPrev.scrollIntoView({ behavior: "smooth" });

        break;
      }

      case "next": {
        const elementNext = elementCurrent.nextElementSibling;

        if (!elementNext) {
          return;
        }

        elementNext.scrollIntoView({ behavior: "smooth" });

        break;
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list} ref={refList}>
        {data?.map(pokemon => (
          <li key={pokemon.id}>
            <img src={pokemon.sprites.other?.["official-artwork"]?.["front_default"] || pokemon.sprites.front_default} alt={pokemon.name} />
          </li>
        ))}
      </ul>
      <div className={styles.controls}>
        <Button
          size="s"
          data-dir="prev"
          data-active={`${constrolsState.prev}`}
          className={styles.button}
          icon={chevronRight}
          onClick={onShow("prev")}
        />
        <Button
          size="s"
          data-dir="next"
          data-active={`${constrolsState.next}`}
          className={styles.button}
          icon={chevronRight}
          onClick={onShow("next")}
        />
      </div>
      <div className={styles.counter}>
        {currentIndex} / {data?.length}
      </div>
    </div>
  );
}
