import { cn } from "../utils";

type ButtonProps = JSX.IntrinsicElements["button"];
type LinkProps = JSX.IntrinsicElements["a"];

type Props = {
  theme?: "blue" | "red" | "slate";
  small?: boolean;
} & (ButtonProps | LinkProps);

function isAnchor(props: Props): props is LinkProps {
  return "href" in props;
}

export function Button({ theme = "slate", small = false, ...props }: Props) {
  const styles = cn([
    "inline-block rounded font-medium",
    theme === "blue" ? "text-white bg-blue-500 hover:bg-blue-600" : "",
    theme === "slate" ? "text-slate-600 bg-slate-200 hover:bg-slate-300" : "",
    theme === "red" ? "text-white bg-red-500 hover:bg-red-600" : "",
    small ? "px-2 py-1 text-sm" : "px-2.5 py-1.5",
    props.className || "",
  ]);

  if (isAnchor(props)) {
    return <a {...props} className={styles} />;
  }

  return <button {...props} className={styles} />;
}
