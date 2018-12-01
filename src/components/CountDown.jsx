import React, { useState, useEffect } from 'react'
import moment from 'moment'

// window.moment = moment

const eventDate = new Date('08 Dec 2018 16:00:00 GMT+1100')

const CountDown = () => {
  const [ time, setTime ] = useState(moment(eventDate).startOf('hour').fromNow())

  const timeDown = () => {
    setTime( 
      moment(eventDate).startOf('hour').fromNow()
    )
  }

  useEffect( () => {
    setTimeout( () => timeDown(), 1000 )
    return clearTimeout( () => timeDown() )
  }, [ time ])
 

  return (
    <div> 
      <h1>{time}</h1>
    </div>
  )
}

export default CountDown