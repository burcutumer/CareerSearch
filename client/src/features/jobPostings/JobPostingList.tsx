import { Grid } from "@mui/material";
import { JobPost } from "../../app/models/jobPost";
import JobPostingCard from "./JobPostingCard";

interface Props{
    jobs: JobPost[]
}

export default function JobPostingList({jobs}:Props){
    return(
        <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={4} key={job.id}>
            <JobPostingCard  job={job}/>
          </Grid>
        ))}
      </Grid>
    )
}