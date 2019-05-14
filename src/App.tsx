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
};

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export default class App extends Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isLoading: false,
            error: undefined,
            names: [],
            randomized: false
        };
    }

    namesPosted(names: string[]) {
        this.setState({ isLoading: true });

        let unrandomized = [...names];
        let randomized = [];

        while (unrandomized.length > 0) {
            let nextIndex = getRandomNumber(unrandomized.length);
            let pickedItem = unrandomized[nextIndex];
            randomized.push(pickedItem);
            unrandomized = unrandomized.filter((_item, index) => index !== nextIndex);
        }

        this.setState({ names: randomized, isLoading: false, randomized: true });
    }

    errorRaised(error: string) {
        this.setState({ error: error });
    }

    resetError() {
        this.setState({ error: undefined });
    }

    render() {
        let { error, isLoading, names, randomized } = this.state;

        return (
            <div className="container">
                {randomized ? <DoneBox /> : null}

                <Header />

                <ErrorBox error={error} dismiss={() => this.resetError()} />
                <Loader isLoading={isLoading} />

                <InputForm
                    names={names}
                    postInput={names => this.namesPosted(names)}
                    raiseError={error => this.errorRaised(error)}
                />
                <OutputBox names={names} />

                <Footer />
            </div>
        );
    }
}
