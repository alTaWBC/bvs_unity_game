import styles from "./App.module.css";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import Login from "./pages/login/Login";
import Form from "./pages/form/Form";
import Game from "./pages/game/Game";
import { Component } from "react";

const PASSWORD_HASH = "biovisualspeech";
const loggedOutPages = ["Game"];
const loggedInPages = ["Form"];

class App extends Component {
    state = {
        page: "Game",
        wrongPassword: false,
        loggedIn: false,
    };

    getPage = (page) => {
        switch (page) {
            case "Login":
                return <Login login={this.login} wrong={this.state.wrongPassword} />;
            case "Form":
                return <Form />;
            case "Game":
            default:
                // return <Game />;
                // ! Change to game Again
                return <Form />;
        }
    };

    hashPassword = (password) => {
        return password;
    };

    login = (password) => {
        const passwordHash = this.hashPassword(password);
        if (passwordHash !== PASSWORD_HASH) this.setState({ wrongPassword: true });
        else this.setState({ page: "Form", wrongPassword: false, loggedIn: true });
    };

    changePage = (page) => {
        if (page === "Logout") {
            this.logout();
            page = this.state.page;
        }

        const unauthorizedPage = loggedInPages.includes(this.state.page);
        const loggedOut = !this.state.loggedIn;

        if (loggedOut && unauthorizedPage) page = "Login";

        this.setState({ page });
    };

    logout = () => {
        this.setState({ loggedIn: false });
    };

    render() {
        const page = this.getPage(this.state.page);
        const mobile = /Mobi|Android/i.test(navigator.userAgent);

        return (
            <div className={styles.App}>
                {mobile ? null : (
                    <Navbar
                        logged={this.state.loggedIn}
                        page={this.state.page}
                        logout={this.logout}
                        loggedIn={loggedInPages}
                        loggedOut={loggedOutPages}
                        changePage={this.changePage}
                    />
                )}
                {page}
                {mobile ? null : <Footer />}
            </div>
        );
    }
}

export default App;
