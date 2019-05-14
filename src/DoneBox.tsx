import React, { Component } from "react";

type State = {
    timer: NodeJS.Timeout | undefined;
    show: boolean;
};

export default class DoneBox extends Component<{}, State> {
    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            timer: undefined,
            show: false
        };
    }

    componentWillMount() {
        let timer = setTimeout(() => this.hide(), 2000);

        this.setState({ show: true, timer: timer });
    }

    componentWillUnmount() {
        this.hide();
    }

    hide() {
        let { timer } = this.state;

        if (timer) {
            clearTimeout(timer);
        }

        this.setState({ show: false, timer: undefined });
    }

    render() {
        let { show } = this.state;

        return (
            <aside
                className={`bg-success fixed-top py-2 shadow text-center animated ${show ? "fadeInDown" : "fadeOutUp"}`}
            >
                Randomization complete!
            </aside>
        );
    }
}
