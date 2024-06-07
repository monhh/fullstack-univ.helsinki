/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' */

import { useState } from "react"
import Statistics from "./Components/Statistics"
import Button from "./Components/Button"

function App() {

	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
  
  return (
    <div>
        <h1>give feedback</h1>
		<Button setStateVar={setGood} stateVar={good} text="good"/>
		<Button setStateVar={setNeutral} stateVar={neutral} text="neutral"/>
		<Button setStateVar={setBad} stateVar={bad} text="bad"/>

        <h1>statistics</h1>
		<Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
