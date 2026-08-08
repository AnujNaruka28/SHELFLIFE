import { TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { LiaBarcodeSolid } from "react-icons/lia";
import ItemTable from "../components/cores/Table/ItemTable";
import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect, useState } from "react";
import { getItemsAction } from "../lib/actions/itemsAction";
import type { AppDispatch } from "../lib/store";
import { useDebounce } from "../hooks/useDebounce";
import CTAButton from "../components/common/CTAButton";
const useAppDispatch = () => useDispatch<AppDispatch>();
const LazyItemDialog = lazy(() => import('../components/dialogs/ItemDialog'));
const LazyScannerDialog = lazy(() => import('../components/dialogs/ScannerDialog'));

const InventoryPage = () => {
    
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [refetchTrigger,setRefechTrigger] = useState(0);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const handleItemCreated = () => {
        setRefechTrigger(prev => prev + 1);
    }

    const { totalItems, items, loading, error } = useSelector((state: any) => state.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const queries: any = { page, limit };
        if (debouncedSearchQuery) queries.search = debouncedSearchQuery;
        dispatch(getItemsAction(queries));
    }, [debouncedSearchQuery, page, limit, dispatch,refetchTrigger])
    return (
        <div className="w-full h-full flex flex-col gap-2">

            <div className="w-full flex flex-col gap-2">

                <div className="flex items-center gap-2 relative">

                    <TextField
                        name="search"
                        placeholder="Search"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setSearchQuery(e.target.value)}
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

                <div className="w-full flex flex-col min-[768px]:flex-row min-[768px]:items-center gap-2">
            
                    <LazyItemDialog title="Add Item" mode="create" onSuccess={handleItemCreated}>
                        <CTAButton
                            text="Add Item"
                            className="py-1 min-[768px]:w-[50%]"
                        />
                    </LazyItemDialog>

                    <LazyScannerDialog>
                        <CTAButton
                            reactNode={<LiaBarcodeSolid className="w-6 h-6" />}
                            className="py-1 flex justify-center bg-[#464547] min-[768px]:w-[50%]"
                        />
                    </LazyScannerDialog>

                </div>

            </div>


            <ItemTable 
            data={items} 
            itemsLoading={loading} 
            itemsError={error}
            onPageChange={setPage}
            onRowsPerPageChange={setLimit}
            currentPage={page}
            currentLimit={limit}
            totalItems={totalItems}
            isInventory={true}
            onSuccess={handleItemCreated}
            />

        </div>
    )
}

export default InventoryPage;