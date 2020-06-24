import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBeer } from "@fortawesome/free-solid-svg-icons";

type Props = {
    names: string[];
    winners: number;
};

type State = {
    left: string[];
    drawn: string[];
};

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
            let next = left.shift() || "";
            drawn.unshift(next);
        }

        this.setState({ left: left, drawn: drawn });
    }

    drawAll() {
        let { left, drawn } = this.state;

        while (left.length > 0) {
            let next = left.shift() || "";
            drawn.unshift(next);
        }

        this.setState({ left: left, drawn: drawn });
    }

    isWinner(index: number) {
        let { left } = this.state;
        let { winners } = this.props;

        return left.length + index < winners;
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
                                key={`${index}-${drawn.length}`}
                                className={`card${index === 0 ? " animated flipInX" : ""}`}
                            >
                                <div className={`card-body${this.isWinner(index) ? " is-winner" : ""}`}>
                                    {this.isWinner(index) ? <FontAwesomeIcon icon={faBeer} className="mr-2" /> : null}{" "}
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
