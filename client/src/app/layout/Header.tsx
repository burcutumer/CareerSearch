import { AppBar, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import SignedInMenu from "./SignedInMenu";


const midLinks = [
    { title: 'job postings', path: '/jobposting', role: '' },
    { title: 'post a job', path: '/jobPosting/new', role: 'employer' },
    { title: 'about', path: '/about', role: '' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    flexWrap: 'nowrap', whiteSpace: 'nowrap',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}


export default function Header() {
    const { user } = useStoreContext();

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6"
                    component={NavLink} to='/' sx={navStyles}
                >
                    MY CAREER
                </Typography>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path, role }) => (
                        (role === '' || user?.role === role) && <ListItem
                            component={NavLink} to={path}
                            key={path} sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>
                {user ? (
                    <SignedInMenu />
                ) : (
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path} key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                )}
            </Toolbar>
        </AppBar>
    )
}