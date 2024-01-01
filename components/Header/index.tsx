import React from "react";
import { Layout, Avatar, Menu, Popover, Button } from "antd";
import styles from "./Header.module.scss";
import { ScheduleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { userState } from "../../state/user";
import { useRecoilValue } from "recoil";
import { getInitials } from "../../utils/getInitials";

import * as Api from "@/api";

export const Header: React.FC = () => {
  const router = useRouter();
  const selectedMenu = router.pathname;
  const userData = useRecoilValue(userState);

  const onClickLogout = () => {
    if (window.confirm("Do you really want to leave?")) {
      Api.auth.logout();
      location.href = "/";
    }
  };

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <ScheduleOutlined />
            Events
          </h2>
          {userData?.role === "admin" && (
            <Menu
              className={styles.topMenu}
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[selectedMenu]}
              onSelect={({ key }) => router.push(key)}
              items={[
                { key: "/dashboard", label: "Events" },
                {
                  key: "/dashboard/mentors",
                  label: "Mentors",
                },
              ]}
            />
          )}
        </div>
        <div className={styles.headerRight}>
          {userData && (
            <Popover
              trigger="click"
              content={
                <>
                  <p>
                    Full name: <b>{userData?.fullName}</b>
                  </p>
                  <p>
                    E-Mail: <b>{userData?.email}</b>
                  </p>
                  <Button onClick={onClickLogout} type="primary" danger>
                    Logout
                  </Button>
                </>
              }
            >
              <Avatar>{getInitials(userData.fullName)}</Avatar>
            </Popover>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};
