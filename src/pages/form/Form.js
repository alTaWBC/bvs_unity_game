import React, { Component } from "react";
import styles from "./Form.module.css";
import TextInput from "../../elements/text_input/TextInput";
import NumberInput from "../../elements/number_input/NumberInput";
import TimeInput from "../../elements/time_input/TimeInput";
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
        estrangeiro: false,
        desvios: false,
        genero: "female",
        nacionalidade: "",
        descricaoDesvios: "",

        validId: true,
        validIdade: true,
        validGender: true,
        validNacionalidade: true,
        validDesvios: true,
    };

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPress);
    }

    onChangeId = ({ target: { value: id } }) => {
        id.length > 6 || this.setState({ id });
    };

    clear = () => {
        this.setState({
            id: "",
            idade: "",
            estrangeiro: false,
            desvios: false,
            genero: "",
            nacionalidade: "",
            descricaoDesvios: "",

            validId: true,
            validIdade: true,
            validGender: true,
            validNacionalidade: true,
            validDesvios: true,
        });
    };

    onChangeIdade = ({ target: { value } }) => {
        const idade = parseInt(value);
        const firstDigit = value.length === 1;
        const belowMinimumAge = idade < minimumAge && firstDigit && idade !== 1;
        belowMinimumAge || idade > maximumAge || this.setState({ idade: idade || "" });
    };

    onChangeGenero = ({ target: { value: genero } }) => {
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

    checkFieldValidity = () => {
        const validId = this.state.id && this.state.id.length === 6;
        const validIdade = this.state.idade && minimumAge <= this.state.idade <= maximumAge;
        const generos = radioOptions.map(({ value }) => value);
        const validGender = generos.includes(this.state.genero);
        const validNacionalidade =
            !this.state.estrangeiro || (this.state.nacionalidade && this.state.nacionalidade.length > 2);
        const validDesvios =
            !this.state.desvios || (this.state.descricaoDesvios && this.state.descricaoDesvios.length > 2);

        this.setState({ validId, validIdade, validGender, validNacionalidade, validDesvios });

        return [validId, validIdade, validGender, validNacionalidade, validDesvios].every((field) => field);
    };

    onSubmit = () => {
        const formIsInvalid = !this.checkFieldValidity();
        if (formIsInvalid) return;

        const id = this.state.id;
        const idade = this.state.idade;
        const genero = this.state.genero;
        const nacionalidade = this.state.estrangeiro ? this.state.nacionalidade : "portuguesa";
        const descricaoDesvios = this.state.desvios ? this.state.descricaoDesvios : "";

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
        }).then((response) => {
            this.clear();
        });
    };

    onChangeTime = (event) => {
        console.log(event);
    };

    onKeyPress = ({ code }) => {
        if (code === "Enter") this.onSubmit();
    };

    render() {
        return (
            <div className={styles.Form}>
                <div className={styles.Box}>
                    <h1>Identificação do Voluntário</h1>
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
                    <TimeInput
                        name="Tempo de Início da Sessão"
                        id="TempoSessao"
                        value={this.state.time}
                        onChange={this.onChangeTime}
                    />
                    <NumberInput
                        name="Idade"
                        id="IdadeCrianca"
                        value={this.state.idade}
                        onChange={this.onChangeIdade}
                        min={minimumAge}
                        max={maximumAge}
                        wrong={!this.state.validIdade}
                    />
                    <Checkbox
                        name="Português é Língua Mãe?"
                        id="estrangeiro"
                        checked={!this.state.estrangeiro}
                        onClick={this.onClickEstrangeiro}
                    />
                    {this.state.estrangeiro ? (
                        <TextInput
                            name="Nacionalidade"
                            wrong={!this.state.validNacionalidade}
                            id="Nacionalidade"
                            value={this.state.nacionalidade}
                            onChange={this.onChangeNacionalidade}
                            len={2}
                        />
                    ) : null}
                    <Checkbox
                        name="Desvios na Fala?"
                        id="desvios"
                        checked={this.state.desvios}
                        onClick={this.onClickDesvios}
                    />
                    {this.state.desvios ? (
                        <TextInput
                            name="Desvios Na Fala"
                            wrong={!this.state.validDesvios}
                            id="Desvios"
                            value={this.state.descricaoDesvios}
                            onChange={this.onChangeDesvios}
                            len={2}
                        />
                    ) : null}
                    <Radio onChange={this.onChangeGenero} options={radioOptions} name="Gender" text="Género" />
                    <button onClick={this.onSubmit}>Enviar</button>
                </div>
            </div>
        );
    }
}

export default Form;
