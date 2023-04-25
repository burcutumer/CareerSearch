import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (

        <Box>
            <Grid container spacing={3}>

                <Grid item xs={6}>
                    <Card >
                        <CardHeader
                            title={"Replace Sorry with Thank You"} titleTypographyProps={{
                                sx: { fontWeight: 'bold', color: 'primary.dark', fontSize: '23px' }
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                                Everything happens for a reason, whenever you fail, you can learn from it.
                                Understanding when and why...
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card >
                        <CardHeader
                            title={"What if you could talk to your younger self?"} titleTypographyProps={{
                                sx: { fontWeight: 'bold', color: 'primary.dark', fontSize: '23px' }
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                                Success to me is to have the courage to turn a vision into reality.
                            </Typography>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                                It’s making today better than yesterday
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card >
                        <CardHeader
                            title={"From ChemicalEngineer to SoftwareEngineer"} titleTypographyProps={{
                                sx: { fontWeight: 'bold', color: 'primary.dark', fontSize: '23px' }
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                                "I want you to believe in yourself" Burcu tumer shares how she can pivot into a professional coding career with BTumer CareerSearch
                            </Typography>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">

                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to="/jobs" style={{ color: '#01579b', fontSize: '20px' }} >
                                More Employee Stories
                            </Link>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card >
                        <CardHeader
                            title={"From ChemicalEngineer to SoftwareEngineer"} titleTypographyProps={{
                                sx: { fontWeight: 'bold', color: 'primary.dark', fontSize: '23px' }
                            }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">
                                "I want you to believe in yourself" Burcu tumer shares how she can pivot into a professional coding career with BTumer CareerSearch
                            </Typography>
                            <Typography gutterBottom variant="body1" color="text.secondary" component="div">

                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Link to="/jobs" style={{ color:'#01579b' ,fontSize: '20px'}} >
                    More Opportunities
                </Link>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Box>
                <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', p: 2, bgcolor: '#01579b' }}>
                    <Typography variant="body2" sx={{ color: 'white', ml: 15 }}>
                        © 2023  BurcuTumer & Co. All rights reserved.
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white', ml: 15 }}>
                        BTumer  is an Equal Opportunity Employer, including Disability/Veterans.
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}