import styles from "./styles.module.scss";
import type { ButtonProps } from "./types";

export const Button = ({ className, icon, size = "m", ...props }: ButtonProps) => {
  return (
    <button data-size={size} className={`${styles.button} ${className}`} { ...props }>
      <img src={icon} className={styles.icon} />
    </button>
  );
}
