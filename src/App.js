import styles from "./App.module.css";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";
// import Login from "./pages/login/Login";
import Form from "./pages/form/Form";

function App() {
    return (
        <div className={styles.App}>
            <Navbar />
            {/* <Login /> */}
            <Form />
            <Footer />
        </div>
    );
}

export default App;
