import React from "react";
import "./AudioPlayer.css";
import playBtn from "../images/play_stop_2.png"
import nextBtn from "../images/next.png"
import prevBtn from "../images/prev.png"

const AudioPlayer = () => {
    return (
           <div className="audio_player">
               <div className="track_full_info">
                 <div className="image_music_track">
                   <img src="" alt="track image" />
                 </div>
                 <div className="track_info">
                   <h1 className="track_title">Track name</h1>
                   <h3 className="track_author">Track author</h3>
                 </div>
                </div>
                <div className="audio_player_controls">
                    
                    <div className="audio_player_controls_buttons">
                        <button className="audio_player_controls_button_prev">
                          <img src={prevBtn} alt="prevBtn" className="prevBtn" /></button>
                        <button className="audio_player_controls_button_play">
                          <img src={playBtn} alt="play_stopBtn" className="play_stop_btn"/></button>
                        <button className="audio_player_controls_button_next">
                          <img src={nextBtn} alt="nextBtn"  className="nextBtn"/></button>
                    </div>
                    <div className="audio_player_controls_time">
                      <h3>00:00 / 00:00 </h3>
                      <div className="audio_progress_container">
                        <div className="audio_progress"></div>
                      </div>
                      
                    </div>

                    
                </div>
           </div>
    )
}

export default AudioPlayer;
