import React, { Component } from "react";
import styles from "./Form.module.css";
import TextInput from "../../elements/text_input/TextInput";
import Checkbox from "../../elements/checkbox/Checkbox";
import Radio from "../../elements/radio/Radio";

const radioOptions = [
    {
        name: "Feminino",
        value: "female",
        id: "female",
    },
    {
        name: "Masculino",
        value: "male",
        id: "male",
    },
];

class Form extends Component {
    state = {
        desvios: false,
        estrangeiro: false,
    };

    onClickDesvios = () => {
        this.setState({ desvios: !this.state.desvios });
    };

    onClickEstrangeiro = () => {
        this.setState({ estrangeiro: !this.state.estrangeiro });
    };

    render() {
        return (
            <div className={styles.Form}>
                <h1>Formulário de Criança</h1>
                <TextInput name="Id da Criança" id="IdCrianca" />
                <TextInput name="Idade da Criança" id="IdadeCrianca" />
                <Checkbox
                    name="Português é Língua Mãe?"
                    id="estrangeiro"
                    checked={this.state.estrangeiro}
                    onClick={this.onClickEstrangeiro}
                />
                <Checkbox
                    name="Desvios na fala?"
                    id="desvios"
                    checked={this.state.desvios}
                    onClick={this.onClickDesvios}
                />
                <Radio options={radioOptions} name="Gender" text="Género" />
                {this.state.estrangeiro ? <TextInput name="Nacionalidade" id="Nacionalidade" /> : null}
                {this.state.desvios ? <TextInput name="Desvios Na Fala" id="Desvios" /> : null}
                <button>Enviar</button>
            </div>
        );
    }
}

export default Form;
