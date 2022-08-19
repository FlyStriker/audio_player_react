import React, { useEffect, useState } from "react";
import "./AudioPlayer.css";
import logo from "../images/music_cd_1.jpg";
import playBtn from "../images/play.png";
import nextBtn from "../images/next_1.png";
import prevBtn from "../images/prev_1.png";
import volumeBtn from "../images/volume.png";
import { useDispatch, useSelector } from "react-redux";
// метод redux dispatch - отправляет данные в reducer-store
import {
  resetActiveAudio,
  selectActiveAudio,
  selectUsersAudio,
  setNextAudio,
  setPreviousAudio,
// Это екшены для отправки данных в reducer-store
} from "./AudioSlice";
// метод redux useSelector - получает данные из reducer-store 
import { SessionStorage } from "../utils/SessionStorage";

// создаем компонент AudioPlayer который будет отоброжать активное аудио и подтигивать выбраное аудио из списка треков usersAudio
const AudioPlayer = () => {
// подписались на изменение активного аудио в reducer-store
  const activeAudio = useSelector(selectActiveAudio);
//подписались на изменение имя аудио в reducer-store , с добовлением параметров в state и если у кативного юзера аудио нет или оно не активное, то подтигнем активное аудио из usersAudio
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

  // функция которая принимает секунды и канкулирует в минутах и секундах
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  // делаем функцию адаптивности ползунака под длину аудио
  const onTimeUpdate = () => {
    setSliderValue(Math.floor(audioRef.currentTime));
    setCurrentTime(calculateTime(sliderRef.value));
  };

  // обработчик который срабатывает при инициализации HTML элемента аудио (обработка общего время проигрывания аудио)
  const onLoadMetadata = () => {
    setDuration(calculateTime(audioRef.duration));
    setSliderMax();
  };

  // делаем функцию изменения звука плеера
  const onVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    audioRef.volume = value / 100;
  };

  // делаем плей при клике на кнопку плей и при повторном клике делаем паузу
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

  // задаем максимально значение слайдеру которое = длине аудио
  const setSliderMax = () => {
    sliderRef.max = Math.floor(audioRef.duration);
  };

  // срабатывает при взаимодействии с слайдером длительности трека устанавливая новое время проигрывания (обновление текстового времени <p>)
  const onSliderInput = () => {
    setCurrentTime(calculateTime(sliderRef.value));
  };

  // изменение хода слайдера в зависимости от места аудио (изменение текущего времени проигрывания аудио , при изменении слайдера )
  const onSliderChange = () => {
    audioRef.currentTime = sliderRef.value;
  };

  // подписываемся под изменение активного аудио в reducer-store , идет проверка ссылки аудио и если она не равна активному аудио, то подтягиваем аудио обработчики
  useEffect(() => {
    if (activeAudio) {
      audioRef.src = activeAudio;
      audioRef.load();
      audioRef.play();
    }
  }, [activeAudio]);

  // срабатывает когда мы меняеем юзера или выходим с компонента (сбрасываем активное аудио)
  useEffect(() => {
    return () => {
      dispatch(resetActiveAudio());
    };
  }, []);

  // возвращаем верстку компонента AudioPlayer и навешиваем на него функции для управления плеером
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
