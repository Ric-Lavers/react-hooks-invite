import React, { useState, useCallback } from 'react';
import {
	FormGroup,
	TextField,
	Button,
	CardContent,
	Card
	} from '@material-ui/core';
import {isEmail, isMobilePhone} from 'validator';
import AutoSizer from 'react-virtualized-auto-sizer';



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

	const {form, onChange} = useInput({
		name: {
			value:'',
			valid: true,
		},
		phoneNumber: {
			value:'',
			valid: true,
		},
		email: {
			value:'',
			valid: true,
		},
	})

	return (
		<Card style={{ textAlign: 'left',  height: '100%' }} >
			<CardContent style={{  height: '100%' }}>
				<FormGroup onChange={onChange} style={{  height: 'calc(100% - 48px)', justifyContent: 'space-between' }} >
				
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
					<Button type="submit" variant="contained" color="primary">
						Submit
					</Button>
					</FormGroup>
				</CardContent>
		</Card>
	)

}

export default Form;