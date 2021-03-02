import styles from "./App.module.css";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
import Login from "./pages/login/Login";

function App() {
    return (
        <div className={styles.App}>
            <Navbar />
            <Login />
            <Footer />
        </div>
    );
}

export default App;
