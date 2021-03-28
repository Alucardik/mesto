export default class UserInfo {
  constructor({ usrNameSel, usrStatusSel, usrAvatarSel }) {
    this._usrName = document.querySelector(usrNameSel);
    this._usrStatus = document.querySelector(usrStatusSel);
    this._usrAvatar = document.querySelector(usrAvatarSel);
  }

  getUserInfo() {
    return {usrName: this._usrName.textContent,
            usrStatus: this._usrStatus.textContent,
            usrAvatar: this._usrAvatar};
  }

  setUserInfo({ usrName, usrStatus, usrAvatar}) {
    this._usrName.textContent = usrName;
    this._usrStatus.textContent = usrStatus;
    this._usrAvatar.src = usrAvatar;
  }
}
