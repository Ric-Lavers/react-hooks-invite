import React, { useState, useEffect, Fragment } from 'react';
import { Tooltip, Paper } from '@material-ui/core'

import { allPeople } from '../api/person'

const toLocaleString = dateString => {
	const localeString = new Date(dateString).toLocaleString()
	return localeString.toString()
}

const People = () => {

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
						<div key={person._id} >	
							<Paper >
								<Fragment>
									<div >
										<Tooltip
											title={`RSVP @ ${toLocaleString(person.created_on)}`}
											placement="top"
										> 
											<span>{person.name}	</span>
										</Tooltip>
									</div>
									<div className="sensitive" >{person.email}</div>
									<div className="sensitive" >{person.phoneNumber}</div>
								</Fragment>
							</Paper>
						</div>
					)}
			</div>
		</>
	)
}

export default People;