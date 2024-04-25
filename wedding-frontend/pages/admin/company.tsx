import Appbar from "@/public/companent/Appbar";
import { Box, Button, Grid, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";


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

export default function Company({
  company,
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
}) {
  const router = useRouter();

  const [companyData, setCompanyData] = useState<
    Array<{
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
    }>
  >([]);

  const [addCompanyData, setAddCompanyData] = useState<{
    name: string;
    addr: string;
    phone: string;
  }>({
    name: "",
    addr: "",
    phone: "",
  });

  const [editCompany, setEditCompany] = useState<{
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
  }>({
    _id: "",
    name: "",
    addr: "",
    phone: "",
    hallList: [],
  });

  const [modal, setModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  useEffect(() => {
    setCompanyData(company || []);
  }, [company]);

  const modalClose = () => {
    setAddCompanyData({
      name: "",
      addr: "",
      phone: "",
    });
    setModal(false);
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const editModalClose = () => {
    setEditModal(false);
  };

  return (
    <>
      <Appbar />
      <Grid container width={"100%"} mt={10}>
        <Grid width={"80%"} textAlign={"end"} margin={"auto"}>
          <Button
            variant="contained"
            onClick={() => {
              setModal(true);
            }}
          >
            예식장 추가
          </Button>
        </Grid>

        <Grid width={"100%"} marginTop={2}>
          <TableContainer component={Paper} sx={{ ...TableStyle, marginBottom: 13, width: "80%", margin: "auto" }}>
            <Table stickyHeader>
              <TableHead sx={{ backgroundColor: "black" }}>
                <TableRow>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    순
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    예식장명
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    주소
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={typoHeadStyle}>
                    전화번호
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyData.map((company, i) => (
                  <StyledTableRow
                    key={i}
                    sx={{ backgroundColor: (i + 1) % 2 !== 0 ? "#f2f2f2" : "none", cursor: "pointer" }}
                    onClick={() => {
                      setEditCompany({
                        _id: company._id,
                        name: company.name,
                        addr: company.addr,
                        phone: company.phone,
                        hallList: company.hallList,
                      });
                      setEditModal(true);
                    }}
                  >
                    <StyledTableCell component="th" scope="row" align="center" sx={typoBodyStyle}>
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {company.name}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {company.addr}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={typoBodyStyle}>
                      {company.phone}
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
              예식장 등록
            </Typography>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                예식장명
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2 }}
                label="이름"
                type={"text"}
                value={addCompanyData.name}
                onChange={(e) => {
                  setAddCompanyData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                주소
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2 }}
                label="주소"
                type={"text"}
                value={addCompanyData.addr}
                onChange={(e) => {
                  setAddCompanyData((prevState) => ({
                    ...prevState,
                    addr: e.target.value,
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
                value={addCompanyData.phone}
                onChange={(e) => {
                  setAddCompanyData((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
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
                  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/saveCompanyInfo`, {
                    method: "POST",
                    body: JSON.stringify(addCompanyData),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  refreshData();
                  modalClose();
                }}
              >
                추가
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
              예식장 수정
            </Typography>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                예식장명
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2 }}
                label="이름"
                type={"text"}
                value={editCompany.name}
                onChange={(e) => {
                  setEditCompany((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid ml={2} mt={3} item container direction="row" alignItems="center">
              <Typography variant="body1" gutterBottom sx={{ width: "25%" }}>
                주소
              </Typography>
              <TextField
                autoComplete="false"
                sx={{ marginLeft: 2 }}
                label="주소"
                type={"text"}
                value={editCompany.addr}
                onChange={(e) => {
                  setEditCompany((prevState) => ({
                    ...prevState,
                    addr: e.target.value,
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
                value={editCompany.phone}
                onChange={(e) => {
                  setEditCompany((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
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
                    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/editCompanyInfo`, {
                      method: "PUT",
                      body: JSON.stringify(editCompany),
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
                    try {
                      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/delCompanyInfo`, {
                        method: "DELETE",
                        body: JSON.stringify(editCompany),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });
                      refreshData();
                      editModalClose();
                    } catch (error) {
                      console.log(error);
                    }
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
    console.log(e);
    return {
      props: {
        value: null,
      },
    };
  }
};
