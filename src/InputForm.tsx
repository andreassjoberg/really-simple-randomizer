import { useCallback, useRef } from "react";
import { useAlert } from "react-alert";

interface InputFormProps {
  names: string[];
  postInput(names: string[], winners: number): void;
}

const InputForm = ({ names, postInput }: InputFormProps) => {
  const alert = useAlert();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const winnersRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = useCallback(() => {
    const input = textAreaRef.current ? textAreaRef.current.value : "";
    const winners =
      winnersRef.current && !isNaN(Number(winnersRef.current.value))
        ? Number(winnersRef.current.value)
        : 3;

    const names = input
      .split(/\n/)
      .map((s) => s.trim())
      .filter((s) => s !== undefined && s !== null && s !== "");

    if (names.length > 0) {
      postInput(names, winners);
      return;
    }

    alert.error("Please input some data before submitting.");
  }, [alert, postInput]);

  return names.length <= 0 ? (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <p>
          Paste (or type) your input data below, one entry per line, and the
          order of them will be randomized.
        </p>
        <textarea
          rows={6}
          className="form-control text-primary"
          ref={textAreaRef}
          autoFocus
        />

        <div className="row">
          <div className="col-12 col-sm-6 order-1 order-sm-0 text-center text-sm-left">
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleButtonClick}
            >
              Randomize!
            </button>
          </div>
          <div className="col-12 col-sm-6 mt-3 text-center text-sm-left">
            Winners{" "}
            <input
              type="input"
              defaultValue="3"
              className="bg-dark border-0 pr-2 text-right text-white"
              ref={winnersRef}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default InputForm;
