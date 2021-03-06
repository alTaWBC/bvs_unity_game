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

    componentWillUnmount() {
        this.stop();
    }

    prepareMicrophone = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.addEventListener("dataavailable", this.onStart);
        this.mediaRecorder.addEventListener("stop", this.onStop);
    };

    onStart = ({ data }) => {
        this.props.progressGame();
    };

    onStop = ({ data }) => {
        this.props.progressGame();
    };

    onClick = () => {
        if (this.state.recording) this.stop();
        else this.start();
    };

    start = () => {
        this.mediaRecorder.start(TIME_INTERVAL);
        this.setState({ recording: true });
    };

    stop = () => {
        const microphoneIsNotRecording = this.mediaRecorder.state !== "recording";
        if (microphoneIsNotRecording) return;

        this.mediaRecorder.stop();
        this.setState({ recording: false });
        console.log("Stopped");
    };

    render() {
        const cantRecord = !this.props.canRecord;
        if (cantRecord) this.stop();

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
