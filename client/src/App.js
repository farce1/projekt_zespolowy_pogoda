import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    weatherData: ''
  }

  getWeather = () => {
    fetch("http://localhost:3001/weather")
    .then(res => res.text())
    .then(data => this.setState({weatherData: data}))
  }

  render = () => 
    <div className="App">
<button onClick={() => this.getWeather()}>WEATHER</button>
<p>{this.state.weatherData}</p>
    </div>
}

export default App
