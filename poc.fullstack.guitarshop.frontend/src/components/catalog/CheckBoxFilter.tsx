import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

interface Props{
    items: string[];
    checked?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckBoxFilter({items, checked, onChange}: Props) {
    const [checkedItems, setCheckedItems] = useState(checked || [])

    function handleChecked(value: string) {
        let newChecked: string[] = [];
        
        if(checkedItems.filter(item => item === value).length == 0)
            newChecked = [...checkedItems, value];
        else
            newChecked = checkedItems.filter(item => item !== value);

        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel 
                    label={item} 
                    key={item}
                    control=
                    {
                        <Checkbox 
                            checked={checkedItems.indexOf(item) !== -1} 
                            onClick={() => handleChecked(item)}
                        />
                    } 
                />
            ))}
        </FormGroup>
    )
}