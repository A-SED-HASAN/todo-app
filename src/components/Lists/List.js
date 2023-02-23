import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { BsClockHistory } from 'react-icons/bs'
import { TiTickOutline } from 'react-icons/ti'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const List = ({ items, removeItem, editItem, showTime, doneItem }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title } = item
        return (
          <article key={id} className='to-do-item '>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='done-btn'
                onClick={() => doneItem(id)}>
                <TiTickOutline />
              </button>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button
                type='button'
                className='delete-btn'
                onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
              <button
                type='button'
                className='clock-btn'
                onClick={() => {
                  toast.info(`${showTime(id)}`, {
                    containerId: 'B',
                  })
                }}>
                <BsClockHistory />
              </button>
            </div>
          </article>
        )
      })}
      <ToastContainer
        containerId={'B'}
        enableMultiContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}

export default List
