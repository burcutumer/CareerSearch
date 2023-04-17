import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Container, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";


export default function Register() {

    const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid }, watch } = useForm({
        mode: 'all'
    })
    const isciMi = (value: String) => {
        return value === 'employee';
    }
    const isci = isciMi(watch('isEmployee'));
    const navigate = useNavigate()


    function handleApiErrors(errors: any) {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('fullname')) {
                    setError('fullname', { message: error })
                }
            })
        }
    }

    return (
        <Container component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit(data => agent.Account.register({...data, isEmployee: isci}).then(_ => navigate("/login")))}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Fullname"
                    autoFocus
                    {...register('fullname', { required: 'Full Name is required' })}
                    error={!!errors.fullname}
                    helperText={errors?.fullname?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Email address"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                            message: 'Not a valid email address'
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors?.email?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                            message: 'password does not meet complexity requirements'
                        }
                    })}
                    error={!!errors.password} //make it boolean  !!
                    helperText={errors?.password?.message as string}
                />
                <FormControl sx={{ mt: 3, ml: 3 }}>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="employee"
                        {...register('isEmployee')}
                    >
                        <FormControlLabel value="employee" control={<Radio />} label="Employee" />
                        <FormControlLabel value="employer" control={<Radio />} label="Employer" />
                    </RadioGroup>
                </FormControl>

                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Grid container>
                    <Grid item>
                        <Link to="/login">
                            {"Already have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>

        </Container>
    )
}