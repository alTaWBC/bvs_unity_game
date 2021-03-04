import React from "react";
import styles from "./navbar.module.css";

const navbar = (props) => (
    <div className={styles.Navbar}>
        <h3 className={styles.title}>VisualSpeech Sibilants Game</h3>
        <div className={styles.pages}>
            <button className={[styles.navButton, styles.active].join(" ")} active="true">
                Login
            </button>
            <button className={styles.navButton}>Game</button>
        </div>
    </div>
);

export default navbar;
