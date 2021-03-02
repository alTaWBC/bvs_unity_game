import React, { Component } from "react";
import styles from "./Login.module.css";

class Login extends Component {
    state = {};

    render() {
        return (
            <div className={styles.Login}>
                <div className={styles.Content}>
                    <h2>Login</h2>
                    <div className={styles.Form}>
                        <form action="#">
                            <div className={styles.input}>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" />
                            </div>
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
