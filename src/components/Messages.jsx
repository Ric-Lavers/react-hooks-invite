import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Tooltip, TextField, Button } from '@material-ui/core'

import { useFetch } from '../hooks/hooks'
import { getAllMessages, postMessage } from '../api/messages'
import Spinner from './common/Spinner'

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

const colors = [
  '#A239CA', 
  '#0D23FF',
  '#FF0000',
  '#E86C0C',
	'#FFCB0D',
	'pink'
]


const WriteMessage = ({postMsg, color, name}) => {
	const [ value, setValue ] = useState('')
	const [ tooLong, isTooLong ] = useState(false)

	const handleSubmit = async (e) => {
		e && e.preventDefault()
		if ( !value.match(/()\w+/) ) {
			console.error("no words")
			return 
		};

		await postMsg(value)
		setValue('')
	}

	const handleKeyPress = ({ key, shiftKey }) => {
		if (key === 'Enter' && shiftKey ) {
			handleSubmit()
		}
	}

	const handleChange = ({value}) => {
		isTooLong(value.length >= 512)
		setValue(value)
	}

	return (
		<form onSubmit={handleSubmit} className="flex write-message hundred" >
			<div style={{backgroundColor: color}}>
				{`posting as "${name}"`}
			</div>
			<TextField
				style={ tooLong ? styles.error : {} }
				className="hundred write-message__input"
				multiline
				rowsMax="8"
				value={value}
				onChange={({ target}) => handleChange(target)}
				onKeyPress={handleKeyPress}
				variant="outlined"
			/>
			<p className={`too-long ${tooLong ? '' : 'hide'}`}>
				Dude, too long and boring.
			</p>
				<span>
					<Button
						type="submit"
						className="hundred" 
						
						id="write-message__submit"
						variant="contained"
						color="primary"
					>
						Send
					</Button>
				</span>
		</form>
	)
}

const Messages = () => {
	const [messages, updateData] = useFetch(getAllMessages, [])
console.log(messages)
	const id = localStorage.getItem('personId')

	const handlePostMsg = async (value) => {
		let personId = id
		let message;
		try {
			const postedMsg= await postMessage( {
				name: localStorage.getItem('name') || 'some guy',
				message: value,
				personId: personId,
			})
			message = postedMsg
			updateData([ message, ...messages])
		} catch (error) {
			console.error(error)
		}

	}
	const unknown =  'some guy'
	const color = id ? colors[parseInt(id, 16) % 5 ] : 'orange'
	const name = localStorage.getItem('name') || unknown

	return(
		<>
			<h2>Message Board</h2>
			<div className="hundred">
				<WriteMessage 
					postMsg={handlePostMsg} 
					color={color}
					name={name}
				/>
				<div 
				className="message-container">
					{messages.map((msg, i) => {
						let name = msg.name
						if ( !name  ) {
							name = unknown
						}else if ( id === msg.personId && !!msg.personId) {
							name ='You'
						}
						return (
						<div key={`${i}_${msg._id}`}
							className={`message ${id === msg.personId? 'you':''}`}
						>

						{(name === 'You') &&
							<Fragment>
								<div key={`key_${msg._id}`}/>
								<p style={styles.li}>{msg.message}</p>
							</Fragment>
						}

							<Tooltip
								title={new Date(msg.created_on).toLocaleString()}
								placement="top-end"
							>
								<div 
									className="avatar"
									style={msg.personId
										? { backgroundColor: colors[parseInt(msg.personId, 16) % 5 ]}
										: {}
									}
								> <p>
									{
										name
									}
									</p>
								</div>
							</Tooltip>

							{id !== msg.personId &&
								<p style={styles.li}>{msg.message}</p>
							}
						</div>)}
						)}
				</div>
			</div>
		</>
	)
}

export default Messages;