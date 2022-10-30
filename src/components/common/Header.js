import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AppBar, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Header = ({ label }) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#8f4155", width: "100%" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="1rem"
        >
          <h1>Healthcare</h1>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </Box>
      </AppBar>
    </Box>
  );
};

export default Header;
