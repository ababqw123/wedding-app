import { Alert, AlertColor, Snackbar } from "@mui/material";

interface snackProps {
  open: boolean;
  close: any;
  openTime: number;
  severity: AlertColor;
  variant?: "standard" | "filled" | "outlined";
  backgroundColor: any;
  message: string;
}

/** 스낵바 커스텀 컴포넌트 */
const SnackBarCustom = ({ open, close, openTime, severity, variant, backgroundColor, message }: snackProps) => (
  <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} open={open} autoHideDuration={openTime} onClose={close}>
    <Alert
      onClose={close}
      severity={severity}
      variant={variant !== null ? "filled" : variant}
      sx={{
        width: "100%",
        backgroundColor: { backgroundColor },
        color: "#fff",
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default SnackBarCustom;
