import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import TeamChannelPreview from "./TeamChannelPreview";
import Cookies from "universal-cookie";
import HospitalIcon from "../../assets/hospital";
import LogoutIcon from "../../ui/logoutIcon";
import ChannelSearch from "./channelSearch";
import TeamChannelList from "./teamChannelList";
import { authActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

const SideBar = ({ logoutHandler }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner">
        <HospitalIcon />
      </div>
    </div>
    <div className="channel-list__sidebar__icon2">
      <div className="icon1__inner" onClick={logoutHandler}>
        <LogoutIcon />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Medical Pager</p>
  </div>
);

const ChannelListContainer = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("userId");
    cookies.remove("phoneNumber");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");

    dispatch(authActions.logout());
    navigate("/auth");
  };

  return (
    <>
      <SideBar logoutHandler={logoutHandler} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => <TeamChannelList {...listProps} type="team" />}
          Preview={(previewProps) => {
            <TeamChannelPreview
              {...previewProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
            />;
          }}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => (
            <TeamChannelList {...listProps} type="messaging" />
          )}
          Preview={(previewProps) => {
            <TeamChannelPreview {...previewProps} type="messaging" />;
          }}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;
