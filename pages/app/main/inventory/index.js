import React, { useState, useEffect } from "react"
import { MdAdd, MdClose } from 'react-icons/md'
import { locale } from '../../../../public/locale'

import Items from './items'
import Add from './add'
import Edit from './edit'

const Inventory = ({user}) => {
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
    <div className="inventory-container">
      {user?.type=='admin'?
      <div className="inventory-content">
        <div className='inventory-header'>
          {showAdd?<h1>{locale.pt.add.title}</h1>:
          showEdit?<h1>{locale.pt.edit.title}</h1>:
          <h1>{locale.pt.navigation.inventory}</h1>}
          {showAdd||showEdit?<MdClose className="icon" onClick={close} size={40} />:
          <MdAdd className="icon" onClick={addItem} size={40} />}
        </div>
        <div className='inventory-actions'>
          <div className='inventory-filter'>
            <h1>{locale.pt.inventory.actions.filter.title}</h1>
            <select
              className='inventory-filter-select'
              name="filter"
              value={filter}
              onChange={handleFilter}
            >
              <option value=''>{locale.pt.inventory.actions.filter.default}</option>
              <option value={locale.pt.add.inputs.type.pc}>{locale.pt.add.inputs.type.pc}</option>
              <option value={locale.pt.add.inputs.type.equipament}>{locale.pt.add.inputs.type.equipament}</option>
              <option value={locale.pt.add.inputs.type.speak}>{locale.pt.add.inputs.type.speak}</option>
              <option value={locale.pt.add.inputs.type.adpter}>{locale.pt.add.inputs.type.adpter}</option>
              <option value={locale.pt.add.inputs.type.hardware}>{locale.pt.add.inputs.type.hardware}</option>
              <option value={locale.pt.add.inputs.type.acessory}>{locale.pt.add.inputs.type.acessory}</option>
              <option value={locale.pt.add.inputs.type.cable}>{locale.pt.add.inputs.type.cable}</option>
            </select>
          </div>
          <div className='inventory-order'>
            <h1>{locale.pt.inventory.actions.order.title}</h1>
            <select
              className='inventory-order-select'
              name="order"
              value={order}
              onChange={handleOrder}
            >
              <option value='code'>{locale.pt.inventory.items.code}</option>
              <option value='name'>{locale.pt.inventory.items.name}</option>
              <option value='place'>{locale.pt.inventory.items.place}</option>
              <option value='type'>{locale.pt.inventory.items.type}</option>
              <option value='description'>{locale.pt.inventory.items.description}</option>
              <option value='brand'>{locale.pt.inventory.items.brand}</option>
              <option value='model'>{locale.pt.inventory.items.model}</option>
              <option value='sn'>{locale.pt.inventory.items.sn}</option>
            </select>
          </div>
        </div>
      </div>:
      <div className="inventory-content">
        <div className='inventory-header'>
          <h1>{locale.pt.navigation.inventory}</h1>
        </div>
        <div className='inventory-actions'>
          <div className='inventory-filter'>
            <h1>{locale.pt.inventory.actions.filter.title}</h1>
            <select
              className='inventory-filter-select'
              name="filter"
              value={filter}
              onChange={handleFilter}
            >
              <option value=''>{locale.pt.inventory.actions.filter.default}</option>
              <option value={locale.pt.add.inputs.type.pc}>{locale.pt.add.inputs.type.pc}</option>
              <option value={locale.pt.add.inputs.type.equipament}>{locale.pt.add.inputs.type.equipament}</option>
              <option value={locale.pt.add.inputs.type.speak}>{locale.pt.add.inputs.type.speak}</option>
              <option value={locale.pt.add.inputs.type.adpter}>{locale.pt.add.inputs.type.adpter}</option>
              <option value={locale.pt.add.inputs.type.hardware}>{locale.pt.add.inputs.type.hardware}</option>
              <option value={locale.pt.add.inputs.type.acessory}>{locale.pt.add.inputs.type.acessory}</option>
              <option value={locale.pt.add.inputs.type.cable}>{locale.pt.add.inputs.type.cable}</option>
            </select>
          </div>
          <div className='inventory-order'>
            <h1>{locale.pt.inventory.actions.order.title}</h1>
            <select
              className='inventory-order-select'
              name="order"
              value={order}
              onChange={handleOrder}
            >
              <option value='code'>{locale.pt.inventory.items.code}</option>
              <option value='name'>{locale.pt.inventory.items.name}</option>
              <option value='place'>{locale.pt.inventory.items.place}</option>
              <option value='type'>{locale.pt.inventory.items.type}</option>
              <option value='description'>{locale.pt.inventory.items.description}</option>
              <option value='brand'>{locale.pt.inventory.items.brand}</option>
              <option value='model'>{locale.pt.inventory.items.model}</option>
              <option value='sn'>{locale.pt.inventory.items.sn}</option>
            </select>
          </div>
        </div>
      </div>}
      {showAdd? <Add setShowAdd={setShowAdd} />:
      showEdit? <Edit data={data} setShowEdit={setShowEdit} />:
      <Items user={user} filter={filter} order={order} editItem={editItem} />}
    </div>
  )
}

export default Inventory