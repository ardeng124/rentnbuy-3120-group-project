import React, {useState, useEffect, useRef} from 'react'
import AxiosService from "../AxiosService"
/**
 * 
 * AddListingForm: form for adding a new listing
 * Paramters: updateFn : form submission
 */
const AddListingForm = ({updateFn}) => {
    const[tempUrl, setTempUrl] = useState("https://i.stack.imgur.com/mwFzF.png")
    const[location, setLocation] = useState("")
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
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        componentRestrictions: { country: "AU" }
    }
    useEffect(() => {   
        AxiosService.getCategories()
        .then(response => {
           setCategories(response.data)
        })
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            setLocation(place.formatted_address) 
        });
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
        if(location){
            formInfo.location = location
        }
        console.log(formInfo)
        updateFn(formInfo)
    }
    const imgClicked = (event) => {
        document.getElementById('file').click()
    }
    return (
        <div className='addListingForm'>
            <form className="formContainer" onSubmit={formHandler} name="listingform">
                <img className="listingPrevIcon"  onClick={() => imgClicked()} src={tempUrl}/>
                <input className="input" type="text" placeholder="Enter Title" name="name" onChange={updateField} required/>
                <textarea rows={40} cols={100} className="input" type="text" placeholder="Enter Description" name="description" onChange={updateField} required/>
                <select name="category" onChange={updateField}>
                    <option value="" disabled selected hidden>Choose a category</option>
                        {categories.map(x => <option value={x.name}>{x.name}</option>)}
                </select>
                <input className="input" type="number" placeholder="Enter price (cents)" name="price" onChange={updateField} required/>
                <input className="input" type="number" placeholder="Enter price to rent (cents)" name="rentprice" onChange={updateField} required/>
                {/* <InputAddress name = "location" onChange={updateField} setLocation = {setLocation}/> */}
                <input className="input" type="text" placeholder="Enter location" name="location" onChange={updateField} ref={inputRef} required/>
                <fieldset>
                {/* <label class="custom-uploader" for="file">Upload Your File</label>  */}
                <input className ="hideMe" id="file" accept="image/jpeg,image/png" onChange={updateField} name="img" type="file" />
                </fieldset>
                <button className='appBtn' type='submit'>Create Listing</button>
            </form>
        </div>
    )
}

export default AddListingForm