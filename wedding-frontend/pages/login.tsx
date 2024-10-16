import SnackBarCustom from "@/public/companent/SnackBarCustom";
import { Box, Button, Container, Grid, Modal, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState("관리자");
  const [modal, setModal] = useState<boolean>(false);
  const [login, setLogin] = useState<{
    id: string;
    pwd: string;
  }>({
    id: "",
    pwd: "",
  });
  const [tokenLogin, setTokenLogin] = useState<string>("");

  const [sign, setSign] = useState<{
    id: string;
    pass: string;
    name: string;
    phone: string;
  }>({
    id: "",
    pass: "",
    name: "",
    phone: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const snackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const modalClose = () => {
    setSign({
      id: "",
      pass: "",
      name: "",
      phone: "",
    });
    setModal(false);
  };
  return (
    <>
      <Container maxWidth="xs">
        <Box mt={17} display="flex" justifyContent="center">
          <Box mt={1} p={2} boxShadow={10} borderRadius={2}>
            <Box sx={{ width: "100%", marginTop: 3 }}>
              <Tabs value={tabValue} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
                <Tab value="관리자" label="관리자" />
                <Tab value="고객" label="고객" />
              </Tabs>
            </Box>
            <Box mb={2} width={290} height={220}>
              <form>
                {tabValue === "관리자" ? (
                  <>
                    <TextField
                      label="아이디"
                      type="text"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      required
                      className={"inputCSS"}
                      value={login.id}
                      onChange={(e) => {
                        setLogin((prevState) => ({
                          ...prevState,
                          id: e.target.value,
                        }));
                      }}
                    />
                    <TextField
                      label="비밀번호"
                      autoComplete="false"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      required
                      type="password"
                      className={"inputCSS"}
                      value={login.pwd}
                      onChange={(e) => {
                        setLogin((prevState) => ({
                          ...prevState,
                          pwd: e.target.value,
                        }));
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TextField
                      label="고객용"
                      type="text"
                      variant="outlined"
                      fullWidth
                      margin="dense"
                      required
                      className={"inputCSS"}
                      value={tokenLogin}
                      onChange={(e) => {
                        setTokenLogin(e.target.value);
                      }}
                    />
                  </>
                )}
              </form>
              <Grid width={"100%"} textAlign={"end"}>
                <Grid>
                  <Button
                    variant="text"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    회원가입
                  </Button>
                </Grid>
                <Grid textAlign={"end"}>
                  <Button
                    variant="text"
                    onClick={() => {
                      router.push("/qrscan");
                    }}
                  >
                    QR CODE
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Button
                variant="contained"
                onClick={async () => {
                  if (tabValue === "관리자") {
                    // const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login/signin`, {
                    //   method: "POST",
                    //   body: JSON.stringify(sign),
                    //   headers: {
                    //     "Content-Type": "application/json",
                    //   },
                    // });
                    // console.log(result);
                    router.replace("/admin/company");
                    setLogin({
                      id: "",
                      pwd: "",
                    });
                  } else {
                    if(tokenLogin !== ''){
                      const result = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login/token/${encodeURIComponent(tokenLogin)}`)).json();
                      if (result) {
                        router.push(`/customer/${encodeURIComponent(tokenLogin)}`);
                      } else {
                        setOpenSnackbar(true);
                      }
                    } else {
                      setOpenSnackbar(true);
                    }
                  }
                }}
              >
                로그인
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Grid width={"100%"} textAlign={"center"} mt={5}>
        <Typography variant="h5" gutterBottom>
          이 웹 서비스는 외부 사람의 원활한 사용을 위하여 로그인 동작을 구현하지 않았습니다.
        </Typography>
        <Typography variant="h5" gutterBottom>
          로그인을 누를 시 다음 페이지로 넘어가집니다.
        </Typography>
      </Grid>
      <Modal keepMounted open={modal} onClose={modalClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 3,
            textAlign: "center",
          }}
        >
          <form>
            <Typography variant="h4" gutterBottom>
              회원가입
            </Typography>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                이름
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2 }}
                label="이름"
                type={"text"}
                value={sign.name}
                onChange={(e) => {
                  setSign((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                전화번호
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2 }}
                label="전화번호"
                type={"text"}
                value={sign.phone}
                onChange={(e) => {
                  setSign((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                ID
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2 }}
                label="ID"
                type={"text"}
                value={sign.id}
                onChange={(e) => {
                  setSign((prevState) => ({
                    ...prevState,
                    id: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                Password
              </Typography>
              <TextField
                label="비밀번호"
                autoComplete="false"
                margin="dense"
                required
                type="password"
                sx={{ marginLeft: 2 }}
                value={sign.pass}
                onChange={(e) => {
                  setSign((prevState) => ({
                    ...prevState,
                    pass: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button
                autoFocus
                onClick={modalClose}
                sx={{
                  width: "45%",
                  height: 45,
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "gray" },
                  color: "white",
                  fontSize: 15,
                  mr: 2,
                }}
              >
                취소
              </Button>
              <Button
                autoFocus
                sx={{
                  width: "45%",
                  height: 45,
                  backgroundColor: "black",
                  "&:hover": { backgroundColor: "gray" },
                  color: "white",
                  fontSize: 15,
                }}
                onClick={async () => {
                  const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/login/signup`, {
                    method: "POST",
                    body: JSON.stringify(sign),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  modalClose();
                }}
              >
                신청
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <SnackBarCustom
        open={openSnackbar}
        close={snackbarClose}
        openTime={2000}
        severity="warning"
        backgroundColor={"red"}
        message="ID를 다시 확인해주세요."
      />
    </>
  );
}
