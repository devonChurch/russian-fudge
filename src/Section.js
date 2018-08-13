import React, { Component } from "react";
import { Card, Col, Row, Input, Layout, Spin, Alert } from "antd";

const { Content } = Layout;

const Section = ({ isLoading, isError, isEmpty, isSuccess, children }) => (
  <Content>
    <section style={{ maxWidth: "960px", margin: "50px auto" }}>
      <Row gutter={24}>
        {isSuccess && <Col span={12}>{children}</Col>}
        {isEmpty && (
          <Col span={12}>
            <Alert message="No match found" type="info" showIcon />
          </Col>
        )}
        {isError && (
          <Col span={12}>
            <Alert message="There has been an error" type="error" showIcon />
          </Col>
        )}
        {isLoading && (
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px 0 0"
            }}
          >
            <Spin />
          </Col>
        )}
      </Row>
    </section>
  </Content>
);

export default Section;
