import { 
    FormControl, 
    type FormControlProps 
} from "@mui/material"

const StyledFormControl = ({children, ...props}: FormControlProps) => {
    return (
        <FormControl variant="filled"
            sx={{
                '& .css-eok8s2-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                    color: 'var(--primary)',
                },
                '& .css-1vgb3kf-MuiInputBase-root-MuiInput-root::after': {
                    borderBottomColor: 'var(--primary)',
                }
            }}
            {...props}
        >
            {children}
        </FormControl>
    )
}

export default StyledFormControl
