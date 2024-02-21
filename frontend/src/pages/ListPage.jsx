import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import RafaelImg from '../images/rafael.jpg';
import FranciscoImg from '../images/francisco.jpg';
import AndrezzaImg from '../images/andrezza.jpg';
import MartaImg from '../images/marta.jpg';
import SofiaImg from '../images/sofia.jpg';
import DefaultImg from '../images/default.png';


export function ListPage({ onChangePage, user, setPessoa }) {

    // Coisas necessárias para obter o history
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        try {
          const response = await fetch("/api/messages");
          if (!response.ok) {
            throw new Error("Failed to fetch messages");
          }
          const data = await response.json();
          setHistory(data.history);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
    };
  
    useEffect(() => { fetchHistory(); }, []);


    // History só com mensagens feitas ou recebidas pelo user
    const historyDoUser = history.filter(e => e.from === user || e.to === user);

    // Array de nomes de pessoas que já falaram com o user
    let pessoasQueFalaramComOUser = [...new Set(historyDoUser.map(e => e.from).concat(historyDoUser.map(e => e.to)))];
    
    // Remova o próprio usuário do array
    pessoasQueFalaramComOUser = pessoasQueFalaramComOUser.filter(pessoa => pessoa !== user);

    // Função que define o 'pessoa' (para a ChatPage) e que muda de página para a ChatPage
    const handleConversa = (e) => {
        setPessoa(e);
        onChangePage("chat");
    };
    
  return (
    <div className="flex flex-col m-4">

      {/* Header */}
      <Header onChangePage={onChangePage} userName={user} userImage={user === "Rafael" ? RafaelImg : user === "Francisco" ? FranciscoImg : user === "Andrezza" ? AndrezzaImg : user === "Marta" ? MartaImg : user === "Sofia" ? SofiaImg : DefaultImg} />

      {/* Título */}
      <h1 className="text-3xl font-bold mb-4">Conversas:</h1>

      {/* Botões com pessoasQueFalaramComOUser que executam a função 'handleConversa' */}
      <ul className="flex flex-col">
        {pessoasQueFalaramComOUser.map((e, index) => (
          <li key={index}>
            <div onClick={() => handleConversa(e)} className="flex bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl mb-2 w-full">
              <img src={ e === "Rafael" ? RafaelImg : e === "Francisco" ? FranciscoImg : e === "Andrezza" ? AndrezzaImg : e === "Marta" ? MartaImg : e === "Sofia" ? SofiaImg : DefaultImg } alt={e} className="h-8 w-8 rounded-full mr-2"/>
              <button className="">{e}</button>
            </div>
          </li>
        ))}
      </ul>

      {/* <div key={index} className={`flex ${message.from === user ? 'justify-end' : 'justify-start'} mb-2`}>
          <img src={ message.from === "Rafael" ? RafaelImg : message.from === "Francisco" ? FranciscoImg : message.from === "Andrezza" ? AndrezzaImg : message.from === "Marta" ? MartaImg : message.from === "Sofia" ? SofiaImg : DefaultImg } alt={message.from} className="h-8 w-8 rounded-full mr-2"/>
          <div className={`p-3 rounded-xl font-bold shadow-md ${message.from === user ? 'bg-green-500 text-white ms-10 rounded-br-none' : 'bg-gray-200 text-gray-800 me-10 rounded-tl-none'}`}>
              {message.content}
          </div>
      </div> */}

      {/* Back Button */}
      <div className="fixed top-5 left-3">
        <button onClick={() => onChangePage("login")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full m-4 flex items-center p-2 w-11">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

    </div>
  );
}

