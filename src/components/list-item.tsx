import type { FormEvent, MouseEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { Item } from "../types";
import { IconButton } from "./icon-button";
import { IconBars, IconClose, IconPencil } from "./icons";
import { Input } from "./input";

type Props = {
  value: Item;
  reorder: boolean;
  onCheck: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export function ListItem({ value, reorder, onCheck, onEdit, onDelete }: Props) {
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const controls = useDragControls();
  const formId = `edit-form-${value.id}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      id: { value: string };
      title: { value: string };
    };
    const id = target.id.value;
    const title = target.title.value.trim();

    if (!title) return;

    onEdit(id, title);
    setEdit(false);
  };

  const handleDrag = (event: PointerEvent<HTMLButtonElement>) => {
    controls.start(event);
  };

  const handleEdit = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (!edit) {
      event.preventDefault();
      setEdit(true);
    }
  };

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
          onChange={() => onCheck(value.id)}
        />
        {edit ? (
          <form id={formId} onSubmit={handleSubmit}>
            <input type="hidden" name="id" defaultValue={value.id} />
            <Input
              small
              type="text"
              name="title"
              defaultValue={value.title}
              required
            />
          </form>
        ) : (
          <span className="select-none text-slate-700">{value.title}</span>
        )}
      </label>
      {reorder ? (
        <IconButton
          className="cursor-grab active:cursor-grabbing"
          onPointerDown={handleDrag}
        >
          <IconBars />
        </IconButton>
      ) : (
        <div className="flex space-x-1">
          <IconButton
            theme="blue"
            form={formId}
            type="submit"
            onClick={handleEdit}
          >
            <IconPencil />
          </IconButton>
          <IconButton theme="red" onClick={() => onDelete(value.id)}>
            <IconClose />
          </IconButton>
        </div>
      )}
    </Reorder.Item>
  );
}
