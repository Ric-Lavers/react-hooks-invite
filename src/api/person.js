import {SERVER_URL}  from './root'

export const postPerson = async (personObj) => {
	try {
		const data = await fetch(SERVER_URL + '/person', {
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
		const data = await fetch(SERVER_URL+'/person/all')
		return data.json()
		
	} catch (error) {
		console.error(error)
		return []
		/* show error snackbar */
	}
}

