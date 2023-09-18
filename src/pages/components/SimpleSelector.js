import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SimpleSelector = (props) => {

    const {label="", setObject = Function.prototype, items, value} = props

    return (

        <FormControl fullWidth margin="dense">
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={event => setObject(event.target.value)}
                {...props}
            >
                {items.map(({value, label}) => (<MenuItem key={value} value={value}>{label}</MenuItem>))}
            </Select>
        </FormControl>

    )
}

export default SimpleSelector

