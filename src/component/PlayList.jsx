import React from "react";
import "./PlayList.css";
import { addAudio, selectUsersAudio, setActiveAudio } from "./AudioSlice";
import { useSelector, useDispatch } from "react-redux";
import { SessionStorage } from "../utils/SessionStorage";

// создаем компонент PlayList для отображения списка аудио пользователя

let UserMusicList = () => {
  const userAudios = useSelector((state) =>
    selectUsersAudio(state, SessionStorage.getActiveUser())
  );

  // сохраняем список аудио пользователя в dispatch

  const dispatch = useDispatch();
  const onAudioClick = (audioUrl) => {
    dispatch(setActiveAudio(audioUrl));
  };

// Отоборожаем компонент PlayList который принимает скачаные аудио файлы пользывателя и отображает их в виде списка

  return (
    <div className="convas_music_list">
      <div className="add_new_track">
        <div className="add-track">
          {" "}
          <input
            id="add-track-input"
            type="file"
            accept="audio/*"
            onChange={(event) => {
              const file = event.target.files[0];
              const audioUrl = URL.createObjectURL(file);
              dispatch(addAudio({ name: file.name, url: audioUrl }));
            }}
          />
          {/* <label className="label_for_input" for="#add-track_input">Choose file</label> */}
        </div>
      </div>
      <div className="user_music_list">
        <div className="user_music_list_item">
          {userAudios?.map((audioInfo, index) => (
            <p className="track_on_list" onClick={() => onAudioClick(audioInfo.url)} key={index}>
              {audioInfo.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserMusicList;
