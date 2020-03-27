import React, { useState } from 'react'; 

import './global.css'

import Routes from './routes'

function App() {
  return(
    <Routes/>
  )
}

export default App;
/*const [counter, setCounter] = useState(0)

  function increment(){
    setCounter(counter + 1)
  }

  return (
      <div>
        <Header>
          Contador: {counter}
        </Header>
        <button onClick = {increment}>Incrementar</button>
      </div>
  );*/