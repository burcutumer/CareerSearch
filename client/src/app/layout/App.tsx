import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import JobPosting from "../../features/jobPostings/JobPosting";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import JobDetails from "../../features/jobPostings/JobDetails";
import JobApplicationDetail from "../../features/jobApplication/JobApplicationDetail";
import JobApplications from "../../features/jobApplication/JobApplications";
import PostAJob from "../../features/jobPostings/PostAJob";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { useEffect } from "react";
import agent from "../api/agent";
import { useStoreContext } from "../context/StoreContext";

function App() {
  const { user, setUser } = useStoreContext();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt && !user) {
      agent.Account.curentUser()
        .then(user => setUser(user))
        .catch(e => localStorage.removeItem("jwt"))
    }
  }, [user, setUser])

  
  const theme = createTheme({
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
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/jobPosting' element={<JobPosting />} />
          <Route path='/jobPosting/new' element={<PostAJob />} />
          <Route path='/jobPosting/:id' element={<JobDetails />} />
          <Route path='/jobApplication/:id' element={<JobApplicationDetail />} />
          <Route path='/jobApplication' element={<JobApplications />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<HomePage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
