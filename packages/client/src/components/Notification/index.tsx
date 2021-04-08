import React, { FC } from "react";
import { NotificationProps } from "./types";

export const Notification: FC<NotificationProps> = ({ description, title }) => (
    <div>
        <div>{title}</div>
        <div>{description}</div>
    </div>
);
