import { GetServerSidePropsContext, NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Button, Form, Modal, notification } from 'antd'
import { checkAuth } from '@/utils/checkAuth'
import * as Api from '@/api'
import React from 'react'
import { Layout } from '@/layouts/Layout'
import { PlusOutlined } from '@ant-design/icons'
import { ActivityItem } from '../../api/dto/activities.dto'
import ActivityForm from '@/components/ActivityForm'
import MyCalendar from '../../components/MyCalendar'
import moment from 'moment'
import { Mentor } from '@api/dto/mentors.dto'

interface Props {
    activitiesData: ActivityItem[]
    mentorsData: Mentor[]
}

const DashboardPage: NextPage<Props> = ({ activitiesData, mentorsData }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<'edit' | 'new'>('new')
    const [selectedEvent, setSelectedEvent] = useState<ActivityItem | null>(
        null
    )
    const [form] = Form.useForm()
    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const [activities, setActivities] = useState<ActivityItem[] | null>(
        activitiesData ?? null
    )

    useEffect(() => {
        if (editMode === 'edit' && selectedEvent) {
            form.setFieldsValue({
                activity: selectedEvent.activity,
                theme: selectedEvent.theme,
                mentorId: selectedEvent.mentorId,
                startDate: moment(selectedEvent.start),
                endDate: moment(selectedEvent.end),
                startTime: moment(selectedEvent.start),
                endTime: moment(selectedEvent.end),
            })
        } else {
            form.resetFields()
        }
    }, [editMode, selectedEvent, form])

    const calendarEvents = activities.map((activity) => ({
        id: activity.id,
        title: activity.activity,
        activity: activity.activity,
        mentorId: activity.mentorId,
        theme: activity.theme,
        start: new Date(activity.startDate),
        end: new Date(activity.endDate),
    }))

    const addActivity = async (values) => {
        setIsModalOpen(false)
        const startDateTime =
            values.startDate && values.startTime
                ? new Date(
                      values.startDate.format('YYYY-MM-DD') +
                          ' ' +
                          values.startTime.format('HH:mm')
                  )
                : null

        // Объединение даты и времени окончания
        const endDateTime =
            values.endDate && values.endTime
                ? new Date(
                      values.endDate.format('YYYY-MM-DD') +
                          ' ' +
                          values.endTime.format('HH:mm')
                  )
                : null

        try {
            const result = await Api.activities.create({
                activity: values.activity,
                theme: values.theme,
                mentorId: values.mentorId,
                startDate: startDateTime,
                endDate: endDateTime,
            })
            setActivities((prevActivities) => {
                // Check if prevActivities is not null
                if (prevActivities) {
                    return [...prevActivities, result]
                }
                // If prevActivities is null, just return result
                return result
            })
        } catch (err) {
            notification.error({
                message: 'Ошибка!',
                description: err.toString(),
                duration: 2,
            })
        }
    }

    const updateActivity = async (values) => {
        setIsModalOpen(false)
        const startDateTime =
            values.startDate && values.startTime
                ? new Date(
                      values.startDate.format('YYYY-MM-DD') +
                          ' ' +
                          values.startTime.format('HH:mm')
                  )
                : null

        const endDateTime =
            values.endDate && values.endTime
                ? new Date(
                      values.endDate.format('YYYY-MM-DD') +
                          ' ' +
                          values.endTime.format('HH:mm')
                  )
                : null

        const data = {
            activity: values.activity,
            theme: values.theme,
            mentorId: values.mentorId,
            startDate: startDateTime,
            endDate: endDateTime,
        }

        console.log(data, 'data')

        try {
            await Api.activities.update(selectedEvent.id, data)
            const activitiesAfterUpdate = activities.map((activityItem) =>
                activityItem.id === selectedEvent.id
                    ? { id: selectedEvent.id, ...data }
                    : activityItem
            )
            setActivities(activitiesAfterUpdate)
        } catch (err) {
            notification.error({
                message: 'Ошибка!',
                description: err.toString(),
                duration: 2,
            })
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await Api.activities.remove(id)
            const activitiesAfterRemove = activities.filter(
                (activity) => activity.id !== id
            )
            setActivities(activitiesAfterRemove)
            setIsModalOpen(false)
        } catch (err) {
            notification.error({
                message: 'Ошибка!',
                description: err.toString(),
                duration: 2,
            })
        }
    }

    const handleEventClick = (clickedEvent) => {
        setSelectedEvent(clickedEvent)
        setEditMode('edit')
        showModal()
    }

    return (
        <div style={{ width: '100%', margin: '10px' }}>
            <h1 style={{ marginBottom: '10px' }}>Events</h1>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                className="plus-icon"
                size="middle"
                onClick={() => {
                    setEditMode('new')
                    setSelectedEvent(null)
                    showModal()
                }}
                style={{ marginBottom: '10px' }}
            >
                Add activities
            </Button>
            <MyCalendar
                events={calendarEvents}
                onEventClick={handleEventClick}
            />
            <Modal
                title={editMode === 'new' ? 'Add activity' : 'Edit activity'}
                open={isModalOpen}
                onOk={form.submit}
                onCancel={handleCancel}
            >
                <ActivityForm
                    id={selectedEvent?.id}
                    form={form}
                    onDelete={handleDelete}
                    onFinish={editMode === 'new' ? addActivity : updateActivity}
                    mentors={mentorsData}
                />
            </Modal>
        </div>
    )
}

DashboardPage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Мероприятия">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)

    if ('redirect' in authProps) {
        return authProps
    }

    const activitiesData = await Api.activities.getAll()

    const mentorsData = await Api.mentors.getAll()

    return {
        props: {
            activitiesData,
            mentorsData,
        },
    }
}

export default DashboardPage
