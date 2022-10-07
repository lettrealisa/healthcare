import { Button } from "@mui/material";

const CustomButton = ({ label, onClick }) => {
  return (
    <Button
      variant="contained"
      sx={{ mt: 2, width: "100%" }}
      className="bg-primary"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
