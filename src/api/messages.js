import {SERVER_URL}  from './root'

export const postMessage = async (messageObj) => {
	try {
		const data = await fetch(SERVER_URL+'/message', {
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
		const data = await fetch(SERVER_URL+'/message')
		return data.json()
	} catch (error) {
		console.error(error)
		return []
	}
}