import React from "react";
import "./App.css";
import Weather from "../Weather";
import LineChart from '../Charts/Line'

class App extends React.Component {
  state = {
    weatherData: ""
  };

  componentDidMount() {
    this.loadData()
    setInterval(this.loadData, 2000);
  }

  loadData = async () => {
    try {
    fetch("http://localhost:3001/weather")
      .then((res) => res.text())
      .then((data) => this.setState({ weatherData: data }));
    }
    catch(e) {
      console.log(e)
    }
  }
  

  getFormattedData = (data) => {
    const weatherParameters = {};
    const entryDataFormat = data
      .split(" ")
      .map((s) => s.replace(/\s/g, ""))
      .map((s) => s.split("$"));
    const date = entryDataFormat[0];
    const time = entryDataFormat[1][1] ? entryDataFormat[1][0] : entryDataFormat[1][0].slice(0,8);
    const parameters = entryDataFormat[1][1] ? entryDataFormat[1][1]
      .split(",")
      .slice(0, -1)
      .slice(1)
      .map((s) => s.split("="))
      .forEach((e) => (weatherParameters[e[0].trim()] = e[1]))
      : []
    return {
      date,
      time,
      ...weatherParameters
    };
  };

  fetchWeatherData = () => {
    fetch("http://localhost:3001/weather")
      .then((res) => res.text())
      .then((data) => this.setState({ weatherData: data }));
  };

  render() {
    const { weatherData } = this.state;
    const weather = weatherData ? this.getFormattedData(weatherData) : {};
    return (
      <div className="app">
        <main>
          <div>
            <div className="location-box">
              <div className="location">PROJEKT STACJA POGODOWA</div>
            </div>
              <Weather rowData={weather}/>
              <LineChart data={weather}/>
            </div>
        </main>
      </div>
    );
  }
}

export default App;
