import React from "react";
import "./LoginForm.css";
import Header from "./Header";
import AudioPlayer from "./AudioPlayer";
import PlayList from "./PlayList";

// ОТображаем компонент HomePage в контейнере App

const HomePage = () => {
  return (
    <>
      <Header></Header>
      <AudioPlayer></AudioPlayer>
      <PlayList></PlayList>
    </>
  );
};
export default HomePage;
