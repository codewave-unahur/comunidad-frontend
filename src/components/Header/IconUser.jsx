import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useState } from "react";
import { EncryptStorage } from 'encrypt-storage';


export default function IconUser() {
  const encryptStorage = new EncryptStorage(import.meta.env.VITE_SECRET, {
    doNotParseValues: false,
    storageType: "sessionStorage",
  });
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const usuarioData = encryptStorage.getItem("datosUsuario") || "";
  const tipoUsuario = encryptStorage.getItem("tipoUsuario");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCerrarSesion = () => {
    encryptStorage.setItem("estaLogueado", "false");
    encryptStorage.removeItem("tipoUsuario");
    encryptStorage.removeItem("datosUsuario");
    sessionStorage.removeItem("token");
    encryptStorage.removeItem("idUsuario");
    window.location.href = "/";
  };

  const handlePerfil = () => {
    window.location.href = "/perfil";
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 50, height: 50 }}
              src={
                tipoUsuario === "postulante"
                  ? usuarioData.foto
                  : tipoUsuario === "empresa"
                  ? usuarioData.logo
                  : tipoUsuario === "admin"
                  ? "https://unahur.edu.ar/wp-content/uploads/2018/07/articles_vinc.jpg"
                  : ""
              }
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handlePerfil}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          Mi perfil
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCerrarSesion}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}
