import React, { Component } from "react";
import "./App.scss";

import Header from "./Header";
import ErrorBox from "./ErrorBox";
import Loader from "./Loader";
import InputForm from "./InputForm";
import OutputBox from "./OutputBox";
import Footer from "./Footer";
import DoneBox from "./DoneBox";

type State = {
    isLoading: boolean;
    error: string | undefined;
    names: string[];
    randomized: boolean;
    winners: number;
};

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export default class App extends Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isLoading: false,
            error: undefined,
            names: [],
            randomized: false,
            winners: 0
        };
    }

    namesPosted(names: string[], winners: number) {
        this.setState({ isLoading: true, winners: winners > 0 ? winners : 3 });

        this.randomize(names).then(randomized =>
            this.setState({ names: randomized, isLoading: false, randomized: true })
        );
    }

    randomize(names: string[]) {
        return new Promise<string[]>(resolve => {
            setTimeout(() => {
                let unrandomized = [...names];
                let randomized = [];

                while (unrandomized.length > 0) {
                    let nextIndex = getRandomNumber(unrandomized.length);
                    let pickedItem = unrandomized[nextIndex];
                    randomized.push(pickedItem);
                    unrandomized = unrandomized.filter((_item, index) => index !== nextIndex);
                }

                resolve(randomized);
            }, 0);
        });
    }

    errorRaised(error: string) {
        this.setState({ error: error });
    }

    resetError() {
        this.setState({ error: undefined });
    }

    render() {
        let { error, isLoading, names, randomized, winners } = this.state;

        return (
            <div className="container">
                {randomized ? <DoneBox /> : null}

                <Header />

                <ErrorBox error={error} dismiss={() => this.resetError()} />
                <Loader isLoading={isLoading} />

                <InputForm
                    names={names}
                    postInput={(names, winners) => this.namesPosted(names, winners)}
                    raiseError={error => this.errorRaised(error)}
                />
                <OutputBox names={names} winners={winners} />

                <Footer />
            </div>
        );
    }
}
