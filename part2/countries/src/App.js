import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setContries] = useState([]);
  const [allContries, setAllContries] = useState([]);
  const [searchCountry, setsearchCountry] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(({ data }) => {
      console.log(data);
      setAllContries(data);
    });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setsearchCountry(value);
    const find_countries = allContries.filter(({ name: { common } }) => {
      return common.toLowerCase().includes(value.toLowerCase());
    });

    const complete_equal = find_countries.find(({ name: { common } }) => {
      return common.toLowerCase() === value.toLowerCase();
    });

    // console.log(value);

    setContries(
      complete_equal === undefined ? find_countries : [complete_equal]
    );
  };
  return (
    <>
      <div>
        find countries
        <input onChange={handleChange} value={searchCountry} />
        <Countries countries={countries}></Countries>
      </div>
    </>
  );
};

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <SingleCountry country={countries[0]}></SingleCountry>;
  }
  if (countries.length > 10) return <p> too many countries</p>;
  return <div>{countries.map(({ fifa, name: { common } }) => (
    <Country key={fifa} name={common}></Country>
  ))}</div>;
};
const Country = ({ name }) => {
  return <p>{name}</p>;
};
const SingleCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital:{country.capital}</p>
      <p>area:{country.area}</p>
      <h3>language</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="" />
    </div>
  );
};

export default App;
