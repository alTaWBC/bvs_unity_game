import React, { Component } from "react";
import styles from "./AudioRecorder.module.css";

const TIME_INTERVAL = 500;

class AudioRecorder extends Component {
    state = {
        recording: false,
    };

    componentDidMount() {
        this.prepareMicrophone();
    }

    prepareMicrophone = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener("dataavailable", this.onStart);
        mediaRecorder.addEventListener("stop", this.onStop);
    };

    onStart = ({ data }) => {
        console.log(data);
    };

    onStop = ({ data }) => {
        console.log(data);
    };

    onClick = () => {
        if (false) this.mediaRecorder.start(TIME_INTERVAL);
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
