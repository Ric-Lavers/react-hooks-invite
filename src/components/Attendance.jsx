import React, { Component } from 'react'
import { people } from '../api/person'

export default class Attendance extends Component {
  state={
    attendees: [],
    error: false,
    loading: true,
  }
  componentDidMount(){
    this.getPeople()
  }
  getPeople = async () => {
    const attendees = await people()
    this.setState(attendees ? { attendees } : { error: true })
    this.setState({ loading: false })
  }


  render() {
    let { attendees, error, loading } = this.state

    if( error ) return ( <h3>something went wrong</h3> );
    if( loading ) return ( <h3>loading...</h3> );
    return (
      <ul className="Attendance">
        {attendees.map( person => (
          <li key={person._id} >{person.name}</li>
        ))}
      </ul>
    )
  }
}
