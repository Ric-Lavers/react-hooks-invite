import React, { useState, useCallback, useEffect } from 'react';
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

const Form = () => {
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
	const [ sent, setSent ] = useState(true)
	const [ isLoading, setLoading ] = useState(true)
	const {form, onChange, setForm } = useInput(initalForm)
	const [ validated, setValid ] = useValidate(initalValidiated)

	const handleChange = event => {
		
		onChange(event)
		setValid(event)
	}


	const handleSubmit = async() => {
		setLoading(true)
		let sendSuccessful = await postPerson(form)
		localStorage.setItem('personId', sendSuccessful._id)
		setSent(!!sendSuccessful)
		if (!!sendSuccessful){ setForm(initalForm); setValid(initalValidiated)};
		setLoading(false)
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
									value={true}
									name="car"
								/>
							}
							label="Need to park.. its $50."
						/>
						<Car />
					 </div>
					<Button  onClick={() => handleSubmit()} type="submit" variant="contained" color="primary">
						{isLoading	
							? 'Submit'
							: <CircularProgress color="white" />
						}
					</Button>
					</FormGroup>
				</CardContent>
		</Card>
	)

}

export default Form;