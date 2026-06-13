import React from 'react'
import Header from '../others/header'
import CreateTask from '../others/CreateTask'
import AllTask from '../others/AllTasks'

const AdminDashboard = (props) => {
    return (
        <div className='h-screen w-full p-7'>
            <Header changeUser={props.changeUser} />
            <CreateTask />
            <AllTask />
        </div>
    )
}

export default AdminDashboard