import axios from '@/core/axios'
import { Mentor } from './dto/mentors.dto'

export const getAll = async (): Promise<Mentor[]> => {
    return (await axios.get('/mentors')).data
}

export const getMentor = async (id: number): Promise<Mentor> => {
    return (await axios.get('/mentors/' + id)).data
}

export const remove = (id: number): Promise<void> => {
    return axios.delete('/mentors/' + id)
}

export const create = async (values: Mentor): Promise<any> => {
    return (await axios.post('/mentors', values)).data
}

export const update = async (id: number, values: Mentor): Promise<any> => {
    return (await axios.patch('/mentors/' + id, values)).data
}
