import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import { GetServerSidePropsContext, NextPage } from 'next'
import * as Api from '@/api'
import { ActivityDataItem } from '../api/dto/activities.dto'
import React, { useMemo, useState, useEffect } from 'react'
import moment from 'moment'
import { Mentor } from '@api/dto/mentors.dto'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { notification, Popconfirm } from 'antd'
import { Subscription } from '../api/dto/subscriptions.dto'
import { checkAuth } from '@/utils/checkAuth'
import { useRouter } from 'next/router'
import { User } from '@/api/dto/auth.dto'
import { Layout } from '@/layouts/Layout'
import { userState } from '../state/user'
import { useSetRecoilState } from 'recoil'

interface Props {
    activitiesData: ActivityDataItem[]
    mentorsData: Mentor[]
    subscriptionsData: Subscription[]
    isAuth: boolean
    userData: User
}

const HomePage: NextPage<Props> = ({
    activitiesData,
    mentorsData,
    subscriptionsData,
    isAuth,
    userData,
}) => {
    const [subscriptions, setSubscriptions] =
        useState<Subscription[]>(subscriptionsData)
    const router = useRouter()
    const [clicked, setClicked] = useState<boolean>(false)
    const setUser = useSetRecoilState(userState)

    useEffect(() => {
        if (isAuth) {
            setUser(userData)
        }
    }, [isAuth])

    useEffect(() => {
        // Check, if user is authorized
        if (clicked && !isAuth) {
            // If not authorized - redirect to login page
            router.push('/dashboard/auth')
        }
    }, [isAuth, router, clicked])

    const sortedActivities = useMemo(() => {
        return [...activitiesData].sort((a, b) => {
            // sort by startDate
            return new Date(a.startDate) - new Date(b.startDate)
        })
    }, [activitiesData])

    const groupedByDate = sortedActivities.reduce((acc, current) => {
        // Data Start as key for group
        const startDate = moment(current.startDate).format('YYYY-MM-DD')

        // If the key already exists, add an element to it, otherwise create a new array
        if (!acc[startDate]) {
            acc[startDate] = []
        }
        acc[startDate].push(current)

        return acc
    }, {})

    const handleAdd = async (id: number) => {
        if (!clicked) {
            setClicked(true)
            return
        }
        try {
            const subscriptionAnswer = await Api.subscriptions.create({
                activityId: id,
                userId: userData.id,
            })
            setSubscriptions([...subscriptions, subscriptionAnswer])
        } catch (err) {
            notification.error({
                message: 'Error!',
                description: err.toString(),
                duration: 2,
            })
        }
    }

    const handleRemove = async (id: number) => {
        if (!clicked) {
            setClicked(true)
            return
        }
        try {
            const subscriptionFound = subscriptions.find(
                (subscription) =>
                    subscription.user.id === userData.id &&
                    subscription.activity.id === id
            )
            await Api.subscriptions.remove(subscriptionFound.id)
            const subscriptionsAfterRemove = subscriptions.filter(
                (subscription) => subscription.id !== subscriptionFound.id
            )
            setSubscriptions(subscriptionsAfterRemove)
        } catch (err) {
            notification.error({
                message: 'Error!',
                description: err.toString(),
                duration: 2,
            })
        }
    }

    const RemoveSubscription = ({ onConfirm, id }) => {
        return (
            <Popconfirm
                title="Remove subscription?"
                onConfirm={() => onConfirm(id)}
                okText="Yes"
                cancelText="No"
            >
                <div
                    style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                    }}
                >
                    <MinusOutlined className="minus-icon" />
                </div>
            </Popconfirm>
        )
    }

    const AddToActivity = ({ ifAdd, onConfirm, id }) => {
        return (
            <Popconfirm
                title="Add to the activity?"
                onConfirm={() => onConfirm(id)}
                okText="Yes"
                cancelText="No"
            >
                <div
                    style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: ifAdd ? '25px' : '5px',
                    }}
                >
                    {ifAdd ? 'You are added' : <PlusOutlined className="plus-icon"/>}
                </div>
            </Popconfirm>
        )
    }
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>Activities</h1>
                {Object.entries(groupedByDate).map(([date, activities]) => (
                    <div key={date}>
                        <h2>Date: {moment(date).format('YYYY-MM-DD')}</h2>
                        {activities.map((activity, index) => {
                            const mentor = mentorsData?.find(
                                (mentorData: Mentor) =>
                                    mentorData.id === activity.mentorId
                            )
                            const userIdToCheck = userData?.id
                            const subscribeByActivity = subscriptions?.filter(
                                (subscription) =>
                                    subscription.activity.id === activity.id
                            )
                            const containsUserId = subscribeByActivity.some(
                                (subscription) =>
                                    subscription.user.id === userIdToCheck
                            )
                            return (
                                <>
                                    <div
                                        key={index}
                                        style={{
                                            position: 'relative',
                                            border: '1px solid #ccc',
                                            padding: '20px 10px',
                                            marginBottom: '10px',
                                            width: '200px',
                                        }}
                                        className="activity-item"
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '5px',
                                                right: '5px',
                                            }}
                                        >
                                            Users: {subscribeByActivity.length}
                                        </div>
                                        <p>
                                            At:{' '}
                                            {moment(activity.startDate).format(
                                                'HH-MM'
                                            )}
                                        </p>
                                        <p>Activity: {activity.activity}</p>
                                        <p>Theme: {activity.theme}</p>
                                        <p>Mentor: {mentor?.fullName}</p>
                                        <AddToActivity
                                            onConfirm={handleAdd}
                                            id={activity.id}
                                            ifAdd={containsUserId}
                                        />
                                        {containsUserId && (
                                            <RemoveSubscription
                                                onConfirm={handleRemove}
                                                id={activity.id}
                                            />
                                        )}
                                    </div>
                                </>
                            )
                        })}
                    </div>
                ))}
            </main>
        </>
    )
}

HomePage.getLayout = (page: React.ReactNode) => {
    return <Layout title="Dashboard / Events">{page}</Layout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx)
    let isAuth = true
    let userData = null

    if ('redirect' in authProps) {
        isAuth = false
    }

    const activitiesData = await Api.activities.getAll()

    const mentorsData = await Api.mentors.getAll()

    const subscriptionsData = await Api.subscriptions.getAll()

    if (isAuth) {
        userData = await Api.auth.getMe()
    }

    return {
        props: {
            activitiesData,
            mentorsData,
            subscriptionsData,
            isAuth: isAuth,
            userData,
        },
    }
}

export default HomePage
