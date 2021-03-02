import React from "react";
import styles from "./navbar.module.css";

const navbar = (props) => (
    <div className={styles.Navbar}>
        <div className={styles.title}>BioVisualSpeech</div>
        <div className={styles.pages}>
            <a href="#">Login</a>
        </div>
    </div>
);

export default navbar;
