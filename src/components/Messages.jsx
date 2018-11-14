import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Tooltip, TextField, Button } from '@material-ui/core'

import { useFetch } from '../hooks/hooks'
import { getAllMessages, postMessage } from '../api/messages'

export const styles = {
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	messages: {
		display: 'flex',
		width: '80%',
		textAlign: 'left',
	},
	li: {	
		marginLeft: '2em',
		fontSize: '1.3em',
		alignSelf: 'center',
		listStyle: 'none'
	},
	tooltip: {
		fontSize: '18px'
	},
	error: {
		border: '1px solid red'
	}
}

const WriteMessage = ({postMsg}) => {
	const [ value, setValue ] = useState('')
	const [ tooLong, isTooLong ] = useState(false)

	const handleSubmit = e => {
		e.preventDefault()
		postMsg(value)
		setValue('')
	}

	return (
		<form onSubmit={handleSubmit} className="flex write-message hundred" >
			<TextField
				style={ tooLong ? styles.error : {} }
				className="hundred write-message__input"
				multiline
				rowsMax="8"
				value={value}
				onChange={({target}) => {
					isTooLong(target.value.length >= 512)
					setValue(target.value)
				}}
				variant="outlined"
			/>
			<p className={`too-long ${tooLong ? '' : 'hide'}`}>
				Dude, too long and boring.
			</p>
			<Button
				type="submit"
				className="hundred" 
				
				id="write-message__submit"
				variant="contained"
				color="primary"
			>
				Send
			</Button>
		</form>
	)
}

const Messages = () => {
	const [messages, updateData] = useFetch(getAllMessages, [{}])
	const [id, setId] = useState(localStorage.getItem('personId'))

	const handlePostMsg = async (value) => {
		let personId = id
		let message;
		try {
			const postedMsg= await postMessage( {
				name: localStorage.getItem('name') || '',
				message: value,
				personId: personId,
			})
			message = postedMsg
			updateData([...messages, message])
		} catch (error) {
			console.error(error)
		}

	}
	

	return(
		<>
			<h2>Message Board</h2>
			<div className="hundred">
				<div 
				className="message-container">
					{messages.map(msg => 
						<div key={msg._id}
							className={`message ${id === msg.personId? 'you':''}`}
						>
						{id === msg.personId &&
							<>
								<div/>
								<p style={styles.li}>{msg.message}</p>
							</>
						}
							<Tooltip
								title={new Date(msg.created_on).toLocaleString()}
								placement="top-end"
							>
								<div className="avatar">{id === msg.personId ? 'You' : msg.name}
								</div>
							</Tooltip>
							{id !== msg.personId &&
								<p style={styles.li}>{msg.message}</p>
							}
						</div>
						)}
				</div>
				<WriteMessage postMsg={value => handlePostMsg(value)} />
			</div>
		</>
	)
}

export default Messages;