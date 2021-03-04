import React from "react";
import styles from "./NumberInput.module.css";

const NumberInput = (props) => {
    return (
        <div className={styles.NumberInput}>
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
        </div>
    );
};

export default NumberInput;
