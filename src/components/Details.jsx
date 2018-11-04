import React, {Fragment} from 'react';
import { Card, CardContent, Typography} from '@material-ui/core'

const details  = [
	{
		title: 'Date',
		body: '08/12/2018'
	},
	{
		title: 'Location',
		body: 'Merton World Square, Sydney'
	},
	{
		title: 'Time',
		body: 'bout 6pm, or earlier'
	},
	{
		title: 'Also',
		body: 'BYO \n\n'
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