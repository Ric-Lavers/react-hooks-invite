import React, { useState } from 'react';
import {
	FormGroup,
	FormControlLabel,
	TextField,
	Button,
	CardContent,
	Card,
	Checkbox,
	CircularProgress,
	} from '@material-ui/core';
import {isEmail, isMobilePhone} from 'validator';
import { postPerson } from '../api/person'
import { ReactComponent as Bed } from '../images/bed.svg'
import { ReactComponent as SingleBed } from '../images/single-bed.svg'
import { ReactComponent as Couch } from '../images/couch.svg'
import { ReactComponent as Car } from '../images/car.svg'

const useValidate = inital => {
	const [validated, setValid] = useState(inital)
	
	const handleChange = e => {
		if ( !e.target ){return};

		let { name, value } = e.target
		let isValid = {...validated}
		switch (name) {
			case 'email':
				isValid[name] = value === "" ? false : isEmail(value)
				break;	
			case 'phoneNumber':
				isValid[name] = value === "" ? false : isMobilePhone(value, ['en-AU'])
				break;
			case 'name':
				isValid[name] = value === "" ? false : true
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
	const [form, setForm] = useState(inital)

	const onChange  = e => {
		let { name, value, checked } = e.target
		if (value === 'true' || value === 'false') {
			value = checked
		}
		setForm( {...form, [name]:value} )
	}

	return {
		form, setForm, onChange,
	}
}

const Form = ({ setSnackbar }) => {
	const initalForm = {
		name: '',
		phoneNumber: '',
		email: '',
		bed: false,
		car: false,
	}
	const initalValidiated = {
		name: true,
		phoneNumber: true,
		email: true,
	}
	
	const [ isLoading, setLoading ] = useState(false)
	const {form, onChange, setForm } = useInput(initalForm)
	const [ validated, setValid ] = useValidate(initalValidiated)

	const handleChange = event => {
		onChange(event)
		setValid(event)
	}

	const handleSubmit = async() => {
		setLoading(true)
console.log( Object.values(validated).every( i => i) )
		if ( !Object.values(validated).every( i => i) ){
			console.log( Object.values(validated) )
			setSnackbar("Who dis?")
			setLoading(false)
			return
		}
		try{
			let sendSuccessful = await postPerson(form)
			localStorage.setItem('personId', sendSuccessful._id)
			setForm(initalForm); 
			setValid(initalValidiated)
		}catch(e) {
			console.error(e)
		}
		setLoading(false)
	}

	return (
		<Card style={{ textAlign: 'left',  height: '100%' }} >
			<CardContent >
				<FormGroup 
					onChange={handleChange} 
					style={{ justifyContent: 'space-between' }} >
				
					<TextField required
						label="Name"
						type="text"
						name="name"
						value={form.name}
						error={!validated.name}
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
									value={'true'}
								/>
							}
							label="Need a bed"
						/>
						<div>
							<Bed/>
							<Bed/>
							<SingleBed/>
							<SingleBed/>
							<Couch/>
							<Couch/>
						</div>
					 </div>
					 <div className="form-control" >
						<FormControlLabel
							control={
								<Checkbox
									checked={form.car}
									value={'true'}
									name="car"
								/>
							}
							label="Need to park.. its $50."
						/>
						<Car />
					 </div>
					<Button  onClick={() => handleSubmit()} type="submit" variant="contained" color="primary">
						{isLoading	
							? <CircularProgress color="white" />
							: 'Submit'
						}
					</Button>
					</FormGroup>
				</CardContent>
		</Card>
	)

}

export default Form;