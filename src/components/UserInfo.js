export class UserInfo {
  constructor(selectors) {
    const { userNameSelector, userInfoSelector, avatarSelector } = selectors;

    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userInfoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
    this._avatarElement.src = avatar;
  }

  setAvatar(avatarLink) {
    this._avatarElement.src = avatarLink;
  }
}
