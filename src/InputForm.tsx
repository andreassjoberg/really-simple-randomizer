import React from "react";
import { withAlert, AlertManager } from "react-alert";

interface Props {
    alert: AlertManager;
    names: string[];
    postInput(names: string[], winners: number): void;
}

class InputForm extends React.Component<Props> {
    textArea: HTMLTextAreaElement | null = null;
    winners: React.RefObject<HTMLInputElement> | null | undefined;

    constructor(props: Readonly<Props>) {
        super(props);

        this.winners = React.createRef();
    }

    buttonClicked() {
        let input = this.textArea ? this.textArea.value : "";
        let winners = this.winners && this.winners.current ? Number(this.winners.current.value) : 3;

        winners = isNaN(winners) ? 3 : winners;

        let names = input
            .split(/\n/)
            .map(s => s.trim())
            .filter(s => s !== undefined && s !== null && s !== "");
        if (names.length > 0) {
            this.props.postInput(names, winners);
            return;
        }

        this.props.alert.error("Please input some data before submitting.");
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

                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-primary mt-3" onClick={() => this.buttonClicked()}>
                                Randomize!
                            </button>
                        </div>
                        <div className="align-self-center col text-right">
                            Winners{" "}
                            <input
                                type="input"
                                defaultValue="3"
                                className="bg-dark border-0 pr-2 text-right text-white"
                                ref={this.winners}
                            />
                        </div>
                    </div>
                </div>
            </div>
        ) : null;
    }
}

export default (withAlert() as any)(InputForm);
