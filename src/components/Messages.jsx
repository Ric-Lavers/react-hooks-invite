import React, { useEffect, useState } from 'react'
import { Avatar, Tooltip } from '@material-ui/core'

import { getAllMessages } from '../api/messages'

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

export const useFetch = (fetchFunc, defaultData) => {
	const [data, updateData] = useState(defaultData)

	useEffect(async () => {
			const data = await fetchFunc()
			updateData(data)
	}, [fetchFunc])

	return data
}

const Messages = ({}) => {
	const messages = useFetch(getAllMessages, [{}])

	return(
		<div style={styles.container}>
			<ul style={styles.messages}>
				{messages.map(msg => 
					<>
						<Tooltip
							title={new Date(msg.created_on).toLocaleString()}
							placement="top-end"
						>
							<div style={styles.avatar}>{msg.name}</div>
						</Tooltip>
						<li style={styles.li}>{msg.message}</li>
					</>
					)}
			</ul>
		</div>
	)
}

export default Messages;