import { useState, useCallback } from "react";
import { useAlert } from "react-alert";

// import Snowfall from 'react-snowfall';
// import { Santa } from "./Santa";

import "./style/App.scss";

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

  const alert = useAlert();

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

        alert.success("Randomization complete!");
      });
    },
    [alert, randomize]
  );

  return (
    <div className="container">
      {/* <Snowfall color="white" snowflakeCount={400} style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }} /> */}
      {/* <Santa /> */}

      <Header />

      <Loader isLoading={isLoading} />

      <InputForm names={names} postInput={namesPosted} />

      <OutputBox names={names} winners={winners} numberOfRewardsPerWinner={numberOfRewardsPerWinner}/>

      <Footer />
    </div>
  );
};

export default App;
