import React from "react";
import styles from "./Radio.module.css";

const Radio = (props) => (
    <div className={styles.Radio}>
        <p>{props.text}</p>
        {props.options.map((object, index) => (
            <div className={styles.option} key={object.value}>
                <label htmlFor={object.name}>{object.name}</label>
                <input
                    onChange={props.onChange}
                    type="radio"
                    name={props.name}
                    id={object.name}
                    value={object.value}
                    defaultChecked={index === 0}
                />
            </div>
        ))}
    </div>
);

export default Radio;
