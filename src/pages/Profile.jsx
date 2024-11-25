import { SideBar } from "../components/SideBar/SideBar";
import { NavBar } from "../components/NavBar/NavBar";
import ProfileForm from "../components/ProfileForm/ProfileForm";
import { ProfileStyled } from "./ProfileStyled";

const Profile = () => {
  return (
    <ProfileStyled>
      <NavBar />
      <SideBar />
      <ProfileForm />
    </ProfileStyled>
  );
};

export default Profile;
