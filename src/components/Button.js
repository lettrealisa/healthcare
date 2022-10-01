import { Button } from "@mui/material";

const Button = () => {
  return (
    <Button
      variant="contained"
      sx={{ mt: 2, width: "100%" }}
      className="bg-primary"
      onClick={(e) => handleLogin(e)}
    >
      Войти
    </Button>
  );
};

export default Button;
