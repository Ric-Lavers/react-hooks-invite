import React, { useState, useCallback, useEffect } from 'react';
import {
	FormGroup,
	FormControlLabel,
	TextField,
	Button,
	CardContent,
	Card,
	Checkbox,
	} from '@material-ui/core';
import {isEmail, isMobilePhone} from 'validator';
import { postPerson } from '../api/person'
import { ReactComponent as Bed } from '../images/bed.svg'
import { ReactComponent as Couch } from '../images/couch.svg'
import { ReactComponent as Car } from '../images/car.svg'

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
		let { name, value, checked } = e.target
		if (value === 'true' || value === 'false') {
			value = checked
		}
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
		bed: false,
		car: false,
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
		localStorage.setItem('personId', sendSuccessful._id)
		setSent(!!sendSuccessful)
	}

	return (
		<Card style={{ textAlign: 'left',  height: '100%' }} >
			<CardContent style={Object.assign({  height: '100%' }, (sent ) ? {} : {border: '1px solid red'})}>
				<FormGroup 
					onChange={handleChange} 
					style={{ justifyContent: 'space-between' }} >
				
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
					<div className="form-control" >
						<FormControlLabel
							control={
								<Checkbox
									name="bed"
									checked={form.bed}
									value={true}
								/>
							}
							label="Need a bed"
						/>
						<div>
							<Bed/>
							<Bed/>
							<Bed/>
							<Couch/>
						</div>
					 </div>
					 <div className="form-control" >
						<FormControlLabel
							control={
								<Checkbox
									checked={form.car}
									value={true}
									name="car"
								/>
							}
							label="Need to park.. its $50."
						/>
						<Car />
					 </div>
					<Button onClick={() => handleSubmit()} type="submit" variant="contained" color="primary">
						Submit
					</Button>
					</FormGroup>
				</CardContent>
		</Card>
	)

}

export default Form;