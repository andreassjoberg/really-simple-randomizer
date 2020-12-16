import React, { useState, useCallback } from "react";
import { useAlert } from "react-alert";

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
    (names: string[], winners: number) => {
      setIsLoading(true);
      setWinners(winners > 0 ? winners : 3);

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
      <Header />

      <Loader isLoading={isLoading} />

      <InputForm names={names} postInput={namesPosted} />

      <OutputBox names={names} winners={winners} />

      <Footer />
    </div>
  );
};

export default App;
