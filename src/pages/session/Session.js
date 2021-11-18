import React, { Component } from "react";
import SessionEvaluation from "../../elements/session_evaluation/SessionEvaluation";
import TextInput from "../../elements/text_input/TextInput";
import styles from "./Session.module.css";

class Session extends Component {
    state = {
        id: "",
        validId: true,
        evaluations: [0, 0, 0, 0, 0, 0, 0, 0],
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

    checkValidity = () => {
        const validId = this.state.id && this.state.id.length === 6;
        this.setState({ validId });
        return validId;
    };

    sendDataToServer = () => {
        const formIsInvalid = !this.checkValidity();
        if (formIsInvalid) return;

        fetch("https://JogosBioVisualSpeech.eu.pythonanywhere.com/evaluateSession/", {
            headers: {
                id: this.state.id,
                s1: this.state.evaluations[0],
                s2: this.state.evaluations[1],
                z1: this.state.evaluations[2],
                z2: this.state.evaluations[3],
                ch1: this.state.evaluations[4],
                ch2: this.state.evaluations[5],
                j1: this.state.evaluations[6],
                j2: this.state.evaluations[7],
            },
            method: "Post",
        });

        this.reset();
    };

    reset = () => {
        this.setState({
            id: "",
            validId: true,
            evaluations: [0, 0, 0, 0, 0, 0, 0, 0],
        });
    };

    onChangeId = ({ target: { value: id } }) => {
        id.length > 6 || this.setState({ id });
    };

    onChangeEvaluation = ({ target: { value: evaluation } }, index) => {
        const evaluations = this.state.evaluations;
        evaluations[index] = evaluation;
        this.setState({ evaluations });
    };

    render() {
        return (
            <div className={styles.Sessions}>
                <div className={styles.Box}>
                    <h2>Avaliar Sessão</h2>
                    <TextInput
                        name="Identificador"
                        prefix="BVS-"
                        wrong={!this.state.validId}
                        id="IdCrianca"
                        len={6}
                        value={this.state.id}
                        onChange={this.onChangeId}
                        equal={true}
                    />
                    <div className={styles.headers}>
                        <span>Som </span>
                        <span>Avaliação</span>
                    </div>
                    <SessionEvaluation
                        label={"s"}
                        value={this.state.evaluations}
                        first={0}
                        second={1}
                        onChange={this.onChangeEvaluation}
                    />
                    <SessionEvaluation
                        label={"z"}
                        value={this.state.evaluations}
                        first={2}
                        second={3}
                        onChange={this.onChangeEvaluation}
                    />
                    <SessionEvaluation
                        label={"ch"}
                        value={this.state.evaluations}
                        first={4}
                        second={5}
                        onChange={this.onChangeEvaluation}
                    />
                    <SessionEvaluation
                        label={"j"}
                        value={this.state.evaluations}
                        first={6}
                        second={7}
                        onChange={this.onChangeEvaluation}
                    />
                    <button onClick={this.sendDataToServer}>Submeter</button>
                </div>
            </div>
        );
    }
}

export default Session;
