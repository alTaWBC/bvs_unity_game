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

    progressGame = () => {
        const productionWasCorrect = this.classifyProduction(true);
        console.log(productionWasCorrect);
        if (productionWasCorrect) unityContent.send("Character", "moveCharacter", "True");
    };

    classifyProduction = (message) => {
        return message;
        // const response = JSON.parse(message);
        // if (parseInt(response["gameId"]) !== this.state.gameId) return;
        // if (response["response"].toLowerCase() === "true") {
        //     console.log("characterMoves");
        //     unityContent.send("Character", "moveCharacter", "True");
        // }
    };

    getSize = () => {
        const aspectRatio = 1920 / 1080;
        let height = window.innerHeight - 110;
        let width = height * aspectRatio;
        if (width > window.innerWidth) {
            width = window.innerWidth;
            height = width / aspectRatio;
        }
        return { height: `${height}px`, width: `${width}px` };
    };


    render() {
        const sizes = this.getSize();
        const canRecord = this.state.label !== "";
        window.addEventListener("resize", () => {
            const sizes = this.getSize();
            const game = document.querySelector("#Game");
            if (!game) return;
            game.style.height = sizes.height;
            game.style.width = sizes.width;
        });
        return (
            <div style={sizes} className={styles.Unity} id="Game">
                <Unity unityContent={unityContent} />
                <GameLabel />
                {this.state.label ? (
                    <AudioRecorder
                        canRecord={canRecord}
                        progressGame={this.progressGame}
                    />
                ) : null}
            </div>
        );
    }
}

export default Game;
