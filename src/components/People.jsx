import React from 'react';
import { Tooltip } from '@material-ui/core'

import { allPeople } from '../api/person'
import { useFetch, styles } from './Messages'

const toLocaleString = dateString => {
	const localeString = new Date(dateString).toLocaleString()
	return localeString.toString()
}

const People = ({}) => {
	const people = useFetch(allPeople, [{}])

	return(
		<div style={styles.container}>
			<ul style={styles.messages}>
				{people.map(person => 
					
						<Tooltip
							title={toLocaleString(person.created_on)}
							placement="top-end"
						> 
							<>
								{/* <div style={styles.avatar}>{person.name}</div> */}
								<div>
									<div >{person.name}</div>
									<div >{person.email}</div>
									<div >{person.phoneNumber}</div>
								</div>
							</>
						</Tooltip>
					)}
			</ul>
		</div>
	)
}

export default People;