import React from "react";
import Header from "./component/Header";
// import LoginForm from "./component/LoginForm.jsx";
// import RegisterForm from "./component/RegisterForm.jsx";
import AudioPlayer from "./component/AudioPlayer";
import UserMusicList from "./component/PlayList";


function App() {
  return (
    <div className="App">
      <Header/>
      {/* <LoginForm/>
      <RegisterForm/> */}
      <AudioPlayer/>
      <UserMusicList/>
    </div>
  );
}

export default App;
