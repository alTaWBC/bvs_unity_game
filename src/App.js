import styles from "./App.module.css";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import Login from "./pages/login/Login";
import Form from "./pages/form/Form";
import { Component } from "react";

const PASSWORD_HASH = "biovisualspeech";

class App extends Component {
    state = {
        page: "Login",
    };

    getPage = (page) => {
        switch (page) {
            case "Login":
                return <Login login={this.login} />;
            case "Form":
                return <Form />;
            case "Game":
            default:
                return <div></div>;
        }
    };

    hashPassword = (password) => {
        return password;
    };

    login = (password) => {
        const passwordHash = this.hashPassword(password);
        if (passwordHash !== PASSWORD_HASH) return;
        this.setState({ page: "Form" });
    };

    changePage = (page) => {
        this.setState({ page });
    };

    render() {
        const page = this.getPage(this.state.page);
        return (
            <div className={styles.App}>
                <Navbar />
                {page}
                <Footer />
            </div>
        );
    }
}

export default App;
