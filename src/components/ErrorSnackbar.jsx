import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'

const ErrorSnackbar = () => {
	const [open, setOpen] = useState(true)
	const close = () => setOpen(false)

	return (
		<Snackbar
			open={open}
			message="Whoopsie we did a lil buggy wuggy here"
			onClose={close}
		/>
	)
}

export default ErrorSnackbar;
