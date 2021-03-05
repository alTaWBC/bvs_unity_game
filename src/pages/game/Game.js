import React, { Component } from "react";
import styles from "./Game.module.css";
import Unity, { UnityContent } from "react-unity-webgl";

const unityContent = new UnityContent("Build/webgl1/game.json", "Build/webgl1/UnityLoader.js");
let interval = null;

// TODO: Game Start and Game Over called several times

class Game extends Component {
    componentDidMount() {
        this.prepareUnityCommunication();
    }

    prepareUnityCommunication = () => {
        unityContent.on("GameOver", () => {
            console.log("GameOver");
            clearInterval(interval);
        });
        unityContent.on("GameStart", (message) => {
            console.log("GameStart");
            interval = setInterval(() => {
                unityContent.send("Character", "moveCharacter", "True");
            }, 1000);
        });
    };

    getSize = () => {
        const aspectRatio = 1920 / 1080;
        let height = window.innerHeight - 110;
        let width = height * aspectRatio;
        if (width > window.innerWidth) {
            width = window.innerWidth;
            height = width / aspectRatio;
        }
        console.log(window.innerWidth);
        return { height: `${height}px`, width: `${width}px` };
    };

    render() {
        const sizes = this.getSize();
        window.addEventListener("resize", () => {
            const sizes = this.getSize();
            const game = document.querySelector("#Game").style;
            game.height = sizes.height;
            game.width = sizes.width;
        });
        return (
            <div style={sizes} className={styles.Unity} id="Game">
                <Unity unityContent={unityContent} />
            </div>
        );
    }
}

export default Game;
