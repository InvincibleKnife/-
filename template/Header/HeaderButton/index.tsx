import type { NextPage } from "next";
import React, { useState } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import stylecss from "./index.module.scss";
import lists from "./list";
import { useRouter } from "next/router";
import Domlist from "./Domlist";
const HederButton: NextPage = () => {
  const router = useRouter();
  const items: MenuProps["items"] = lists.map(
    (item: { key: string; value: string; url: string }, index: number) => ({
      label: <Domlist text={item.key} url={item.url} router={router}></Domlist>,
      key: index,
    })
  );
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((state) => {
      const newLoadings = [...state];
      newLoadings[index] = true;

      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
  return (
    <>
      <span className={stylecss.rol}>
        <Space direction="vertical">
          <Dropdown.Button
            type="primary"
            icon={<CaretDownOutlined />}
            loading={loadings[1]}
            menu={{ items }}
            onClick={() => enterLoading(1)}
          >
            创作者中心
          </Dropdown.Button>
        </Space>
      </span>
    </>
  );
};
export default HederButton;
