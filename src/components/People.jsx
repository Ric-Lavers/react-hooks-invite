import React, { useState, useEffect, Fragment } from 'react';
import { Tooltip, Grid, Paper } from '@material-ui/core'

import { allPeople } from '../api/person'
import { useFetch, styles } from './Messages'

const toLocaleString = dateString => {
	const localeString = new Date(dateString).toLocaleString()
	return localeString.toString()
}

const People = ({}) => {

	const [ people, setPeople ] = useState([])
	useEffect( async () => {
		try {
			let peopleData = await allPeople()
			setPeople(peopleData)
		} catch(e) {
			console.error(e)
		}
	}, [] )

	return(
		<>
			<h2>Attendees</h2>
			<div className="attendance-grid">
					{people.map(person => 
						<div style={{ width: '100%' }}>	
							<Paper >
								<Fragment>
									<div >
										<Tooltip
											title={`RSVP @ ${toLocaleString(person.created_on)}`}
											placement="top"
										> 
											<span>{person.name}</span>
										</Tooltip>
									</div>
									<div >{person.email}</div>
									<div >{person.phoneNumber}</div>
								</Fragment>
							</Paper>
						</div>
					)}
			</div>
		</>
	)
}

export default People;