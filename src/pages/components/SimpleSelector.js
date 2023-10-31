import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SimpleSelector = (props) => {

    const {label = "", items, hasEmpty = false} = props
    const items1 = [{value: "", label: "Отсутствует"}];
    let initialItems = items;

    if (hasEmpty) {
        initialItems = [...items1, ...items]
    }


    return (

        <FormControl fullWidth margin="dense">
            <InputLabel>{label}</InputLabel>
            <Select
                {...props}
            >
                {initialItems.map(({value, label}) => (
                    <MenuItem key={value} value={value}>{label}</MenuItem>))}
            </Select>
        </FormControl>

    )
}

export default SimpleSelector

