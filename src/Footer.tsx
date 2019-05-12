import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return (
            <footer className="navbar fixed-bottom bg-dark text-light justify-content-center py-2">
                <div className="row">
                    <a href="https://www.andreassjoberg.com/" target="_blank" rel="noopener noreferrer">
                        Andreas Sjöberg
                    </a>
                    &nbsp;[
                    <a
                        href="https://github.com/andreassjoberg/really-simple-randomizer"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Source code
                    </a>
                    ]
                </div>
            </footer>
        );
    }
}
