import Add from "../../images/add.svg";
import {
  CardContainer,
  CardContent,
  CardText,
  CardTitle,
  SideBarLayout,
} from "./SideBarStyled";

export const SideBar = () => {
  return (
    <SideBarLayout>
      <CardContainer>
        <CardTitle>Projects:</CardTitle>
        <CardContent>
          <CardText>Create project</CardText>
          <img
            style={{ alignSelf: "flex-end" }}
            src={Add}
          />
        </CardContent>
      </CardContainer>
      <CardContainer>
        <CardTitle>Tasks:</CardTitle>
        <CardContent>
          <CardText>Create task</CardText>
          <img
            style={{ alignSelf: "flex-end" }}
            src={Add}
          />
        </CardContent>
      </CardContainer>
    </SideBarLayout>
  );
};
