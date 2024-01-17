import React from 'react'

function Error({errMsg}) {
console.log('inside Error component')
const {statusText, status} = errMsg
  return (
    <div>
      <h1>{status}</h1>
      <h2>{statusText}</h2>
    </div>
  )
}

export default Error
