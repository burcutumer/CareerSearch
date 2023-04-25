import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";

export default function SignedInMenu() {
    var navigate = useNavigate();
    const { user, signOut } = useStoreContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNav = () => {
        navigate("/profile");
    }

    const handleSignOut = () => {
        signOut();
        navigate('/login');
    }

    return (
        <>
            <Button color='inherit'
                sx={{ typography: 'h6' }}
                onClick={handleClick}>
                {user?.email}
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleNav}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
        </>
    )
}