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
    const pessoasQueFalaramComOUser = [...new Set(historyDoUser.map(e => e.from).concat(historyDoUser.map(e => e.to)))];
  
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
            <button onClick={() => handleConversa(e)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl mb-2 w-full">{/*Largura fixa*/}{e}</button>
          </li>
        ))}
      </ul>

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

