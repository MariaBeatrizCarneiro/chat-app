import React, { useState } from "react";

export default function Header({ onChangePage, userName, userImage }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div onClick={() => setShowMenu(!showMenu)} className="header bg-gray-50 p-4 mb-4 flex justify-end items-center rounded-xl">

      {/* User name e imagem */}
      <div className="flex items-center">
        <h1 className="text-lg font-bold mr-3">{userName}</h1>
        <img src={userImage} alt="User" className="w-12 h-12 rounded-full cursor-pointer" />
      </div>

      {/* Menu com botão 'Terminar Sessão' e botão 'Ver Perfil' que vão para as páginas respetivas */}
      {showMenu && (
        <div className="menu flex flex-col absolute top-16 right-4 bg-white shadow-md rounded-xl p-2">
          <button onClick={() => onChangePage("profile")} className="block text-gray-800 font-semibold py-2 px-4 hover:bg-gray-100 rounded-xl mb-2">Ver Perfil</button>
          <button onClick={() => onChangePage("login")} className="block text-red-500 font-semibold py-2 px-4 hover:bg-gray-100 rounded-xl">Terminar Sessão</button>
        </div>
      )}
    </div>
  );
}

