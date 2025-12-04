import styles from "./styles.module.scss";

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.spinner}></div>
    </div>
  )
}
