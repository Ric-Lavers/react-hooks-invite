import React, { useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from '@material-ui/core'

const Welcome = () => {
	const [ notFirstTime, setOpen ] = useState(Boolean(localStorage.notFirstTime))

	const close = () => {
		localStorage.setItem('notFirstTime', true)
		setOpen(false)
	}

	return (
		<Dialog
			open={!notFirstTime}
			onClose={close}
		>
			<DialogTitle>
				Welcome
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Hey welcome my 30th site, So i thought i'd make this site for some practice of some new Front-end stuff. <br/><br/> Also its a fun way to update everyones email, phone number and such.  <br/><br/> So if you have a feature request let me know and <strong>if you have a horrible photo of us together then upload it!!!</strong> 
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={close} color="primary">
					Cancel
				</Button>
			</DialogActions>

		</Dialog>
	)
}

export default Welcome;