import React, { Component } from "react";
import { Card, Button, Tag } from "antd";
import upperFirst from "lodash.upperfirst";

const Food = ({ id, title, category, description, href, icon }) => (
  <Card key={id} title={`${icon} ${upperFirst(title)}`}>
    <div style={{ marginBottom: "15px" }}>
      <Tag>{category}</Tag>
    </div>
    <p>{description}</p>
    <Button type="primary" ghost href={href}>
      See More
    </Button>
  </Card>
);

export default Food;
