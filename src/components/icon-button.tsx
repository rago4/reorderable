import { cn } from "../utils";

type Props = {
  theme?: "blue" | "red" | "slate";
} & JSX.IntrinsicElements["button"];

export function IconButton({ theme = "slate", className, ...props }: Props) {
  const styles = cn([
    "flex h-6 w-6 items-center justify-center rounded",
    theme === "blue" ? "bg-blue-100 text-blue-500 hover:bg-blue-200" : "",
    theme === "red" ? "bg-red-100 text-red-500 hover:bg-red-200" : "",
    theme === "slate" ? "bg-slate-200 text-slate-800 hover:bg-slate-300" : "",
    className || "",
  ]);

  return <button {...props} className={styles} />;
}
