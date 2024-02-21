import React, { useEffect, useState } from "react";

export function LoginPage({ onChangePage, setUser }) {

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

    // Array com todos os nomes existentes no history
    const allNames = [...new Set(history.map(item => item.from).concat(history.map(item => item.to)))];

    // State para guardar o username
    let [username, setUsername] = useState("");

    // State para guardar a mensagem de erro
    const [error, setError] = useState("");

    // Função que é executada quando se carrega no botão 'Login' ou quando o form é submetido (carregando no enter)
    const handleLogin = (e) => {
        e.preventDefault(); // Evita o comportamento padrão de recarregar a página ao enviar o formulário
        username = username.charAt(0).toUpperCase() + username.slice(1) // Passa a primeira letra do nome submetido para maiúscula caso não seja

        if (!allNames.includes(username)) {
            setError("User não encontrado"); // Se o nome submetido não estiver na lista erro = "User não encontrado"
            return;
        }

        setUser(username);      // Define o 'user' como 'username' (para as outras páginas)
        onChangePage("list");  // Muda de página para a ListPage
    };

  return (
    <div className="min-h-screen flex items-center justify-center">
        <div>
            {/* Título */}
            <h1 className="text-3xl text-center font-bold mb-4">Iniciar Sessão</h1>

            {/* Barra de Pesquisa */}
            <form onSubmit={handleLogin} className="mb-4">
                <input list="username" type="text" placeholder="Escreva o seu nome" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-gray-400 rounded-xl px-4 py-2 w-64"/>
                <datalist id="username">
                    {allNames.map((e, index) => (
                        <option key={index} value={e} />
                    ))}
                </datalist>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl ml-2">Entrar</button>
            </form>

            {/* Mostra a mensagem de erro, se houver */}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    </div>
  );
}
