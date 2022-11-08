import { observer } from "mobx-react-lite";
import { FC, useRef, useState } from "react";
import { CountryInfo, getCountryByName } from "../../api/apiService";
import s from "./controlAutocomplite.module.css";
import { v4 as uuidv4 } from "uuid";
import React from "react";

interface AutocompliteComponent {
  countryesLimit: number;
}

const cutArray = (arr: any[], length: number) => {
  if (arr.length > length) {
    const cut = length - arr.length;
    return arr.slice(-cut);
  }
  return arr;
};

const ControlAutocomplite: FC<AutocompliteComponent> = observer(
  ({ countryesLimit }) => {
    const [countryListLimited, setCountryListLimited] = useState<
      Array<CountryInfo>
    >([]);
    const [seachInput, setSearchInput] = useState<string>("");
    const lastPromice = useRef<Promise<CountryInfo[]>>();

    const getCountryList = async (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      const countryList: Promise<CountryInfo[]> = getCountryByName(
        e.target.value
      );
      lastPromice.current = countryList;
      countryList.then((resolve) => {
        if (countryList === lastPromice.current) {
          setCountryListLimited(cutArray(resolve, countryesLimit));
        }
      });
    };

    const autocompliteHandler = (chosenCountry: string) => {
      setCountryListLimited([]);
      setSearchInput(chosenCountry);
    };

    return (
      <div className={s.formWrapper}>
        <input
          placeholder="введите название страны"
          className={s.countryField}
          value={seachInput}
          type="text"
          onChange={getCountryList}
        />
        <ul className={s.listWrapper}>
          {countryListLimited.map((country) => {
            return (
              <li
                key={uuidv4()}
                onClick={() => autocompliteHandler(country.fullName)}
                className={s.flexWrapper}
              >
                <div>{country.name}</div>
                <div>{country.fullName}</div>
                <img src={country.flag} alt={country.name + "flag"} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default React.memo(ControlAutocomplite);
