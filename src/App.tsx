import "./App.css";
import "./components/CountryCapital";

import CountryCapitals from "./components/CountryCapital";
import countryData from "../countryData.json";
import { useState } from "react";
import { WonScreen } from "./components/WonScreen";
const countryMap = new Map<string, string>();
countryData.countries.forEach((entry) => {
  countryMap.set(entry.name, entry.capital);
});

function App() {
  const genButtonEntries = () => {
    const entries: string[] = [];
    countryData.countries
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .forEach((data) => {
        entries.push(data.name);
        entries.push(data.capital);
      });
    return entries.sort(() => Math.random() - 0.5);
  };
  const [buttonEntries, setButtonEntries] = useState(genButtonEntries());
  const [wonState, setWonState] = useState(false);
  const resetGame = () => {
    setWonState(false);
    setButtonEntries(genButtonEntries());
  };
  return (
    <>
      <div className="w-screen h-screen bg-world  text-white bg-cover flex flex-col justify-center items-center">
        {wonState ? (
          <WonScreen onPlayAgain={resetGame} />
        ) : (
          <CountryCapitals
            countries={countryMap}
            shuffeld={buttonEntries}
            setWonState={setWonState}
          />
        )}
      </div>
    </>
  );
}
export default App;
