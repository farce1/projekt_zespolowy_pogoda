import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    weatherData: "",
  };

  componentDidMount() {
    fetch("http://localhost:3001/weather")
    .then((res) => res.text())
    .then((data) => this.setState({ weatherData: data }));
  }

  getFormattedData = (data) => {
    const weatherParameters = {};
    const entryDataFormat = data
      .split(" ")
      .map((s) => s.replace(/\s/g, ""))
      .map((s) => s.split("$"));
    const date = entryDataFormat[0];
    const time = entryDataFormat[1][0];
    const parameters = entryDataFormat[1][1]
      .split(",")
      .slice(0, -1)
      .slice(1)
      .map((s) => s.split("="))
      .forEach((e) => (weatherParameters[e[0].trim()] = e[1]));
    console.log(weatherParameters);
    return {
      date,
      time,
      weatherParameters,
    };
  };

  fetchWeatherData = () => {
    fetch("http://localhost:3001/weather")
      .then((res) => res.text())
      .then((data) => this.setState({ weatherData: data }));
  };

  render() {
    const {weatherData} = this.state
    const weather = weatherData ? this.getFormattedData(weatherData) : {}
    return (
      <div className='app'>
      <main>
        <div>
          <div className="location-box">
            <div className="location">PROJEKT STACJA POGODOWA</div>
            <div className="date">{weather.date}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              12°
            </div>
            <div className="weather">Sunny</div>
          </div>
        </div>
      </main>
    </div>
  )}
}

export default App;
