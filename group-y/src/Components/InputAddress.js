import React, {useEffect, useRef} from 'react'

const InputAddress = (props) =>{
    const {name, onChange, setLocation} = props;
    const autoCompleteRef = useRef();
        const inputRef = useRef();
        const options = {
            componentRestrictions: { country: "AU" }
        }
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            //console.log(props)
            setLocation(place.formatted_address)
           });
    }, []);
return (
    <input className="input" type="text" onChange={onChange} placeholder="Address" name={name} ref={inputRef} autoComplete="false" required/>
)
}
export default InputAddress