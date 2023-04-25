import { Box, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AboutPage() {
    return (

        <Box>
            <Grid container spacing={6}>
                <Grid item xs={4}>
                    <Card >
                        <CardHeader
                            title={"Commercial Banking"} titleTypographyProps={{
                                sx: { fontWeight: 'bold', color: 'primary.dark', fontSize: '23px' }
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                                Our Commercial Bank provides a range of solutions to help corporations, organizations, real estate investors and business owners achieve their financial goals and leave a positive impact on their communities.We’re opening access to banking in underserved communities and partnering with community organizations to help all generations create a vision and foundation for their financial future.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card >
                        <CardHeader
                            title={"Entrepreneurship"} titleTypographyProps={{
                                sx: { fontWeight: 'bold', color: 'primary.dark', fontSize: '23px' }
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                                We’re boosting the next generation of big, small, and minority-owned businesses-offering them dedicated support and access to capital and resources.Through lending, investment and philanthropic capital, we’re supporting affordable housing and helping the underserved communities of today become flourishing communities tomorrow.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card >
                        <CardHeader
                            title={"Technology"} titleTypographyProps={{
                                sx: { fontWeight: 'bold', color: 'primary.dark', fontSize: '23px' }
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                                With an $11 billion investment and over 50,000 technologists worldwide, innovation drives the way we do business. Our teams build cutting-edge solutions that impact millions of customers and organizations worldwide.From employee upskilling to policy advocacy, we’re investing in people by equipping them with the tools and skills they need to prepare them for the future of work.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , mt:10 }}>
                <Link to="/jobs" style={{ color:'#01579b' ,fontSize: '30px'}} >
                    Our Global Footprint
                </Link>
            </Grid>
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', p: 2, bgcolor: '#01579b' }}>
                <Typography variant="body2" sx={{ color: 'white', ml: 15 }}>
                    © 2023  BurcuTumer & Co. All rights reserved.
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', ml: 15 }}>
                    BTumer  is an Equal Opportunity Employer, including Disability/Veterans.
                </Typography>
            </Box>
        </Box>
    )
}