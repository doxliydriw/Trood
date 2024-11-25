import { NavBarLayout, PageTitle } from "./NavBarStyled";
import Arrow from "../../images/mdi_arrow-down.svg";
import Logo from "../../images/logo.svg";

export const NavBar = () => {
  return (
    <NavBarLayout>
      <img
        src={Arrow}
        style={{ marginRight: "46px" }}
      />
      <img
        src={Logo}
        style={{ marginRight: "37px" }}
      />
      <PageTitle>Profile</PageTitle>
    </NavBarLayout>
  );
};
