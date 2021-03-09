import React, { Component } from "react";
import styles from "./AudioRecorder.module.css";

const TIME_INTERVAL = 3000;
let count = 0;

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

    onStart = async ({ data, timecode = Date.now() }) => {
        this.processSoundData(data, timecode);
    };

    onStop = ({ data, timecode = Date.now() }) => {
        const dataIsEmpty = !data || !data.length;
        if (dataIsEmpty) return;
        this.processSoundData(data, timecode);
    };

    processSoundData = async (data, timecode) => {
        const response = await this.props.sendDataToServer(data, timecode, count++);
        const text = await response.text();
        this.props.progressGame(text);
    };

    onClick = () => {
        if (this.state.recording) this.stop();
        else this.start();
    };

    start = () => {
        const MicrophonePermissionsWereNotGiven = this.mediaRecorder === undefined;
        if (MicrophonePermissionsWereNotGiven) return;

        const MicrophoneIsRecording = this.state.recording;
        if (MicrophoneIsRecording) return;

        count = 0;
        this.mediaRecorder.start(TIME_INTERVAL);
        this.setState({ recording: true });
    };

    stop = () => {
        const MicrophonePermissionsWereNotGiven = this.mediaRecorder === undefined;
        if (MicrophonePermissionsWereNotGiven) return;

        const microphoneIsNotRecording = !this.state.recording;
        if (microphoneIsNotRecording) return;

        this.mediaRecorder.stop();
        this.setState({ recording: false });
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
