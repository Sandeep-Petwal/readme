import { useState } from 'react'
import ModalComponent from './components/ModalComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React components</h1>

      {/* modal  */}
      <ModalComponent />
    </>
  )
}

export default App
