import { LoadingButton } from "@mui/lab"
import { Container, Paper, Typography, Box, TextField } from "@mui/material"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import agent from "../../app/api/agent"

export default function PostAJob() {

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    const navigate = useNavigate()

    return (
        <Container component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>

            <Typography component="h1" variant="h5">
                Job Details
            </Typography>
            <Box component="form"
            onSubmit={handleSubmit(data => agent.Jobs.addJob(data).then(_ => navigate("/jobPosting")))}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="CompanyName"
                    autoFocus
                    {...register('companyName', { required: 'Company Name is required' })}
                    error={!!errors.companyName}
                    helperText={errors?.companyName?.message as string}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Position"
                    {...register('position', {
                        required: 'Position is required'
                    })}
                    error={!!errors.position}
                    helperText={errors?.position?.message as string}
                />
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Post Job
                </LoadingButton>
            </Box>

        </Container>
    )
}