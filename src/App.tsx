import { useState } from 'react'
import reactLogo from './assets/logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={reactLogo} className="logo" alt="logo" />
      </div>
      <h1>Simple chat</h1>
      <div className="card">
        <button
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
