import React, { useEffect, useState } from "react";
import "./AudioPlayer.css";
import logo from "../images/music_cd_1.jpg";
import playBtn from "../images/play.png";
import nextBtn from "../images/next_1.png";
import prevBtn from "../images/prev_1.png";
import volumeBtn from "../images/volume.png";
import { useDispatch, useSelector } from "react-redux";
import {
  resetActiveAudio,
  selectActiveAudio,
  selectUsersAudio,
  setNextAudio,
  setPreviousAudio,
} from "./AudioSlice";
import { SessionStorage } from "../utils/SessionStorage";

// создаем компонент AudioPlayer который будет отоброжать активное аудио и подтигивать выбраное аудио из списка треков usersAudio

const AudioPlayer = () => {
  const activeAudio = useSelector(selectActiveAudio);
  const userAudioName = useSelector(
    (state) =>
      selectUsersAudio(state, SessionStorage.getActiveUser())?.find(
        (audio) => audio.url === activeAudio
      )?.name
  );

  //Делаем dispatch для отправки данных в redux всех функций из Audio

  const dispatch = useDispatch();
  const [duration, setDuration] = useState("00:00");
  const [sliderValue, setSliderValue] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [volume, setVolume] = useState(100);
  let audioRef;
  let sliderRef;

  // создаем переменные - функционалы для управления плеером

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const onTimeUpdate = () => {
    setSliderValue(Math.floor(audioRef.currentTime));
    setCurrentTime(calculateTime(sliderRef.value));
  };

  const onLoadMetadata = () => {
    setDuration(calculateTime(audioRef.duration));
    setSliderMax();
  };

  const onVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    audioRef.volume = value / 100;
  };

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

  const setSliderMax = () => {
    sliderRef.max = Math.floor(audioRef.duration);
  };

  const onSliderInput = () => {
    setCurrentTime(calculateTime(sliderRef.value));
  };

  const onSliderChange = () => {
    audioRef.currentTime = sliderRef.value;
  };

  useEffect(() => {
    if (activeAudio) {
      audioRef.src = activeAudio;
      audioRef.load();
      audioRef.play();
    }
  }, [activeAudio]);
  useEffect(() => {
    return () => {
      dispatch(resetActiveAudio());
    };
  }, []);

  //   возвращаем верстку компонента AudioPlayer и навешиваем на него функции для управления плеером

  return (
    <div className="audio_player">
      <div className="track_full_info">
        <div className="image_music_track">
          <img src={logo} alt="track image" id="track_cd_img" />
        </div>
        <div className="track_info">
          <h1 className="track_title">
            {userAudioName ?? "Download and listen to your music tracks!"}
          </h1>
        </div>
      </div>
      <div className="audio_player_controls">
        <audio
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadMetadata}
          ref={(input) => {
            audioRef = input;
          }}
          id="audio"
          style={{ display: "hidden" }}
        ></audio>
        {/* Длительность трека */}
        <div className="audio_player_controls_time">
          <h3>
            {duration.toString()} / {currentTime}
          </h3>
          <div
            className="audio_progress_container"
          >
            {/* Слайдер-ползунок песни */}
            <input
              ref={(input) => {
                sliderRef = input;
              }}
              onInput={onSliderInput}
              onChange={onSliderChange}
              className="audio_progress_slider"
              type="range"
              id="seek-slider"
              max="100"
              value={sliderValue}
            />
          </div>
        </div>
        <div className="audio_player_controls_buttons">
          {/* кнопка преведущего трека */}
          <button className="audio_player_controls_button_prev">
            <img
              src={prevBtn}
              alt="prevBtn"
              className="prevBtn"
              onClick={() => dispatch(setPreviousAudio())}
            />
          </button>
          {/* кнопка воспроизведения и паузы трека */}
          <button
            className="audio_player_controls_button_play"
            onClick={playClick}
          >
            <img src={playBtn} alt="play_stopBtn" className="play_stop_btn" />
          </button>
          {/* кнопка следующего трека */}
          <button
            className="audio_player_controls_button_next"
            onClick={() => dispatch(setNextAudio())}
          >
            <img src={nextBtn} alt="nextBtn" className="nextBtn" />
          </button>
          <button className="audio_player_control_button_volume">
            <img src={volumeBtn} alt="volumeBtn" className="volumeBtn"/>
          </button>
          <div className="volume_block">
            {/* Цыфра звука */}
            <output style={{ display: "block" }} id="volume-output">
              {" "}
              {volume}
            </output>
            {/* Ползунок звука */}
            <input
              onInput={onVolumeChange}
              type="range"
              id="volume-slider"
              max="100"
              value={volume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
