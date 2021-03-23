import React from "react";
import styles from "./SessionEvaluation.module.css";

const SessionEvaluation = (props) => (
    <div className={styles.SessionEvaluation}>
        <span>{props.label}</span>
        <div className={styles.Playthroughs}>
            <div className={styles.Evaluation}>
                <label htmlFor="level">Primeiro Jogo</label>
                <select
                    name="level"
                    id="level"
                    value={props.value[props.first]}
                    onChange={(event) => props.onChange(event, props.first)}
                >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <div className={styles.Evaluation}>
                <label htmlFor="level">Segundo Jogo</label>
                <select
                    name="level"
                    id="level"
                    value={props.value[props.second]}
                    onChange={(event) => props.onChange(event, props.second)}
                >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
    </div>
);

export default SessionEvaluation;
