import { ApiClient } from 'adminjs'
import { useEffect, useState } from 'react'

const Dashboard = () => {
    const [data, setData] = useState(null)
    const api = new ApiClient()

    useEffect(() => {
        api.getDashboard()
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
            });
    }, [])

    return (
        <div className={`w-full h-full f-center flex-col`}>
            <img src="/images/logo.jpg" alt="" width={100} className='rounded-xl overflow-hidden' />
            <h2 className='text-xl mt-2'>Tehran Speaker Telegram Bot</h2>
            <h2 className='text-xl'>بات تلگرام تهران اسپیکر</h2>
        </div>
    );
}

export default Dashboard;