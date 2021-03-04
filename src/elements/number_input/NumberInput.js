import React from "react";
import styles from "./NumberInput.module.css";

const NumberInput = (props) => {
    const inputClasses = [styles.NumberInput];
    props.wrong && inputClasses.push(styles.Wrong);

    return (
        <div className={inputClasses.join(" ")}>
            <label htmlFor={props.id}>{props.name}</label>
            <input
                type="number"
                min={props.min}
                max={props.max}
                id={props.id}
                name={props.id}
                value={props.value}
                onChange={props.onChange}
            />
            <p>
                {props.name} têm de estar entre os {props.min} e os {props.max}
            </p>
        </div>
    );
};

export default NumberInput;
