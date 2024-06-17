import {
  Autocomplete,
  Box,
  Card,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";

export function Projects() {
  const [projects, setProjects] = useState([]);

  const [name_project, setName_project] = useState("");
  const [resume_project, setResume_project] = useState("");
  const [status_project, setStatus_project] = useState("");
  const [userIdUser, setUserIdUser] = useState(null);

  const [openCriacao, setOpenCriacao] = useState(false);
  const [error, setError] = useState("");

  const projectStatusOptions = [
    { label: "Futuro", id: 1 },
    { label: "Pendente", id: 2 },
    { label: "Em andamento", id: 3 },
    { label: "Finalizado", id: 4 },
    { label: "Prioridade", id: 5 },
    { label: "Atrasado", id: 6 },
    { label: "Cancelado", id: 7 },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token recuperado:", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded);
        setUserIdUser(decoded.sub);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    } else {
      console.log("Token não encontrado no localStorage.");
    }
  }, []);

  useEffect(() => {
    console.log("Valor de userIdUser:", userIdUser);
    if (userIdUser) {
      fetchProjects();
    } else {
      console.log("userIdUser está nulo ou indefinido.");
    }
  }, [userIdUser]);

  const handleCriacaoProjetos = async (e) => {
    try {
      e.preventDefault();
      console.log(name_project, resume_project, status_project);
      const response = await axios.post(
        "http://localhost:4000/project",
        {
          name_project,
          resume_project,
          status_project,
          userIdUser,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      handleCloseCriacao();
      fetchProjects(); // Atualiza a lista de projetos após a criação
    } catch (error) {
      console.error("Erro durante o cadastro: ", error);
      if (error.response && error.response.status === 404) {
        setError("Credenciais inválidas");
      } else {
        setError(error.message || "Credenciais inválidas");
      }
    }
  };

  const fetchProjects = async () => {
    try {
      console.log("Buscando projetos para userIdUser:", userIdUser);
      const response = await axios.get(
        `http://localhost:4000/project/user/${userIdUser}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Dados recebidos da API:", response.data);
      setProjects(response.data);
    } catch (error) {
      console.error("Houve um erro ao buscar os projetos!", error);
    }
  };

  const handleOpenCriacao = () => {
    setOpenCriacao(true);
  };

  const handleCloseCriacao = () => {
    setOpenCriacao(false);
    setName_project("");
    setResume_project("");
    setStatus_project("");
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
            Projetos
          </Typography>
        </Box>
      </Container>

      <Container component="main" sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          {/* Card de novo projeto */}
          <Grid item xs={12} md={6} lg={4}>
            <Card
              onClick={handleOpenCriacao}
              sx={{
                borderRadius: 5,
                padding: 4,
                alignContent: "center",
                minHeight: 40,
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
                + Novo Projeto
              </Typography>
            </Card>
          </Grid>
          {/* Cards com projetos do usuário */}
          {projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id_project}>
              <Link
                to={`/projects/${project.id_project}`}
                style={{ textDecoration: "none" }}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Card
                  sx={{
                    borderRadius: 5,
                    padding: 4,
                    alignContent: "center",
                    verticalAlign: "center",
                    minHeight: 40,
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ textAlign: "center" }}
                  >
                    {project?.name_project}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Modal criação de novo projeto */}
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
            Novo Projeto
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                value={name_project}
                onChange={(e) => setName_project(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                id="outlined-basic"
                label="Sobre"
                variant="outlined"
                value={resume_project}
                onChange={(e) => setResume_project(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={projectStatusOptions}
                onChange={(e, value) => setStatus_project(value.label)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth={true} label="Estado" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleCriacaoProjetos}>Salvar</Button>
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
}
