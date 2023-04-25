import { Grid, Typography, Divider, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { JobPost } from "../../app/models/jobPost";
import { useParams } from "react-router-dom";
import { JobApplication } from "../../app/models/jobApplication";

export default function Applicants () {
    const { user } = useStoreContext();
    const { id } = useParams<{ id: string }>();
    const jobId = parseInt(id!);
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([])


    useEffect(() => {
        agent.Jobs.detailsEmployer(jobId)
            .then(data => setJobApplications(data.applications))
            .catch(error => console.log(error))
    }, [])

    if (jobApplications.length === 0) return <div>Loading...</div>

    return (
        <Grid item xs={8}>
                    <Typography variant="h4" sx={{ m: 2 }}>Applicants</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full Name</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">CV</TableCell>
                                    <TableCell align="right">Application Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jobApplications?.map((application) => (
                                    <TableRow key={application.id}>
                                        <TableCell>{application.applicant.fullName}</TableCell>
                                        <TableCell align="right">{application.applicant.email}</TableCell>
                                        <TableCell align="right">{application.cv}</TableCell>
                                        <TableCell align="right">{application.createdAt}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
    )
}