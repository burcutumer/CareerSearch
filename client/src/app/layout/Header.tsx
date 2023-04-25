import { AppBar, Box, List, ListItem, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import SignedInMenu from "./SignedInMenu";
import SvgIcon from '@mui/material/SvgIcon';

const midLinks = [
    { title: 'jobs', path: '/jobs', role: '' },
    { title: 'post a job', path: '/new', role: 'employer' },
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
    ml: 2,
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

                <Box component={NavLink} to='/'  sx={navStyles}>
                    <SvgIcon fontSize="large" >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </SvgIcon>
                </Box>
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