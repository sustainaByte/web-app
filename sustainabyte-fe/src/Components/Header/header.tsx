import {IconButton, TextField, useTheme, Box, List, ListItemButton, MenuItem} from "@mui/material";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from '@mui/material/Menu';
import "./header.scss";
// @ts-ignore
import logo from "../../images/logo2.png";
import { useAuth } from "../Login/login";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Dropdown = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const theme = useTheme();
    // @ts-ignore
    const { authKey, logout } = useAuth();
    const navigate = useNavigate()

    return (
          <li>
                <IconButton
                    aria-label="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    sx={{ color: `${theme.palette.text.primary}` }}
                    onClick={handleClick}
                >
                  <WidgetsOutlinedIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    className="dropdown-list"
                    sx={{
                        right: `${!authKey && '20px'}`
                    }}
                >

                    {authKey && (
                          <MenuItem
                              onClick={() => {
                                  handleClose()
                                  logout()
                                  navigate("/")
                              }}
                          >
                            Logout
                          </MenuItem>
                    )}
                          {!authKey && (
                              <>
                                    <MenuItem
                                        onClick={() => {
                                            handleClose()
                                            navigate("/register")
                                        }}
                                    >
                                      Register
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleClose()
                                            navigate("/login")
                                        }}
                                    >
                                      Login
                                    </MenuItem>
                              </>
                          )}
                        <MenuItem
                            onClick={() => {
                                handleClose()
                                navigate("/settings")
                            }}
                        >
                            Settings
                        </MenuItem>
                </Menu>
          </li>
      )
}

const Header = () => {
  const theme = useTheme();
  // @ts-ignore
  const { authKey, logout } = useAuth();
  const navigate = useNavigate()

  return (
    <header>
      <Box className="header-container">
        <ul className="header-list">
          <img src={logo} alt="logo" />
          <TextField
            color="primary"
            id="search"
            label="Search"
            variant="outlined"
          />
        </ul>
        <ul className="header-list">
          <Dropdown />
          {authKey && (
            <>
              <li>
                <IconButton
                  aria-label="notifications"
                  sx={{ color: `${theme.palette.text.primary}` }}
                >
                  <NotificationsNoneIcon />
                </IconButton>
              </li>
              <li>
                <IconButton
                aria-label="profile"
                sx={{ color: `${theme.palette.text.primary}` }}
              >
                  <AccountCircleIcon />
                </IconButton>
              </li>
            </>
          )}
        </ul>
      </Box>
    </header>
  );
};

export default Header;
