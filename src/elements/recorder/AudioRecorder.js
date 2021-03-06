import React, { Component } from "react";
import styles from "./AudioRecorder.module.css";

class AudioRecorder extends Component {
    state = {
        recording: false,
    };

    onClick = () => {
        this.setState({ recording: !this.state.recording });
    };

    render() {
        const buttonClasses = [styles.AudioRecorder];
        if (this.state.recording) buttonClasses.push(styles.Recording);

        return (
            <button className={buttonClasses.join(" ")} onClick={this.onClick}>
                <i className="material-icons">{this.state.recording ? "mic_off" : "mic"}</i>
            </button>
        );
    }
}

export default AudioRecorder;
