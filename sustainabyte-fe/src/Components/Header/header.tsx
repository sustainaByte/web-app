import {IconButton, TextField, useTheme, Box, List, ListItemButton} from "@mui/material";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import "./header.scss";
// @ts-ignore
import logo from "../../images/logo2.png";
import { useAuth } from "../Login/login";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const theme = useTheme();
  // @ts-ignore
  const { authKey, logout } = useAuth();
  const navigate = useNavigate()

  return (
      <li>
        <IconButton
            aria-label="menu"
            sx={{ color: `${theme.palette.text.primary}` }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <WidgetsOutlinedIcon />
        </IconButton>
        {isDropdownOpen && (
            <List
                className="dropdown-list"
                sx={{
                  backgroundColor: `${theme.palette.text.primary}`,
                  right: `${!authKey && '20px'}`
                }}
            >
              {authKey && (
                  <ListItemButton
                      onClick={() => {
                        logout()
                        navigate("/")
                      }}
                  >
                    Logout
                  </ListItemButton>
              )}
              {!authKey && (
                  <>
                    <ListItemButton
                        onClick={() => navigate("/register")}
                    >
                      Register
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => navigate("/login")}
                    >
                      Login
                    </ListItemButton>
                  </>
              )}
            </List>
        )}
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
