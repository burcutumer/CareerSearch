import { Avatar, Grid, Typography } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import EmployeeProfile from "./EmployeeProfile";
import EmployerProfile from "./EmployerProfile";


export default function Profile() {

    const { user } = useStoreContext();

    return (
        <Grid container spacing={6} >
            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 7 }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
                <Typography variant="h3" sx={{ m: 2 }}> {user?.fullName}</Typography>
                <Typography variant="h5"> {user?.email}</Typography>
            </Grid>
            {(user?.role === "employee") ? (
                <EmployeeProfile/>
            ) : (
                <EmployerProfile/>
            )}
        </Grid>
    )
}