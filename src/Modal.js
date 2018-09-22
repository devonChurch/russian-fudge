import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Radio, Modal as AntdModal } from "antd";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class Modal extends Component {
  $form = React.createRef();

  handleModalSubmit = async event => {
    const { handleModalClose, handleCreateFood } = this.props;
    const $form = ReactDOM.findDOMNode(this.$form.current);
    const formRawData = new FormData($form);
    const formKeyValues = {};

    for (let data of formRawData.entries()) {
      const [key, value = ""] = data;
      formKeyValues[key] = value;
    }

    formKeyValues.title = formKeyValues.title.toLowerCase();

    handleCreateFood({
      variables: formKeyValues,
      optimisticResponse: {
        __typename: "Mutation",
        createFoodItem: formKeyValues
      }
    });
    handleModalClose();
    Object.keys(formKeyValues).forEach(key => formRawData.set(key, ""));
    event.preventDefault();
  };

  render() {
    const { isModalOpen, handleModalClose } = this.props;

    return (
      <AntdModal
        title="Create a new food"
        visible={isModalOpen}
        onOk={this.handleModalSubmit}
        onCancel={handleModalClose}
      >
        <Form ref={this.$form} onSubmit={this.handleModalSubmit}>
          <FormItem label="Title">
            <Input name="title" />
          </FormItem>
          <FormItem label="Category">
            <RadioGroup defaultValue="fruit" name="category">
              <RadioButton value="fruit">Fruit</RadioButton>
              <RadioButton value="vegetable">Vegetable</RadioButton>
            </RadioGroup>
          </FormItem>
          <FormItem label="Description">
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              name="description"
            />
          </FormItem>
          <FormItem label="Icon">
            <Input name="icon" />
          </FormItem>
          <FormItem label="External Link">
            <Input name="href" />
          </FormItem>
        </Form>
      </AntdModal>
    );
  }
}

export default Modal;
