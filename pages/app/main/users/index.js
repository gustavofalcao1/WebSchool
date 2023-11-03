import React, { useState } from "react"
import { MdAdd, MdClose } from 'react-icons/md'
import { locale } from '../../../../public/locale'

import Person from './person'
import Add from './add'
import Edit from './edit'

const Users = ({user}) => {
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [users, setUsers] = useState(null)
  const [data, setData] = useState(null)
  const [filter, setFilter] = useState('')
  const [order, setOrder] = useState('codeItem')

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
    <div className="users-container">
      {user?.type=='admin'?
      <div className="users-content">
        <div className='users-header'>
          {showAdd?<h1>{locale.pt.add.title}</h1>:
          showEdit?<h1>{locale.pt.edit.title}</h1>:
          <h1>{locale.pt.navigation.requests}</h1>}
          {showAdd||showEdit?<MdClose className="icon" onClick={close} size={40} />:
          <MdAdd className="icon" onClick={addItem} size={40} />}
        </div>
        <div className='users-actions'>
          <div className='users-filter'>
            <h1>{locale.pt.requests.actions.filter.title}</h1>
            <select
              className='users-filter-select'
              name="filter"
              value={filter}
              onChange={handleFilter}
            >
              <option value=''>{locale.pt.requests.actions.filter.default}</option>
              <option value={locale.pt.add.inputs.type.pc}>{locale.pt.add.inputs.type.pc}</option>
              <option value={locale.pt.add.inputs.type.equipament}>{locale.pt.add.inputs.type.equipament}</option>
              <option value={locale.pt.add.inputs.type.speak}>{locale.pt.add.inputs.type.speak}</option>
              <option value={locale.pt.add.inputs.type.adpter}>{locale.pt.add.inputs.type.adpter}</option>
              <option value={locale.pt.add.inputs.type.hardware}>{locale.pt.add.inputs.type.hardware}</option>
              <option value={locale.pt.add.inputs.type.acessory}>{locale.pt.add.inputs.type.acessory}</option>
              <option value={locale.pt.add.inputs.type.cable}>{locale.pt.add.inputs.type.cable}</option>
            </select>
          </div>
          <div className='users-order'>
            <h1>{locale.pt.requests.actions.order.title}</h1>
            <select
              className='users-order-select'
              name="order"
              value={order}
              onChange={handleOrder}
            >
              <option value='codeItem'>{locale.pt.requests.request.code}</option>
              <option value='displayName'>{locale.pt.requests.request.requester}</option>
              <option value='reqAt'>{locale.pt.requests.request.reqAt}</option>
              <option value='resAt'>{locale.pt.requests.request.resAt}</option>
            </select>
          </div>
        </div>
      </div>:
      <div className="users-content">
        <div className='users-header'>
          <h1>{locale.pt.navigation.requests}</h1>
        </div>
        <div className='users-actions'>
          <div className='users-filter'>
            <h1>{locale.pt.requests.actions.filter.title}</h1>
            <select
              className='users-filter-select'
              name="filter"
              value={filter}
              onChange={handleFilter}
            >
              <option value=''>{locale.pt.requests.actions.filter.default}</option>
              <option value={locale.pt.add.inputs.type.pc}>{locale.pt.add.inputs.type.pc}</option>
              <option value={locale.pt.add.inputs.type.equipament}>{locale.pt.add.inputs.type.equipament}</option>
              <option value={locale.pt.add.inputs.type.speak}>{locale.pt.add.inputs.type.speak}</option>
              <option value={locale.pt.add.inputs.type.adpter}>{locale.pt.add.inputs.type.adpter}</option>
              <option value={locale.pt.add.inputs.type.hardware}>{locale.pt.add.inputs.type.hardware}</option>
              <option value={locale.pt.add.inputs.type.acessory}>{locale.pt.add.inputs.type.acessory}</option>
              <option value={locale.pt.add.inputs.type.cable}>{locale.pt.add.inputs.type.cable}</option>
            </select>
          </div>
          <div className='users-order'>
            <h1>{locale.pt.requests.actions.order.title}</h1>
            <select
              className='users-order-select'
              name="order"
              value={order}
              onChange={handleOrder}
            >
              <option value='code'>{locale.pt.requests.request.code}</option>
              <option value='name'>{locale.pt.requests.request.name}</option>
              <option value='place'>{locale.pt.requests.request.place}</option>
              <option value='type'>{locale.pt.requests.request.type}</option>
              <option value='description'>{locale.pt.requests.request.description}</option>
              <option value='brand'>{locale.pt.requests.request.brand}</option>
              <option value='model'>{locale.pt.requests.request.model}</option>
              <option value='sn'>{locale.pt.requests.request.sn}</option>
            </select>
          </div>
        </div>
      </div>}
      {showAdd? <Add users={users} setShowAdd={setShowAdd} />:
      showEdit? <Edit data={data} setShowEdit={setShowEdit} />:
      <Person user={user} users={users} setUsers={setUsers} filter={filter} order={order} editItem={editItem} />}
    </div>
  )
}

export default Users