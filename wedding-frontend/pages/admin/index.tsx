import Appbar from "@/public/companent/Appbar";
import {
  Box,
  Button,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const dynamic = "force-static";

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

export default function Hall({
  company,
}: {
  company: Array<{
    _id: string;
    name: string;
    addr: string;
    phone: string;
    hallList: Array<{
      _id: string;
      name: string;
      floor: number;
      size: string;
    }>;
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
  const [halls, setHalls] = useState<
    Array<{
      companyId: string;
      _id: string;
      name: string;
      floor: number;
      size: string;
    }>
  >([]);

  const [addHallData, setAddHall] = useState<{
    companyId: string;
    name: string;
    size: string;
    floor: number;
  }>({
    companyId: "",
    name: "",
    size: "",
    floor: 1,
  });

  const [editHall, setEditHall] = useState<{
    _id: string;
    companyId: string;
    name: string;
    size: string;
    floor: number;
  }>({
    _id: "",
    companyId: "",
    name: "",
    size: "",
    floor: 1,
  });

  const [modal, setModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const modalClose = () => {
    setAddHall({
      companyId: "",
      name: "",
      size: "",
      floor: 0,
    });
    setModal(false);
  };

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
    if (companySelect !== "") {
      const hallValue = company.filter((it) => {
        return it.name === companySelect;
      });
      const hallList: Array<{
        companyId: string;
        _id: string;
        name: string;
        floor: number;
        size: string;
      }> = [];
      const companyId = hallValue[0]._id;
      if (hallValue[0].hallList != null) {
        hallValue[0].hallList.forEach((it) => {
          hallList.push({
            companyId: companyId,
            _id: it._id,
            name: it.name,
            floor: it.floor,
            size: it.size,
          });
        });
        setHalls(hallList);
      } else {
        setHalls([]);
      }
    }
  }, [company, companySelect]);

  const editModalClose = () => {
    setEditModal(false);
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCompanySelect(event.target.value as string);
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
                setModal(true);
              }}
            >
              홀 추가
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
                    홀 이름
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    홀 크기
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    위치
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {halls.map((hall, i) => (
                  <StyledTableRow
                    key={i}
                    onClick={() => {
                      setEditHall({
                        companyId: hall.companyId,
                        _id: hall._id,
                        name: hall.name,
                        size: hall.size,
                        floor: hall.floor,
                      });
                      setEditModal(true);
                    }}
                    sx={{ backgroundColor: (i + 1) % 2 !== 0 ? "#f2f2f2" : "none", cursor: "pointer" }}
                  >
                    <StyledTableCell component="th" scope="row" align="center" sx={typoBodyStyle}>
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {hall.name}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {hall.size}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {hall.floor}
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
          <form>
            <Typography variant="h4" gutterBottom>
              홀 등록
            </Typography>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                예식장
              </Typography>
              <Grid ml={2}>
                <FormControl sx={{ width: 220 }}>
                  <InputLabel id="demo-simple-select-label">예식장</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addHallData.companyId}
                    label="company"
                    sx={{ textAlign: "left" }}
                    onChange={(e) => {
                      setAddHall((prevState) => ({
                        ...prevState,
                        companyId: e.target.value,
                      }));
                    }}
                  >
                    {companyList.map((it, i) => (
                      <MenuItem key={i} value={it.companyId}>
                        {it.companyName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                홀 이름
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2, width: 220 }}
                label="이름"
                type={"text"}
                value={addHallData.name}
                onChange={(e) => {
                  setAddHall((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                홀 크기
              </Typography>
              <FormControl sx={{ marginLeft: 2, width: 220 }}>
                <InputLabel id="addHall">홀크기</InputLabel>
                <Select
                  labelId="addHall"
                  id="addHall"
                  value={addHallData.size}
                  label="addHall"
                  sx={{ textAlign: "left" }}
                  onChange={(event: SelectChangeEvent) => {
                    setAddHall((prevState) => ({
                      ...prevState,
                      size: event.target.value as string,
                    }));
                  }}
                >
                  <MenuItem value={"SMALL"}>SMALL</MenuItem>
                  <MenuItem value={"MIDDLE"}>MIDDLE</MenuItem>
                  <MenuItem value={"LARGE"}>LARGE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                위치
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2, width: 220 }}
                label="위치"
                type={"number"}
                value={addHallData.floor}
                onChange={(e) => {
                  setAddHall((prevState) => ({
                    ...prevState,
                    floor: Number(e.target.value),
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
                  const sendHallData = {
                    companyId: addHallData.companyId,
                    hallInfo: {
                      name: addHallData.name,
                      size: addHallData.size,
                      floor: addHallData.floor,
                    },
                  };
                  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/insertHall`, {
                    method: "POST",
                    body: JSON.stringify(sendHallData),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  refreshData();
                  modalClose();
                }}
              >
                등록
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <Modal keepMounted open={editModal} onClose={editModalClose}>
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
          <form>
            <Typography variant="h4" gutterBottom>
              홀 수정
            </Typography>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                홀 이름
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2, width: 220 }}
                label="이름"
                type={"text"}
                value={editHall.name}
                onChange={(e) => {
                  setEditHall((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                홀 크기
              </Typography>
              <FormControl sx={{ width: 220, ml: 2 }}>
                <InputLabel id="editHall">홀크기</InputLabel>
                <Select
                  labelId="editHall"
                  id="editHall"
                  value={editHall.size}
                  label="editHall"
                  sx={{ textAlign: "left" }}
                  onChange={(event: SelectChangeEvent) => {
                    setEditHall((prevState) => ({
                      ...prevState,
                      size: event.target.value as string,
                    }));
                  }}
                >
                  <MenuItem value={"SMALL"}>SMALL</MenuItem>
                  <MenuItem value={"MIDDLE"}>MIDDLE</MenuItem>
                  <MenuItem value={"LARGE"}>LARGE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                위치
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2, width: 220 }}
                label="위치"
                type={"number"}
                value={editHall.floor}
                onChange={(e) => {
                  setEditHall((prevState) => ({
                    ...prevState,
                    floor: Number(e.target.value),
                  }));
                }}
              />
            </Grid>
            <Box>
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <Button
                  autoFocus
                  onClick={editModalClose}
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
                    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/editHall`, {
                      method: "PUT",
                      body: JSON.stringify(editHall),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    refreshData();
                    editModalClose();
                  }}
                >
                  수정
                </Button>
              </Box>
              <Box sx={{ marginTop: 3 }}>
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
                    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/delHall`, {
                      method: "DELETE",
                      body: JSON.stringify(editHall),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    refreshData();
                    editModalClose();
                  }}
                >
                  삭제
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const company = await (await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/getAllCompany`)).json();
    return {
      props: {
        company,
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
