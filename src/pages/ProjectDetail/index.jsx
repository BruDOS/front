import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Modal,
  Box,
  Container,
  Typography,
  Grid,
  Card,
  TextField,
} from "@mui/material";
import "./styles.css";
// import { Card, Container, Row, Col } from "react-bootstrap";
import { Header } from "../../components/Header";

export const ProjectDetail = () => {
  let { id } = useParams();

  // dados de projeto
  const [name_project, setName_project] = useState();
  const [status_project, setStatus_project] = useState();
  const [resume_project, setResume_project] = useState();

  // dados de task
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
      handleCloseCriacao();
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
    setName("");
    setDescription("");
    setError("");
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 2 }}>
        <Box
          sx={{
            height: "80px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
            Projeto
          </Typography>
        </Box>
        <Card
          onClick={handleOpenCriacao}
          sx={{
            borderRadius: 5,
            padding: 4,
            alignContent: "center",
            minHeight: 40,
          }}
        >
          <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
            {name_project}
          </Typography>
          <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
            {status_project}
          </Typography>
          <br />
          <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
            {resume_project}
          </Typography>
        </Card>
      </Container>

      <Container component="main" sx={{ marginTop: 2 }}>
        <Box
          sx={{
            height: "80px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
            To-Do
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {/* Card de novo to-do */}
          <Grid item xs={12} md={6} lg={4}>
            <Card
              onClick={handleOpenCriacao}
              sx={{
                borderRadius: 5,
                padding: 4,
                alignContent: "center",
                minHeight: 40,
                height: "100%",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                + Novo To-Do
              </Typography>
            </Card>
          </Grid>
          {/* to-dos do usuario */}
          {tarefas.map((tarefa) => (
            <Grid item xs={12} md={6} lg={4} key={tarefa.id}>
              {/* TODO: Adicionar a pagina de tarefas (to-dos) */}
              {/* <Link
                to={`/projects/${project.id_project}`}
                style={{ textDecoration: "none" }}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              > */}
              <Card
                sx={{
                  borderRadius: 5,
                  padding: 4,
                  alignContent: "center",
                  verticalAlign: "center",
                  minHeight: 40,
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ textAlign: "center" }}
                >
                  {tarefa?.name}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: "center" }}
                >
                  {tarefa?.description}
                </Typography>
              </Card>
              {/* </Link> */}
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal criação de novo to-do */}
      <Modal open={openCriacao} onClose={handleCloseCriacao}>
        <Card
          variant="outlined"
          sx={{
            minWidth: 400,
            p: 5,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ textAlign: "center", mb: 4 }}
          >
            Novo To-Do
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Descrição"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleCriacaoTask}>Salvar</Button>
            </Grid>
            {!!error && (
              <Grid item xs={12}>
                <span
                  style={{ display: "flex", justifyContent: "center" }}
                  className="error-message"
                >
                  {error}
                </span>
              </Grid>
            )}
          </Grid>
        </Card>
      </Modal>
    </>
  );
};
