import { Button } from "@mui/material";

const CustomButton = ({ label }) => {
  return (
    <Button
      variant="contained"
      sx={{ mt: 2, width: "100%" }}
      className="bg-primary"
    >
      {label}
    </Button>
  );
};

export default CustomButton;
