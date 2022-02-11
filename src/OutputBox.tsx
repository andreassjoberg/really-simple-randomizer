import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeer, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

type OutputBoxProps = {
  names: string[];
  winners: number;
  numberOfRewardsPerWinner: number[];
};

const OutputBox = ({ names, winners, numberOfRewardsPerWinner }: OutputBoxProps) => {
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

  const getNumberOfRewards = useCallback(
    (index) => {
      return numberOfRewardsPerWinner[index]
    },
    [numberOfRewardsPerWinner]
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
        <div className="col text-end">
          <button
            type="button"
            className="btn btn-primary"
            disabled={left.length === 0}
            onClick={drawNext}
          >
            Show next
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-secondary"
            disabled={left.length === 0}
            onClick={drawnAll}
          >
            Show all
          </button>
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-md-8" >
          {drawn.map((name, index) => (
            <div
              key={`${index}-${drawn.length}`}
              className={`card${index === 0 ? " animated backInDown" : ""}`}
            >
              <div
                className={`d-flex justify-content-between card-body${checkIsWinner(index) ? " is-winner" : ""
                  }`}
              >
                <div>{checkIsWinner(index) ? (
                  <FontAwesomeIcon icon={faBeer} className="me-2" />
                ) : null}{" "}
                  {1 + names.length - (drawn.length - index)}. {name} </div>
                {checkIsWinner(index) ? (<div><FontAwesomeIcon icon={faShoppingBasket} className="me-2" /> {getNumberOfRewards(names.length - (drawn.length - index))}</div>) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default OutputBox;
