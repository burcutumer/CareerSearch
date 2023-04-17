import { useStoreContext } from "../../app/context/StoreContext";

export default function JobApplicationDetail (){

    const {user} = useStoreContext();

    return (
        <>
        it is  application detail---
        you applied for job.position  in job.companyName



        </>
    )
}