import React, { Component } from "react";
import styles from "./Game.module.css";
import Unity, { UnityContent } from "react-unity-webgl";
import GameLabel from "../../elements/label/GameLabel";
import AudioRecorder from "../../elements/recorder/AudioRecorder";

const unityContent = new UnityContent("Build/webgl1/game.json", "Build/webgl1/UnityLoader.js");

// TODO: Game Start and Game Over called several times
const todo = null;

class Game extends Component {
    state = {
        label: "",
        gameId: 0,
    };

    componentDidMount() {
        this.prepareUnityCommunication();
    }

    increaseId = () => {
        this.setState({ gameId: this.state.gameId + 1 });
    };

    prepareUnityCommunication = () => {
        unityContent.on("GameOver", () => {
            this.changeLabel();
        });
        unityContent.on("GameStart", (message) => {
            // Message can be 'Game_{Label}' or 'Menu'
            // In the former Label will be {Label}
            // In the latter Label will be {undefined}
            // this.changeLabel({label}) uses label === '' in undefined scenarios
            this.changeLabel(message.split("_")[1]);

            const newGame = message !== "Menu";
            if (newGame) this.increaseId();
        });
    };

    changeLabel = (label = "") => {
        this.setState({ label });
    };

    progressGame = (response) => {
        const productionWasCorrect = this.classifyProduction(response);
        if (productionWasCorrect) unityContent.send("Character", "moveCharacter", "True");
    };

    classifyProduction = (message) => {
        const { gameId = -1, response = "false" } = JSON.parse(message);
        if (parseInt(gameId) !== this.state.gameId) return false;
        return response.toLowerCase() === "true";
    };

    getSize = (isMobile = false) => {
        const aspectRatio = 1920 / 1080;
        let height = window.innerHeight;
        if (!isMobile) height -= 110;
        let width = height * aspectRatio;
        if (width > window.innerWidth) {
            width = window.innerWidth;
            height = width / aspectRatio;
        }
        return { height: `${height}px`, width: `${width}px` };
        // return { height: `${window.innerWidth-20}px`, width: `${window.innerHeight-20}px` };
    };

    render() {
        const isMobile = /Mobi|Android/i.test(navigator.userAgent);

        const sizes = this.getSize(isMobile);
        window.addEventListener("resize", () => {
            const sizes = this.getSize(isMobile);
            const game = document.querySelector("#Game");
            if (!game) return;
            game.style.height = sizes.height;
            game.style.width = sizes.width;
        });
        return (
            <div style={sizes} className={styles.Unity} id="Game">
                <Unity unityContent={unityContent} />
                <GameLabel />
                {this.state.label ? <AudioRecorder progressGame={this.progressGame} /> : null}
            </div>
        );
    }
}

export default Game;
