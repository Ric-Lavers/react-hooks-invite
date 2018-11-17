import React, { useState, useEffect } from 'react'
import { Snackbar } from '@material-ui/core'

const ErrorSnackbar = ({ openNum=1, message }) => {
	const [open, setOpen] = useState(false)

	const close = () => setOpen(false)

	useEffect( () => {
		setOpen(true)
		console.log("useEffect")
	}, [ openNum ] )

console.log(open, openNum)
	return (
		<Snackbar
			autoHideDuration={1500}
			open={open}
			message={!!message ? message : "Whoopsie we did a lil buggy wuggy here"}
			onClose={close}
		/>
	)
}

export default ErrorSnackbar;
