import React from 'react'

const WithClassName = (Componet: React.JSX.Element) => () => {
  return (
    // <Componet {...props} className='my-class' />
    <div>{'withClassName'}</div>
  )
}

export default WithClassName;