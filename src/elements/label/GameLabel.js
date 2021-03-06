import React, { Component } from "react";
import styles from "./GameLabel.module.css";
import { v4 as uuid } from "uuid";

class GameLabel extends Component {
    constructor() {
        super();
        const id = this.getId();
        this.state = { id, timeout: null };
    }

    generateId = () => {
        const startIndex = Math.round(Math.random() * 10);
        return uuid().substring(startIndex, startIndex + 6);
    };

    getId = () => {
        let id = localStorage.getItem("id");
        console.log(id);
        if (id === null) {
            id = this.generateId();
            localStorage.setItem("id", id);
        }
        return id;
    };

    changeId = () => {
        const id = prompt("Qual o novo id?");

        if (!id || id.length !== 6) {
            alert("Id Inválido! Tente novamente.");
            return;
        }

        localStorage.setItem("id", id);
        this.setState({ id });
    };

    onDoubleClick = () => {
        const id = this.generateId();
        localStorage.setItem("id", id);
        this.setState({ id });
    };

    mouseDown = () => {
        const timeout = setTimeout((_) => this.changeId(), 1000);
        this.setState({
            timeout: timeout,
        });
    };

    mouseUp = () => {
        clearTimeout(this.state.timeout);
    };

    render() {
        return (
            <div
                className={styles.GameLabel}
                onDoubleClick={this.onDoubleClick}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
                unselectable={true}
            >
                {this.state.id}
            </div>
        );
    }
}

export default GameLabel;
