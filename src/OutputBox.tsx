import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeer } from "@fortawesome/free-solid-svg-icons";

type OutputBoxProps = {
  names: string[];
  winners: number;
};

const OutputBox = ({ names, winners }: OutputBoxProps) => {
  const [left, setLeft] = useState<string[]>([]);
  const [drawn, setDrawn] = useState<string[]>([]);

  const drawNext = useCallback(() => {
    if (left.length === 0) return;

    const next = left[0] || "";
    const updatedLeft = left.slice(1);

    const updatedDrawn = [next, ...drawn];

    setLeft(updatedLeft);
    setDrawn(updatedDrawn);
  }, [drawn, left]);

  const drawnAll = useCallback(() => {
    const nextOnes = [...left].reverse();

    const updatedDrawn = [...nextOnes, ...drawn];

    setLeft([]);
    setDrawn(updatedDrawn);
  }, [drawn, left]);

  const checkIsWinner = useCallback(
    (index: number) => {
      return left.length + index < winners;
    },
    [left.length, winners]
  );

  // RESET
  useEffect(() => {
    const updatedLeft = [...names];

    setLeft(updatedLeft);
    setDrawn([]);
  }, [names]);

  return names.length > 0 ? (
    <div>
      <div className="row justify-content-center my-3">
        <button
          type="button"
          className="btn btn-primary"
          disabled={left.length === 0}
          onClick={drawNext}
        >
          Show next
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-5"
          disabled={left.length === 0}
          onClick={drawnAll}
        >
          Show all
        </button>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-md-8">
          {drawn.map((name, index) => (
            <div
              key={`${index}-${drawn.length}`}
              className={`card${index === 0 ? " animated backInDown" : ""}`}
            >
              <div
                className={`card-body${
                  checkIsWinner(index) ? " is-winner" : ""
                }`}
              >
                {checkIsWinner(index) ? (
                  <FontAwesomeIcon icon={faBeer} className="mr-2" />
                ) : null}{" "}
                {1 + names.length - (drawn.length - index)}. {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default OutputBox;
