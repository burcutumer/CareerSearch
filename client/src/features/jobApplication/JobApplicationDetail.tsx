import { LoadingButton } from "@mui/lab";
import { Container, Paper, Avatar, Typography, Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import agent from "../../app/api/agent";

export default function JobApplicationDetail() {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const jobId = parseInt(id!);

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: 'all'
    })

    return (
        <Container component={Paper} maxWidth="sm"
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">
                Job Application
            </Typography>
            <Box component="form" onSubmit={handleSubmit(data => agent.Applications.addApplication({...data, jobId}).then(_ => navigate("/jobApplications")))}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="CV"
                    {...register('cv', {
                        required: 'CV is required',
                    })}
                    error={!!errors.cv}
                    helperText={errors?.cv?.message as string}
                />
                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Apply
                </LoadingButton>
            </Box>

        </Container>
    )
}