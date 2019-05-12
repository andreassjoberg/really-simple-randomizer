import React, { Component } from "react";

type Props = {
    names: string[];
};

type State = {
    left: string[];
    drawn: string[];
    next: string | undefined;
};

const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export default class OutputBox extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            left: [],
            drawn: [],
            next: undefined
        };
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (prevProps.names.length === 0 && this.props.names.length > 0) {
            this.randomize();
        }
    }

    randomize() {
        let { names } = this.props;

        let unrandomized = [...names];
        let randomized = [];

        while (unrandomized.length > 0) {
            let nextIndex = getRandomNumber(unrandomized.length);
            let pickedItem = unrandomized[nextIndex];
            randomized.push(pickedItem);
            unrandomized = unrandomized.filter((_item, index) => index !== nextIndex);
        }

        this.setState({ left: randomized, drawn: [], next: undefined });
    }

    drawNext() {
        let { left, drawn, next } = this.state;

        if (next) {
            drawn.unshift(next);
        }

        next = left.pop();

        this.setState({ left: left, drawn: drawn, next: next });
    }

    drawAll() {
        let { left, drawn, next } = this.state;

        while (left.length > 0) {
            if (next) {
                drawn.unshift(next);
            }

            next = left.pop();
        }

        this.setState({ left: left, drawn: drawn, next: next });
    }

    render() {
        let { names } = this.props;
        let { left, drawn, next } = this.state;

        return names.length > 0 ? (
            <div>
                <div className="row justify-content-center my-3">
                    <button
                        type="button"
                        className="btn btn-primary"
                        disabled={left.length === 0}
                        onClick={() => this.drawNext()}
                    >
                        Show next
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary ml-5"
                        disabled={left.length === 0}
                        onClick={() => this.drawAll()}
                    >
                        Show all
                    </button>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-8">
                        {next ? (
                            <div key={Date.now()} className="card bg-primary animated flipInX">
                                <div className="card-body">
                                    {names.length - drawn.length}. {next}
                                </div>
                            </div>
                        ) : null}
                        {drawn.map((name, index) => (
                            <div key={index} className="card">
                                <div className="card-body">
                                    {1 + names.length - (drawn.length - index)}. {name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ) : null;
    }
}
