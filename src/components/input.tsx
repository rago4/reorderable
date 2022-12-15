import { cn } from "../utils";

type Props = {
  small?: boolean;
} & JSX.IntrinsicElements["input"];

export function Input({ small = false, className, ...props }: Props) {
  const styles = cn([
    "rounded border border-slate-200 text-slate-700",
    small ? "px-2 py-1" : "px-3 py-1.5",
    className || "",
  ]);

  return <input {...props} className={styles} />;
}
