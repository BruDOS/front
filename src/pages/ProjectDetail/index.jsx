import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Box } from "@mui/material";
import "./styles.css";
import { Card, Container, Row, Col } from "react-bootstrap";

export const ProjectDetail = () => {
  let { id } = useParams();

  const [name_project, setName_project] = useState();
  const [status_project, setStatus_project] = useState();
  const [resume_project, setResume_project] = useState();

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [projetoId, setProjetoId] = useState();

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
      setProjetoId(response.data.id_project);
      console.log("teste: ", response.data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/task/project/${id}`
      );
      setTarefas(response.data);
      console.log("ProjetoId: ", id); // Printando projetoId no console
      console.log("Tarefas: ", response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleCriacaoTask = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("http://localhost:4000/task", {
        name,
        description,
        projetoId,
      });
      setOpenCriacao(false);
      fetchTasks();
    } catch (error) {
      console.error("Erro durante o cadastro:", error);
      if (error.response && error.response.status === 404) {
        setError("Credenciais inválidas");
      } else {
        setError(error.message || "Erro ao criar tarefa");
      }
    }
  };

  const handleOpenCriacao = () => {
    setOpenCriacao(true);
  };

  const handleCloseCriacao = () => {
    setOpenCriacao(false);
  };

  return (
    <main className="fundo-task">
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Detalhes do Projeto</h2>
            <p>ID do Projeto: {id}</p>
            <p>nome do Projeto: {name_project}</p>
            <p>status do Projeto: {status_project}</p>
            <p>resumo do Projeto: {resume_project}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <h1>Tarefas</h1>
            {tarefas.length > 0 ? (
              tarefas.map((tarefa) => (
                <Card key={tarefa.id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{tarefa.name}</Card.Title>
                    <Card.Text>{tarefa.description}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>Nenhuma tarefa encontrada.</p>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenCriacao}
            >
              Adicionar Tarefas
            </Button>
          </Col>
        </Row>

        <Modal open={openCriacao} onClose={handleCloseCriacao}>
          <Box sx={{ width: 400, p: 4, margin: "auto", marginTop: "10%" }}>
            <form onSubmit={handleCriacaoTask}>
              <div className="form-group">
                <label htmlFor="name">Nome da Tarefa</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Salvar
              </button>
            </form>
          </Box>
        </Modal>
      </Container>
    </main>
  );
};
