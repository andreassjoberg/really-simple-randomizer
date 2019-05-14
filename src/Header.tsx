import React, { Component } from "react";

export default class Header extends Component {
    render() {
        return (
            <header className="pt-5 pb-1 text-center">
                <h1>Randomizer</h1>
                <p className="lead">By random people, for random people.</p>
            </header>
        );
    }
}
