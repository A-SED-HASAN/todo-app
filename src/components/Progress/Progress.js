import React from 'react'

const Progress = ({ allDuty, doneDuty }) => {
  return (
    <progress className='progress' max={allDuty} value={doneDuty}></progress>
  )
}

export default Progress
