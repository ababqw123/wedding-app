import { Grid, Button, Divider, Typography, Modal, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import AOS from "aos";
import "aos/dist/aos.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KakaoMap from "@/public/companent/KakaoMap";
import { GetStaticPaths, GetStaticProps } from "next";

const settings = {
  dots: false,
  infinite: true,
  draggable: false,
  arrows: false,
  pauseOnHover: true,
  speed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  fade: true,
};

export default function Invitation({
  wedding,
  company,
}: {
  wedding: Array<{
    id: string;
    date: Dayjs;
    time: string;
    company: string;
    hall: string;
    people: {
      groomName: string;
      groomFather: string;
      groomMothrt: string;
      brideName: string;
      brideFather: string;
      brideMothrt: string;
    };
  }>;
  company: {
    id: string;
    name: string;
    addr: string;
    phone: string;
    hallList: Array<{
      order: number;
      name: string;
      floor: number;
      size: string;
    }>;
  };
}) {
  const today = new Date();
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [data, setData] = useState<{
    id: string;
    date: Dayjs;
    time: string;
    company: string;
    hall: string;
    people: {
      groomName: string;
      groomFather: string;
      groomMothrt: string;
      brideName: string;
      brideFather: string;
      brideMothrt: string;
    };
  }>({
    id: "",
    date: dayjs(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`),
    time: "",
    company: "",
    hall: "",
    people: {
      groomName: "",
      groomFather: "",
      groomMothrt: "",
      brideName: "",
      brideFather: "",
      brideMothrt: "",
    },
  });
  const [companyData, setCompanyData] = useState<{
    id: string;
    name: string;
    addr: string;
    phone: string;
    hallList: Array<{
      order: number;
      name: string;
      floor: number;
      size: string;
    }>;
  }>({ id: "", name: "", addr: "", phone: "", hallList: [] });

  const [groomVisible, setGroomVisible] = useState(false);
  const [brideVisible, setBrideVisible] = useState(false);

  const weddingImages = ["../assets/Gallery_Photo_1.webp", "../assets/Gallery_Photo_2.webp", "../assets/Gallery_Photo_3.webp"];

  const groomModalClose = () => {
    setGroomVisible(false);
  };

  const brideModalClose = () => {
    setBrideVisible(false);
  };

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  useEffect(() => {
    setData(wedding[0]);
  }, [wedding]);

  useEffect(() => {
    setCompanyData(company);
  }, [company]);

  useEffect(() => {
    setToken((router.query["token"] as string) || "");
  }, [router]);

  return (
    <>
      <Grid
        sx={{
          backgroundColor: "#ffffff",
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png")',
        }}
      >
        <audio autoPlay loop>
          <source src={"../assets/song.mp3"} />
        </audio>
        <Box sx={{ width: "70%", overflow: "hidden", margin: "0 auto" }}>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              paddingTop: "42",
              fontWeight: "500 !important",
              animation: "fadein 3s",
            }}
          >
            <Grid
              sx={{
                marginTop: 10,
                fontSize: "1.4rem",
                opacity: 0.45,
                marginBottom: 5,
              }}
            >
              WEDDING INVITATION
            </Grid>
            <Grid>
              <Typography
                sx={{
                  fontFamily: "Cute Font, sans-serif",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                  opacity: 0.9,
                  marginBottom: 4,
                }}
              >
                {`${data.people.groomName} & ${data.people.brideName}`}
              </Typography>
            </Grid>
            <Grid>
              <Typography sx={{ fontSize: "2rem", opacity: 0.65, marginBottom: 8, whiteSpace: "pre-wrap", fontFamily: "Cute Font, sans-serif" }}>
                {`${dayjs(data.date).format("YYYY-MM-DD hh:mm")} \n ${companyData.name} ${data.hall}`}
              </Typography>
            </Grid>
          </Box>
          <video style={{ width: "100%" }} autoPlay loop muted playsInline={true}>
            <source src={"../assets/BackgroundVideo.mp4"} type="video/mp4" />
          </video>
        </Box>

        <Box
          data-aos="fade-up"
          sx={{
            paddingTop: "42px",
            margin: "0 auto",
            width: "70%",
          }}
        >
          <Divider
            sx={{
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                opacity: 0.85,
                marginBottom: 0,
                textAlign: "center",
                fontFamily: "Cute Font, sans-serif",
              }}
            >
              초대합니다.
            </Typography>
          </Divider>
          <Grid sx={{ marginTop: 8 }}>
            <Typography
              sx={{
                fontSize: "1.2rem",
                lineHeight: "1.75",
                opacity: 0.75,
                marginBottom: 7,
                width: "100%",
                textAlign: "center",
                whiteSpace: "pre-wrap",
                fontFamily: "Cute Font, sans-serif",
              }}
            >
              {`서로를 마주보며 키워온 사랑으로 \n이제 함께의 큰 사랑으로 나아가기를 다짐합니다.\n영원한 함께'로 불리울 우리의 사랑을 여러분의 축복과 함께 키워가고자 합니다.\n앞날을 축복해 주시면 감사하겠습니다.`}
            </Typography>
          </Grid>
          <Grid sx={{ marginBottom: 10 }}>
            <Typography
              sx={{
                fontSize: "1.8rem",
                lineHeight: 1.75,
                opacity: 0.85,
                marginBottom: 0,
                width: "100%",
                textAlign: "center",
                whiteSpace: "pre-wrap",
                fontFamily: "Cute Font, sans-serif",
              }}
            >
              {`${data.people.groomFather} · ${data.people.groomMothrt}의 아들 ${data.people.groomName}\n${data.people.brideFather} · ${data.people.brideMothrt}의 딸 ${data.people.brideName}`}
            </Typography>
          </Grid>
        </Box>

        <Box
          data-aos="fade-up"
          sx={{
            paddingTop: "42px",
            margin: "0 auto",
            width: "70%",
          }}
        >
          <Divider
            sx={{
              marginTop: 0,
              marginBottom: 9,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                opacity: 0.85,
                marginBottom: 0,
                textAlign: "center",
                fontFamily: "Cute Font, sans-serif",
              }}
            >
              우리의 아름다운 순간
            </Typography>
          </Divider>
          <Grid>
            <Slider {...settings}>
              {weddingImages.map((image, i) => (
                <img key={i} src={image} />
              ))}
            </Slider>
          </Grid>
        </Box>

        <Box
          data-aos="fade-up"
          sx={{
            paddingTop: "42px",
            margin: "0 auto",
            width: "70%",
          }}
        >
          <Divider
            sx={{
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                opacity: 0.85,
                marginBottom: 0,
                textAlign: "center",
                fontFamily: "Cute Font, sans-serif",
              }}
            >
              오시는 길.
            </Typography>
          </Divider>
          <Grid sx={{ width: "80%", height: 400, margin: "0 auto" }}>
            <KakaoMap location={company.addr} />
          </Grid>
          <Grid>
            <Typography
              sx={{
                fontSize: "1.6rem",
                lineHeight: "1.75",
                opacity: 0.75,
                width: "100%",
                textAlign: "center",
                fontFamily: "Cute Font, sans-serif",
                marginTop: 3,
              }}
            >
              {`${company.addr} ${company.name}`}
            </Typography>
          </Grid>
        </Box>

        {/* CongratulatoryMoney */}
        <Box
          data-aos="fade-up"
          sx={{
            paddingTop: "42px",
            margin: "0 auto",
            width: "70%",
          }}
        >
          <Divider
            sx={{
              marginTop: 0,
              marginBottom: 6,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                opacity: 0.85,
                marginBottom: 0,
                textAlign: "center",
                fontFamily: "Cute Font, sans-serif",
              }}
            >
              축하의 마음을 전하세요
            </Typography>
          </Divider>
          <img
            style={{
              display: "block",
              margin: "0 auto",
              width: "1.375rem",
              paddingBottom: "42px",
            }}
            src={"../assets/flower1.png"}
          />
          <Grid>
            <Typography
              sx={{
                fontSize: "1.2rem",
                lineHeight: "1.75",
                opacity: 0.75,
                marginBottom: "16px",
                width: "100%",
                textAlign: "center",
                fontFamily: "Cute Font, sans-serif",
              }}
            >
              축하의 마음을 담아 축의금을 전달해 보세요.
            </Typography>
          </Grid>
          <Grid
            sx={{
              marginBottom: "3.125rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Grid
              sx={{
                width: "10.75rem",
                border: "1px solid #efddde",
                padding: "2.188rem 0",
              }}
              onClick={() => {
                setGroomVisible(true);
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 64, marginBottom: 2, color: "#829fe0" }} />
              <br />
              <Grid sx={{ fontSize: "1.3rem", lineHeight: 1.75, opacity: 0.75, marginBottom: "42px", fontFamily: "Cute Font, sans-serif" }}>
                신랑측 계좌번호 확인
              </Grid>
            </Grid>
            <Grid
              sx={{
                width: "10.75rem",
                border: "1px solid #efddde",
                padding: "2.188rem 0",
              }}
              onClick={() => {
                setBrideVisible(true);
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 64, marginBottom: 2, color: "#fe7daf" }} />
              <br />
              <Grid sx={{ fontSize: "1.3rem", lineHeight: 1.75, opacity: 0.75, marginBottom: "42px", fontFamily: "Cute Font, sans-serif" }}>
                신부측 계좌번호 확인
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Modal keepMounted open={groomVisible} onClose={groomModalClose}>
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
            <Grid marginBottom={3}>
              <Typography variant="h6">신랑에게</Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">{`예금주 : ${data.people.groomName}`}</Typography>
              <Typography variant="body1">000-000000-00000</Typography>
            </Grid>
          </Box>
        </Modal>
        <Modal keepMounted open={brideVisible} onClose={brideModalClose}>
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
            <Grid marginBottom={3}>
              <Typography variant="h6">신부에게</Typography>
            </Grid>
            <Grid>
              <Typography variant="body1">{`예금주 : ${data.people.brideName}`}</Typography>
              <Typography variant="body1">000-000000-00000</Typography>
            </Grid>
          </Box>
        </Modal>
        {/* CongratulatoryMoney . */}
        <Grid width={"100%"} textAlign={"center"} marginBottom={5}>
          <Button
            variant="contained"
            onClick={() => {
              router.replace(`/register/${token}`);
            }}
          >
            예비 등록하기
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  try {
    const wedding = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findWedding?${new URLSearchParams({}).toString()}`)).json();
    const possibleTokenValues: Array<string> = wedding.map((it: any) => {
      return it.id;
    }); // 가능한 토큰 값들로 대체해야 합니다.

    const paths = possibleTokenValues.map((token) => ({
      params: { token },
    }));

    return {
      paths,
      fallback: false, // fallback이 false이면 존재하지 않는 경로로의 접근은 404 페이지를 반환합니다.
    };
  } catch (error) {
    console.error(error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const token = (params?.token as string) || ("" as string);
  try {
    const company: Array<{
      id: string;
      name: string;
      addr: string;
      phone: string;
      hallList: Array<{
        order: number;
        name: string;
        floor: number;
        size: string;
      }>;
    }> = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/getAllCompany`)).json();
    const wedding: Array<{
      id: string;
      date: Dayjs;
      time: string;
      company: string;
      hall: string;
      people: {
        groomName: string;
        groomFather: string;
        groomMothrt: string;
        brideName: string;
        brideFather: string;
        brideMothrt: string;
      };
    }> = await (
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findWedding`, {
        method: "POST",
        body: JSON.stringify({ id: token }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    const filterCompany = company.find((it) => it.id === wedding[0].company);
    return {
      props: {
        wedding,
        company: filterCompany || [],
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
