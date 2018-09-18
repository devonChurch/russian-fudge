import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Form, Input, Radio, Modal, Button } from "antd";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class CreateModal extends Component {
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

    console.log("formKeyValues", formKeyValues);

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
      <Modal
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
      </Modal>
    );
  }
}

// const CreateModal = ({
//   isModalOpen,
//   modalTitle,
//   modalCategory,
//   modalDescription,
//   modalHref,
//   modalIcon,
//   handleModalClose,
//   handleModalSubmit
// }) => (
//   <Modal
//     title="Basic Modal"
//     visible={isModalOpen}
//     onOk={handleModalSubmit}
//     onCancel={handleModalClose}
//   >
//     <Form onSubmit={this.handleModalSubmit}>
//       <FormItem label="Food">
//         <Input name="food" />
//       </FormItem>
//       <FormItem label="Category">
//         <RadioGroup defaultValue="fruit">
//           <RadioButton value="fruit">Fruit</RadioButton>
//           <RadioButton value="vegetable">Vegetable</RadioButton>
//         </RadioGroup>
//       </FormItem>
//       <FormItem label="Description">
//         <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
//       </FormItem>
//       <FormItem label="Icon">
//         <Input />
//       </FormItem>
//       <FormItem label="External Link">
//         <Input />
//       </FormItem>
//     </Form>
//   </Modal>
// );

export default CreateModal;
