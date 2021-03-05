import React from "react";
import styles from "./navbar.module.css";

const navbar = (props) => {
    let pages = props.loggedOut;
    if (props.logged) pages = ["Logout", ...props.loggedIn, ...pages];
    else pages = ["Login", ...pages];
    const active = [styles.navButton, styles.active].join(" ");
    const inactive = styles.navButton;

    const navLinks = pages.map((name) => (
        <button
            key={name}
            onClick={() => props.changePage(name)}
            className={name === props.page ? active : inactive}
            active="true"
        >
            {name}
        </button>
    ));

    return (
        <div className={styles.Navbar}>
            <h3 className={styles.title}>VisualSpeech Sibilants Game</h3>
            <div className={styles.pages}>{navLinks}</div>
        </div>
    );
};

export default navbar;
