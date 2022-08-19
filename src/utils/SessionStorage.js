// создаем класс для работы с sessionStorage который будет принимать key user и active user
export class SessionStorage{
    static USER_KEY = "users";
    static ACTIVE_USER_LOGIN = "users.active";

    constructor() {
    }
    // добавляем вспомогательные функции для создания активной сессии пользователя
    static createSession(login){
        this.setActiveUser(login);
    }
    
    //создаем вспомогательную функцию для возвращения активного пользователя 
    static getUserName(){
        return this.getActiveUser();
    }

    //создаем вспомогательную функцию для проверки активного пользователя приводя его к булевому значению
    static sessionExists(){
        return !!this.getUsers();
    }

    //создаем вспомогательную функцию которая получает логин юзера и проверяет юзера с таким логином в сессии 
    static getUser(login){
        const users = this.getUsers();
        return users?.find(user => user.login === login);
    }

    //создаем вспомогательную функцию котрая возвращает всех пользователей из сессии в JSON формате , если пользыватель не найден - возвращает undefined
    static getUsers(){
        const usersJson = localStorage.getItem(this.USER_KEY);
        if(!usersJson){
            return undefined;
        }

        return JSON.parse(usersJson);
    }

    // создаем вспомогательную функцию которая добовляет юзера в локал сторедж
    static setUsers(users){
        localStorage.setItem(this.USER_KEY, JSON.stringify(users))
    }

    // создаем вспомогательную функцию которая устанавливает  активного пользователя в локал сторедж
    static setActiveUser(login){
        localStorage.setItem(this.ACTIVE_USER_LOGIN, login);
    }

    // создаем вспомогательную функцию которая возвращает активного пользователя из локал стореджа
    static getActiveUser(){
        return localStorage.getItem(this.ACTIVE_USER_LOGIN);
    }
}
