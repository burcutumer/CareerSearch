import { Box, Typography } from "@mui/material";

export default function JobApplications() {
    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          ml: -20,
        }}
      >
        <Typography variant="h3" sx={{ textAlign: 'center', mt: -10 }}>
          Thank You!
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', mt: 2 }}>
          Application Received
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
          If you have any questions please feel free to reach out to us
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
          Good Luck!
        </Typography>
      </Box>

    )
}