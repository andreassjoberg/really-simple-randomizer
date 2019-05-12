import React, { Component } from "react";

type Props = {
    error: string | undefined;
    dismiss(): void;
};

export default class ErrorBox extends Component<Props> {
    render() {
        let { error, dismiss } = this.props;

        return error ? (
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="alert alert-warning my-3" role="alert">
                        {error}
                        <button type="button" className="close" onClick={() => dismiss()}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        ) : null;
    }
}
