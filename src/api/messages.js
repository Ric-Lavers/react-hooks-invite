
export const postMessage = async (messageObj) => {
	try {
		const data = await fetch('/message', {
			method: "POST",
			body: JSON.stringify(messageObj)
		})
		return data.json()
		
	} catch (error) {
		console.error(error)
		/* show error snackbar */
	}
}

export const getAllMessages = async () => {
	try {
		const data = await fetch('/message')
		return data.json()
	} catch (error) {
		console.error(error)
		return error
	}
}