import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser({ ...JSON.parse(user) });
    }
  }, []);

  return (
    <div className="App">
      <Route path="/">
        {user ? <Home setUser={setUser} user={user} /> : <Auth setUser={setUser} />}
      </Route>
    </div>
  );
}

export default App;
