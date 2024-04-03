import GroupIcon from "@mui/icons-material/Group";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const pages = ["예식장 관리", "홀 관리", "식 관리"];
const settings = ["사용자 설정", "로그아웃"];

export default function Appbar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              display="flex"
              onClick={() => {
                router.push("/admin/company");
              }}
              sx={{ cursor: "pointer", ml: -0.5 }}
            >
              <GroupIcon sx={{ display: "flex", mr: 0.5 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mt: -0.5,
                  mr: 1,
                  display: "flex",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                관리
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: "flex" }}>
              {pages.map((page, i) => (
                <Link
                  key={i}
                  href={page === "예식장 관리" ? "/admin/company" : page === "홀 관리" ? "/admin" : "/admin/wedding"}
                  style={{ textDecoration: "none" }}
                >
                  <Button key={page} sx={{ my: 2, color: "white", display: "block" }}>
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, marginRight: -1 }}>
              <Tooltip title="설정">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      if (setting !== "로그아웃") {
                        setAnchorElUser(null);
                      } else {
                        router.replace("/");
                        setAnchorElUser(null);
                      }
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
