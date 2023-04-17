import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import agent from "../../app/api/agent";
import { FieldValues, useForm } from "react-hook-form";
import { useStoreContext } from "../../app/context/StoreContext";


export default function Login() {
    const { setUser } = useStoreContext();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'onTouched'
    });

    const navigate = useNavigate();

    function submitForm(data: FieldValues) {
        agent.Account.login(data).then((res) => {
            localStorage.setItem("jwt", res.jwtToken);
            agent.Account.curentUser()
                .then(user => setUser(user))
                .catch(e => localStorage.removeItem("jwt"))
            navigate("/")
        }).catch(e => console.log(e))
    }

    return (
        <Container
            component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email"
                    autoFocus
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', { required: 'password is required' })}
                    error={!!errors.password} //make it boolean  !!
                    helperText={errors?.password?.message as string}
                />
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/register">
                            {"Don't have an account? Register"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}