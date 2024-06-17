import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Container,
  Autocomplete,
} from "@mui/material";
import { Header } from "../../components/Header";

export function Register() {
  const [username, setUsername] = useState("");
  const [secret_question, setSecret_Question] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const securityQuestions = [
    { label: "Qual seu melhor amigo de infancia?", id: 1 },
    { label: "Qual o nome do seu primeiro animal de estimação?", id: 2 },
    { label: "Qual o nome da cidade que você nasceu?", id: 3 },
    { label: "Qual sobrenome do meio da sua avó?", id: 4 },
  ];

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      console.log("sera que esse execulta?");

      const response = await axios.post("http://localhost:4000/user", {
        username,
        email,
        password,
        secret_question,
      });

      console.log("esse não execulta");

      console.log(response); //To do: Descobrir o que fazer com esse response

      if (response.status === 201) {
        navigate("/projects");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setError("Um ou mais campos foram preenchidos incorretamente");
      } else {
        setError("Erro " + error.response.status);
      }
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 2 }}>
        <Box
          component="main"
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          <Paper
            sx={{
              height: "fit-content",
              bgcolor: "#222",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              flexFlow: "column",
              p: "80px",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ textAlign: "center", mb: 8 }}
            >
              Registro
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs="12" md="12">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Usuário"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  type="password"
                  label="Senha"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Autocomplete
                  options={securityQuestions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth={true}
                      label="Pergunta de Segurança"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  type="password"
                  label="Senha de Segurança"
                  variant="outlined"
                  value={secret_question}
                  onChange={(e) => setSecret_Question(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth={true}
                  onClick={handleRegister}
                  variant="contained"
                  sx={{
                    height: "56px",
                    fontSize: "16px",
                  }}
                >
                  Cadastrar
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button
                    fullWidth={true}
                    variant="outlined"
                    sx={{
                      height: "56px",
                      fontSize: "16px",
                    }}
                  >
                    Voltar
                  </Button>
                </Link>
              </Grid>
              {!!error && (
                <Grid item xs="12">
                  <span
                    style={{ display: "flex", justifyContent: "center" }}
                    className="error-message"
                  >
                    {error}
                  </span>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
