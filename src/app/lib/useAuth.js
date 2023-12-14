import useSWR from 'swr'
import axios from './axios'
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react'

export default function useAuth({middleware} = {}) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (user || error) {
            setIsLoading(false);
        }
        if (middleware == 'guest' && user) router.push('/')
        if (middleware == 'auth' && !user && error) router.push('/login')
    })

    const { data: user, error, mutate } = useSWR('/api/user',
        () => axios.get('/api/user', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => response.data)
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const login = async ({setErrors, ...props}) => {
        setErrors([])
        await csrf()
        const response = await axios.post('/api/login', props)
        const token = response.data.access_token
        localStorage.setItem("token", token)
        router.push('/')
        return { token, user }
            .catch(error => {
                if (error.response.status != 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const logout = async () => {
        await axios.post('/api/logout')

        mutate(null)

        router.push('/login')
    }

    return {
        user,
        csrf,
        login,
        logout,
        isLoading
    }
}