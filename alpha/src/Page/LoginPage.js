import React from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../Components/APICalls";

// minsu@gmail.com  doowon@gmail.com jungsu@gmail.com PW: 123, Doowon permission 1, jungsu 2, minsu 3

export default function LoginPage() {

  const navigate = useNavigate();

  async function login() {

    var userEmail = await getUserByEmail(document.getElementById("email").value);

    var emailID = document.getElementById("email").value;

    var passwordID = document.getElementById("password").value;

  
    if(window.sessionStorage.getItem("user") == null){
      window.sessionStorage.setItem("user", 1);
      console.log("not logged in")
    }
    else{
      console.log("logged in as user " + window.sessionStorage.getItem("user"))
      if (userEmail.email === emailID && passwordID === userEmail.password){
        if (userEmail.permission === 1){
          navigate("/home")
        }
        if (userEmail.permission === 2){
          navigate("/home")
        }
        if (userEmail.permission === 3){
          navigate("/home")
        }

      }
      else{
        alert("Error, invalid email or password.")
      }
    }
  
  }
  return (
    <div>
      <div className='container text-center my-4'>
        <h1>Login</h1>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email"/>
        </div>
        <div className="mb-3"> 
          <label htmlFor="password">Password</label>
          <input type="text" className="form-control" id="password" placeholder="Enter password"/>
        </div>
        <div className="mb-3">
          <button type="submit" onClick={()=>login() }>cmon</button>
        </div>
      </div>
    </div>
  );
}