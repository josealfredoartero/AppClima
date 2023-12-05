import { useState } from 'react'
import Clima from './components/Clima'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Clima />
    </>
  )
}

export default App
