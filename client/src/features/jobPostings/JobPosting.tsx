import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { JobPost } from "../../app/models/jobPost"
import JobPostingList from "./JobPostingList"



export default function JobPosting() {
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Jobs.list()
        .then( jobs => setJobs(jobs))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message="Loading job postings"/>

    return (
        <>
            <JobPostingList jobs={jobs} />
        </>
    )
}