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
            avatar: this._avatar.src,
        };
    }

    setUserInfo({name, about, avatar, _id}) {
        this._name.textContent = name;
        this._job.textContent = about;
        this.id = _id;
        this._avatar.src = avatar;
    }
}