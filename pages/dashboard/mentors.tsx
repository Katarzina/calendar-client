import { GetServerSidePropsContext, NextPage } from "next";
import { useState, useEffect } from "react";
import { Table, Button, Form, Modal, notification } from "antd";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from "@/api";
import React from "react";
import { Layout } from "@/layouts/Layout";
import { PlusOutlined } from "@ant-design/icons";
import { ActivityItem } from "../../api/dto/activities.dto";
import MentorForm from "@/components/MentorForm";
import { Mentor } from "@api/dto/mentors.dto";
import { ColumnsType } from "antd/es/table";
import { createMentor, removeMentor, updateMentor } from "../../graphql/mentors";

interface Props {
  mentorsData: ActivityItem[];
}

const buttonStyle = {
  color: "blue",
  textDecoration: "underline",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
};

const MentorsPage: NextPage<Props> = ({ mentorsData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<"edit" | "new">("new");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [mentors, setMentors] = useState<Mentor[] | null>(mentorsData ?? null);

  useEffect(() => {
    if (editMode === "edit" && selectedMentor) {
      form.setFieldsValue({
        fullName: selectedMentor.fullName,
      });
    } else {
      form.resetFields();
    }
  }, [editMode, selectedMentor, form]);

  const addMentor = async (values) => {
    setIsModalOpen(false);

    try {
      /* const result = await Api.mentors.create({
        fullName: values.fullName,
      });*/
      const result = await createMentor({
        fullName: values.fullName,
      });
      setMentors((prevMentors) => {
        if (prevMentors) {
          return [...prevMentors, result];
        }
        // If prevActivities is null, just return result
        return result;
      });
    } catch (err) {
      notification.error({
        message: "Error!",
        description: err.toString(),
        duration: 2,
      });
    }
  };

  const updateMentorClick = async (values) => {
    setIsModalOpen(false);

    const data = {
      fullName: values.fullName,
    };

    try {
      //await Api.mentors.update(selectedMentor.id, data);
      await updateMentor(selectedMentor.id, data);
      const mentorsAfterUpdate = mentors.map((mentor) =>
        mentor.id === selectedMentor.id
          ? { id: selectedMentor.id, ...data }
          : mentor,
      );
      setMentors(mentorsAfterUpdate);
    } catch (err) {
      notification.error({
        message: "Error!",
        description: err.toString(),
        duration: 2,
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      //await Api.mentors.remove(id);
      await removeMentor(id);
      const mentorsAfterRemove = mentors.filter(
        (activity) => activity.id !== id,
      );
      setMentors(mentorsAfterRemove);
      setIsModalOpen(false);
    } catch (err) {
      notification.error({
        message: "Ошибка!",
        description: err.toString(),
        duration: 2,
      });
    }
  };

  const columns: ColumnsType<Mentor> = [
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string, record: Mentor) => (
        <button
          style={buttonStyle}
          onClick={() => {
            setSelectedMentor(record);
            setEditMode("edit");
            showModal();
          }}
        >
          {text}
        </button>
      ),
    },
  ];

  return (
    <div style={{ width: "100%", margin: "10px" }}>
      <h1 style={{ marginBottom: "10px" }}>Mentors</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="middle"
        onClick={() => {
          setEditMode("new");
          setSelectedMentor(null);
          showModal();
        }}
        style={{ marginBottom: "10px" }}
      >
        Add mentors
      </Button>
      <Table columns={columns} dataSource={mentors} />
      <Modal
        title={editMode === "new" ? "Add mentor" : "Edit mentor"}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <MentorForm
          id={selectedMentor?.id}
          form={form}
          onDelete={handleDelete}
          onFinish={editMode === "new" ? addMentor : updateMentorClick}
        />
      </Modal>
    </div>
  );
};

MentorsPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Mentors">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }
  /*const client = createApolloClient();

  const { data } = await client.query({
    query: gql`
      query GetMentors {
        mentors {
          id
          fullName
        }
      }
    `,
  });*/

  const mentorsData = await Api.mentors.getAll();

  return {
    props: {
      mentorsData,
    },
  };
};

export default MentorsPage;
