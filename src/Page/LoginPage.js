import React from "react";
import {  getUserByEmail } from "../Components/APICalls";

// minsu@gmail.com  doowon@gmail.com jungsu@gmail.com PW: 123, Doowon permission 1, jungsu 2, minsu 3

export default function LoginPage() {

  async function login() {
    if(window.sessionStorage.getItem("user") != null){
      console.log("already logged in")
      return
    }
    
    var user = await getUserByEmail(document.getElementById("email").value);   
    var emailID = document.getElementById("email").value;
    var passwordID = document.getElementById("password").value;
    if (user !=null && user.email === emailID && passwordID === user.password){
      window.sessionStorage.setItem("user", user.id)
      //change in the future so that you don't have to reload the page for navbar to update
      await window.location.reload()
    }
    else{
      alert("Error, invalid email or password.")
    }
  }
  
  return (
    <div>
      <div className='container text-center my-4' style={{width:"600px"}}>
        <h1>Login</h1>
        <div className="mb-3">
          <label for="email">Email</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email"/>
        </div>
        <div className="mb-3"> 
          <label for="password">Password</label>
          <input type="text" className="form-control" id="password" placeholder="Enter password"/>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={()=>login() }>login</button>
        </div>
      </div>
    </div>
  );
}