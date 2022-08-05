import { createSlice } from '@reduxjs/toolkit';
import {SessionStorage} from "../utils/SessionStorage";

const initialState = {
  usersAudios: {},
  activeAudio: undefined
};

export const audioSlice = createSlice({
  name: 'audios',
  initialState,
  reducers: {
    addAudio: (state, action) => {
      const user = SessionStorage.getActiveUser();
      const existedUserAudios = state.usersAudios?.[user];
      if(!existedUserAudios){
        state.usersAudios = {[user]:[action.payload]};
        return;
      }
      if(existedUserAudios.some(audio => audio.name === action.payload.name)){
        return;
      }
      existedUserAudios.push(action.payload);
      state.usersAudios = {...state.usersAudios, [user]: existedUserAudios};

    },
    setActiveAudio: (state, action) => {
      state.activeAudio = action.payload;
    },
    setPreviousAudio: (state) => {
      const activeUser = SessionStorage.getActiveUser();
      const usersAudios = state.usersAudios?.[activeUser];

      if(!usersAudios){
        return;
      }
      if(usersAudios.length === 1){
        return;
      }
      const activeAudioIndex = usersAudios.findIndex(x => x.url === state.activeAudio);
      if(activeAudioIndex === 0){
        return;
      }
      state.activeAudio = usersAudios[activeAudioIndex -1].url;
    },
    setNextAudio: (state) => {
      const activeUser = SessionStorage.getActiveUser();
      const usersAudios = state.usersAudios?.[activeUser];

      if(!usersAudios){
        return;
      }
      if(usersAudios.length === 1){
        return;
      }
      const activeAudioIndex = usersAudios.findIndex(x => x.url === state.activeAudio);
      if(activeAudioIndex === usersAudios.length - 1){
        return;
      }
      state.activeAudio = usersAudios[activeAudioIndex + 1].url;
    },
  }
});

export const { addAudio, setActiveAudio, setNextAudio, setPreviousAudio } = audioSlice.actions;

export const selectUsersAudio = (state, user) => state.audios.usersAudios?.[user];
export const selectActiveAudio = (state) => state.audios.activeAudio;

export default audioSlice.reducer;
