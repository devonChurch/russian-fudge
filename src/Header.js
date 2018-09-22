import React from "react";
import { Input, Button, Layout } from "antd";

const { Search } = Input;
const { Header: AntdHeader } = Layout;

const Header = ({ handleSearchInput, handleModalOpen }) => (
  <AntdHeader>
    <div
      style={{
        alignItems: "center",
        display: "flex",
        maxWidth: "960px",
        margin: "auto"
      }}
    >
      <Search
        placeholder="Search for a food"
        enterButton="Search"
        size="large"
        onSearch={handleSearchInput}
      />
      <div style={{ marginLeft: "20px" }}>
        <Button icon="plus" size="large" onClick={handleModalOpen} />
      </div>
    </div>
  </AntdHeader>
);

export default Header;
