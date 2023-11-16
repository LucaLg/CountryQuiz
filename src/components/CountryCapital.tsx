import clsx from "clsx";
import { useRef, useState } from "react";

type CountryCapitalProps = {
  countries: Map<string, string>;
  shuffeld: string[];
};
function CountryCapitals({ countries, shuffeld }: CountryCapitalProps) {
  const [clickState, setClickState] = useState("default");
  const [buttonStates, setButtonState] = useState(initialButtonState(shuffeld));
  const [clickedIndex, setClickedIndex] = useState([]);
  const [clickedValue, setClickedValues] = useState({ name: "", index: 0 });
  const [errors, setErrors] = useState(0);
  const handleClick = (index: number, entry: string) => {
    if (clickState === "default") {
      buttonStates[index] = "blue";
      setButtonState(buttonStates);
      setClickState("blue");
      setClickedIndex([index]);
      setClickedValues({ name: entry, index: index });
    }
    if (clickState === "blue") {
      setClickedIndex([...clickedIndex, index]);
      if (countries.has(entry) && countries.get(entry) === clickedValue.name) {
        shuffeld.splice(index, 1);
        shuffeld.splice(clickedValue.index, 1);
        buttonStates[index] = "default";
        buttonStates[clickedValue.index] = "default";
        setButtonState(buttonStates);
        setClickState("default");
        setClickedValues({ name: "", index: 0 });
        return;
      }

      if (
        countries.has(clickedValue.name) &&
        countries.get(clickedValue.name) === entry
      ) {
        shuffeld.splice(index, 1);
        shuffeld.splice(clickedValue.index, 1);
        buttonStates[index] = "default";
        buttonStates[clickedValue.index] = "default";
        setButtonState(buttonStates);
        setClickState("default");
        setClickedValues({ name: "", index: 0 });
        return;
      } else {
        buttonStates[index] = "red";
        buttonStates[clickedValue.index] = "red";
        setErrors(errors + 1);
        setButtonState(buttonStates);
        setClickedIndex([...clickedIndex, index]);
        setClickState("red");
        return;
      }
    }
    if (clickState === "red") {
      buttonStates[index] = "blue";
      clickedIndex.forEach((i) => (buttonStates[i] = "default"));
      setClickedIndex([]);
      setClickedValues({ name: entry, index: index });
      setButtonState(buttonStates);
      setClickState("blue");
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
      <div className="w-full h-full shadow-black grid-cols-5  grid items-center justify-items-center  ">
        {buttons}
      </div>
    </>
  );
}
function initialButtonState(countries: String[]) {
  const initialButtonState = [];
  for (const country of countries) {
    initialButtonState.push("default");
  }
  return initialButtonState;
}
export default CountryCapitals;
