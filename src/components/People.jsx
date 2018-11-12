import React from 'react';
import { Tooltip, Grid, Paper } from '@material-ui/core'

import { allPeople } from '../api/person'
import { useFetch, styles } from './Messages'

const toLocaleString = dateString => {
	const localeString = new Date(dateString).toLocaleString()
	return localeString.toString()
}

const People = ({}) => {
	const people = useFetch(allPeople, [{}])

	return(
		<div  style={{ display: 'flex', justifyContent: 'space-between'}}>
	
				{people.map(person => 
					<div style={{ width: '100%' }}>	

								<Tooltip
									title={toLocaleString(person.created_on)}
									placement="top-end"
								> 
									<Paper >
										<div >{person.name}</div>
										<div >{person.email}</div>
										<div >{person.phoneNumber}</div>
									</Paper>
								</Tooltip>
							
					</div>
				)}
		</div>
	)
}

/* <Grid
	xs={12}
	spacing={24}
	container
	direction="row"
>
	</Grid> */
export default People;