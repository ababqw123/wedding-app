import Appbar from "@/public/companent/Appbar";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AddWedding({
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
  const [companyList, setCompanyList] = useState<
    Array<{
      companyName: string;
      companyId: string;
    }>
  >([]);
  const [halls, setHalls] = useState<
    Array<{
      companyId: string;
      name: string;
      floor: number;
      size: string;
    }>
  >([]);

  const today = new Date();
  const [data, setData] = useState<{
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
  }>({
    date: dayjs(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`),
    time: "",
    company: "",
    hall: "",
    people: {
      groomName: "",
      groomFather: "",
      groomMother: "",
      brideName: "",
      brideFather: "",
      brideMother: "",
    },
  });

  useEffect(() => {
    if (company != undefined) {
      const list = company.map((it) => {
        return { companyName: it.name, companyId: it._id };
      });
      setCompanyList(list);
    }
  }, [company]);

  useEffect(() => {
    if (companyList.length !== 0) {
      setData((prevState) => ({
        ...prevState,
        company: companyList[0].companyId,
      }));
    }
  }, [companyList]);

  useEffect(() => {
    if (data.company !== "") {
      const hallValue = company.filter((it) => {
        return it._id === data.company;
      });
      const hallList: Array<{
        companyId: string;
        order: number;
        name: string;
        floor: number;
        size: string;
      }> = [];
      const companyId = hallValue[0]._id;
      if (hallValue[0].hallList != null) {
        hallValue[0].hallList.forEach((it) => {
          hallList.push({
            companyId: companyId,
            order: it.order,
            name: it.name,
            floor: it.floor,
            size: it.size,
          });
        });
        setHalls(hallList);
        setData((prevState) => ({
          ...prevState,
          hall: hallList[0].name,
        }));
      } else {
        setHalls([]);
      }
    }
  }, [company, data.company]);

  useEffect(() => {}, []);

  return (
    <>
      <Appbar />
      <Grid
        sx={{
          width: 850,
          margin: "0 auto ",
        }}
      >
        <Grid
          sx={{
            width: "100%",
            marginTop: 13,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            결혼식 등록
          </Typography>
        </Grid>
        <Grid
          sx={{
            mt: 2,
            mb: 3,
            width: "100%",
            height: "350",
            display: "flex",
          }}
        >
          <Grid sx={{ borderRight: "1px solid black", width: "50%", textAlign: "center" }}>
            <Grid>
              <Typography
                variant="h5"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                신랑측
              </Typography>
            </Grid>
            <Grid mt={5}>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    이름
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.groomName}
                  onChange={(e) => {
                    const save = data.people;
                    save.groomName = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
              <Grid mt={3}>
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  가족사항
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    부
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.groomFather}
                  onChange={(e) => {
                    const save = data.people;
                    save.groomFather = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    모
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.groomMother}
                  onChange={(e) => {
                    const save = data.people;
                    save.groomMother = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              width: "50%",
              textAlign: "center",
            }}
          >
            <Grid>
              <Typography
                variant="h5"
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                신부측
              </Typography>
            </Grid>
            <Grid mt={5}>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    이름
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.brideName}
                  onChange={(e) => {
                    const save = data.people;
                    save.brideName = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  mt: 3,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  가족사항
                </Typography>
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    부
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.brideFather}
                  onChange={(e) => {
                    const save = data.people;
                    save.brideFather = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Grid
                  sx={{
                    marginLeft: 1,
                    width: 175,
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    모
                  </Typography>
                </Grid>
                <TextField
                  id="outlined-Company"
                  size="small"
                  type="string"
                  autoComplete="off"
                  value={data.people.brideMother}
                  onChange={(e) => {
                    const save = data.people;
                    save.brideMother = e.target.value;

                    setData((prevState) => ({
                      ...prevState,
                      people: save,
                    }));
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ width: 400, margin: "0 auto" }}>
          <Grid>
            <Grid
              sx={{
                display: "flex",
                mt: 6,
                ml: 5,
              }}
            >
              <Grid
                sx={{
                  mr: 3,
                  mt: 2,
                }}
              >
                <Typography>일자</Typography>
              </Grid>
              <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="결혼식 일자"
                    value={data.date}
                    sx={{ width: 232 }}
                    onChange={(newValue) => {
                      setData((prevState) => ({
                        ...prevState,
                        date: newValue || dayjs(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`),
                      }));
                    }}
                    format="YYYY-MM-DD"
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                mt: 3,
                ml: 5,
              }}
            >
              <Grid
                sx={{
                  mr: 3,
                  mt: 2,
                }}
              >
                <Typography>시간</Typography>
              </Grid>
              <Grid
                sx={{
                  width: 232,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">시간</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.time}
                    label="time"
                    onChange={(event) => {
                      setData((prevState) => ({
                        ...prevState,
                        time: event.target.value as string,
                      }));
                    }}
                  >
                    <MenuItem value={11}>11:00</MenuItem>
                    <MenuItem value={14}>14:00</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                mt: 3,
                ml: 3,
              }}
            >
              <Grid
                sx={{
                  mr: 3,
                  mt: 2,
                }}
              >
                <Typography>예식장</Typography>
              </Grid>
              <Grid
                sx={{
                  width: 232,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">예식장</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.company}
                    label="company"
                    sx={{ textAlign: "left" }}
                    onChange={(e) => {
                      setData((prevState) => ({
                        ...prevState,
                        company: e.target.value as string,
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
            <Grid
              sx={{
                display: "flex",
                mt: 3,
                ml: 7,
              }}
            >
              <Grid
                sx={{
                  mr: 3,
                  mt: 2,
                }}
              >
                <Typography> 홀</Typography>
              </Grid>
              <Grid
                sx={{
                  width: 232,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">홀</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={data.hall}
                    label="hall"
                    onChange={(event) => {
                      setData((prevState) => ({
                        ...prevState,
                        hall: event.target.value as string,
                      }));
                    }}
                  >
                    {halls.map((it, i) => (
                      <MenuItem key={i} value={it.name}>
                        {it.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          sx={{
            mt: 2,
            mb: 5,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            onClick={async () => {
              const result = await (
                await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/company/insertWedding`, {
                  method: "POST",
                  mode: "no-cors",
                  body: JSON.stringify(data),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
              ).json();
              router.push(`/invitation/${result["_id"]}`);
            }}
          >
            등록하기
          </Button>
        </Grid>
      </Grid>
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
