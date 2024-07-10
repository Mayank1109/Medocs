import React from "react";
import { Channel, useChatContext, MessageTeam } from "stream-chat-react";
import ChannelInner from "./ChannelInner";
import CreateChannel from "./createChannel";

import EditChannel from "./EditChannel";
import TeamMessage from "./TeamMessage";
const ChannelContainer = ({
  isCreating,
  setIsCreating,
  setIsEditing,
  isEditing,
  createType,
}) => {
  const { channel } = useChatContext();
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the begining of your chat history
      </p>
      <p className="chnnel-empty__second">
        Send messages, attachements, links, emojis, and more
      </p>
    </div>
  );

  return (
    <div className=" channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
