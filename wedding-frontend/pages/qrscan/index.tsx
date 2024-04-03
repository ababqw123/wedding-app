import { Box, Button, CircularProgress, Grid, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { useRouter } from "next/router";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import SnackBarCustom from "@/public/companent/SnackBarCustom";

export default function Qrscan() {
  const router = useRouter();
  const videoRef = useRef(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [count, setCount] = useState(30);
  const [ticket, setTicket] = useState(1);

  const paymentModalClose = () => {
    setPaymentModal(false);
    setTicketModal(true);
  };

  const ticketModalClose = () => {
    setTicketModal(false);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const snackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    ticketModalClose();
  };

  const handleScan = (result: QrScanner.ScanResult) => {
    if (result.data !== "") {
      const parsedData = JSON.parse(result.data);
      setPaymentModal(true);
    }
  };

  useEffect(() => {
    const videoElem = videoRef.current;
    if (videoElem) {
      const qrScanner = new QrScanner(videoElem, (result) => handleScan(result), QrOptions);
      qrScanner.start();

      return () => qrScanner.destroy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    if (paymentModal) {
      if (count <= 0) {
        setPaymentModal(false);
      } else {
        setCount(count - 1);
      }
    } else {
      setCount(30);
    }
  }, 1000);

  return (
    <>
      <Grid>
        <Grid margin={"0 auto "} mt={8}>
          <Grid width={"100%"} textAlign={"center"}>
            <Typography variant="h4" whiteSpace={"nowrap"} fontWeight={"bold"}>
              예식 등록
            </Typography>
          </Grid>
          <Grid width={"100%"} textAlign={"center"} mt={5}>
            <Typography>사전 등록한 QR-CODE를 스캔해주세요</Typography>
          </Grid>
          <Grid width={"100%"} textAlign={"center"} mt={5}>
            {/* <video width={"60%"} ref={videoRef} autoPlay playsInline /> */}
            <video ref={videoRef} style={{ width: "300px", height: "300px", objectFit: "cover" }} autoPlay playsInline />
          </Grid>
        </Grid>
        <Modal open={paymentModal}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 500,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 3,
              textAlign: "center",
            }}
          >
            <Grid position={"relative"} width={"100%"} height={"100%"}>
              <Grid marginBottom={3}>
                <Typography variant="h4">결제</Typography>
              </Grid>
              <Grid marginTop={3}>
                <Typography variant="body1">카드를 꽂아주세요</Typography>
                <Box sx={{ alignItems: "center", justifyContent: "center", mt: 4 }}>
                  <CircularProgress />
                  <Box mt={3}>
                    <Typography variant="body1">{`${count}초`}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid
                sx={{
                  position: "absolute",
                  textAlign: "center",
                  width: "100%",
                  left: "50%",
                  bottom: "0",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setTicketModal(true);
                    paymentModalClose();
                  }}
                >
                  승인
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal open={ticketModal}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              height: 500,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 3,
              textAlign: "center",
            }}
          >
            <Grid marginBottom={3} mt={4}>
              <Typography variant="h4">식권 발급</Typography>
            </Grid>
            <Grid mt={1}>
              <Typography variant="h3">{ticket}</Typography>
            </Grid>
            <Grid width={"100%"} textAlign={"center"}>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={() => {
                  setTicket(ticket > 0 ? ticket - 1 : 0);
                }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={() => {
                  setTicket(ticket + 1);
                }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Grid>
            <Grid width={"100%"} textAlign={"center"} marginTop={10}>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenSnackbar(true);
                }}
              >
                확인
              </Button>
            </Grid>
          </Box>
        </Modal>
      </Grid>
      <SnackBarCustom
        open={openSnackbar}
        close={snackbarClose}
        openTime={2000}
        severity="success"
        backgroundColor={"green"}
        message={`식권 ${ticket}장을 출력합니다.`}
      />
    </>
  );
}

export const QrOptions = {
  // 핸드폰의 경우, 외부 카메라인지 셀프카메라인지
  preferredCamera: "environment",
  // 1초당 몇번의 스캔을 할 것인지? ex) 1초에 5번 QR 코드 감지한다.
  maxScansPerSecond: 1000,
  // QR 스캔이 일어나는 부분을 표시해줄 지 (노란색 네모 테두리가 생긴다.)
  highlightScanRegion: true,
};

function useInterval(callback: any, delay: any) {
  const savedCallback = useRef<any>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
