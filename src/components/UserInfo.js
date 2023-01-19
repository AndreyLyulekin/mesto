export class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userInfo: this._userInfo.textContent,
    };
  }

  setUserInfo({ newName, newInfo }) {
    this._userName.textContent = newName;
    this._userInfo.textContent = newInfo;
  }
}
