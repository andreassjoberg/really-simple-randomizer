import React from "react";
import { withAlert, AlertManager } from "react-alert";

import "./App.scss";

import Header from "./Header";
import Loader from "./Loader";
import InputForm from "./InputForm";
import OutputBox from "./OutputBox";
import Footer from "./Footer";

interface State {
    isLoading: boolean;
    names: string[];
    winners: number;
}

interface Props {
    alert: AlertManager;
}

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

class App extends React.Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            isLoading: false,
            names: [],
            winners: 0
        };
    }

    namesPosted(names: string[], winners: number) {
        this.setState({ isLoading: true, winners: winners > 0 ? winners : 3 });

        this.randomize(names).then(randomized => {
            this.setState({ names: randomized, isLoading: false });
            this.props.alert.success("Randomization complete!");
        });
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

    render() {
        return (
            <div className="container">
                <Header />

                <Loader isLoading={this.state.isLoading} />

                <InputForm
                    names={this.state.names}
                    postInput={(names: string[], winners: number) => this.namesPosted(names, winners)}
                />

                <OutputBox names={this.state.names} winners={this.state.winners} />

                <Footer />
            </div>
        );
    }
}

export default withAlert()(App);
