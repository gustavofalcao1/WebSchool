import React, { useState, useEffect } from "react"
import { MdAdd, MdHistory, MdClose } from 'react-icons/md'
import { locale } from '../../../../public/locale'

import Request from './request'
import Add from './add'
import History from './history'

const Requests = ({user}) => {
  const [showAdd, setShowAdd] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [item, setItem] = useState(null)
  const [users, setUsers] = useState(null)
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

  const historyitem = () => {
    setShowHistory(!showHistory)
  }

  const close = () => {
    setShowAdd(false)
    setShowHistory(false)
  }

  return (
    <div className="requests-container">
      {user?.type=='admin'||user?.type=='manager'?
      <div className="requests-content">
        <div className='requests-header'>
          {showAdd?<h1>{locale.pt.add.title}</h1>:
          showHistory?<h1>{locale.pt.history.title}</h1>:
          <h1>{locale.pt.navigation.requests}</h1>}
          {showHistory||showAdd?<MdClose className="icon" onClick={close} size={40} />:
          <div className="requests-header-buttons">
            <MdHistory className="icon" onClick={historyitem} size={40} />
            <MdAdd className="icon" onClick={addItem} size={40} />
          </div>}
        </div>
        <div className='requests-actions'>
          <div className='requests-filter'>
            <h1>{locale.pt.requests.actions.filter.title}</h1>
            <select
              className='requests-filter-select'
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
          <div className='requests-order'>
            <h1>{locale.pt.requests.actions.order.title}</h1>
            <select
              className='requests-order-select'
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
      <div className="requests-content">
        <div className='requests-header'>
          <h1>{locale.pt.navigation.requests}</h1>
        </div>
        <div className='requests-actions'>
          <div className='requests-filter'>
            <h1>{locale.pt.requests.actions.filter.title}</h1>
            <select
              className='requests-filter-select'
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
          <div className='requests-order'>
            <h1>{locale.pt.requests.actions.order.title}</h1>
            <select
              className='requests-order-select'
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
      {showAdd? <Add item={item} users={users} setShowAdd={setShowAdd} />:
      showHistory? <History order={order} filter={filter} />:
      <Request user={user} users={users} setItem={setItem} setUsers={setUsers} filter={filter} order={order} />}
    </div>
  )
}

export default Requests