export default class UserInfo {
    constructor(user) {
        this._name = document.querySelector(user.name);
        this._job = document.querySelector(user.job);
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
}