import React from "react";
import { Button, Form, Input, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface MentorFormProps {
  id: number;
  onDelete: () => void;
  form: any;
  onFinish: () => void;
}

const ActivityForm: React.FC<MentorFormProps> = ({
  form,
  onFinish,
  onDelete,
  id,
}) => {
  const DeleteActivity = ({ onConfirm, id }) => (
    <Popconfirm
      title="Delete?"
      onConfirm={() => onConfirm(id)}
      okText="Yes"
      cancelText="No"
    >
      <Button type="primary" style={{ textTransform: "uppercase" }}>
        <DeleteOutlined />
        Delete
      </Button>
    </Popconfirm>
  );
  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Enter Mentor",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
      <DeleteActivity onConfirm={onDelete} id={id} />
    </>
  );
};

export default ActivityForm;
