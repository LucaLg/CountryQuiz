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
  const flagPath = countryData.countries.find((val) => val.name === "Germany")
    ?.flag!;
  const flag = <img className="h-10 w-20" src={flagPath} alt="Germany Flag" />;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {flag}
      <CountryCapitals countries={countryMap} shuffeld={buttonEntries} />
    </div>
  );
}
export default App;
