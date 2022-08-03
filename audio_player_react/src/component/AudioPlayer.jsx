import React from "react";
import "./AudioPlayer.css";


const AudioPlayer = () => {
    return (
           <div className="audio_player">
               <div className="track_info">
                 <div className="image_music_track">
                   <img src="" alt="track image" />
                 </div>
                 <div>
                   <h1 className="track_title">Track name</h1>
                   <h3 className="track_author">Track author</h3>
                    <div className=""></div>
                 </div>
                </div>
                <div className="audio_player_controls">
                    <div className="audio_player_controls_buttons">
                        <button className="audio_player_controls_button_play"></button>
                        <button className="audio_player_controls_button_next"></button>
                        <button className="audio_player_controls_button_prev"></button>
                    </div>
                </div>
           </div>
    )
}

export default AudioPlayer;
