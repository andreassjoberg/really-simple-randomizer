import { useCallback, useRef, useState } from "react";
import { useAlert } from "react-alert";

interface InputFormProps {
  names: string[];
  postInput(names: string[], winners: number, numberOfRewardsPerWinner: number[]): void;
}

const InputForm = ({ names, postInput }: InputFormProps) => {
  const defaultNumberOfRewards = 1;
  const defaultNumberOfWinners = 3;
  const alert = useAlert();
  
  let [winners, setWinners] = useState<number>(3);
  let [numberOfRewardsPerWinner] = useState<number[]>(new Array(winners).fill(defaultNumberOfRewards));
 
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleButtonClick = useCallback(() => {
    const input = textAreaRef.current ? textAreaRef.current.value : "";   
    
    const names = input
      .split(/\n/)
      .map((s) => s.trim())
      .filter((s) => s !== undefined && s !== null && s !== "");

    if (names.length > 0) {
      postInput(names, winners, numberOfRewardsPerWinner);
      return;
    }

    alert.error("Please input some data before submitting.");
  }, [alert, postInput, winners, numberOfRewardsPerWinner]);

  const createRewardInputs = useCallback(() => {    
    if(numberOfRewardsPerWinner.length > winners) {
      numberOfRewardsPerWinner.length = winners;
    } else if(numberOfRewardsPerWinner.length < winners) {
      while(numberOfRewardsPerWinner.length < winners) {
        numberOfRewardsPerWinner.push(defaultNumberOfRewards);
      }
    }
    
    return numberOfRewardsPerWinner.map((el, i) =>
      <div key={i}>
        {i + 1}: <input type="text" className="ml-3" defaultValue={el} onChange={(e) => {
          const value = !isNaN(Number(e.target.value)) ? Number(e.target.value ) : defaultNumberOfRewards;
          numberOfRewardsPerWinner[i] = value;
        }} />
      </div>
    );
  }, [winners, numberOfRewardsPerWinner]);

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
              onChange={e => setWinners(!isNaN(Number(e.target.value )) ? Number(e.target.value ) : defaultNumberOfWinners)}
            />
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <p>
          Configure number of rewards for each winner
        </p>       
        {createRewardInputs()}       
      </div>
    </div>
  ) : null;
};

export default InputForm;
