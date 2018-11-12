import React, { useState, useCallback, useEffect } from 'react';
import {
	FormGroup,
	TextField,
	Button,
	CardContent,
	Card
	} from '@material-ui/core';
import {isEmail, isMobilePhone} from 'validator';
import { postPerson } from '../api/person'

const useValidate = inital => {
	const [validated, setValid] = useState(inital)
	
	const handleChange = e => {
		let { name, value } = e.target
		let isValid = {...validated}
		switch (name) {
			case 'email':
				isValid[name] = value === "" ? true : isEmail(value)
				break;	
			case 'phoneNumber':
				isValid[name] = value === "" ? true : isMobilePhone(value, ['en-AU'])
				break;
			case 'name':
				localStorage.setItem('name', value)
				break;
			default:
				break;
		}
		setValid(isValid)
	}
	return [
		validated, 
		handleChange,
	]
}

const useInput = inital => {
	const [form, setValue] = useState(inital)

	const onChange  = e => {
		let { name, value } = e.target
		setValue( {...form, [name]:value} )
	}

	return {
		form, setValue, onChange,
	}
}

const Form = ({}) => {
	const [ sent, setSent ] = useState(true)
	const {form, onChange} = useInput({
		name: '',
		phoneNumber: '',
		email: '',
	})
	const [ validated, setValid ] = useValidate({
		name: true,
		phoneNumber: true,
		email: true,
	})

	const handleChange = event => {
		onChange(event)
		setValid(event)
	}


	const handleSubmit = async() => {
		let sendSuccessful = await postPerson(form)
		setSent(!!sendSuccessful)
	}

	return (
		<Card style={{ textAlign: 'left',  height: '100%' }} >
			<CardContent style={Object.assign({  height: '100%' }, (sent ) ? {border: '1px solid blue'} : {border: '1px solid red'})}>
				<FormGroup 
					onChange={handleChange} 
					style={{  height: 'calc(100% - 48px)', justifyContent: 'space-between' }} >
				
					<TextField required
						label="Name"
						type="text"
						name="name"
						value={form.name}
					/>

					<TextField required
						label="Mobile Number"
						type="text"
						name="phoneNumber"
						value={form.phoneNumber}
						error={!validated.phoneNumber}
						/>
					<TextField required
						label="Email"
						type="text"
						name="email"
						value={form.email}
						error={!validated.email }
					/>
					<Button onClick={() => handleSubmit()} type="submit" variant="contained" color="primary">
						Submit
					</Button>
					</FormGroup>
				</CardContent>
		</Card>
	)

}

export default Form;