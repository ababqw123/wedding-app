import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Dayjs } from "dayjs";
import { GetServerSideProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

export default function Register({
  wedding,
}: {
  wedding: {
    _id: string;
    date: Dayjs;
    time: string;
    company: string;
    hall: string;
    people: {
      groomName: string;
      groomFather: string;
      groomMother: string;
      brideName: string;
      brideFather: string;
      brideMother: string;
    };
  };
}) {
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [people, setPeople] = useState<{
    groom: string;
    bride: string;
  }>({
    groom: "",
    bride: "",
  });
  const [value, setValue] = useState<{
    select: string;
    token: string;
    name: string;
    phone: string;
    money: number;
  }>({
    select: "",
    token: "",
    name: "",
    phone: "",
    money: 0,
  });

  const modalClose = () => {
    setModal(false);
    setValue({
      select: "",
      token: "",
      name: "",
      phone: "",
      money: 0,
    });
  };

  useEffect(() => {
    setValue((prevState) => ({
      ...prevState,
      token: String(router.query["token"]),
    }));
  }, [router.query]);

  useEffect(() => {
    setPeople({
      groom: wedding.people.groomName,
      bride: wedding.people.brideName,
    });
  }, [wedding]);

  const handleDownloadClick = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas ? canvas.toDataURL("image/png") : "";
    const link = document.createElement("a");
    link.href = url;
    link.download = `${value.select === "groom" ? people.groom : people.bride}-wedding.png`;
    // 저장되는 파일 이름이다.
    link.click();
  };
  return (
    <>
      <Grid margin={"0 auto "} mt={8}>
        <Grid width={"100%"} textAlign={"center"}>
          <Typography variant="h4" whiteSpace={"nowrap"} fontWeight={"bold"}>
            사전 등록
          </Typography>
        </Grid>
        <Grid textAlign={"center"} mt={3}>
          <Grid>
            <FormControl>
              {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
              <RadioGroup
                row
                aria-labelledby="select"
                name="select"
                value={value.select}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setValue((prevState) => ({
                    ...prevState,
                    select: (event.target as HTMLInputElement).value,
                  }));
                }}
              >
                <FormControlLabel
                  labelPlacement="top"
                  value={people.groom}
                  control={<Radio />}
                  label={`신랑: ${people.groom}`}
                  sx={{ marginRight: 4 }}
                />
                <FormControlLabel labelPlacement="top" value={people.bride} control={<Radio />} label={`신부: ${people.bride}`} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                이름
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2, width: 220 }}
                label="이름"
                type={"text"}
                value={value.name}
                onChange={(e) => {
                  setValue((prevState) => ({
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
                sx={{ marginLeft: 2, width: 220 }}
                label="전화번호"
                type={"text"}
                value={value.phone}
                onChange={(e) => {
                  setValue((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                축의금
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2, width: 220 }}
                label="축의금"
                type={"number"}
                value={value.money}
                InputProps={{
                  endAdornment: <InputAdornment position="end">원</InputAdornment>,
                }}
                onChange={(e) => {
                  setValue((prevState) => ({
                    ...prevState,
                    money: Number(e.target.value),
                  }));
                }}
              />
            </Grid>
            <Grid>
              <Button
                autoFocus
                sx={{
                  width: "45%",
                  height: 45,
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": { backgroundColor: "gray" },
                  fontSize: 15,
                  marginTop: 4,
                }}
                onClick={() => {
                  setModal(true);
                }}
              >
                QR코드 발급
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal keepMounted open={modal} onClose={modalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 3,
            textAlign: "center",
          }}
        >
          <Grid mt={6}>
            <Container>
              <QRCode value={JSON.stringify(value)} />
            </Container>
          </Grid>
          <Grid>
            <Button
              autoFocus
              sx={{
                width: "45%",
                height: 45,
                backgroundColor: "black",
                color: "white",
                "&:hover": { backgroundColor: "gray" },
                fontSize: 15,
                marginTop: 4,
              }}
              onClick={handleDownloadClick}
            >
              QR코드 다운로드
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

// export const getStaticPaths: GetStaticPaths = async (context) => {
//   try {
//     const wedding = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findAllWedding`)).json();
//     const possibleTokenValues: Array<string> = wedding.map((it: any) => {
//       return it._id;
//     }); // 가능한 토큰 값들로 대체해야 합니다.
//     const paths = possibleTokenValues.map((token) => ({
//       params: { token },
//     }));
//     return {
//       paths,
//       fallback: false, // fallback이 false이면 존재하지 않는 경로로의 접근은 404 페이지를 반환합니다.
//     };
//   } catch (error) {
//     // console.error(error);
//     return {
//       paths: [],
//       fallback: false,
//     };
//   }
// };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const token = (params?.token as string) || ("" as string);
  try {
    const wedding: {
      _id: string;
      date: Dayjs;
      time: string;
      company: string;
      hall: string;
      people: {
        groomName: string;
        groomFather: string;
        groomMother: string;
        brideName: string;
        brideFather: string;
        brideMother: string;
      };
    } = await (
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findWedding`, {
        method: "POST",
        body: JSON.stringify({ id: token }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    return {
      props: {
        wedding,
      },
    };
  } catch (e) {
    // console.log(e);
    return {
      props: {
        value: null,
      },
    };
  }
};
