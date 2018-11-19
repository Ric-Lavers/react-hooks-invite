import React, {useState, Fragment} from 'react'

import { Tooltip } from '@material-ui/core'

import { useFetch } from '../hooks/hooks'
import { getAllMessages } from '../api/messages'
import Spinner from './common/Spinner'

const colors = [
  '#A239CA', 
  '#0D23FF',
  '#FF0000',
  '#E86C0C',
	'#FFCB0D',
	'pink'
]

const hexToColor = id => {
  const numOfColors = colors.length
  return colors[parseInt(id, 16) % numOfColors ]
}

const MessageList = ({ messages }) => {
  const localStorageId = localStorage.getItem('personId') || false

  return (
    <div className="message-container">
      {messages.map((msg, i) => 
        <MsgItem 
          {...msg} 
          localStorageId={localStorageId}
        />
      )}
    </div>
  )
}

const MsgItem = ({
  _id,
  message,
  name,
  personId,
  localStorageId,
}) => {
  const isUser = localStorageId === personId
  const color = hexToColor(_id)
  const containerClass = isUser 
    ? "messages you": "messages";
  name  = name || "Some guy"
  
  if (!message) {
    return <span/>
  }

  return (
    <div  key={`key_${_id}`} className={containerClass}>
        
        {isUser &&
          <p>
            {message}
          </p>
        }
        <div className="avatar" style={{ backgroundColor: color }} >
          <strong>
            {name}  
          </strong>
        </div>
        {!isUser &&
          <p>
            {message}
          </p>
        }
    </div>
  )
}

MsgItem.defaultProps = {
  name: "Some guy"
}

export default MessageList
