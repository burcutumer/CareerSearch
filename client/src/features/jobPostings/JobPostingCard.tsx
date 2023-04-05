import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@mui/material";
import { JobPost } from "../../app/models/jobPost";

interface Props {
  job: JobPost
}
// key = { id belirtiyorum }
export default function JobPostingCard({ job }: Props) {
  return (
    <Card >
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor:'secondary.main'}}>
            {job.companyName.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={job.position} titleTypographyProps={{
          sx: {fontWeight:'bold', color:'primary.main', fontSize:'23px'}
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" color="secondary" component="div">
          {job.companyName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {job.createdAt}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">APPLY</Button>
        <Button size="small">VIEW</Button>
      </CardActions>
    </Card>
    //   <ListItem key={job.id}>  KEY VERMEDEN CALISIYO MUU
    //   <ListItemText>
    //     {job.companyName} - {job.position} -{job.createdAt}
    //   </ListItemText>
    // </ListItem>
  )
}