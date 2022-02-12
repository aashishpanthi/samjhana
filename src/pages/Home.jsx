import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section
      style={{
        backgroundImage:
          'url("https://shuffle.dev/nereus-assets/img/bg/pattern1.png")',
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography variant="h2" component="h2" gutterBottom={true}>
            <Typography color="primary" variant="h2" component="span">
              A beautiful place{" "}
            </Typography>
            <Typography variant="h2" component="span">
              to remember your loved one.
            </Typography>
          </Typography>
          <Container maxWidth="sm">
            <Typography
              variant="subtitle1"
              color="textSecondary"
              paragraph={true}
            >
              You never forget your passed loved one. Create memory and share
              with others. So they stay with you forever.
            </Typography>
          </Container>
          <Box mt={3}>
            <Button
              component={Link}
              to={"/login"}
              sx={{ my: 2 }}
              variant="outlined"
              size="large"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Home;
