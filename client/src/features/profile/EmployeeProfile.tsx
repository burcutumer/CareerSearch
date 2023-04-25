import { Grid, Typography, Divider, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { JobApplication } from "../../app/models/jobApplication";

export default function EmployeeProfile() {
    const { user } = useStoreContext();
    const [applications, setApplications] = useState<JobApplication[] | null>(null);

    useEffect(() => {
        agent.Applications.list()
            .then(applications => setApplications(applications))
            .catch(error => console.log(error))
    }, [])

    if (applications == null) return <div>Loading...</div>
    return (
        <Grid item xs={8}>
            <Typography variant="h4" sx={{ m: 2 }}>Applications</Typography>
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
                        {applications?.map((applic) => (
                            <TableRow key={applic.id}>
                                <TableCell>{applic.jobPosting.companyName}</TableCell>
                                <TableCell align="right">{applic.jobPosting.position}</TableCell>
                                <TableCell align="right">{applic.jobPosting.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}