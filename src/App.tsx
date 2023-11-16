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
    <div className="w-full h-full flex flex-col justify-center items-center">
      <CountryCapitals countries={countryMap} shuffeld={buttonEntries} />
    </div>
  );
}
export default App;
