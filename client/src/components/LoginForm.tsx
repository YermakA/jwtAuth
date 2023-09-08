import React, { useContext, useState } from 'react'
import { context } from "../main"

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {store} = useContext(context)
  return (
    <div>
      <input type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      placeholder="email"/>
      <input type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="password" />
      <button onClick={()=> store.login(email, password)}>Login</button>
      <button onClick={()=> store.registartion(email, password)}>Registration</button>
    </div>
  )

}