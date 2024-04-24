import { Box, Grid, Table, TableBody, TableCell, Paper, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";

const typoHeadStyle = {
  fontWeight: "bold",
  overflow: "auto",
  whiteSpace: "nowrap",
  borderRight: "1px solid #e0e0e0",
  backgroundColor: "#9d9696",
};

const typoBodyStyle = {
  overflow: "auto",
  whiteSpace: "nowrap",
  borderRight: "1px solid #e0e0e0",
  backgroundColor: "#c3c3c3d1",
};

export default function Customer({
  weddingData,
}: {
  weddingData: {
    wedding: {
      _id: string;
      groomName: string;
      brideName: string;
    };
    congratulatoryMoney: {
      participant: {
        _id?: string;
        name?: string;
        phone?: string;
        money?: number;
        ticket?: number;
      }[];
      total: number;
    };
  };
}) {
  const [weddingPeople, setWeddingPeople] = useState<{ groom: string; bride: string }>({ groom: "", bride: "" });
  const [participant, setParticipant] = useState<
    {
      _id?: string;
      name?: string;
      phone?: string;
      money?: number;
      ticket?: number;
    }[]
  >([]);
  const [total, setTotal] = useState<number>(0);
  const [totalTicket, setTotalTicket] = useState<number>(0);

  useEffect(() => {
    if (weddingData != undefined) {
      setWeddingPeople({ groom: weddingData.wedding.groomName, bride: weddingData.wedding.brideName });
      setParticipant(weddingData.congratulatoryMoney.participant);
      setTotal(weddingData.congratulatoryMoney.total);
      const ticketTotal = weddingData.congratulatoryMoney.participant
        .map((it) => it.ticket)
        .reduce((prev, curr) => (prev != undefined ? prev : 0) + (curr != undefined ? curr : 0), 0);
      setTotalTicket(ticketTotal || 0);
    }
  }, [weddingData]);
  return (
    <>
      <Grid
        sx={{
          backgroundColor: "#ffffff",
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png")',
          minHeight: "100vh",
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
            }}
          >
            <Grid
              sx={{
                marginTop: 10,
                fontSize: "2rem",
                marginBottom: 5,
              }}
            >
              {`${weddingPeople.groom} ・ ${weddingPeople.bride}의 결혼식 축의금`}
            </Grid>
          </Box>
        </Box>
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              width: "80%",
              margin: "auto",
              border: "2px solid #e0e0e0",
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={typoHeadStyle}>
                    이름
                  </TableCell>
                  <TableCell align="center" sx={typoHeadStyle}>
                    연락처
                  </TableCell>
                  <TableCell align="center" sx={typoHeadStyle}>
                    식권 수량
                  </TableCell>
                  <TableCell align="center" sx={typoHeadStyle}>
                    축의금
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participant.map((it, i) => (
                  <TableRow key={i}>
                    <TableCell align="center" sx={typoBodyStyle}>
                      {it.name}
                    </TableCell>
                    <TableCell align="center" sx={typoBodyStyle}>
                      {it.phone}
                    </TableCell>
                    <TableCell align="center" sx={typoBodyStyle}>
                      {it.ticket}
                    </TableCell>
                    <TableCell align="center" sx={typoBodyStyle}>
                      {it.money}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="center" sx={typoBodyStyle} colSpan={2}>
                    총
                  </TableCell>
                  <TableCell align="center" sx={typoBodyStyle}>
                    {totalTicket}
                  </TableCell>
                  <TableCell align="center" sx={typoBodyStyle}>
                    {total}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async (context) => {
  try {
    const moneyToken: string[] = await (
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findAllMoneyToken`, {
        method: "GET",
        mode: "no-cors",
      })
    ).json();
    const paths = moneyToken.map((token) => ({
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
    const weddingData: {
      wedding: {
        _id: string;
        groomName: string;
        brideName: string;
      };
      congratulatoryMoney: {
        participant: {
          _id?: string;
          name?: string;
          phone?: string;
          money?: number;
          ticket?: number;
        }[];
        total: number;
      };
    } = await (
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/congratulatoryMoney/${encodeURIComponent(token)}`, {
        method: "GET",
        mode: "no-cors",
      })
    ).json();
    return {
      props: {
        weddingData,
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
