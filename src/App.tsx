import { FC, useState } from "react";
import s from "./app.module.css";
import ControlAutocomplite from "./components/ControlAutocomplite/ControlAutocomplite";
import ControlWithButtons from "./components/ControlWithButtons/ControlWithButtons";

const App: FC = () => {
  const [helloInput, setHelloInput] = useState("");
  const [alertInput, setAlertInput] = useState("");

  return (
    <div>
      <ControlWithButtons />
      <div className={s.divider}></div>

      <div className={s.groupControlWrapper}>
        <input
          onChange={(e) => {
            setHelloInput(e.target.value);
          }}
          value={helloInput}
          type="text"
        />
        <button onClick={() => setHelloInput("")}>Очистить инпут</button>
        <button onClick={() => setHelloInput("Hello world")}>
          Hello world
        </button>
      </div>

      <div className={s.divider}></div>

      <div className={s.groupControlWrapper}>
        <button onClick={() => alertInput !== '' && !isNaN(+alertInput) && alert(alertInput)}>
          Alert с числом
        </button>
        <input
          onChange={(e) => {
            setAlertInput(e.target.value);
          }}
          value={alertInput}
          type="text"
        />
        <button onClick={() => alert(alertInput)}>Alert с тектом инпута</button>
      </div>

      <div className={s.divider}></div>

      <ControlAutocomplite countryesLimit={3} />
      <ControlAutocomplite countryesLimit={10} />
    </div>
  );
};

export default App;
