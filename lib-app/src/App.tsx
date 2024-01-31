import { useState } from "react";
import { User } from "./models/User";
import HomePage from "./pages/HomePage";

function App() {
  const [displayLogin, setDisplayLogin] = useState(true);
  const  [loggedInUser, setLoggedInUser] = useState<User>()
  return (
    <div>
      <HomePage displayLogin={displayLogin}/>
    </div>  
  )
}

export default App
