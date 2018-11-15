import {SERVER_URL}  from './root'

export const postImgSrc = async (imgSrc) => {
	try {
		const data = await fetch(SERVER_URL + '/gallery/post-src', {
			method: "POST",
			body: JSON.stringify(imgSrc)
		})
		return data.json()
		
	} catch (error) {
		console.error(error)
		throw error
		/* show error snackbar */
	}
}

export const getAllImgSrc = async () => {
	try {
		const data = await fetch(SERVER_URL+ '/gallery')
		return data.json()
	} catch (error) {
		console.error(error)
		return error
	}
}