import { styled } from "@mui/material/styles"

// comps
import { Autocomplete, TextField } from "@mui/material"

const CustomAutocomplete = styled(Autocomplete)(() => ({
    marginTop: "3rem"
})) 

const MyAutocomplete = ({setItem, setInputValue, data, inputValue}) => {
    return (
        <CustomAutocomplete 
            onChange = {(event, newValue) => {
                newValue && setItem(newValue);
            }}
            inputValue = {inputValue}
            onInputChange = {(event, newInputValue) => {
                setInputValue(newInputValue)
            }}
            defaultValue = {data.find((item) => item?.symbol.includes("SOL"))}
            options = {data}
            getOptionLabel = {(option) => option?.symbol}
            renderInput = {(params) => 
                <TextField {...params} 
                    label = "Choose Crypto"
                    sx = {{ width: '30rem' }}
                />
            }
        />
    )
}

export default MyAutocomplete;