import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Modal({ children }: Props) {
  return (
    <dialog
      className="fixed top-0 flex h-screen w-full items-center justify-center bg-slate-800/60 p-4"
      open
    >
      <div className="max-w-lg rounded bg-white p-5 shadow-lg">{children}</div>
    </dialog>
  );
}
