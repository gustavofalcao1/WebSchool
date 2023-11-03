import React, { useState, useEffect } from "react"
import { MdAdd, MdClose } from 'react-icons/md'
import { locale } from '../../../../public/locale'

import Room from './room'
import Add from './add'
import Edit from './edit'

const Rooms = ({user}) => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState('')
  const [order, setOrder] = useState('code')

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleOrder = (e) => {
    setOrder(e.target.value)
  }

  const addItem = () => {
    setShowAdd(!showAdd)
  }

  const editItem = (item) => {
    setData(item)
    setShowEdit(!showEdit)
  }

  const close = () => {
    setShowAdd(false)
    setShowEdit(false)
  }
  

  return (
    <div className="rooms-container">
      {user?.type=='admin'?
      <div className="rooms-content">
        <div className='rooms-header'>
          {showAdd?<h1>{locale.pt.add.title}</h1>:
          showEdit?<h1>{locale.pt.edit.title}</h1>:
          <h1>{locale.pt.navigation.rooms}</h1>}
          {showAdd||showEdit?<MdClose className="icon" onClick={close} size={40} />:
          <MdAdd className="icon" onClick={addItem} size={40} />}
        </div>
      </div>:
      <div className="rooms-content">
        <div className='rooms-header'>
          <h1>{locale.pt.navigation.rooms}</h1>
        </div>
      </div>}
      {showAdd? <Add setShowAdd={setShowAdd} />:
      showEdit? <Edit data={data} setShowEdit={setShowEdit} />:
      <Room user={user} filter={filter} order={order} editItem={editItem} />}
    </div>
  )
}

export default Rooms