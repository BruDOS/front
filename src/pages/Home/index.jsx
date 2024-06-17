import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { Header } from "../../components/Header";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

export function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      const token = response.data?.access_token;
      if (token) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/projects");
      } else {
        throw new Error("Token não encontrado na resposta");
      }

      console.log(error);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Credenciais inválidas");
      } else {
        setError(error.message || "Credenciais inválidas");
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
              p: "100px",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ textAlign: "center", mb: 8 }}
            >
              Bem-vindo!
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    minWidth: 260,
                  }}
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
                  sx={{
                    minWidth: 260,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth={true}
                  onClick={handleLogin}
                  variant="contained"
                  sx={{
                    alignSelf: "stretch",
                    height: "56px",
                    fontSize: "16px",
                  }}
                >
                  Entrar
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button
                    fullWidth={true}
                    variant="outlined"
                    sx={{
                      height: "56px",
                      fontSize: "16px",
                    }}
                  >
                    Cadastre-se
                  </Button>
                </Link>
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
          </Paper>
        </Box>
      </Container>
    </>
  );
}
