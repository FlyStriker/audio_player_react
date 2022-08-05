import React, { useEffect } from "react";
import "./PlayList.css";
import { addAudio, selectUsersAudio, setActiveAudio } from "./AudioSlice";
import { useSelector, useDispatch } from "react-redux";
import { SessionStorage } from "../utils/SessionStorage";

let UserMusicList = () => {
  const userAudios = useSelector((state) =>
    selectUsersAudio(state, SessionStorage.getActiveUser())
  );
  const dispatch = useDispatch();
  const onAudioClick = (audioUrl) => {
    dispatch(setActiveAudio(audioUrl));
  };
  return (
    <div className="convas_music_list">
      <div className="add_new_track">
       
        <div className="add-track"> <input
          type="file"
          accept="audio/*"
          onChange={(event) => {
            const file = event.target.files[0];
            const audioUrl = URL.createObjectURL(file);
            dispatch(addAudio({ name: file.name, url: audioUrl }));
          }}
        /></div>
      </div>
      <div className="user_music_list">
        <div className="user_music_list_item">
         
          {userAudios?.map((audioInfo, index) => (
            <p onClick={() => onAudioClick(audioInfo.url)} key={index}>
              {audioInfo.name}
            </p>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default UserMusicList;
