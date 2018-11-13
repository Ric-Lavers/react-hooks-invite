import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Tooltip, TextField, Button } from '@material-ui/core'

import { getAllMessages, postMessage } from '../api/messages'

export const styles = {
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	avatar: {
		backgroundColor: 'orange',
		height: '2em',
		fontSize: '1.5em',
		borderRadius: '1.5em',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0.5em',
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
	}
}

export const useFetch = (fetchFunc, defaultData, input) => {
	const [data, updateData] = useState(defaultData)

	useEffect(async () => {
			const data = await fetchFunc(input)
			updateData(data)
	}, [fetchFunc])

	return [data, updateData]
}

const WriteMessage = ({postMsg}) => {
	const [ value, setValue ] = useState('')

	return (
		<div className="flex write-message hundred"  >
			<TextField
				className="hundred" 
				id="write-message__input"
				multiline
				rowsMax="4"
				value={value}
				onChange={({target}) => setValue(target.value)}
				margin="normal"
				variant="outlined"
			/>
			<Button
				className="hundred" 
				onClick={() =>postMsg(value)}
				id="write-message__submit"
				variant="contained"
				color="primary"
			>
				Send
			</Button>
		</div>
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
		<div className="hundred">
			<div style={styles.container}>
				<ul className="block hundred" >
					{messages.map(msg => 
						<div key={msg._id} className="message flex">
							<Tooltip
								title={new Date(msg.created_on).toLocaleString()}
								placement="top-end"
							>
								<div style={styles.avatar}>{id === msg.personId ? 'You' : msg.name}
								</div>
							</Tooltip>
							<li style={styles.li}>{msg.message}</li>
						</div>
						)}
				</ul>
			</div>
			<WriteMessage postMsg={value => handlePostMsg(value)} />
		</div>
	)
}

export default Messages;