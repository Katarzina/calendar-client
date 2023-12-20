import { atom, selector } from 'recoil'
import { User } from '@/api/dto/auth.dto'

export const userState = atom<null | User>({
    key: 'UsersState',
    default: null,
})

export const userSelector =
    (selector << null) |
    (User >>
        {
            key: 'UsersSelector',
            get: ({ get }) => {
                return get(userState)
            },
        })
