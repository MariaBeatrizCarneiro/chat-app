import React, { useEffect, useState } from "react";

import RafaelImg from '../images/rafael.jpg';
import FranciscoImg from '../images/francisco.jpg';
import AndrezzaImg from '../images/andrezza.jpg';
import MartaImg from '../images/marta.jpg';
import SofiaImg from '../images/sofia.jpg';
import DefaultImg from '../images/default.png';


export function ProfilePage({ onChangePage, user }) {

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

    // Filtra o histórico para mensagens enviadas ou recebidas pelo usuário atual
    const userMessages = history.filter(message => message.from === user || message.to === user);

    // Calcula o número total de mensagens do usuário
    const totalMessages = userMessages.length;

    // Cria um objeto para armazenar o número de mensagens por pessoa
    const messageCountByPerson = {};
    userMessages.forEach(message => {
        const otherPerson = message.from === user ? message.to : message.from;
        messageCountByPerson[otherPerson] = (messageCountByPerson[otherPerson] || 0) + 1;
    });

    // Ordena as pessoas com quem o usuário fala com mais frequência
    const topPeople = Object.entries(messageCountByPerson).sort((a, b) => b[1] - a[1]).map(([person, count]) => ({ person, count }));

    // Calcula a porcentagem de mensagens para cada pessoa
    const topPeopleWithPercentage = topPeople.map(({ person, count }) => ({
        person,
        count,
        percentage: ((count / totalMessages) * 100).toFixed(2)
    }));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Foto de Perfil */}
      <img src={user === "Rafael" ? RafaelImg : user === "Francisco" ? FranciscoImg : user === "Andrezza" ? AndrezzaImg : user === "Marta" ? MartaImg : user === "Sofia" ? SofiaImg : DefaultImg} alt="User" />

      {/* Informações do perfil */}
      <div className="flex flex-col items-center m-4">
          <h1 className="text-3xl font-bold mt-2">{user}</h1>
          <p className="text-sm">Email: {user.toLowerCase()}@gmail.com</p>
      </div>

      {/* Top de pessoas com quem o usuário fala mais */}
      <div className="m-4">
          <h2 className="text-lg font-bold mb-2">Top Pessoas:</h2>
          <ul>
          {topPeopleWithPercentage
          .sort((a, b) => b.percentage - a.percentage)
          .map(({ person, count, percentage }) => (
              <li key={person} className="text-sm mb-2">
                  {person}: {count} mensagens: {percentage}%
                  <div className="h-3 bg-gray-200 mt-1">
                      <div
                          className="h-full bg-blue-500"
                          style={{ width: `${percentage}%` }}
                      ></div>
                  </div>
              </li>
          ))}
      </ul>
      </div>

      {/* Back Button */}
      <div className="fixed top-5 left-3">
        <button onClick={() => onChangePage("list")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full m-4 flex items-center p-2 w-11">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

    </div>
  );
}

