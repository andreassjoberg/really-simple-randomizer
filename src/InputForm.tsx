import React, { Component } from "react";

type Props = {
    names: string[];
    postInput(names: string[]): void;
    raiseError(message: string): void;
};

export default class InputForm extends Component<Props> {
    textArea: HTMLTextAreaElement | null = null;

    buttonClicked() {
        let { postInput, raiseError } = this.props;

        let input = this.textArea ? this.textArea.value : "";

        let names = input
            .split(/\n/)
            .map(s => s.trim())
            .filter(s => s !== undefined && s !== null && s !== "");
        if (names.length > 0) {
            postInput(names);
            return;
        }

        raiseError("Please input some data before submitting.");
    }

    render() {
        let { names } = this.props;

        return names.length <= 0 ? (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <p>
                        Paste (or type) your input data below, one entry per line, and the order of them will be
                        randomized.
                    </p>
                    <textarea rows={6} className="form-control" ref={ref => (this.textArea = ref)} autoFocus />
                    <button type="button" className="btn btn-primary mt-3" onClick={() => this.buttonClicked()}>
                        Randomize!
                    </button>
                </div>
            </div>
        ) : null;
    }
}
