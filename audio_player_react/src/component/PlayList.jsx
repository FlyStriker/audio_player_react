import React from "react";
import "./PlayList.css";

let UserMusicList = () => {
  return (
    <div className="convas_music_list">
      <div className="add_new_track">
        <button className="add-track">Add new track

        </button>
      </div>
      <div className="user_music_list">
        <div className="user_music_list_item">
          <div className="user_music_list_item_image">
            <img src="" alt="track image" className="user_music_list_trackImg" />
          </div>
          <div className="user_music_list_item_info">
            <h1 className="user_music_list_item_title">Track name</h1>
            <h3 className="user_music_list_item_author">Track author</h3>
          </div>
          <div className="user_music_list_item_time">00:00</div>
        </div>
      </div>
    </div>
  );
};

export default UserMusicList;
