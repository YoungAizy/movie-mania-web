import { Drawer } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "./styled/TextInput.tsx";
import StyledBtn from "./StyledBtn.tsx";
import SigninModal from "./SigninModal.tsx";
import ProgressOverlay from "./ProgressOverlay.tsx";
import { isLoggedIn } from "../myhooks/useAuth.ts";
import "../styles/navigationDrawer.scss";

type PropsType = {
  openNavigation: boolean;
  setOpenNavigation: React.Dispatch<React.SetStateAction<boolean>>;
  isHomePage?: boolean;
};

const NavigationDrawer = ({
  openNavigation,
  setOpenNavigation,
  isHomePage,
}: PropsType) => {
  const [processingForm, setProcessing] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const navigate = useNavigate();
  const isUserLoggedIn = isLoggedIn();

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Drawer
        className="sidenav"
        anchor="left"
        open={openNavigation}
        onClose={() => setOpenNavigation(false)}
        sx={{
          ".MuiDrawer-paper": {
            backgroundColor: "rgb(20, 20, 34)",
            overflowX: "hidden",
            padding: "60px 12px 16px",
            width: "250px",
          },
        }}
      >
        <button className="closebtn" onClick={() => setOpenNavigation(false)}>
          &times;
        </button>
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2vh 0" }}
        >
          {isHomePage && (
            <TextInput
              value={""}
              sx={(theme) => ({
                ".MuiOutlinedInput-input": {
                  padding: "8.5px 14px",
                },
                [theme.breakpoints.up("md")]: {
                  display: "none",
                },
              })}
            />
          )}
        </div>
        <Link to="/home">Movies &amp; Series</Link>
        <Link to="/people">People</Link>
        {isUserLoggedIn && <Link to="/favourites">Collections</Link>}
        {isUserLoggedIn && <Link to="profile">Profile</Link>}
        {isUserLoggedIn ? (
          <StyledBtn
            sx={{ marginBlock: "auto" }}
            btnColor="error"
            onClick={logout}
          >
            Logout
          </StyledBtn>
        ) : (
          <StyledBtn
            sx={{ marginBlock: "auto" }}
            onClick={() => setLoginDialogOpen(true)}
          >
            {" "}
            Sign In{" "}
          </StyledBtn>
        )}
      </Drawer>
      <ProgressOverlay open={processingForm} authText={"Signing In..."} />
      <SigninModal
        isOpen={isLoginDialogOpen}
        setOpen={setLoginDialogOpen}
        setProcessing={setProcessing}
      />
    </>
  );
};

export default NavigationDrawer;
