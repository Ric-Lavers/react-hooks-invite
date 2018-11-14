
export const postImgSrc = async (imgSrc) => {
	try {
		const data = await fetch('/gallery/post-src', {
			method: "POST",
			body: JSON.stringify(imgSrc)
		})
		return data.json()
		
	} catch (error) {
		console.error(error)
		/* show error snackbar */
	}
}

export const getAllImgSrc = async () => {
	try {
		const data = await fetch('/gallery')
		return data.json()
	} catch (error) {
		console.error(error)
		return error
	}
}