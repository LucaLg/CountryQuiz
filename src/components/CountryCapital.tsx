import clsx from "clsx";
import { useState } from "react";
import countryDatat from "../../countryData.json";
type CountryCapitalProps = {
  countries: Map<string, string>;
  shuffeld: string[];
};
function CountryCapitals({ countries, shuffeld }: CountryCapitalProps) {
  const [clickState, setClickState] = useState("default");
  const [buttonStates, setButtonState] = useState(initialButtonState(shuffeld));
  const [clickedIndex, setClickedIndex] = useState([]);
  const [clickedValue, setClickedValue] = useState({ name: "", index: 0 });
  const [errors, setErrors] = useState(0);
  const updateState = (
    buttonState: string[],
    clickedIndex: number[],
    newClickState: string,
    entry: string,
    newIndex: number,
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
    if (clickState === "blue") {
      if (
        (countries.has(entry) && countries.get(entry) === clickedValue.name) ||
        (countries.has(clickedValue.name) &&
          countries.get(clickedValue.name) === entry)
      ) {
        const { newBts, updatedShuffeld } = correctGuess(
          buttonStates,
          shuffeld,
          index,
          clickedValue.index,
        );
        shuffeld = updatedShuffeld;
        updateState(newBts, [...clickedIndex, index], "default", "", 0);
        return;
      } else {
        buttonStates[index] = "red";
        buttonStates[clickedValue.index] = "red";
        updateState(buttonStates, [...clickedIndex, index], "red", "", 0);
        setErrors(errors + 1);
        return;
      }
    }
    if (clickState === "red") {
      buttonStates[index] = "blue";
      clickedIndex.forEach((i) => (buttonStates[i] = "default"));
      updateState(buttonStates, [index], "blue", entry, index);
    }
  };
  const buttons = shuffeld.map((entry, index) => (
    <button
      onClick={() => handleClick(index, entry)}
      key={entry}
      className={clsx(
        "w-32 h-20 text-white  rounded-md border border-black drop-shadow-lg",
        {
          "bg-blue-500": buttonStates[index] === "blue",
          "bg-black": buttonStates[index] === "default",
          "bg-red-500": buttonStates[index] === "red",
        },
      )}
    >
      {entry}
    </button>
  ));
  return (
    <>
      <div className="w-full h-14 flex justify-center flex-row ">
        <h1 className="font-bold text-2xl tracking-wide">Country Quiz</h1>
      </div>
      <div className="w-full h-full shadow-black grid-cols-6  grid items-center justify-items-center  ">
        {buttons}
      </div>
    </>
  );
}

function initialButtonState(countries: String[]) {
  const initialButtonState: string[] = [];
  countries.forEach(() => initialButtonState.push("default"));
  return initialButtonState;
}
function correctGuess(
  buttonStates: string[],
  shuffeld: string[],
  index: number,
  clickedValueIndex: number,
): { newBts: string[]; updatedShuffeld: string[] } {
  shuffeld.splice(index, 1);
  shuffeld.splice(clickedValueIndex, 1);
  buttonStates[index] = "default";
  buttonStates[clickedValueIndex] = "default";
  return { newBts: buttonStates, updatedShuffeld: shuffeld };
}
export default CountryCapitals;
