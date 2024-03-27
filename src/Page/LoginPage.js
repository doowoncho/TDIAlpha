import React from "react";
import {  getUserByEmail } from "../Components/APICalls";
import '../Styles/login.css'

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
    <div style={{ background: 'url("https://images.unsplash.com/photo-1415594445260-63e18261587e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='container text-center rounded' style={{ 
          width: "500px", 
          marginBottom: "200px", 
          background: "transparent", /* Semi-transparent white background */
          backdropFilter: "blur(20px)", /* Apply the blur effect */ 
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 10px rgba(0,0,0,.2)"
        }}>
        <h1 className="my-3 text-white" >Login</h1>
        <div className="mb-4 text-white">
          <label>Name</label>
          <input type="text" style={{background: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)"}} className="form-control text-white" id="email"/>
        </div>
        <div className="mb-4 text-white"> 
          <label>Password</label>
          <input type="text" style={{background: "transparent", border: "1px solid rgba(255, 255, 255, 0.2)"}} className="form-control text-white" id="password"/>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary" onClick={()=>login() }>login</button>
        </div>
      </div>
    </div>
);
}