import React, {useState, useEffect} from 'react'
import AxiosService from "../AxiosService"

const AddListingForm = ({updateFn}) => {
    
    const [categories, setCategories] = useState([])
    const initialState = {
        name: '',
        categoryId: '',
        price: 0,
        location: '',
        img: '', 
        description: ''
    }
    const [formInfo, setFormInfo] = useState(initialState)

    useEffect(() => {   
        AxiosService.getCategories()
        .then(response => {
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
            setFormInfo({...formInfo, categoryId: event.target.value})
        } else if (name === "img") {
            setFormInfo({...formInfo, img: event.target.files[0]})
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
                <select name="category" onChange={updateField}>
                    <option value="" disabled selected hidden>Choose a category</option>
                        {categories.map(x => <option value={x.name}>{x.name}</option>)}
                </select>
                <input className="input" type="number" placeholder="Enter price (cents)" name="price" onChange={updateField} required/>
                <input className="input" type="text" placeholder="Enter location" name="location" onChange={updateField} required/>
                <label class="custom-uploader" for="file">Upload Your File</label> <input id="file" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" onChange={updateField} name="img" type="file" />
                <button className='appBtn' type='submit'>Create Listing</button>
            </form>
        </div>
    )
}

export default AddListingForm