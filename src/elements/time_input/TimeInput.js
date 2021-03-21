import React from "react";
import styles from "./TimeInput.module.css";

const TimeInput = (props) => {
    const date = props.valueDate;
    const time = props.valueTime;

    return (
        <div className={styles.TimeInput}>
            <label htmlFor={props.id}>{props.name}</label>
            <div>
                <input type="date" name={props.id} id={props.id} onChange={props.onChangeDate} value={date} />
                <input type="time" name={props.id} id={props.id} onChange={props.onChangeTime} value={time} />
            </div>
        </div>
    );
};

export default TimeInput;
