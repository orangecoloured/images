import styles from "./styles.module.scss";
import toggleIcon from "../../assets/toggle.svg";
import cardIcon from "../../assets/card.svg";
import feedIcon from "../../assets/feed.svg";
import listIcon from "../../assets/list.svg";
import carouselIcon from "../../assets/carousel.svg";
import { useCallback, useEffect, useState } from "react";
import type { ViewToggleProps } from "./types";
import { VIEW_MODES } from "../../constants";
import type { ViewMode } from "../../types";
import { Button } from "../Button";

const getViewIcon = (mode: ViewMode) => {
  switch (mode) {
    case "cards": return cardIcon;
    case "feed": return feedIcon;
    case "list": return listIcon;
    case "carousel": return carouselIcon;
  }
}

export const ViewToggle = ({ currentMode, onChange }: ViewToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onBodyClick = (event: Event) => {
    const target = event.target as HTMLElement;

    if (target.dataset.toggle !== "true") {
      setIsOpen(false);
    }
  }

  const toggleOpenState = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  useEffect(() => {
    document.body.addEventListener("click", onBodyClick, { passive: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls} data-open={`${isOpen}`}>
        {VIEW_MODES.map(mode => (
          <Button
            key={mode}
            className={styles.option}
            data-active={`${mode === currentMode}`}
            onClick={() => onChange(mode)}
            icon={getViewIcon(mode)}
          />
        ))}
      </div>
      <Button
        data-toggle="true"
        data-open={`${isOpen}`}
        onClick={toggleOpenState}
        icon={toggleIcon}
        className={styles.toggle}
      />
    </div>
  )
}
