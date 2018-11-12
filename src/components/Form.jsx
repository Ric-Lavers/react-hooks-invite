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


const useInput = inital => {
	const [form, setValue] = useState(inital)

	const onChange  = e => {
		let { name, value } = e.target
		let newForm = {...form, [name]: {value}}
		switch (name) {
			case 'email':
				newForm[name].valid = value === "" ? true : isEmail(value)
				break;	
			case 'phoneNumber':
				newForm[name].valid = value === "" ? true : isMobilePhone(value, ['en-AU'])
				break;
			case 'name':
				localStorage.setItem('name', value)
				break;
			default:
				break;
		}
	

		setValue(newForm)
	}

	return {
		form, setValue, onChange,
	}
}

const Form = ({}) => {
	const [ sent, setSent ] = useState(true)

	const {form, onChange} = useInput({
		name: {
			value:'name',
			valid: true,
		},
		phoneNumber: {
			value:'0412345678',
			valid: true,
		},
		email: {
			value:'mail@mail.com',
			valid: true,
		},
	})

	const handleSubmit = async() => {
		let sendSuccessful = await postPerson(form)
		setSent(!!sendSuccessful)
	}

	return (
		<Card style={{ textAlign: 'left',  height: '100%' }} >
			<CardContent style={Object.assign({  height: '100%' }, (sent ) ? {border: '1px solid blue'} : {border: '1px solid red'})}>
				<FormGroup 
					onChange={onChange} 
					style={{  height: 'calc(100% - 48px)', justifyContent: 'space-between' }} >
				
					<TextField required
						label="Name"
						type="text"
						name="name"
						value={form.name.value}
					/>

					<TextField required
						label="Mobile Number"
						type="text"
						name="phoneNumber"
						value={form.phoneNumber.value}
						error={!form.phoneNumber.valid}
						/>
					<TextField required
						label="Email"
						type="text"
						name="email"
						value={form.email.value}
						error={!form.email.valid }
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