import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectorInOneRow = ({   value = "",
                            label = "",
                            setObject = Function.prototype,
                            items = []
                        }) => {

    return (
        <FormControl fullWidth margin="dense">
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                // displayEmpty={true}
                onChange={(event) => {
                    setObject(event.target.value)
                }}
            >
                {items.map(({value, label}) => (<MenuItem key={value} value={value}>{label}</MenuItem>))}
            </Select>
        </FormControl>

    )
}

export const SelectorInOneRowWithEmpty = ({
                                       value = "",
                                       label = "",
                                       setObject = Function.prototype,
                                       items = []
                                   }) => {

    const items1 = [{value: "", label: "Отсутствует"}];
    const itemsWithEmpty = [...items1, ...items]
    // items1.push({value: "", label: "none"});

    return <SelectorInOneRow value={value}
                             label={label}
                             setObject={setObject}
                             items={itemsWithEmpty}/>

}

export default SelectorInOneRow


