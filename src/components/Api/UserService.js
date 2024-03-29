import { Api } from './Api';

export class UserService extends Api {
  constructor(apiCredentials) {
    super(apiCredentials);
  }

  getCurrentUser() {
    return this.get('/users/me').then((response) => {
      localStorage.setItem('userId', response?._id);
      return response;
    });
  }

  updateUserInfo(userInfo) {
    return super.patch('/users/me', userInfo);
  }

  changeAvatar(avatarData) {
    return super.patch('/users/me/avatar', avatarData);
  }
}
