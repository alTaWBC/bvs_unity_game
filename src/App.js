import styles from "./App.module.css";
import Navbar from "./layout/navbar/navbar";
import Footer from "./layout/footer/footer";

function App() {
    return (
        <div className={styles.App}>
            <Navbar />
            <Footer />
        </div>
    );
}

export default App;
