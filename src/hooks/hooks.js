import { useState, useEffect } from 'react'


export const useFetch = (fetchFunc, defaultData='', input) => {
	const [data, updateData] = useState(defaultData)

	useEffect(async () => {
			let data = await fetchFunc(input)
			updateData(data)
	}, [fetchFunc]) //* if the fetch Function changes run again, otherwise dont. 

	return [data, updateData] //* returns the data and the function to update that data. 
}




export const useInput = inital => {
	let [form, setValue] = useState(inital)

	const onChange  = e => {
		let { name, value } = e.target
		setValue( {...form, [name]:value} )
	}

	return {
		form, setValue, onChange,
	}
}