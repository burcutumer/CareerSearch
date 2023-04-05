import { useState, useEffect } from "react";
import { JobPost } from "../../app/models/jobPost"
import JobPostingList from "./JobPostingList"



export default function JobPosting() {

    const [jobs, setJobs] = useState<JobPost[]>([]);

    useEffect(() => {
        fetch('https://localhost:7064/api/JobPosting/jobs')
            .then(response => response.json())
            .then(datas => setJobs(datas.data))
    }, [])

    return (
        <>
            <JobPostingList jobs={jobs} />
        </>
    )
}