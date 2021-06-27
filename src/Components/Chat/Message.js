import { Avatar } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ id, sender, message, timestamp, user, auth }, ref) => {

        return (
            <div ref={ref} className={`message ${auth?.user.email === sender?.email && "message__sender"}`}>
                {/*<Avatar className="message__photo" src={sender.photo} />*/}
                <p>{message}</p>
                <small>{new Date(parseInt(timestamp,10)).toLocaleTimeString()}</small>
            </div>
        );
    }
);

export default Message;
