import { useCallback, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";

import { useWindowSize } from "./hooks/useWindowSize";
import { useCountdown } from "./hooks/useCountdown";
import { Card } from "./components/Card";

type OutputBoxProps = {
  names: string[];
  winners: number;
  numberOfRewardsPerWinner: number[];
};

const COUNTDOWN_TIME = 5;

const OutputBox = ({ names, winners, numberOfRewardsPerWinner }: OutputBoxProps) => {
  const [left, setLeft] = useState<string[]>([]);
  const [drawn, setDrawn] = useState<string[]>([]);
  const [autoplay, setAutoplay] = useState<boolean>(false);

  const { width, height } = useWindowSize();

  useEffect(() => {
    const updatedLeft = [...names];

    setLeft(updatedLeft);
    setDrawn([]);
  }, [names]);

  useEffect(() => {
    if (autoplay && left.length > 0) {
      startCountdown(COUNTDOWN_TIME);
    } else {
      cancelCountdown();
      if (autoplay) {
        setAutoplay(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, left]);

  const autoplayNext = async () => {
    drawNext();
    startCountdown(COUNTDOWN_TIME);
  }

  const { timeLeft, start: startCountdown, cancel: cancelCountdown } = useCountdown(autoplayNext);

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
    (index: number) => {
      return numberOfRewardsPerWinner[index]
    },
    [numberOfRewardsPerWinner]
  );

  const toggleAutoplay = useCallback(
    () => {
      setAutoplay(!autoplay);
    }, [autoplay]
  );

  return names.length > 0 ? (
    <div>
      <div className="row d-flex justify-content-evenly mt-3">
        <div className="col d-flex justify-content-center mt-2">
          <button
            type="button"
            className="btn btn-primary"
            disabled={left.length === 0}
            onClick={toggleAutoplay}
          >
            <FontAwesomeIcon icon={autoplay ? faStop : faPlay} className="me-2" />
            {autoplay ? `Stop (${timeLeft})` : "Autoplay"}
          </button>
        </div>
        <div className="col d-flex justify-content-center mt-2">
          <button
            type="button"
            className="btn btn-primary"
            disabled={left.length === 0}
            onClick={drawNext}
          >
            Show next
          </button>
        </div>
        <div className="col d-flex justify-content-center mt-2">
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
            <Card
              key={`${index}-${drawn.length}`}
              name={name}
              place={1 + names.length - (drawn.length - index)}
              isWinner={checkIsWinner(index)}
              numberOfRewards={getNumberOfRewards(names.length - (drawn.length - index))}
              animate={index === 0}
            />
          ))}
        </div>
      </div>

      {drawn.length > 0 && left.length === 0 && (
        <Confetti width={width} height={height} />
      )}
    </div>
  ) : null;
};

export default OutputBox;
