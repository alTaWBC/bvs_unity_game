import React from "react";
import styles from "./TextInput.module.css";

const TextInput = (props) => {
    const inputClasses = [styles.TextInput];
    props.wrong && inputClasses.push(styles.Wrong);

    return (
        <div className={inputClasses.join(" ")}>
            <label htmlFor={props.id}>{props.name}</label>
            <div className={styles.inputDiv} tabIndex={0}>
                {props.prefix ? <span>{props.prefix}</span> : null}
                <input type="text" id={props.id} name={props.id} value={props.value} onChange={props.onChange} />
            </div>
            {props.equal ? (
                <p>
                    {props.name} têm de ter exatamente {props.len} dígitos.
                </p>
            ) : (
                <p>
                    {props.name} têm de ter ter mais de {props.len} dígitos.
                </p>
            )}
        </div>
    );
};

export default TextInput;
