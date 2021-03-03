import React, { Component } from "react";
import styles from "./Form.module.css";

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
                <div className={styles.line}>
                    <div className={styles.input}>
                        <label htmlFor="idCrianca">Id da Criança</label>
                        <input type="text" name="idCrianca" id="idCrianca" />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="idCrianca">Idade da Criança</label>
                        <input type="text" name="idCrianca" id="idCrianca" />
                    </div>
                </div>
                <div className={styles.line}>
                    <div className={styles.input}>
                        <label htmlFor="idCrianca">Português é Língua Mãe?</label>
                        <input
                            type="checkbox"
                            name=""
                            id=""
                            onClick={this.onClickEstrangeiro}
                            checked={!this.state.estrangeiro}
                        />
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="idCrianca">Desvios Na Fala</label>
                        <input type="checkbox" name="" id="" onClick={this.onClickDesvios} checked={!this.state.des} />
                    </div>
                    <div className={[styles.input, styles.radio].join(" ")}>
                        <label htmlFor="idCrianca">Género</label>
                        <div className={styles.option}>
                            <label htmlFor="idCrianca">Masculino</label>
                            <input type="radio" name="gender" value="male" id="male" />
                        </div>
                        <div className={styles.option}>
                            <label htmlFor="idCrianca">Feminino</label>
                            <input type="radio" name="gender" value="female" id="female" />
                        </div>
                    </div>
                </div>
                {this.state.desvios ? (
                    <div className={styles.input}>
                        <label htmlFor="idCrianca">Desvios Na Fala</label>
                        <input type="text" name="idCrianca" id="idCrianca" />
                    </div>
                ) : null}
                {this.state.estrangeiro ? (
                    <div className={styles.input}>
                        <label htmlFor="idCrianca">Nacionalidade</label>
                        <input type="text" name="idCrianca" id="idCrianca" />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Form;
