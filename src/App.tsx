import { useState } from "react";
import { Button } from "./components/button";
import { ConsentModal } from "./containers/consent-modal";
import { Reorderable } from "./containers/reorderable";
import { BOOL_VALUES, LOCAL_STORAGE } from "./utils";

function App() {
  const [allowed, setAllowed] = useState(
    localStorage.getItem(LOCAL_STORAGE.CONSENT) === BOOL_VALUES.TRUE
  );

  const handleConfirm = () => {
    setAllowed(true);
    localStorage.setItem(LOCAL_STORAGE.CONSENT, BOOL_VALUES.TRUE);
  };

  return (
    <div className="mx-auto w-full max-w-lg p-4">
      <header className="mb-1.5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Reorderable</h2>
        <Button small href="https://github.com/rago4/reorderable">
          ⭐️ Leave a star
        </Button>
      </header>
      <p className="mb-2 leading-relaxed text-slate-500">
        Create and customize your own reorderable lists. Simply drag and drop
        items to rearrange them, and save your changes to access your list
        anytime, anywhere. It's easy to use and perfect for staying organized.
      </p>
      {allowed ? <Reorderable /> : <ConsentModal onConfirm={handleConfirm} />}
    </div>
  );
}

export default App;
