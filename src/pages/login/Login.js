import React, { Component } from "react";
import styles from "./Login.module.css";

class Login extends Component {
    state = {
        password: "",
    };

    onChangePassword = ({ target: { value: password } }) => {
        this.setState({ password });
    };

    onKeyPress = ({ code }) => {
        if (code === "Enter") this.props.login(this.state.password);
    };

    render() {
        const formClasses = this.props.wrong ? [styles.Form, styles.Wrong].join(" ") : styles.Form;
        return (
            <div className={styles.Login}>
                <div className={styles.Content}>
                    <h2>Login</h2>
                    <div className={formClasses}>
                        <div className={styles.input}>
                            <label htmlFor="password">Password</label>
                            <input
                                onKeyPress={this.onKeyPress}
                                type="password"
                                id="password"
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <p>Password Errada</p>
                        <button onClick={() => this.props.login(this.state.password)}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
