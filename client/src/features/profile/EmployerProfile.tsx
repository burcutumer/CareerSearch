import { Grid, Typography, Divider, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { JobPost } from "../../app/models/jobPost";

export default function EmployerProfile () {

    const navigate = useNavigate();
    const { user } = useStoreContext();
    const [jobs, setJobs] = useState<JobPost[] | null>(null);

    useEffect(() => {
        agent.Jobs.listEmployer()
            .then(jobs => setJobs(jobs))
            .catch(error => console.log(error))
    }, [])

    if (jobs == null) return <div>Loading...</div>


    return (
        <Grid item xs={8}>
                    <Typography variant="h4" sx={{ m: 2 }}>Job Postings</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell align="right">Position</TableCell>
                                    <TableCell align="right">Application Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jobs?.map((job) => (
                                    <TableRow onClick={() => navigate(`/profile/posts/${job.id}`)} >
                                        <TableCell>{job.companyName}</TableCell>
                                        <TableCell align="right">{job.position}</TableCell>
                                        <TableCell align="right">{job.createdAt}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
    )
}