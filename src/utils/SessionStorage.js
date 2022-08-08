// создаем коласс для работы с sessionStorage который будет принимать key user и active user
export class SessionStorage{
    static USER_KEY = "users";
    static ACTIVE_USER_LOGIN = "users.active";

    constructor() {
    }

    static createSession(login, token){
        
        // есть 2 варианта для создания сессии пользователя

        // let users = this.getUsers();
        // if(!users){
        //     users = [{
        //         login,
        //         token
        //     }];
        //     this.setUsers(users);
        //     this.setActiveUser(login);
        //     return;
        // }
        // const existedUser = this.getUser(login);
        // if(!existedUser){
        //     users.push({login, token});
        //     this.setUsers(users);
        // }
        this.setActiveUser(login);
    }

    static getUserName(){
        return this.getActiveUser();
    }

    static sessionExists(){
        return !!this.getUsers();
    }

    static getUser(login){
        const users = this.getUsers();

        return users?.find(user => user.login === login);
    }

    static getUsers(){
        const usersJson = localStorage.getItem(this.USER_KEY);
        if(!usersJson){
            return undefined;
        }

        return JSON.parse(usersJson);
    }

    static setUsers(users){
        localStorage.setItem(this.USER_KEY, JSON.stringify(users))
    }

    static setActiveUser(login){
        localStorage.setItem(this.ACTIVE_USER_LOGIN, login);
    }

    static getActiveUser(){
        return localStorage.getItem(this.ACTIVE_USER_LOGIN);
    }
}
