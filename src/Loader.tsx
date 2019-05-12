import React, { Component } from "react";

type Props = {
    isLoading: boolean;
};

export default class Loader extends Component<Props> {
    render() {
        let { isLoading } = this.props;

        return isLoading ? (
            <div className="overlay">
                <div className="loader">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        ) : null;
    }
}
