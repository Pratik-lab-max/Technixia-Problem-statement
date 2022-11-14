import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from "axios"

const Home = () => {

  const apiKey = "ee19806eee64b530fdb428cf562563ec"
  const [cityName, setCityName] = useState("")
  const [data, setData] = useState({})
  // const [history, setHistory] = useState()

  const getDetails = (city) => {

    if (!city) return

    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {

      console.log("response",res.data)
      setData(res.data)

    }).catch((err) => {
      console.log("error", err)
    })
  }

  // const handleHistory = (e) => {
  //   setHistory(cityName)
  // }

  const handleChange = (e) => {
    console.log("value",e.target.value)
    setCityName(e.target.value)
  }

  const handleSearch = () => {
    getDetails(cityName)
  }

  useEffect(() => {
    getDetails("Bhubaneswar")
  },[])

  return (
    <div className="main">
      <div className="weather">
          <h1 className="header">Weather App</h1>
          <div className="box3">
            <input type="text" className="form2" value={cityName} onChange={handleChange}/>
            {/* &nbsp; */}
            {/* <button type="button" className="btn4" value={history} onClick={handleHistory}>Show history</button> */}
            <br /> 
            <br /> 
            <button className="btn2" type="button" onClick={handleSearch}>Search</button>
          </div>
      </div>
      &nbsp;
      <div className="box4">
        <h2 className="location">
          {data?.name}
        </h2>
        <h1 className="temp"> 
          {((data?.main?.temp) - 273.15).toFixed(2)}°C
        </h1>
        <h3 className="pressure">Pressure : 
          {data?.main?.pressure}
        </h3>
      </div>
    </div>
  )
}

export default Home
