import { makeAutoObservable } from "mobx";

interface BtnConfig {
  btnText: string;
  btnFunction: string;
  position: "left" | "right";
  id: number;
}

class BtnCreator {
  btnsWithUserFunctionLeft: Array<BtnConfig> = [];
  btnsWithUserFunctionRight: Array<BtnConfig> = [];
  constructor() {
    makeAutoObservable(this);
  }

  addBtnWithUserFunction(btnData: BtnConfig) {
    if (btnData.position === 'left') {
        this.btnsWithUserFunctionLeft.push(btnData);
    } else {
        this.btnsWithUserFunctionRight.push(btnData);
    }
  }
}

export default new BtnCreator();
