import React from 'react'
import { locale } from '../../../../public/locale'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className='dashboard-header'>
        <h1>{locale.pt.navigation.requests}</h1>
      </div>
    </div>
  )
}

export default Dashboard