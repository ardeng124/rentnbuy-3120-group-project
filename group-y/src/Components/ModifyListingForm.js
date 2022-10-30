import { ListItemSecondaryAction } from '@mui/material'
import React, {useState, useEffect} from 'react'
import AxiosService from "../AxiosService"

const ModifyListingForm = ({updateFn, deleteFn, inData}) => {
    const[tempUrl, setTempUrl] = useState("https://i.stack.imgur.com/mwFzF.png")
    const [categories, setCategories] = useState([])
    const initialState = {
        name: '',
        categoryId: '',
        price: 0,
        location: '',
        img: '', 
        description: ''
    }
    const [inData1, setInData] = useState([])
    const [formInfo, setFormInfo] = useState(initialState)

    useEffect(() => {   
        AxiosService.getCategories()
        .then(response => {
           setCategories(response.data)
      })
      setInData(inData)

    }, [])
    
    useEffect( () => {
        if(!inData.itemPhotoUrl || inData.itemPhotoUrl == "" ) {
          setTempUrl("https://i.stack.imgur.com/mwFzF.png")
        } else {
            setTempUrl(inData.itemPhotoUrl)
        }
        console.log(inData)

    }, [inData])
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
        } else if (name === "rentprice") {
            setFormInfo({...formInfo, rentprice: event.target.value})
        } else if (name === "img") {
            setTempUrl(URL.createObjectURL(event.target.files[0]))
            setFormInfo({...formInfo, img: event.target.files[0]})
        }
        
    }
    const formHandler = (event) => {
        event.preventDefault()
        document.listingform.reset()
        setTempUrl("https://i.stack.imgur.com/mwFzF.png")
        updateFn(formInfo)
    }
    const imgClicked = (event) => {
        document.getElementById('file').click()
    }
    return (
        <div className='addListingForm'>
            <form className="formContainer" onSubmit={formHandler} name="listingform">
                {/* <img className="listingPrevIcon"  onClick={() => imgClicked()} src={tempUrl}/> */}
                <img className="listingPrevIcon"  onClick={() => imgClicked()} src={tempUrl}/>
                <input className ="hideMe" id="file" accept="image/jpeg,image/png" onChange={updateField} name="img" type="file" />

                <input className="inputFaded" type="text" placeholder={inData.name} name="name" onChange={updateField} disabled />
                <label> Description</label>

                <textarea rows={40} cols={100} className="input" type="text" placeholder={inData.description} name="description" onChange={updateField}  />
                <input className="inputFaded" type="text" placeholder={inData.categoryId} name="category" onChange={updateField} disabled />
                <label> Price</label>
                <input className="input" type="number" placeholder={inData.price} name="price" onChange={updateField}  />
                <label> Rent price </label>
                <input className="input" type="number" placeholder={inData.rentprice}  name="rentprice" onChange={updateField}  />
                <label> Location </label>

                <input className="input" type="text" placeholder={inData.location}  name="location" onChange={updateField}  />
                <fieldset>
                {/* <label class="custom-uploader" for="file">Upload Your File</label>  */}
                <input className ="hideMe" id="file" accept="image/jpeg,image/png" onChange={updateField} name="img" type="file" />
                </fieldset>
                <button className='appBtn' type='submit'>Save changes</button>
            </form>
            <button onClick = {deleteFn} className='appBtnDelete'> Delete Listing</button>
        </div>
    )
}

export default ModifyListingForm