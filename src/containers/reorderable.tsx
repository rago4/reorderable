import type { FormEvent } from "react";
import { useState } from "react";
import { Reorder } from "framer-motion";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { ListItem } from "../components/list-item";
import { Item } from "../types";
import { LOCAL_STORAGE, uuid } from "../utils";

const SAVED_ITEMS = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE.ITEMS) || "null"
);
const INIT_ITEMS =
  SAVED_ITEMS === null
    ? [
        { id: "1", title: "🛒 Go grocery shopping", completed: false },
        { id: "2", title: "💡 Pay electricity bill", completed: false },
        { id: "3", title: "🦷 Book dentist appointment", completed: false },
      ]
    : SAVED_ITEMS;

export function Reorderable() {
  const [reorder, setReorder] = useState(false);
  const [items, setItems] = useState<Item[]>(INIT_ITEMS);

  const saveItems = (items: Item[]) => {
    setItems(items);
    localStorage.setItem(LOCAL_STORAGE.ITEMS, JSON.stringify(items));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      items: { value: string };
    };
    const newItems: Item[] = target.items.value
      .trim()
      .split(";")
      .map((title) => title.trim())
      .filter((title) => title.length > 0)
      .map((title) => ({
        id: uuid(),
        title,
        completed: false,
      }));

    saveItems([...items, ...newItems]);
    target.items.value = "";
  };

  const handleReorderToggle = () => {
    setReorder(!reorder);
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear this list?")) {
      saveItems([]);
    }
  };

  const handleCheck = (id: string) => {
    saveItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleEdit = (id: string, title: string) => {
    saveItems(
      items.map((item) => (item.id === id ? { ...item, title } : item))
    );
  };

  const handleDelete = (id: string) => {
    saveItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <form className="mb-2" onSubmit={handleSubmit}>
        <Input
          className="w-full"
          type="text"
          name="items"
          placeholder="Separate items with ; to add many"
          required
        />
      </form>
      {items.length > 0 && (
        <>
          <div className="mb-2 space-x-1">
            <Button small onClick={handleReorderToggle}>
              Toggle reorder
            </Button>
            <Button small theme="red" onClick={handleClear}>
              Clear list
            </Button>
          </div>
          <Reorder.Group
            className="space-y-3"
            axis="y"
            values={items}
            onReorder={saveItems}
          >
            {items.map((item) => (
              <ListItem
                key={item.id}
                value={item}
                reorder={reorder}
                onCheck={handleCheck}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Reorder.Group>
        </>
      )}
    </>
  );
}
