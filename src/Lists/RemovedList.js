import React from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RemovedList = ({ deletedItems, showTimeFromDone }) => {
  const msToTime = (s) => {
    var pad = (n, z = 2) => ('00' + n).slice(-z)
    return (
      pad((s / 3.6e6) | 0) +
      ':' +
      pad(((s % 3.6e6) / 6e4) | 0) +
      ':' +
      pad(((s % 6e4) / 1000) | 0)
    )
  }
  return (
    <div className='grocery-list'>
      {deletedItems.map((item) => {
        const { id, title } = item
        return (
          <article key={id} className='grocery-item '>
            <p className='title deleted'>{title}</p>
            <div className='btn-container'>
              <button
                className='clock-btn'
                onClick={() => {
                  const now = new Date().getTime()
                  const getDifferent = -(showTimeFromDone(id) - now)
                  toast.info(`${msToTime(getDifferent)} Ago You done It 😉`, {
                    containerId: 'A',
                  })
                }}>
                ⌛
              </button>
              <button className='clock-btn'>✔️</button>
            </div>
          </article>
        )
      })}
      <ToastContainer
        containerId={'A'}
        enableMultiContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}

export default RemovedList
