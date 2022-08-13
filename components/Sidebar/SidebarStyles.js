import styled from "styled-components";
import { Avatar, Button } from "@chakra-ui/react";
import { BsFillChatLeftTextFill, BsSearch } from "react-icons/bs";
import { MdOutlineMoreVert } from "react-icons/md";

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 20px 0;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  border-bottom: 1px solid whitesmoke;
`;

export const UserAvatar = styled(Avatar)`
  width: 35px;
  height: 35px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const IconButton = styled(Button)`
  padding: 0px;
  border-radius: 1.25rem;
  padding-top: 2px;
  margin-right: 10px;
`;

export const IconsContainer = styled.div``;

export const ChatIcon = styled(BsFillChatLeftTextFill)`
  font-size: 0.9rem;
`;

export const MoreIcon = styled(MdOutlineMoreVert)`
  font-size: 1.2rem;
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #e8e8e4;
`;

export const SearchIcon = styled(BsSearch)`
  margin-right: 10px;
  font-size: 1rem;
`;

export const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
  background-color: #e8e8e4;
`;

export const SidebarButton = styled(Button)`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 22px 0;
`;
