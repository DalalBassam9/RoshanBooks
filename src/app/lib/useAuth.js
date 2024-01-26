import useSWR from 'swr'
import axios from './axios'
import { useRouter } from 'next/navigation';
import {useEffect, useState} from 'react'
import {useSelector } from 'react-redux';

export default function useAuth({middleware} = {}) {
    const router = useRouter()
    const token = useSelector((state) => state.user.token);
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
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.data)
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')


    const logout = async () => {
        await axios.post('/api/logout')

        mutate(null)

        router.push('/login')
    }

    return {
        user,
        csrf,
        logout,
        isLoading
    }
}