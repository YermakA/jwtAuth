import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Store from "./store/store.ts"

const store = new Store()


interface State{
  store: Store
}

export const context = createContext<State>({
  store
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <context.Provider value ={{store}}>
      <App />
    </context.Provider>
  </React.StrictMode>,
)
