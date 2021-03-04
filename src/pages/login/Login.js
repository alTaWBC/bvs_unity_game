import React, { Component } from "react";
import styles from "./Login.module.css";

class Login extends Component {
    state = {
        password: "",
    };

    onChangePassword = ({ target: { value: password } }) => {
        this.setState({ password });
    };

    render() {
        return (
            <div className={styles.Login}>
                <div className={styles.Content}>
                    <h2>Login</h2>
                    <div className={styles.Form}>
                        <div className={styles.input}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={this.onChangePassword} />
                        </div>
                        <button onClick={() => this.props.login(this.state.password)}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
