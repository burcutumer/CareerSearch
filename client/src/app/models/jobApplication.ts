import { JobPost } from "./jobPost";
import { User } from "./user";

export interface JobApplication {
    id: number;
    cv: string;
    applicant: User;
    jobPost: JobPost;
    dateTime: string;
}