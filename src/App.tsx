import "./App.css";
import "./components/CountryCapital";

import CountryCapitals from "./components/CountryCapital";
import countryData from "../countryData.json";
import { useMemo } from "react";
const countryMap = new Map<string, string>();
countryData.countries.forEach((entry) => {
  countryMap.set(entry.name, entry.capital);
});

function App() {
  const buttonEntries = useMemo(() => {
    const entries: string[] = [];
    countryData.countries
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .forEach((data) => {
        entries.push(data.name);
        entries.push(data.capital);
      });
    return entries.sort(() => Math.random() - 0.5);
  }, []);
  return (
    <>
      <div className="w-screen h-screen bg-world  text-white bg-cover flex flex-col justify-center items-center">
        <CountryCapitals
          countries={countryMap}
          shuffeld={buttonEntries.sort(() => Math.random() - 0.5)}
        />
      </div>
    </>
  );
}
export default App;
