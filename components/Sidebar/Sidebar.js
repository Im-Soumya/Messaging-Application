import {
  Container,
  Header,
  UserAvatar,
  IconsContainer,
  IconButton,
  ChatIcon,
  MoreIcon,
  Search,
  SearchIcon,
  SearchInput,
  SidebarButton,
} from "./SidebarStyles";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { AnnotationIcon } from "@heroicons/react/outline";
import { Avatar, Button } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Container>
      <Header>
        <UserAvatar />

        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton>Start a new chat</SidebarButton>
    </Container>
  );
};

export default Sidebar;
