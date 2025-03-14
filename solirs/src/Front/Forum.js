// Página Fórum
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Styles/Forum.css";

function Forum() {
    const navigate = useNavigate();
    const [topics, setTopics] = useState([
      { id: 1, title: "Qual o melhor abrigo em Porto Alegre?", content: "Alguém sabe qual é o melhor lugar para se abrigar em Porto Alegre?" },
      { id: 2, title: "Como posso ajudar as vítimas?", content: "Quais são as melhores maneiras de ajudar as vítimas das enchentes?" },
    ]);
    const [newTopic, setNewTopic] = useState({ title: "", content: "" });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewTopic((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newId = topics.length + 1;
      setTopics([...topics, { id: newId, title: newTopic.title, content: newTopic.content }]);
      setNewTopic({ title: "", content: "" }); // Limpa o formulário
    };
  
    return (
      <div className="forum-container">
        <button className="top-right-button" onClick={() => navigate("/home")}>
          Voltar
        </button>
        <h2>Fórum</h2>
        <form onSubmit={handleSubmit} className="new-topic-form">
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={newTopic.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content"
            placeholder="Conteúdo"
            value={newTopic.content}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Criar Tópico</button>
        </form>
  
        <h3>Tópicos Recentes</h3>
        <ul>
          {topics.map((topic) => (
            <li key={topic.id} className="topic-item">
              <h4>{topic.title}</h4>
              <p>{topic.content}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default Forum;