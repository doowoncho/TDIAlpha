import React from "react";
import {  getUserByEmail } from "../Components/APICalls";

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
    <div style={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='container text-center rounded' style={{ 
          width: "500px", 
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 10px rgba(0,0,0,.2)"
        }}>
        <h1 className="my-3" >Login</h1>
        <div className="mb-4">
          <label>Name</label>
          <input type="text" className="form-control" id="email"/>
        </div>
        <div className="mb-4"> 
          <label>Password</label>
          <input type="text" className="form-control" id="password"/>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={()=>login() }>login</button>
        </div>
      </div>
    </div>
);
}