export default class UserInfo {
    constructor(user) {
        this._name = document.querySelector(user.name);
        this._job = document.querySelector(user.job);
        this._avatar = document.querySelector(user.avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent,
        };
    }

    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }

    setAvatar(avatar) {
        this._avatar.src = avatar;
    }
}