import { Container, Typography, Box, Button } from "@mui/material";
import { Helmet } from "react-helmet";

const Home = ({ handleClickOpen }) => {
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Samjhana - You live forever</title>
        <meta
          name="description"
          content="Samjhana - A place where you live forever"
        />
        <meta property="og:url" content="https://samjhana.netlify.app/" />
        <meta
          property="og:title"
          content="Samjhana — Make a sympathy card — You live forever"
        />
        <meta
          property="og:description"
          content="A place which makes you immortal"
        />
        <meta
          property="og:image:url"
          content="https://samjhana.netlify.app/Banner.png"
        />
      </Helmet>
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
              sx={{ my: 2 }}
              variant="outlined"
              size="large"
              onClick={handleClickOpen}
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
