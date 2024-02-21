// App.js
import React, { useState } from 'react';
import { LoginPage } from "./pages/LoginPage";
import { ListPage } from "./pages/ListPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  const [paginaAtual, setPaginaAtual] = useState("login");
  const [user, setUser] = useState("");
  const [pessoa, setPessoa] = useState("");

  const onChangePage = (page) => {
    setPaginaAtual(page);
  };

  const paginas = {
    "login": <LoginPage onChangePage={onChangePage} setUser={setUser} />,
    "list": <ListPage onChangePage={onChangePage} user={user} setPessoa={setPessoa} />,
    "chat": <ChatPage onChangePage={onChangePage} user={user} pessoa={pessoa}/>,
    "profile": <ProfilePage onChangePage={onChangePage} user={user}/>,
  };

  
  return (
    <div>
      <div className="App">
      {paginas[paginaAtual] || <div>ERROR: PAGE NOT FOUND</div>}
      </div>
      
    </div>
  );
}

export default App;
