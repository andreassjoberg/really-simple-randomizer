import React, { Component } from "react";

type Props = {
    names: string[];
};

type State = {
    left: string[];
    drawn: string[];
};

const isFirst = (leftCount: number, index: number) => leftCount + index === 0;
const isSecond = (leftCount: number, index: number) => leftCount + index === 1;
const isThird = (leftCount: number, index: number) => leftCount + index === 2;

const getPositionClass = (leftCount: number, index: number) =>
    isFirst(leftCount, index)
        ? "is-first"
        : isSecond(leftCount, index)
        ? "is-second"
        : isThird(leftCount, index)
        ? "is-third"
        : "";

export default class OutputBox extends Component<Props, State> {
    constructor(props: Readonly<Props>) {
        super(props);

        this.state = {
            left: [],
            drawn: []
        };
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (prevProps.names.length === 0 && this.props.names.length > 0) {
            this.reset();
        }
    }

    reset() {
        let { names } = this.props;

        let left = [...names];

        this.setState({ left: left, drawn: [] });
    }

    drawNext() {
        let { left, drawn } = this.state;

        if (left.length > 0) {
            let next = left.pop() || "";
            drawn.unshift(next);
        }

        this.setState({ left: left, drawn: drawn });
    }

    drawAll() {
        let { left, drawn } = this.state;

        while (left.length > 0) {
            let next = left.pop() || "";
            drawn.unshift(next);
        }

        this.setState({ left: left, drawn: drawn });
    }

    render() {
        let { names } = this.props;
        let { left, drawn } = this.state;

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
                        {drawn.map((name, index) => (
                            <div
                                key={`${index}-${Date.now()}`}
                                className={`card ${index === 0 ? "animated flipInX" : ""}`}
                            >
                                <div className={`card-body ${getPositionClass(left.length, index)}`}>
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
