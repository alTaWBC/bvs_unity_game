import React from "react";
import styles from "./TextInput.module.css";

const TextInput = (props) => {
    return (
        <div className={styles.TextInput}>
            <label htmlFor={props.id}>{props.name}</label>
            <input type="text" id={props.id} name={props.id} value={props.value} onChange={props.onChange} />
        </div>
    );
};

export default TextInput;
