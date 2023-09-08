
import { observer } from "mobx-react-lite"
import { LoginForm } from "./components/LoginForm"
import { useContext, useEffect } from "react"
import { context } from "./main"




function App() {

  const {store} = useContext(context)


  useEffect(() => {
    store.checkAuth()
    
    },[])
  return (
    <>
      {
        store.isAuth
          ?
        <h1>Авторизован {store.user.email}</h1>
          :
        <h1>Авторизуйтесь</h1>  
     }
      <LoginForm/>
    </>
  )
}

export default observer(App)
