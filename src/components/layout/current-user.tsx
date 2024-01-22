import { Popover, Button } from "antd";
import React from "react";
import CustomAvatar from "../custom-avatar";
import { useGetIdentity } from "@refinedev/core";
import type {User} from '@/graphql/schema.typea'

const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 99999 }}
      >
        <CustomAvatar />
      </Popover>
    </>
  );
};

export default CurrentUser;
