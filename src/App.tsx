import "./App.css";
import "./components/CountryCapital";
import CountryCapitals from "./components/CountryCapital";
import countryData from "../countryData.json";
function App() {
  const countryMap = new Map<string, string>();
  countryData.countries.forEach((entry) => {
    countryMap.set(entry.name, entry.capital);
  });
  const buttonEntries: string[] = [
    ...countryMap.values(),
    ...countryMap.keys(),
  ].sort(() => Math.random() - 0.5);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full border border-black ">
        <CountryCapitals countries={countryMap} shuffeld={buttonEntries} />
      </div>
    </div>
  );
}
export default App;
