import { JobPost } from "./jobPost";
import { User } from "./user";

export interface JobApplication {
    id: number;
    cv: string;
    applicant: User;
    jobPosting: JobPost;
    createdAt: string;
}

//modellerimdeki isimlendirmelerim ayni olmali ki bulunsun!!! jobposting  backenddekiyle ayni isimde olmali