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
        </CardContent>
      </CardContainer>
      <CardContainer>
        <CardTitle>Tasks:</CardTitle>
        <CardContent>
          <CardText>Create task</CardText>
        </CardContent>
      </CardContainer>
    </SideBarLayout>
  );
};
