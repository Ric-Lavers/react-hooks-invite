import React, {Fragment} from 'react';
import { Card, CardContent, Typography} from '@material-ui/core'

const details  = [
	{
		title: 'Date',
		body: '08/12/2018'
	},
	{
		title: 'Location',
		body: 'Merton Service Appartemnts, Pitt st, Sydney CBD'
	},
	{
		title: 'Time',
		body: 'checkin @ 2pm \nbut really like from 6pm'
	},
	{
		title: 'Also',
		body: 'BYO'
	},
]

const Item = ({title, body}) =>  (
	<Fragment>
		<Typography variant="h4" gutterBottom>
			{title}
		</Typography>
		<Typography variant="p" gutterBottom>
			{body}
		</Typography>
	</Fragment>
)


const Details = ({}) => (
	<Card style={{ textAlign: 'left' }}>
		<CardContent>
			{details.map( item => <Item {...item}/> )}
		</CardContent>
	</Card>
)

export default Details;