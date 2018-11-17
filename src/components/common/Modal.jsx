import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button
} from '@material-ui/core'

const Modal = ({
  open,
  close,
  title, 
  message,
  actionFunc,
	actionName,
	toggleModalLoading,
}) => {

	return (
		<Dialog
			open={open}
			onClose={close}
		>
			<DialogTitle>
				{title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={close} color="primary">
					Cancel
				</Button>
{actionFunc &&
				<Button 
					onClick= { async () => {
						toggleModalLoading(true)
						await actionFunc()
						toggleModalLoading(false)
						close()
					}}
					color="primary">
					{actionName}
        </Button>
}
			</DialogActions>

		</Dialog>
	)
}

Modal.defaultProps = {
  actionName: 'Submit',
}
export default Modal;