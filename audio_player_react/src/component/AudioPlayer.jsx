import React, { useEffect, useState } from "react";
import "./AudioPlayer.css";
import logo from "../images/logo.jpg";
import playBtn from "../images/play_stop_2.png";
import nextBtn from "../images/next.png";
import prevBtn from "../images/prev.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveAudio,
  setNextAudio,
  setPreviousAudio,
} from "./AudioSlice";

const AudioPlayer = () => {
  const activeAudio = useSelector(selectActiveAudio);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState("00:00");
  let audioRef;
  const playClick = () => {
    if (!activeAudio) {
      return;
    }
    if (audioRef.paused) {
      audioRef.play();
    } else {
      audioRef.pause();
    }
  };
  useEffect(() => {
    if (activeAudio) {
      audioRef.src = activeAudio;
      audioRef.load();
      audioRef.play();
      audioRef.onloadedmetadata = () => {
        const duration = audioRef.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = (duration - minutes * 60).toFixed(0);

        setDuration(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      };
    }
  }, [activeAudio]);
  return (
    <div className="audio_player">
      <div className="track_full_info">
        <div className="image_music_track">
          <img src={logo} alt="track image" />
        </div>
        <div className="track_info">
          <h1 className="track_title">Track name</h1>
        </div>
      </div>
      <div className="audio_player_controls">
        <audio
          ref={(input) => {
            audioRef = input;
          }}
          id="audio"
          style={{ display: "hidden" }}
        ></audio>

        <div className="audio_player_controls_buttons">
          <button className="audio_player_controls_button_prev">
            <img
              src={prevBtn}
              alt="prevBtn"
              className="prevBtn"
              onClick={() => dispatch(setPreviousAudio())}
            />
          </button>
          <button
            className="audio_player_controls_button_play"
            onClick={playClick}
          >
            <img src={playBtn} alt="play_stopBtn" className="play_stop_btn" />
          </button>
          <button
            className="audio_player_controls_button_next"
            onClick={() => dispatch(setNextAudio())}
          >
            <img src={nextBtn} alt="nextBtn" className="nextBtn" />
          </button>
        </div>
        <div className="audio_player_controls_time">
          <h3>{duration.toString()}</h3>
          <div className="audio_progress_container">
            <div className="audio_progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
