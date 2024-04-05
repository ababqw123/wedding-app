import Appbar from "@/public/companent/Appbar";
import SnackBarCustom from "@/public/companent/SnackBarCustom";
import { copyClipboard } from "@/public/companent/copyClipboard";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// 테이블 css
const TableStyle = {
  overflow: "auto",
};

const typoHeadStyle = {
  fontWeight: "bold",
  maxHeight: 52,
  overflow: "auto",
  whiteSpace: "nowrap",
};

const typoBodyStyle = {
  maxHeight: 52,
  overflow: "auto",
  whiteSpace: "nowrap",
};
// 테이블 css

export default function Wedding({
  company,
  wedding,
}: {
  company: Array<{
    _id: string;
    name: string;
    addr: string;
    phone: string;
    hallList: Array<{
      order: number;
      name: string;
      floor: number;
      size: string;
    }>;
  }>;
  wedding: Array<{
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
  }>;
}) {
  const router = useRouter();
  const [companyList, setCompanyList] = useState<
    Array<{
      companyName: string;
      companyId: string;
    }>
  >([]);
  const [companySelect, setCompanySelect] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);

  const [weddingData, setWeddingData] = useState<
    Array<{
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
    }>
  >([]);

  const [copyId, setCopyId] = useState<string>("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarFail, setOpenSnackbarFail] = useState(false);

  useEffect(() => {
    if (companyList.length !== 0) {
      setCompanySelect(companyList[0].companyName);
    }
  }, [companyList]);

  useEffect(() => {
    if (company != undefined) {
      const list = company.map((it) => {
        return { companyName: it.name, companyId: it._id };
      });
      setCompanyList(list || []);
    }
  }, [company]);

  useEffect(() => {
    const find = companyList.find((it) => {
      return it.companyName === companySelect;
    });
    if (find?.companyId) {
      const filter = wedding.filter((it) => {
        return it.company === find.companyId;
      });
      setWeddingData(filter || []);
    }
  }, [companySelect]);

  const snackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setOpenSnackbarFail(false);
  };

  const modalClose = () => {
    setModal(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCompanySelect(event.target.value as string);
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <>
      <Appbar />
      <Grid container width={"100%"} mt={10}>
        <Box display="flex" mt={2} width={"80%"} margin={"auto"} position={"relative"} height={50}>
          <Grid mr={2} width={120} position={"absolute"}>
            <FormControl fullWidth>
              <InputLabel id="company">예식장</InputLabel>
              <Select labelId="company" id="company" value={companySelect} label="company" onChange={handleChange}>
                {companyList.map((it, i) => (
                  <MenuItem key={i} value={it.companyName}>
                    {it.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid position={"absolute"} right={0} top={6}>
            <Button
              variant="contained"
              onClick={() => {
                router.push("/admin/wedding/addWedding");
              }}
            >
              식 추가
            </Button>
          </Grid>
        </Box>

        <Grid width={"100%"} marginTop={2}>
          <TableContainer component={Paper} sx={{ ...TableStyle, marginBottom: 13, width: "80%", margin: "auto" }}>
            <Table stickyHeader>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    순
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    예식 일자
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    예식 홀
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    신랑
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    신부
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {weddingData.map((it, i) => (
                  <StyledTableRow
                    key={i}
                    sx={{ backgroundColor: (i + 1) % 2 !== 0 ? "#f2f2f2" : "none" }}
                    onClick={() => {
                      setCopyId(it._id);
                      setModal(true);
                    }}
                  >
                    <StyledTableCell component="th" scope="row" align="center" sx={typoBodyStyle}>
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {dayjs(it.date).format("YYYY-MM-DD hh:mm")}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {it.hall}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {it.people.groomName}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {it.people.brideName}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 3,
            textAlign: "center",
          }}
        >
          <Grid>
            <Typography variant="h4" gutterBottom>
              결혼식 정보
            </Typography>
            <Button
              autoFocus
              sx={{
                width: "45%",
                height: 45,
                backgroundColor: "black",
                "&:hover": { backgroundColor: "gray" },
                color: "white",
                fontSize: 15,
                mt: 5,
                mr: 2,
              }}
              onClick={() => {
                router.push(`/invitation/${copyId}`);
              }}
            >
              청첩장
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
                mt: 5,
              }}
              onClick={() => {
                copyClipboard(
                  `${window.document.location.host}/invitation/${copyId}`,
                  () => setOpenSnackbar(true),
                  () => setOpenSnackbarFail(true)
                );
              }}
            >
              주소 복사
            </Button>
          </Grid>
          <Box>
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
                onClick={() => {
                  router.push(`/admin/wedding/${copyId}`);
                }}
              >
                수정
              </Button>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Button
                autoFocus
                sx={{
                  width: "95%",
                  height: 45,
                  backgroundColor: "gray",
                  "&:hover": { backgroundColor: "red" },
                  color: "white",
                  fontSize: 15,
                }}
                onClick={async () => {
                  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/delWeddingInfo`, {
                    method: "DELETE",
                    body: JSON.stringify({ id: copyId }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  refreshData();
                  modalClose();
                }}
              >
                삭제
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <SnackBarCustom
        open={openSnackbar}
        close={snackbarClose}
        openTime={2000}
        severity="success"
        backgroundColor={"green"}
        message="복사에 성공하였습니다."
      />
      <SnackBarCustom
        open={openSnackbarFail}
        close={snackbarClose}
        openTime={2000}
        severity="success"
        backgroundColor={"red"}
        message="복사 실패하였습니다."
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const company = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/getAllCompany`)).json();
    const wedding = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/findAllWedding`)).json();

    return {
      props: {
        company,
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
