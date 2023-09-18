import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import * as React from "react";
import {useState} from "react";


const PasswordForm = ({setPassword = Function.prototype,
                      password = "",
                      label = "Пароль"}) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl
            margin="normal"
            required
            fullWidth
            autoComplete="current-password"
        >
            <InputLabel>{label}</InputLabel>
            <OutlinedInput
               type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="показать пароль"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
                onChange={event => setPassword(event.target.value)}
                value={password}
            />
        </FormControl>)

}


export default PasswordForm