import type { HTMLAttributes } from "react";

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  className?: string;
  icon: string;
  size?: "m" | "s";
}
