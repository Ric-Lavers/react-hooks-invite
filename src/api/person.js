export const postPerson = async (personObj) => {
	try {
		const data = await fetch('/person', {
			method: "POST",
			body: JSON.stringify(personObj)
		})
		return data.json()
		
	} catch (error) {
		console.error(error)
		/* show error snackbar */
	}
}

export const allPeople = async () => {
	try {
		const data = await fetch('https://rics-server.now.sh/person/all')
		return data.json()
		
	} catch (error) {
		console.error(error)
		/* show error snackbar */
	}
}

