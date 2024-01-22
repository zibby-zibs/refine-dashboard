import React from "react";
import { Avatar as AntdAvatar, AvatarProps } from "antd";

type Props = AvatarProps & {
  name: string;
};
const CustomAvatar = ({ name, style, ...rest }: Props) => {
  return (
    <AntdAvatar
      alt="Oloyede Hephzibah"
      size="small"
      style={{
        backgroundColor: "#87d078",
        display: "flex",
        alignItems: "center",
        border: "none",
      }}
    >
      Ol
    </AntdAvatar>
  );
};

export default CustomAvatar;
