import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = (props) => (
    <div className={styles.Checkbox}>
        <label htmlFor={props.id}>{props.name}</label>
        <input type="checkbox" name={props.id} id={props.id} value={props.checked} onClick={props.onClick} />
    </div>
);

export default Checkbox;
