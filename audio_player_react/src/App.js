import React from "react";
import Header from "./component/Header";
// import LoginForm from "./component/LoginForm.jsx";
// import RegisterForm from "./component/RegisterForm.jsx";
import AudioPlayer from "./component/AudioPlayer";


function App() {
  return (
    <div className="App">
      <Header/>
      {/* <LoginForm/>
      <RegisterForm/> */}
      <AudioPlayer/>
    </div>
  );
}

export default App;
