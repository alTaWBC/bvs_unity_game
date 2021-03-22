import React, { Component } from "react";
import styles from "./Session.module.css";

class Session extends Component {
    state = {
        codes: ["123456", "234567", "345678", "456789"],
        code: "123456",
        sessions: [
            {
                label: "S",
            },
        ],
    };

    onSelectOption = ({ target: { selectedIndex } }) => {
        this.setState({ code: this.state.codes[selectedIndex] });
    };

    getOptions = () => {
        return this.state.codes.map((session, index) => (
            <option value={session} id={index} onC>
                {session}
            </option>
        ));
    };

    render() {
        const options = this.getOptions();

        return (
            <div className={styles.Session}>
                <div className={styles.Box}>
                    <h2>Escolher sessão</h2>
                    <label htmlFor="session">Escolha Sessão</label>
                    <select name="session" id="session" onChange={this.onSelectOption}>
                        {options}
                    </select>
                </div>
                <div className={styles.Box}>Sessões do {this.state.code}</div>
            </div>
        );
    }
}

export default Session;
