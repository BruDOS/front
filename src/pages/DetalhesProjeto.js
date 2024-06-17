import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Button, Modal, Box } from '@mui/material';
import './style/projetos.css';
import { Card } from 'react-bootstrap';

const DetalheProjeto = () => {
    let { id } = useParams();

    const [name_project, setName_project] = useState();
    const [status_project, setStatus_project] = useState();
    const [resume_project, setResume_project] = useState();

    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [projetoId, setProjetoId] = useState();

    const [open, setOpen] = useState(false);
    const [openCriacao, setOpenCriacao] = useState(false);
    const [error, setError] = useState("");

    const [tarefas, setTarefas] = useState([]);



    useEffect(() => {
        fetchProjects();
        fetchTasks();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/project/${id}`);
            setName_project(response.data.name_project);
            setStatus_project(response.data.status_project);
            setResume_project(response.data.resume_project);
            console.log("teste: ", response.data);
        } catch (error) {
            console.error('Erro ao buscar projetos:', error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/task/project/${id}`);
            setTarefas(response.data);
            console.log("Tarefas: ", response.data);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        }
    };

    const handleCriacaoTask = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post("http://localhost:4000/task", {
                name,
                description,
                projetoId
            });
            setOpenCriacao(false);
            fetchTasks();
        } catch {
            console.error("Erro durante o cadastro:", error);
            if (error.response && error.response.status === 404) {
                setError("Credenciais inválidas");
            } else {
                setError(error.message || "Credenciais inválidas");
            }
        }
    }

    return (

        <div className="container mt-5">
            <h2>Detalhes do Projeto</h2>
            <p>ID do Projeto: {id}</p>
            <p>nome do Projeto: {name_project}</p>
            <p>status do Projeto: {status_project}</p>
            <p>resumo do Projeto: {resume_project}</p>
            {/* Outras informações do projeto podem ser renderizadas aqui */}
            
            <h1>Tarefas</h1>
            {tarefas.length > 0 ? (
                tarefas.map((tarefa) => (
                    <Card key={tarefa.id}>
                        <Card.Body>
                            <Card.Title>{tarefa.name}</Card.Title>
                            <Card.Text>{tarefa.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>Nenhuma tarefa encontrada.</p>
            )}

            <Card>

            </Card>
            <Button variant="outlined" color="primary" onClick={handleCriacaoTask}>
                Adicionar Tarefas
            </Button>
        </div>

    );
};

export default DetalheProjeto;