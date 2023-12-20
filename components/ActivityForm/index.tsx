import React from 'react'
import {
    Button,
    Form,
    Input,
    DatePicker,
    TimePicker,
    Row,
    Col,
    Popconfirm,
    Select,
} from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Mentor } from '@api/dto/mentors.dto'

const { Option } = Select

interface ActivityFormProps {
    id: number
    onDelete: () => void
    form: any
    onFinish: () => void
    mentors: Mentor[]
}

const ActivityForm: React.FC<ActivityFormProps> = ({
    form,
    onFinish,
    onDelete,
    id,
    mentors,
}) => {
    const DeleteActivity = ({ onConfirm, id }) => (
        <Popconfirm
            title="Delete the task?"
            onConfirm={() => onConfirm(id)}
            okText="Yes"
            cancelText="No"
        >
            <Button type="primary" style={{ textTransform: 'uppercase' }}>
                <DeleteOutlined />
                Delete
            </Button>
        </Popconfirm>
    )

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
                    label="Activity"
                    name="activity"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите activity',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Theme"
                    name="theme"
                    rules={[
                        {
                            required: true,
                            message: 'Укажите Theme',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mentor"
                    name="mentorId"
                    rules={[
                        {
                            required: true,
                            message: 'Choose mentor',
                        },
                    ]}
                >
                    <Select placeholder="Choose mentor" allowClear>
                        {mentors?.map((mentor) => (
                            <Option key={mentor.id} value={mentor.Id}>
                                {mentor.fullName}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Start Date"
                            name="startDate"
                            rules={[
                                {
                                    required: true,
                                    message: 'Укажите дату начала',
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>

                        <Form.Item
                            label="Start Time"
                            name="startTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Укажите время начала',
                                },
                            ]}
                        >
                            <TimePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="End Date"
                            name="endDate"
                            rules={[
                                {
                                    required: true,
                                    message: 'Укажите дату окончания',
                                },
                            ]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label="End Time"
                            name="endTime"
                            rules={[
                                {
                                    required: true,
                                    message: 'Укажите время окончания',
                                },
                            ]}
                        >
                            <TimePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <DeleteActivity onConfirm={onDelete} id={id} />
        </>
    )
}

export default ActivityForm
