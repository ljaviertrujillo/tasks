import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const location = useLocation()
  return (
    <>
        {location.pathname === '/tasks' ? (
            <div className='absolute bottom-0 left-20 text-center'>tasks footer</div>
        ): location.pathname === '/projects' ? (
            <div className='text-center'>projects footer</div>
        ): null}
    </>
  )
}

export default Footer
