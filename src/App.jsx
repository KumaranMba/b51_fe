import React, { useEffect } from 'react';
import { useState } from 'react';
import RegisterForm from './components/Registerform';
import LoginForm from './components/LoginForm';
import LoggedInPage from './components/LoggedInPage';


function App() {
   
  const [registerFormData,setRegisterFormData] = useState({
    username:'',
    name:'',
    password:''
  })

  const [loginFormData,setLoginFormData] = useState({
    username:'',
    password:''
  })
  
  const [isRegister,setIsRegister] = useState(false);

  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null); 
  
  useEffect(() => {
       const user = window.localStorage.getItem('user');
       const token = window.localStorage.getItem('token');

       if(user && token){
        setUser(JSON.parse(user));
        setToken(token);
       }
  },[]);

  return (
    <div>
        <h1>Notes application</h1>
        {
         user ? (
         <LoggedInPage 
          user={user} 
          setUser={setUser}
          token={token}
          setToken={setToken}
          isRegister={isRegister}
          setIsRegister={setIsRegister}
         />
         ):( 
          isRegister? (<LoginForm
            loginFormData={loginFormData}
            setLoginFormData={setLoginFormData}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
            user={user}
            setUser={setUser}
            token={token}
            setToken={setToken}
          />) : (<RegisterForm
            registerFormData={registerFormData}
            setRegisterFormData={setRegisterFormData}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
          />))
        }
    </div>
  )
}

export default App;
