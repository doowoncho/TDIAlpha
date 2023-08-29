
const login = () => {
  
  if(window.sessionStorage.getItem("user") == null){
    window.sessionStorage.setItem("user", 1);
    console.log("not logged in")
  }
  else{
    
    console.log("logged in as user " + window.sessionStorage.getItem("user"))
  }

}

export default function HomePage() {
  return (
    <div>
      <header className='container text-center my-4'>
        <h1>Welcome</h1>
        <button onClick={()=>login() }>cmon</button>
      </header>
    </div>
  );
}