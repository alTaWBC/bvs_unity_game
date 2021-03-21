import React from "react";
import styles from "./TimeInput.module.css";

const TimeInput = (props) => {
    const getCurrentDate = () => {
        const currentDate = Date.now();
        const year = Intl.DateTimeFormat("pt", { year: "numeric" }).format(currentDate);
        const month = Intl.DateTimeFormat("pt", { month: "numeric" }).format(currentDate);
        const day = Intl.DateTimeFormat("pt", { day: "numeric" }).format(currentDate);
        const parsedMonth = month.length === 2 ? month : `0${month}`;
        const parsedDay = day.length === 2 ? day : `0${day}`;
        return `${year}-${parsedMonth}-${parsedDay}`;
    };

    const getCurrentTime = () => {
        const currentDate = Date.now();
        const hour = Intl.DateTimeFormat("pt", { hour: "numeric" }).format(currentDate);
        const minute = Intl.DateTimeFormat("pt", { minute: "numeric" }).format(currentDate);
        return `${hour}:${minute}`;
    };

    const date = getCurrentDate();
    const time = getCurrentTime();

    return (
        <div className={styles.TimeInput}>
            <label htmlFor={props.id}>{props.name}</label>
            <div>
                <input type="date" name={props.id} id={props.id} onChange={props.onChange} defaultValue={date} />
                <input type="time" name={props.id} id={props.id} onChange={props.onChange} defaultValue={time} />
            </div>
        </div>
    );
};

export default TimeInput;
