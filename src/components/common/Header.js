import { AppBar, Box } from "@mui/material";

const Header = ({ label }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#8f4155", width: "100%" }}
      >
        <h1>{label}</h1>
      </AppBar>
    </Box>
  );
};

export default Header;
