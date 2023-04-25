import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { JobPost } from "../../app/models/jobPost";

export default function JobDetails() {

    const { user } = useStoreContext();
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<JobPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        id && agent.Jobs.details(parseInt(id)).then(job => setJob(job))   // i have the id && believe me
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id])

    if (loading) return <LoadingComponent message="Loading Job..." />
    if (!job) return <h3>Job Posting not found</h3>



    return (
        <Grid container spacing={3}>
            <Grid item xs={3} >
                <Typography sx={{ mb: 3, ml: -10 }} variant="h4">{job.companyName} </Typography>
                <Typography sx={{ mb: 3, ml: -10 }} variant="subtitle1">{job.companyName} </Typography>
            </Grid>
            <Grid item xs={9}>
                <Grid container spacing={6} sx={{ mb: 4 }}>
                    <Grid item xs={9} >
                        <Typography sx={{ mb: 3, ml: 20 }} variant="h4">{job.position} </Typography>
                        <Divider sx={{ mb: 4 }} />
                        <Typography sx={{ ml: 30 }} variant="h6" color="secondary">{job.companyName}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {user?.role === 'employee' && <LoadingButton
                            sx={{ height: '55px' }}
                            color='primary' size='large'
                            variant="contained"
                            fullWidth
                            component={Link} to={`/jobApplicationDetail/${id}`}
                        >Apply
                        </LoadingButton>}
                    </Grid>
                </Grid>
                <Divider sx={{ mb: 4 }} />
                <Typography sx={{ mb: 2 }} variant="subtitle1"> Posted : {job.createdAt} </Typography>
                <Typography sx={{ mb: 2 }} variant="h6"> Posted : {job.position} </Typography>

            </Grid>
        </Grid>

    )
}
