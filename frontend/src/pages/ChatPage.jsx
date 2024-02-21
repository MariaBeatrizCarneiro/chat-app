import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import MessageSentSound from '../sounds/message_sent.mp3';

import RafaelImg from '../images/rafael.jpg';
import FranciscoImg from '../images/francisco.jpg';
import AndrezzaImg from '../images/andrezza.jpg';
import MartaImg from '../images/marta.jpg';
import SofiaImg from '../images/sofia.jpg';
import DefaultImg from '../images/default.png';

export function ChatPage({ onChangePage, user, pessoa }) {

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


    // History entre 'user' e 'pessoa'
    const historyEntreXeY = history.filter(e => (e.from === user && e.to === pessoa) || (e.from === pessoa && e.to === user));
  

    // State para guardar o conteudo da nova mensagem
    const [novaMensagem, setNovaMensagem] = useState(""); 

    // Coisas necessárias para enviar o conteudo da mensagem para o backend
    const enviarMensagem = (e) => {
      e.preventDefault(); // Evita o comportamento padrão de envio do formulário
      const from = user;
      const to = pessoa;
      const content = novaMensagem;

      const mensagem = {
          content: content,
      };

      fetch(`/api/messages/send/${from}/${to}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(mensagem),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to send message');
          }
          return response.json();
      })
      .then(data => {
          console.log('Message sent successfully:', data);
          fetchHistory();       // Chama novamente a função fetchHistory() para buscar o histórico atualizado
          setNovaMensagem("");  // Limpa o campo de entrada da nova mensagem
      })
      .catch(error => {
          console.error('Error sending message:', error);
      });

      playMessageSentSound();
  
    };

    // Constante que faz com que a tecla 'enter' funcione para submeter uma mensagem
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        enviarMensagem(event);
      }
    };
  

    // Coisas para rolar para o final quando historyEntreXeY mudar
    const messagesEndRef = useRef(null);
  
    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [historyEntreXeY]); 

  
    // Coisas coisas necessárias para o som
    const audioRef = useRef(null);

    const playMessageSentSound = () => {
        audioRef.current.play();
    };

  return (
    <div className="flex flex-col p-4">

      {/* Header */}
        <Header onChangePage={onChangePage} userName={user} userImage={user === "Rafael" ? RafaelImg : user === "Francisco" ? FranciscoImg : user === "Andrezza" ? AndrezzaImg : user === "Marta" ? MartaImg : user === "Sofia" ? SofiaImg : DefaultImg}/>

      {/* Título */}
      <h1 className="text-3xl font-bold bg-white p-4 mb-4 text-center">Conversa com {pessoa}:</h1>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: "65vh" }}>
        {historyEntreXeY.map((message, index) => (
            <div key={index} className={`flex ${message.from === user ? 'justify-end' : 'justify-start'} mb-2`}>

                {message.from !== user && (
                  <img src={ message.from === "Rafael" ? RafaelImg : message.from === "Francisco" ? FranciscoImg : message.from === "Andrezza" ? AndrezzaImg : message.from === "Marta" ? MartaImg : message.from === "Sofia" ? SofiaImg : DefaultImg } alt={message.from} className="h-8 w-8 rounded-full mr-2"/>
                )}
                <div className={`p-3 rounded-xl font-bold shadow-md ${message.from === user ? 'bg-green-500 text-white ms-10 rounded-br-none' : 'bg-gray-200 text-gray-800 me-10 rounded-tl-none'}`}>
                    {message.content}
                </div>
            </div>
        ))}
        {/* Referência para o final da div */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Caixa de texto para nova mensagem */}
      <div className="fixed bottom-0 left-0 right-0">
        <div className="bg-white p-4 flex items-center">
          <input type="text" value={novaMensagem} onChange={(e) => setNovaMensagem(e.target.value)} onKeyDown={handleKeyPress} className="border border-gray-400 rounded-xl px-4 py-2 flex-1 mr-3" placeholder="Digite sua mensagem..." />
          <button onClick={enviarMensagem} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl">Enviar</button>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed top-5 left-3">
        <button onClick={() => onChangePage("list")} className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full m-4 flex items-center p-2 w-11">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Áudio */}
      <audio ref={audioRef} src={MessageSentSound} preload="auto" style={{ display: 'none' }} />

    </div>
  );
}
