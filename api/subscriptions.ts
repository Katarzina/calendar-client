import axios from '@/core/axios'
import { ActivityDataItem } from './dto/activities.dto'
import { createSubscription, Subscription } from './dto/subscriptions.dto'

export const getAll = async (): Promise<Subscription[]> => {
    return (await axios.get('/subscriptions')).data
}

export const getSubscriptions = async (id: number): Promise<Subscription> => {
    return (await axios.get('/subscriptions/' + id)).data
}

export const remove = (id: number): Promise<void> => {
    return axios.delete('/subscriptions/' + id)
}

export const create = async (values: createSubscription): Promise<any> => {
    return (await axios.post('/subscriptions', values)).data
}

export const update = async (
    id: number,
    values: ActivityDataItem
): Promise<any> => {
    return (await axios.patch('/subscriptions/' + id, values)).data
}
