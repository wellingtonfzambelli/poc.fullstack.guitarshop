import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Props {
    options: any[];
    onChange: (event:any) => void;
    selectedValue: string;
}

export default function RadioButtonSearch({options, onChange, selectedValue}: Props) {
    return (
        <FormControl component='fieldset'>
            <RadioGroup onChange={onChange} value={selectedValue}>
                { options.map(({value, label}) =>(
                    <FormControlLabel value={value} control={<Radio />} label={label} />
                ))}
            </RadioGroup>
        </FormControl>
    )
}