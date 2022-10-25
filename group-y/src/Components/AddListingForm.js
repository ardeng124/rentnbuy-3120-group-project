import React, {useState, useEffect} from 'react'
import AxiosService from "../AxiosService"

const AddListingForm = ({updateFn}) => {
    
    const [categories, setCategories] = useState([])
    const initialState = {
        name: '',
        category: '',
        price: 0,
        location: '',
        img: '', 
        description: ''
    }
    const [formInfo, setFormInfo] = useState(initialState)

    useEffect(() => {   
        AxiosService.getCategories()
        .then(response => {
            response.data.forEach(x => console.log(x))
           setCategories(response.data)
      })
    }, [])

    const updateField = (event) => {
        //Assign Input Elements to each attributes 
        const name = event.target.attributes.name.value
        if (name === "name") {
            setFormInfo({...formInfo, name: event.target.value})
        } else if (name === "description") {
            setFormInfo({...formInfo, description: event.target.value})
        } else if (name === "price") {
            setFormInfo({...formInfo, price: event.target.value})
        } else if (name === "location") {
            setFormInfo({...formInfo, location: event.target.value})
        } else if (name === "category") {
            setFormInfo({...formInfo, category: event.target.value})
        } else if (name === "img") {
            setFormInfo({...formInfo, img: event.target.value})
        }
        
    }
    const formHandler = (event) => {
        event.preventDefault()
        updateFn(formInfo)
    }
    return (
        <div className='addListingForm'>
            <form className="formContainer" onSubmit={formHandler}>
                <input className="input" type="text" placeholder="Enter Title" name="name" onChange={updateField} required/>
                <textarea rows={40} cols={100} className="input" type="text" placeholder="Enter Description" name="description" onChange={updateField} required/>
                <select name="category">
                <option value="" disabled selected hidden>Choose a category</option>
                    {categories.map(x => <option value={x.name}>{x.name}</option>)}
                </select>
                <input className="input" type="number" placeholder="Enter price (cents)" name="price" onChange={updateField} required/>
                <input className="input" type="text" placeholder="Enter location" name="location" onChange={updateField} required/>

            </form>
        </div>
    )
}

export default AddListingForm