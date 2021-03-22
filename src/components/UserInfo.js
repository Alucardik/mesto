export default class UserInfo {
  constructor({ usrNameSel, usrStatusSel }) {
    this._usrName = document.querySelector(usrNameSel);
    this._usrStatus = document.querySelector(usrStatusSel);
  }

  getUserInfo() {
    return {usrName: this._usrName.textContent,
            usrStatus: this._usrStatus.textContent}
  }

  setUserInfo({ usrName, usrStatus }) {
    this._usrName.textContent = usrName;
    this._usrStatus.textContent = usrStatus;
  }
}
