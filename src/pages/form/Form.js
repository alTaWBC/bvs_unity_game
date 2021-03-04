import React, { Component } from "react";
import styles from "./Form.module.css";
import TextInput from "../../elements/text_input/TextInput";
import NumberInput from "../../elements/number_input/NumberInput";
import Checkbox from "../../elements/checkbox/Checkbox";
import Radio from "../../elements/radio/Radio";

const minimumAge = 4;
const maximumAge = 11;
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
        id: "",
        idade: "",
        estrangeiro: true,
        desvios: true,
        genero: "",
        nacionalidade: "",
        descricaoDesvios: "",
    };

    onChangeId = ({ target: { value: id } }) => {
        id.length > 6 || this.setState({ id });
    };

    onChangeIdade = ({ target: { value } }) => {
        const idade = parseInt(value);
        const firstDigit = value.length === 1;
        const belowMinimumAge = idade < minimumAge && firstDigit && idade !== 1;
        belowMinimumAge || idade > maximumAge || this.setState({ idade: idade || "" });
    };

    onChangeGenero = ({ target: { value: genero } }) => {
        console.log(genero);
        this.setState({ genero });
    };

    onChangeNacionalidade = ({ target: { value: nacionalidade } }) => {
        this.setState({ nacionalidade });
    };

    onChangeDesvios = ({ target: { value: descricaoDesvios } }) => {
        this.setState({ descricaoDesvios });
    };

    onClickDesvios = () => {
        this.setState({ desvios: !this.state.desvios });
    };

    onClickEstrangeiro = () => {
        this.setState({ estrangeiro: !this.state.estrangeiro });
    };

    onSubmit = () => {
        const id = this.state.id.length === 6 ? this.state.id : false;
        const idade = minimumAge <= this.state.idade <= maximumAge ? this.state.idade : false;
        const generos = radioOptions.map(({ value }) => value);
        const genero = generos.includes(this.state.genero) ? this.state.genero : false;
        const nacionalidade = this.state.estrangeiro ? this.state.nacionalidade : "portuguesa";
        const descricaoDesvios = this.state.desvios ? this.state.descricaoDesvios : "";

        const formIsInvalid = !(id && idade && genero);
        console.log(formIsInvalid);
        if (formIsInvalid) return;

        fetch("https://biovisualspeech.eu.pythonanywhere.com/newProfile/", {
            headers: {
                idTerapeuta: "template",
                idCrianca: id,
                idadeCrianca: idade.toString(),
                portuguesLinguaMae: nacionalidade,
                genero: genero,
                desvios: descricaoDesvios,
            },
            method: "Post",
        }).then(console.log);
    };

    render() {
        return (
            <div className={styles.Form}>
                <div className={styles.Box}>
                    <h1>Identificação do Voluntário</h1>
                    <TextInput name="Identificador" id="IdCrianca" value={this.state.id} onChange={this.onChangeId} />
                    <NumberInput
                        name="Idade"
                        id="IdadeCrianca"
                        value={this.state.idade}
                        onChange={this.onChangeIdade}
                        min={minimumAge}
                        max={maximumAge}
                    />
                    <Checkbox
                        name="Português é Língua Mãe?"
                        id="estrangeiro"
                        checked={!this.state.estrangeiro}
                        onClick={this.onClickEstrangeiro}
                    />
                    <Checkbox
                        name="Desvios na fala?"
                        id="desvios"
                        checked={this.state.desvios}
                        onClick={this.onClickDesvios}
                    />
                    <Radio onChange={this.onChangeGenero} options={radioOptions} name="Gender" text="Género" />
                    {this.state.estrangeiro ? (
                        <TextInput
                            name="Nacionalidade"
                            id="Nacionalidade"
                            value={this.state.nacionalidade}
                            onChange={this.onChangeNacionalidade}
                        />
                    ) : null}
                    {this.state.desvios ? (
                        <TextInput
                            name="Desvios Na Fala"
                            id="Desvios"
                            value={this.state.descricaoDesvios}
                            onChange={this.onChangeDesvios}
                        />
                    ) : null}
                    <button onClick={this.onSubmit}>Enviar</button>
                </div>
            </div>
        );
    }
}

export default Form;
