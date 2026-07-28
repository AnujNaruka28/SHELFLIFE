import { TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import ItemTable from "../components/cores/Table/ItemTable";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect, useState } from "react";
import { getItemsAction } from "../lib/actions/itemsAction";
import type { AppDispatch } from "../lib/store";
import { useDebounce } from "../hooks/useDebounce";
import CTAButton from "../components/common/CTAButton";
const useAppDispatch = () => useDispatch<AppDispatch>();
const LazyItemDialog = lazy(() => import('../components/dialogs/ItemDialog'));

const InventoryPage = () => {
    
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');   

    const debouncedCategory = useDebounce(category, 500);
    const debouncedStatus = useDebounce(status, 500);

    const categories = ["produce", "dairy", "meat", "pantry", "frozen", "other"];
    const statuses = ["fresh", "expiring-soon", "expired", "used", "wasted"];

    const setFilter = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (categories.includes(name)) {
            setCategory(value);
        } else if (statuses.includes(name)) {
            setStatus(value);
        }
    }

    const { items, loading, error } = useSelector((state: any) => state.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const queries: any = { page, limit };
        if (debouncedCategory) queries.category = debouncedCategory;
        if (debouncedStatus) queries.status = debouncedStatus;
        dispatch(getItemsAction(queries));
    }, [debouncedCategory, debouncedStatus, page, limit, dispatch])
    return (
        <div className="w-full h-full flex flex-col gap-2">

            <div className="w-full flex flex-col gap-2">

                <div className="flex items-center gap-2 relative">

                    <TextField
                        name="category"
                        placeholder="Search"
                        fullWidth
                        variant="outlined"
                        onChange={setFilter}
                        sx={
                            {
                                backgroundColor: '#fff',
                                '& .MuiInputBase-root': {
                                    backgroundColor: '#fff',
                                },
                                '& .MuiFilledInput-root': {
                                    backgroundColor: '#fff',
                                },
                                '& .MuiFilledInput-root:hover': {
                                    backgroundColor: '#fff',
                                },
                                '& .MuiFilledInput-root.Mui-focused': {
                                    backgroundColor: '#fff',
                                },
                                '& .MuiInputBase-input': {
                                    color: '#000',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: '#999',
                                },
                                '& .MuiFilledInput-underline:before': {
                                    borderBottomColor: '#ccc',
                                },
                                '& .MuiFilledInput-underline:after': {
                                    borderBottomColor: 'var(--primary)',
                                },
                                '& .css-1blp12k-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'var(--primary)',
                                },
                            }
                        }
                    />

                    <FaSearch className="absolute w-6 h-6 right-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>

                </div>

                <LazyItemDialog title="Add Item" mode="create">
                    <CTAButton
                        text="Add Item"
                        className="py-1"
                    />
                </LazyItemDialog>

            </div>


            <ItemTable 
            data={items} 
            itemsLoading={loading} 
            itemsError={error}
            onPageChange={setPage}
            onRowsPerPageChange={setLimit}
            currentPage={page}
            currentLimit={limit}
            />



        </div>
    )
}

export default InventoryPage;