import React from "react";
import styles from "./TextInput.module.css";

const TextInput = (props) => {
    const inputClasses = [styles.TextInput];
    props.wrong && inputClasses.push(styles.Wrong);
    const divReference = React.createRef();

    const focus = () => {
        divReference.current.focus();
    };

    return (
        <div className={inputClasses.join(" ")}>
            <label htmlFor={props.id}>{props.name}</label>
            <div className={styles.inputDiv} tabIndex={0} ref={divReference}>
                {props.prefix ? <span>{props.prefix}</span> : null}
                <input
                    type="text"
                    onFocus={focus}
                    id={props.id}
                    name={props.id}
                    value={props.value}
                    onChange={props.onChange}
                />
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
