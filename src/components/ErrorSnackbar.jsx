import React, { useState, useEffect } from 'react'
import { Snackbar } from '@material-ui/core'

const ErrorSnackbar = ({ openNum }) => {
	const [open, setOpen] = useState(true)

	const close = () => setOpen(false)

	useEffect( () => {
		setOpen(true)
	}, [ openNum ] )


	return (
		<Snackbar
			open={open}
			message="Whoopsie we did a lil buggy wuggy here"
			onClose={close}
		/>
	)
}

export default ErrorSnackbar;
