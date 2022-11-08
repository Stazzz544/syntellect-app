import btnCreator from "../../store/btnCreator";
import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import s from "./controlWithButtons.module.css";
import React from "react";


const userFuncHandler = (funcString: string) => {
    try{
        eval(funcString)
    } catch {
        console.group('Ошибка выполнения функции');
        console.log('функцию невозможно выполнить, проверите корректность записи:')
        console.log(funcString)
        console.groupEnd();
    }
    
}

const ControlWithButtons: FC = observer(() => {
  const [btnName, setBtnName] = useState("");
  const [functionText, setFunctionTetx] = useState("");
  const [btnSide, setBtnSide] = useState<"left" | "right">("left");

  const userBtnsLeft = btnCreator.btnsWithUserFunctionLeft;
  const userBtnsRight = btnCreator.btnsWithUserFunctionRight;

  const addBtn = (e: any) => {
    e.preventDefault();
    btnCreator.addBtnWithUserFunction({
      btnText: btnName,
      btnFunction: functionText,
      position: btnSide,
      id: Date.now(),
    });
    setBtnName("");
    setFunctionTetx("");
  };

  return (
    <div className={s.wrapper}>
      {userBtnsLeft.length > 0 &&
        userBtnsLeft.map((btn) => {
          return (
            <button
              className={s.btnLeft}
              key={btn.id}
              onClick={() => userFuncHandler(`(${btn.btnFunction})()`)}
            >
              {btn.btnText}
            </button>
          );
        })}

      <form className={s.form} onSubmit={addBtn}>
        <div>
          <input
            placeholder="Название для новой кнопки"
            className={s.funcName}
            required
            value={btnName}
            id="btnName"
            onChange={(e) => {
              setBtnName(e.target.value);
            }}
          />
        </div>

        <div className={s.textAriaWrapper}>
          <p className={s.discription}>формат записи : {`() => { console.log('test') }`}</p>
          <p>ошибки при выполнении отобразятся в консоли</p>
          <textarea
            placeholder="функция для новой кнопки"
            className={s.functext}
            required
            value={functionText}
            cols={30}
            rows={10}
            onChange={(e) => {
              setFunctionTetx(e.target.value);
            }}
          ></textarea>
        </div>

        <div className={s.radiContainer}>
          <div className={s.radiContainer}>
            <label htmlFor="leftSideBtn">слева</label>
            <input
              id="leftSideBtn"
              name="side"
              type="radio"
              value="left"
              onChange={() => {
                setBtnSide("left");
              }}
              defaultChecked
            />
          </div>

          <div className={s.radiContainer}>
            <label htmlFor="rightSideBtn">справа</label>
            <input
              id="rightSideBtn"
              name="side"
              type="radio"
              value="right"
              onChange={() => {
                setBtnSide("right");
              }}
            />
          </div>
        </div>

        <button className={s.addButton} type="submit">
          Добавить кнопку
        </button>
      </form>

      {userBtnsRight.length > 0 &&
        userBtnsRight.map((btn) => {
          return (
            <button
              className={s.btnRight}
              key={btn.id}
              onClick={() => userFuncHandler(`(${btn.btnFunction})()`)}
            >
              {btn.btnText}
            </button>
          );
        })}
    </div>
  );
});

export default React.memo(ControlWithButtons);
