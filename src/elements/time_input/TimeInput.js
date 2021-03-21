import React from "react";
import styles from "./TimeInput.module.css";

const TimeInput = (props) => {
    const getCurrentDate = () => {
        const currentDate = Date.now();
        const year = Intl.DateTimeFormat("pt", { year: "numeric" }).format(currentDate);
        const month = Intl.DateTimeFormat("pt", { month: "numeric" }).format(currentDate);
        const day = Intl.DateTimeFormat("pt", { day: "numeric" }).format(currentDate);
        const hour = Intl.DateTimeFormat("pt", { hour: "numeric" }).format(currentDate);
        const minute = Intl.DateTimeFormat("pt", { minute: "numeric" }).format(currentDate);
        return `${day}/${month}/${year} ${hour}:${minute}`;
    };

    const date = getCurrentDate();

    return (
        <div className={styles.TimeInput}>
            <label htmlFor={props.id}>{props.name}</label>
            <input
                type="datetime-local"
                name={props.id}
                id={props.id}
                onChange={props.onChange}
                value={Date.now()}
            />
        </div>
    );
};

export default TimeInput;
