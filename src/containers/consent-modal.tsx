import { Button } from "../components/button";
import { Modal } from "../components/modal";

type Props = {
  onConfirm: VoidFunction;
};

export function ConsentModal({ onConfirm }: Props) {
  return (
    <Modal>
      <h2 className="mb-1 text-xl font-bold text-slate-800">
        We're using local storage
      </h2>
      <p className="mb-3 leading-relaxed text-slate-500">
        By using our app, you consent to the use of local storage on your
        device. This storage is necessary to save your user preferences and
        settings, as well as other data relevant to your use of the app. We
        don't use any cookies.
      </p>
      <div className="space-x-1">
        <Button theme="blue" onClick={onConfirm}>
          Agree
        </Button>
        <Button href="https://duckduckgo.com/">Decline</Button>
      </div>
    </Modal>
  );
}
