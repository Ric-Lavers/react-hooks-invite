
export const people = async() => {
  try {
    let res = await fetch('/person/all' ) 
    return res.json()
  } catch (error) {
    console.log( error.message )
    return error
  }
}

export const person = async data => {
  try {
    let res = await fetch('/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }) 
    return res.json()
  } catch (error) {
    console.log( error.message )
    return error
  }
}