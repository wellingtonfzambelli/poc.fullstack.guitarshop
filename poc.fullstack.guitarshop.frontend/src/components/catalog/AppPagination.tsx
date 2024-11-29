import { Box, Typography, Pagination } from "@mui/material";
import { PaginationMetaData } from "../../models/Pagination";

interface Props {
    paginationMetaData: PaginationMetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({paginationMetaData, onPageChange}: Props){
    const { currentPage, totalCount, totalPages, pageSize } = paginationMetaData;
    
    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(currentPage-1)*pageSize+1}-
                {
                    currentPage*pageSize > totalCount 
                    ? totalCount 
                    : currentPage*pageSize
                } of {totalCount} items
            </Typography>
            <Pagination
                color="secondary"
                size='large'
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => onPageChange(page)}
            >
            </Pagination>
        </Box>
    )
}