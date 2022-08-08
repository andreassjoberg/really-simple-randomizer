import { useState, useCallback } from "react";
import { toast } from "react-toastify";

import Header from "./Header";
import Loader from "./Loader";
import InputForm from "./InputForm";
import OutputBox from "./OutputBox";
import Footer from "./Footer";

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

const App = () => {
  const [names, setNames] = useState<string[]>([]);
  const [winners, setWinners] = useState<number>(0);
  const [numberOfRewardsPerWinner, setNumberOfRewardsPerWinner] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const randomize = useCallback((names: string[]) => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        let unrandomized = [...names];
        let randomized = [];

        while (unrandomized.length > 0) {
          let nextIndex = getRandomNumber(unrandomized.length);
          let pickedItem = unrandomized[nextIndex];
          randomized.push(pickedItem);
          unrandomized = unrandomized.filter(
            (_item, index) => index !== nextIndex
          );
        }

        resolve(randomized);
      }, 0);
    });
  }, []);

  const namesPosted = useCallback(
    (names: string[], winners: number, numberOfRewardsPerWinner: number[]) => {
      setIsLoading(true);
      setWinners(winners > 0 ? winners : 3);
      setNumberOfRewardsPerWinner(numberOfRewardsPerWinner);

      randomize(names).then((randomized) => {
        setNames(randomized);
        setIsLoading(false);

        toast.success("Randomization complete!");
      });
    },
    [randomize]
  );

  return (
    <div className="container">
      <Header />

      <Loader isLoading={isLoading} />

      <InputForm names={names} postInput={namesPosted} />

      <OutputBox names={names} winners={winners} numberOfRewardsPerWinner={numberOfRewardsPerWinner} />

      <Footer />
    </div>
  );
};

export default App;
