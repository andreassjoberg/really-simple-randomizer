import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

interface InputFormProps {
    names: string[];
    postInput(names: string[], winners: number, numberOfRewardsPerWinner: number[]): void;
}

const InputForm = ({ names, postInput }: InputFormProps) => {
    const defaultNumberOfRewards = 1;
    const defaultNumberOfWinners = 3;

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

        toast.error("Please input some data before submitting.");
    }, [postInput, winners, numberOfRewardsPerWinner]);

    const createRewardInputs = useCallback(() => {
        if (numberOfRewardsPerWinner.length > winners) {
            numberOfRewardsPerWinner.length = winners;
        } else if (numberOfRewardsPerWinner.length < winners) {
            while (numberOfRewardsPerWinner.length < winners) {
                numberOfRewardsPerWinner.push(defaultNumberOfRewards);
            }
        }

        return numberOfRewardsPerWinner.map((el, i) =>
            <div key={i} className="mt-1">
                {i + 1}: <input type="number" className="bg-dark ms-1 border-0 text-right text-white" defaultValue={el} onChange={(e) => {
                    const value = !isNaN(Number(e.target.value)) ? Number(e.target.value) : defaultNumberOfRewards;
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
                    className="bg-dark form-control text-white"
                    ref={textAreaRef}
                    autoFocus
                />

                <div className="row">
                    <div className="col-12 mt-3">
                        Winners{" "}
                        <input
                            type="number"
                            defaultValue="3"
                            className="bg-dark border-0 pe-2 text-white"
                            onChange={e => setWinners(!isNaN(Number(e.target.value)) ? Number(e.target.value) : defaultNumberOfWinners)}
                        />
                    </div>
                    <div className="col-12 mt-3">
                        Configure number of rewards for each winner
                        {createRewardInputs()}
                    </div>
                    <div className="col-12">
                        <button
                            type="button"
                            className="btn btn-primary mt-3"
                            onClick={handleButtonClick}
                        >
                            Randomize!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default InputForm;
