import clsx from "clsx";
import { useState } from "react";
import countryJsonData from "../../countryData.json";
type CountryCapitalProps = {
  countries: Map<string, string>;
  shuffeld: string[];
};
type CountryData = {
  countries: {
    name: string;
    capital: string;
    flag: string;
  }[];
};
const countryData: CountryData = countryJsonData as CountryData;
const buttonClasses = new Map<string, string>([
  ["correct", "bg-emerald-600 animate-button-spin  "],
  ["hidden", "border-none"],
  ["default", "bg-black"],
  ["blue", "bg-sky-500"],
  ["red", "bg-red-600"],
]);
const CountryCapitals = ({ countries, shuffeld }: CountryCapitalProps) => {
  const [clickState, setClickState] = useState("default");
  const [buttonStates, setButtonState] = useState(initialButtonState(shuffeld));
  const [clickedIndex, setClickedIndex] = useState([] as number[]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickedValue, setClickedValue] = useState({ name: "", index: 0 });
  const [errors, setErrors] = useState(0);

  const correctGuess = (index: number) => {
    buttonStates[index] = "hidden";
    setIsAnimating(false);
    updateState(buttonStates, [...clickedIndex, index], "default", "", 0);
  };
  const updateState = (
    buttonState: string[],
    clickedIndex: number[],
    newClickState: string,
    entry: string,
    newIndex: number
  ) => {
    setButtonState(buttonState);
    setClickState(newClickState);
    setClickedIndex(clickedIndex);
    setClickedValue({ name: entry, index: newIndex });
  };
  const handleClick = (index: number, entry: string) => {
    if (clickState === "default") {
      buttonStates[index] = "blue";
      updateState(buttonStates, [index], "blue", entry, index);
    }
    if (clickState === "red") {
      buttonStates[index] = "blue";
      clickedIndex.forEach((i) => (buttonStates[i] = "default"));
      updateState(buttonStates, [index], "blue", entry, index);
    }
    if (clickState === "blue") {
      const isCorrectGuess =
        (countries.has(entry) && countries.get(entry) === clickedValue.name) ||
        (countries.has(clickedValue.name) &&
          countries.get(clickedValue.name) === entry);
      if (isCorrectGuess) {
        setIsAnimating(true);
        buttonStates[index] = "correct";
        buttonStates[clickedValue.index] = "correct";
        updateState(buttonStates, [...clickedIndex, index], "default", "", 0);
        return;
      } else {
        buttonStates[index] = "red";
        buttonStates[clickedValue.index] = "red";
        updateState(buttonStates, [...clickedIndex, index], "red", "", 0);
        setErrors(errors + 1);
        return;
      }
    }
  };
  const renderButton = (entry: string, index: number) => {
    const buttonState = buttonStates[index];
    return (
      <div className="relative w-32 h-20">
        <img
          src={`${getFlagPath(entry, countryData)}`}
          className="absolute inset-0 z-10 w-full h-full object-cover rounded-md  "
          alt={`${entry} flag`}
        />
        <button
          onClick={() => handleClick(index, entry)}
          key={entry}
          onAnimationEnd={() => setTimeout(() => correctGuess(index), 300)}
          disabled={buttonState !== "default" || isAnimating}
          className={clsx(
            "relative z-20 w-32 h-20 text-white flex flex-row justify-center items-center rounded-md border border-black drop-shadow-lg",
            buttonClasses.get(buttonState)
          )}
        >
          <span>{entry}</span>
        </button>
      </div>
    );
  };
  const buttons = shuffeld.map((entry, index) => renderButton(entry, index));
  const wonState = won(buttonStates);
  return (
    <>
      <div className="w-full h-14 flex justify-center flex-row ">
        <h1 className="font-bold text-3xl drop-shadow-md tracking-wide  antialiased  ">
          Country Quiz
        </h1>
      </div>
      <div className="font-bold text-l pb-4 ">Fehler: {errors}</div>
      {!wonState ? (
        <div className="w-3/4 h-3/4 bg-opacity-20 rounded-lg  from-gray-500/40 backdrop-blur-sm  to-gray-600/40 bg-gradient-to-b rounded-s  shadow-md shadow-black grid-cols-4  grid items-center justify-items-center  ">
          {buttons}
        </div>
      ) : (
        <div>Won</div>
      )}
    </>
  );
};
function initialButtonState(countries: string[]) {
  const initialButtonState: string[] = [];
  countries.forEach(() => initialButtonState.push("default"));
  return initialButtonState;
}
function won(buttonStates: string[]) {
  return (
    buttonStates.filter((state) => state === "hidden").length ===
    buttonStates.length
  );
}
function getFlagPath(entry: string, countryData: CountryData) {
  const flag = countryData.countries.filter((value) => {
    if (value.name === entry || value.capital === entry) {
      return value;
    }
  })[0].flag;
  return flag;
}
export default CountryCapitals;
