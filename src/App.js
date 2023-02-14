import React, { useState, useEffect } from 'react'
import Alert from './Alert'
import List from './Lists/List'
import RemovedList from './Lists/RemovedList'
const getLocalStorage = () => {
  let list = localStorage.getItem('list')

  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}
const getLocalStorageDone = () => {
  let doneList = localStorage.getItem('doneList')

  if (doneList) {
    return JSON.parse(localStorage.getItem('doneList'))
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [doneList, setDoneList] = useState(getLocalStorageDone())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
  const [deletable, setDeletable] = useState(true)
  const [donAble, setDoneAble] = useState(true)

  const submitHandler = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'please enter a duty')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setDeletable(true)
      setDoneAble(true)
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'duty changed')
    } else {
      showAlert(true, 'danger', 'oh a duty 😰')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([newItem, ...list])
      setName('')
    }
  }
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, msg, type })
  }
  const clearList = () => {
    showAlert(true, 'success', 'list is empty 😍')
    setList([])
    setDoneList([...doneList, ...list])
  }
  const clearDeletedList = () => {
    showAlert(true, 'success', 'donned duty list is empty 😍')
    setDoneList([])
  }
  const removeItem = (id) => {
    if (deletable) {
      showAlert(true, 'danger', 'Item Removed From Todo')
      const newList = list.filter((item) => item.id !== id)
      setList(newList)
      console.log(deletable)
    } else {
      showAlert(true, 'danger', 'you want delete it or edit it?')
    }
  }
  const doneItem = (id) => {
    if (donAble) {
      showAlert(true, 'success', 'A Duty Accomplished')
      const newList = list.filter((item) => item.id !== id)
      setList(newList)
      const deletedItem = list.filter((item) => item.id === id)
      setDoneList([
        { id: new Date().getTime().toString(), title: deletedItem[0].title },
        ...doneList,
      ])
    } else {
      showAlert(true, 'danger', 'you want done it or edit it?')
    }
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
    setDeletable(false)
    setDoneAble(false)
  }
  const showTime = (id) => {
    const whenCreated = new Date(Number(id))
    const formalTime = `${whenCreated.getHours()} : ${whenCreated.getMinutes()} : ${whenCreated.getSeconds()} `
    return formalTime
  }
  const showTimeFromDone = (id) => {
    const whoSID = doneList.filter((item) => item.id === id)
    return Number(whoSID[0].id)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
    localStorage.setItem('doneList', JSON.stringify(doneList))
  }, [list, doneList])

  return (
    <>
      <section className='section-center'>
        <form onSubmit={submitHandler} className='grocery-form'>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3>To do reminder</h3>
          <div className='form-control'>
            <input
              type='text'
              className='grocery'
              placeholder='Add To Do 💪🏼'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type='submit' className='submit-btn'>
              {isEditing ? 'edit' : 'submit'}
            </button>
          </div>
        </form>

        {list.length > 0 && (
          <div className='grocery-container'>
            <List
              items={list}
              removeItem={removeItem}
              editItem={editItem}
              showTime={showTime}
              doneItem={doneItem}
            />
            <button className='clear-btn' onClick={clearList}>
              All Done
            </button>
          </div>
        )}
      </section>
      {doneList.length > 0 && (
        <section className='section-center'>
          <div className='grocery-container'>
            <RemovedList
              deletedItems={doneList}
              showTimeFromDone={showTimeFromDone}
            />
            <button className='clear-btn' onClick={clearDeletedList}>
              Clear Items
            </button>
          </div>
        </section>
      )}
    </>
  )
}

export default App
