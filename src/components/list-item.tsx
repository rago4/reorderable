import { useEffect, useRef } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Item } from "../types";
import { IconBars, IconClose } from "./icons";

type Props = {
  value: Item;
  reorder: boolean;
  onChange: (id: string) => void;
  onDelete: (id: string) => void;
};

export function ListItem({ value, reorder, onChange, onDelete }: Props) {
  const ref = useRef<HTMLElement>(null);
  const controls = useDragControls();

  // TODO: remove this workaround once it's resolved - https://github.com/framer/motion/issues/1597
  useEffect(() => {
    if (!ref.current || !reorder) return;

    const listener = (event: globalThis.TouchEvent) => {
      event.preventDefault();
    };

    ref.current.addEventListener("touchstart", listener, { passive: false });

    return () => {
      ref.current?.removeEventListener("touchstart", listener);
    };
  }, [ref.current, reorder]);

  return (
    <Reorder.Item
      ref={ref}
      className="flex items-center justify-between rounded border border-slate-100 bg-white p-4 shadow"
      value={value}
      dragListener={false}
      dragControls={controls}
    >
      <label className="flex items-center">
        <input
          className="mr-2 cursor-pointer"
          type="checkbox"
          checked={value.completed}
          disabled={reorder}
          onChange={() => onChange(value.id)}
        />
        <span className="select-none text-slate-700">{value.title}</span>
      </label>
      {reorder ? (
        <div
          className="flex h-6 w-6 cursor-grab items-center justify-center rounded bg-slate-200 hover:bg-slate-300 active:cursor-grabbing"
          onPointerDown={(e) => {
            controls.start(e);
          }}
        >
          <IconBars />
        </div>
      ) : (
        <button
          className="flex h-6 w-6 items-center justify-center rounded bg-red-100 text-red-500 hover:bg-red-200"
          onClick={() => {
            onDelete(value.id);
          }}
        >
          <IconClose />
        </button>
      )}
    </Reorder.Item>
  );
}
