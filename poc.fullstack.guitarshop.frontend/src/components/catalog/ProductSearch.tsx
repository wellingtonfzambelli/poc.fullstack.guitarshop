import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setProductPaginationParams } from "../../redux/catalog/catalogSlice";
import { useState } from "react";

export default function ProductSearch() {
    const {productPaginationParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productPaginationParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductPaginationParams({searchTerm: event?.target.value}))
    }, 1000)

    return (
        <TextField 
            label='Search products'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event?.target.value);
                debouncedSearch(event);
            }}
        />
    )
}