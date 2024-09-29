import React from 'react';
import { useState } from 'react';

const RegisterForm = ({registerFormData,setRegisterFormData,isRegister,setIsRegister}) =>{
  const handleRegister = async (e) =>{
    e.preventDefault();
    const registerBody = {
      username:registerFormData.username,
      name:registerFormData.name,
      password:registerFormData.password
    };
    console.log("Registering user...");
    const response = await fetch('http://localhost:3001/api/users',{
      method:'POST',
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(registerBody)
    });
    const data = await response.json();
    
    if(response.status === 200){
      console.log('User created Successfully');
      console.log(data);
      setRegisterFormData({
        username:'',
        name:'',
        password:''
      })
    }
    else{
      console.log("Error creating User");
      console.log(data);
    }

  }
  return(
  <div>
        <form onSubmit={handleRegister}>

         <div>
         <input
            type='email'
            placeholder='Email...'
            value={registerFormData.username}
            onChange={(e)=>setRegisterFormData({...registerFormData,username:e.target.value})}
            required
          />
         </div>

          <div>
           <input
            type="text"
            placeholder='Full name...'
            value = {registerFormData.name}
            onChange={(e)=> setRegisterFormData
            ({...registerFormData,name:e.target.value})}
            required
           />
          </div>

          <div>
            <input
              type='password'
              placeholder='Password'
              value={registerFormData.password}
              onChange={(e)=>setRegisterFormData 
              ({...registerFormData,password:e.target.value})}
              required
            />
          </div>
         
          <button type="submit">Register</button>
          <p>Already Register? <button onClick={()=>setIsRegister(true)}>LOGIN</button></p>
        </form>
      </div>
  )
}


const LoginForm =({loginFormData,setLoginFormData,isRegister,setIsRegister}) =>{
  const handleLogin = async (e)=>{
    e.preventDefault();

    console.log('Logging in user...');
    const response = await fetch('http://localhost:3001/api/login',{
      method:'POST',
      headers:{
        'Context-Type':'application/json'
      },
      body:JSON.stringify(loginFormData)
    })

    const data = await response.json();

    if(response.status===200){
      console.log('User logged in successfully');
      console.log(data);
      setLoginFormData({
        username:'',
        password:''
      });
    }else{
      console.log("Error logging in user");
      console.log(data);
    }
  }
  return(
  <div>
  <form onSubmit={handleLogin}>
    <div>
       <input
        type='email'
        placeholder='Email...'
        value={loginFormData.username}
        onChange={(e)=>setLoginFormData({...loginFormData,username:e.target.value})}
        required
       />
    </div>

    <div>
      <input
        type="password"
        placeholder='Password'
        value={loginFormData.password}
        onChange={(e)=>setLoginFormData({...loginFormData,password:e.target.value})}
        required
      />
    </div>
    
    <button type='submit'>LOGIN</button>
    <p>Not Register?<button onClick={()=>setIsRegister(false)}>Register</button></p>
  </form>
</div> 
)}

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
  
  const [isRegister,setIsRegister] = useState(false)

  return (
    <div>
        <h1>Notes application</h1>
        {
          isRegister? (<LoginForm
            loginFormData={loginFormData}
            setLoginFormData={setLoginFormData}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
          />) : (<RegisterForm
            registerFormData={registerFormData}
            setRegisterFormData={setRegisterFormData}
            isRegister={isRegister}
            setIsRegister={setIsRegister}
          />)
        }
    </div>
  )
}

export default App;
