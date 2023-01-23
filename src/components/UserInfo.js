export class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    };
  }

  setUserInfo({ newName, newJob }) {
    this._userName.textContent = newName;
    this._userJob.textContent = newJob;
  }
}
