// обращаемся к инструментарию редакс 
import { createSlice } from "@reduxjs/toolkit";
import { SessionStorage } from "../utils/SessionStorage";

//создаем state в который помещаем ссылку на состояние пользываетелей и их аудио
const initialState = {
  usersAudios: {},
  activeAudio: undefined,
};

// сохраняем в хранилище состояние активного пользывателя + его список аудио и активное аудио
export const audioSlice = createSlice({
  name: "audios",
  initialState,
  reducers: {
    // добавление аудио в список аудио пользователя
    addAudio: (state, action) => {
     const user = SessionStorage.getActiveUser();
     // ищем существующего пользователя в списке пользователей и их аудио
     const existedUserAudios = state.usersAudios?.[user];
    //  если нет существующего пользывателя то мы добовляем пользывателя и его аудио
     if (!existedUserAudios) {
       state.usersAudios = { ...state.usersAudios, [user]: [action.payload] };
       return;
     }
    //  Если есть пользователь , но такое аудио у него уже есть в списке аудио , то мы игнорируем аудио и выходим
     if (
       existedUserAudios.some((audio) => audio.name === action.payload.name)
     ) {
       return;
     }
    //  если аудио нет , то мы добавляем аудио в список аудио пользователя 
     existedUserAudios.push(action.payload);
     state.usersAudios = { ...state.usersAudios, [user]: existedUserAudios };
    },
    // установка активного аудио пользователя
    setActiveAudio: (state, action) => {
      state.activeAudio = action.payload;
    },
    // ищем преведущее аудио пользывателя и переключаем его исходя их индекса аудио в массиве
    setPreviousAudio: (state) => {
      const activeUser = SessionStorage.getActiveUser();
      const usersAudios = state.usersAudios?.[activeUser];

      if (!usersAudios) {
        return;
      }
      if (usersAudios.length === 1) {
        return;
      }
      const activeAudioIndex = usersAudios.findIndex(
        (x) => x.url === state.activeAudio
      );
      if (activeAudioIndex === 0) {
        return;
      }
  
      state.activeAudio = usersAudios[activeAudioIndex - 1].url;
    },
    // ищем следующее аудио пользователя и переключаем его исходя их индекса аудио в массиве
    setNextAudio: (state) => {
      const activeUser = SessionStorage.getActiveUser();
      const usersAudios = state.usersAudios?.[activeUser];

      if (!usersAudios) {
        return;
      }
      if (usersAudios.length === 1) {
        return;
      }
      const activeAudioIndex = usersAudios.findIndex(
        (x) => x.url === state.activeAudio
      );
      if (activeAudioIndex === usersAudios.length - 1) {
        return;
      }
      state.activeAudio = usersAudios[activeAudioIndex + 1].url;
    },

  // при выходе с компонента сбрасываем состояние активного аудио пользователя
    resetActiveAudio: (state) => {
      state.activeAudio = undefined;
    },
  },
});

// делаем action для slice аудио плеера 
export const {addAudio,setActiveAudio,setNextAudio,setPreviousAudio,resetActiveAudio,} = audioSlice.actions;

// делаем селектор песен пользывателя
export const selectUsersAudio = (state, user) => state.audios.usersAudios?.[user];

// делаем переменную для активного трека юзера
export const selectActiveAudio = (state) => state.audios.activeAudio;

// експортируем редюсеры аудио слайса что бы потом добавить его в redux store
export default audioSlice.reducer;
