import { Box, Container, Typography } from "@mui/material";
import DomainVerificationIcon from "@mui/icons-material/DomainVerification";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export function Header() {
  return (
    <Box
      component="header"
      sx={{ p: 2, border: "2px dashed grey", width: "100vw" }}
    >
      <Container sx={{ alignItems: "left", display: "flex", flexFlow: "row" }}>
        <DomainVerificationIcon
          sx={{ height: "2.6em", width: "auto", display: "flex", mr: 1.4 }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h3" component="h1">
            PROJETE
          </Typography>
        </Box>
        <Box
          sx={{ width: "100%", display: "flex", flexDirection: "row-reverse" }}
        >
          <Link to="/">
            <Button className="icon-button-custom">
              <i className="bi bi-house"></i>
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
