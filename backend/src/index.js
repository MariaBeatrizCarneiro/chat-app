const express = require('express')
const app = express()
const port = 4040

let history = [
    {
        from: "Rafael",
        to: "Francisco",
        content: "Francisco, como está a programação hoje? 💻",
        dateInMs: Date.now()
    },
    {
        from: "Francisco",
        to: "Rafael",
        content: "Bemm!🤓",
        dateInMs: Date.now() + 10000
    },
    {
        from: "Rafael",
        to: "Andrezza",
        content: "Andrezza, como vão as aulas de JavaScript? 🤭",
        dateInMs: Date.now() + 20000
    },
    {
        from: "Andrezza",
        to: "Rafael",
        content: "Muito bem! Os alunos estão a adorar!!",
        dateInMs: Date.now() + 30000
    },
    {
        from: "Rafael",
        to: "Sofia",
        content: "Como correu a sessão de desenvolvimento de competências interpessoais?",
        dateInMs: Date.now() + 40000
    },
    {
        from: "Sofia",
        to: "Rafael",
        content: "Rafa, foi ótimo! 🤩",
        dateInMs: Date.now() + 50000
    },
    {
        from: "Sofia",
        to: "Rafael",
        content: "Tivemos uma participação incrível dos alunos!",
        dateInMs: Date.now() + 50000
    },
    {
        from: "Rafael",
        to: "Marta",
        content: "Marta, e uma aula sobre resolução de conflitos?",
        dateInMs: Date.now() + 60000
    },
    {
        from: "Marta",
        to: "Rafael",
        content: "Acho ótima ideia!",
        dateInMs: Date.now() + 70000
    },
    {
        from: "Marta",
        to: "Rafael",
        content: "Os aulos vão amar! 🤪",
        dateInMs: Date.now() + 80000
    },
    {
        from: "Andrezza",
        to: "Francisco",
        content: "Francisco, reparei num bug na plataforma. 👾",
        dateInMs: Date.now() + 80000
    },
    {
        from: "Francisco",
        to: "Andrezza",
        content: "Onde?? 🧐",
        dateInMs: Date.now() + 90000
    },
    {
        from: "Andrezza",
        to: "Sofia",
        content: "Então, como correu a aula hoje?",
        dateInMs: Date.now() + 100000
    },
    {
        from: "Sofia",
        to: "Andrezza",
        content: "Bem!",
        dateInMs: Date.now() + 110000
    },
    {
        from: "Sofia",
        to: "Andrezza",
        content: "Os alunos adoraram!",
        dateInMs: Date.now() + 120000
    },
    {
        from: "Andrezza",
        to: "Marta",
        content: "Marta, a aula amanhã pode ser sobre inteligência emocional?",
        dateInMs: Date.now() + 120000
    },
    {
        from: "Marta",
        to: "Andrezza",
        content: "Claro, Andrezza! 🗣️",
        dateInMs: Date.now() + 130000
    },
    {
        from: "Marta",
        to: "Andrezza",
        content: "Vou já trabalhar nisso",
        dateInMs: Date.now() + 130000
    },
    {
        from: "Francisco",
        to: "Sofia",
        content: "Sofia, vou mudar a interface do usuário.",
        dateInMs: Date.now() + 180000
    },
    {
        from: "Francisco",
        to: "Sofia",
        content: "Podes-me dar feedback? 😁",
        dateInMs: Date.now() + 190000
    },
    {
        from: "Sofia",
        to: "Francisco",
        content: "Claro!",
        dateInMs: Date.now() + 190000
    },
    {
        from: "Sofia",
        to: "Francisco",
        content: "Vou ver e já te digo algo. 👀",
        dateInMs: Date.now() + 190000
    },
    {
        from: "Francisco",
        to: "Marta",
        content: "Marta, ajudas-me a criar um tutorial sobre o uso da plataforma?",
        dateInMs: Date.now() + 200000
    },
    {
        from: "Marta",
        to: "Francisco",
        content: "Simm!",
        dateInMs: Date.now() + 210000
    },
    {
        from: "Marta",
        to: "Francisco",
        content: "📚 Vou fazer um roteiro e já te mando.",
        dateInMs: Date.now() + 210000
    },
    {
        from: "Sofia",
        to: "Marta",
        content: "Marta, podemos discutir algumas estratégias?",
        dateInMs: Date.now() + 260000
    },
    {
        from: "Marta",
        to: "Sofia",
        content: "Claro! 🤝 Vamos marcar uma reunião.",
        dateInMs: Date.now() + 270000
    },
];


// GET /api/messages/:user //Carrega todas as conversas de um utilizador
// POST /api/messages/send/:from/:to //Guarda uma mensagem de um utilizador para outro

app.get("/api/messages", (req, res) => {
    res.json({ history })
})


app.get("/api/messages/:user", (req, res) => {
    const { user } = req.params;
    const userMessages = history.filter(msg => msg.to === user || msg.from === user);
    res.json({ messages: userMessages });
});


// coisas necessárias para receber o 'content' do frontend
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.post("/api/messages/send/:from/:to", (req, res) => {
    const { from, to } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    const message = history.push({
        from,
        to,
        content,
        dateInMs: Date.now()
    })

    res.status(201).json({ message });
});


app.listen(port, () => { console.log(`À escuta em http://localhost:${port}`) })
