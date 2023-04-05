import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import JobPosting from "../../features/jobPostings/JobPosting";
import Header from "./Header";


function App() {
const theme= createTheme({
  palette: {
    background: {
      default: '#eaeaea'
    }
  }
})

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container>
        <JobPosting />
      </Container>
    </ThemeProvider>
  );
}

export default App;
