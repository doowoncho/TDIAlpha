import React from "react";

export default function LegendPage() {
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
          <button type="submit" className="btn btn-primary">login</button>
        </div>
      </div>
    </div>
  );
}