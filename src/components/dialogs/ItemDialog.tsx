import React, { useEffect, useState } from "react";
import type { ItemDialogProps } from "../../types/ItemDialogProps";
import { AnimatePresence, motion } from "motion/react";
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import CTAButton from "../common/CTAButton";
import { Controller, useForm } from "react-hook-form";
import type { ItemFormValue } from "../../types/ItemFormValue";
import NumberField from "../common/NumberField";
import { ConfigProvider, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useDispatch } from "react-redux";
import { createItemAction, updateItemByIdAction } from "../../lib/actions/itemsAction";
import type { AppDispatch } from "../../lib/store";
const useAppDispatch = () => useDispatch<AppDispatch>();

const ItemDailog = ({title, children, mode = "create", onSuccess, item} : ItemDialogProps) => {

    const [open,handleOpen] = useState(false);
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState : {
            errors
        }
    } = useForm<ItemFormValue>({
        defaultValues: mode === "edit" && item ? {
            name: item.name,
            category: item.category,
            expiryDate: item.expiryDate.toString(),
            quantity: item.quantity
        } : {
            name: '',
            category: 'other',
            expiryDate: '',
            quantity: 1
        }
    });

    useEffect(() => {
        if (mode === "edit" && item) {
            reset({
                name: item.name,
                category: item.category,
                expiryDate: item.expiryDate.toString(),
                quantity: item.quantity
            })
        } else {
            reset({
                name: '',
                category: 'other',
                expiryDate: '',
                quantity: 1
            })
        }
    }, [mode, item, reset]);

    const childWithOnClick = React.cloneElement(children as React.ReactElement, {
        onClick: handleOpen
    } as any);

    const handleClose = () => handleOpen(false);

    const onSubmit = async (data: ItemFormValue) => {
        let success = false;
        if(mode === "create") {
            success = await dispatch(createItemAction(data)) || false;
        } else if(mode === "edit" && item) {
            // TODO: Implement update item action
            success = await dispatch(updateItemByIdAction({id: item._id, data})) || false;
        }
        if(success) {
            handleClose();
            onSuccess?.();
        }
    };

    const categories = [
        {
            id: 1,
            name: "Produce",
            value: "produce"
        },
        {
            id: 2,
            name: "Dairy",
            value: "dairy"
        },
        {
            id: 3,
            name: "Meat",
            value: "meat"
        },
        {
            id: 4,
            name: "Pantry",
            value: "pantry"
        },
        {
            id: 5,
            name: "Frozen",
            value: "frozen"
        },
        {
            id: 6,
            name: "Other",
            value: "other"
        }
    ];


    return (
        <>
            {childWithOnClick}
            <AnimatePresence>
                {
                    open &&
                    <ConfigProvider theme={{
                        components: {
                            DatePicker: {
                                zIndexPopup: 1400
                            }
                        }
                    }}>

                    <Dialog 
                    open={open}
                    onClose={handleClose}
                    className="border border-border"
                    sx={{
                      '& .MuiPaper-root': {
                        borderRadius: 0
                      }
                    }}
                    disableEnforceFocus
                    >
                        <motion.div
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.9}}
                        transition={{duration: 0.2}}
                        >
                            <DialogTitle className="text-center text-foreground">
                                {title}
                            </DialogTitle>

                            <DialogContent style={{overflow: 'visible'}}>

                                <form
                                id="item-form"
                                onSubmit={handleSubmit(onSubmit)}
                                className="w-full flex flex-col gap-4"
                                >

                                    <FormControl>
                                        <OutlinedInput
                                            placeholder="Enter item name"
                                            id="item-name"
                                            sx={{
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'var(--primary)'
                                                }
                                            }}
                                            {
                                                ...register("name" ,{
                                                    required: mode === "create" ? "Item name is required" : false
                                                })
                                            }
                                        />
                                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
                                    </FormControl>

                                    <FormControl variant="outlined" sx={{minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>

                                        <Controller
                                            name="category"
                                            control={control}
                                            render={({field}) => (
                                                <Select
                                                    {...field}
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    label="Category"
                                                >
                                                    {
                                                        categories.map((category) => (
                                                            <MenuItem key={category.id} value={category.value}>
                                                                {category.name}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            )}
                                        />

                                    </FormControl>


                                    <div className="w-full flex flex-col gap-4">

                                        <Controller
                                        name="expiryDate"
                                        control={control}
                                        render={({field}) => (
                                            <DatePicker 
                                            onChange={(_, dateString) => field.onChange(dateString)}
                                            value={field.value ? dayjs(field.value) : null}
                                            getPopupContainer={() => document.body}
                                            />
                                        )}
                                        />

                                        <Controller
                                            name="quantity"
                                            control={control}
                                            rules={{ required: mode === "create" ? "Quantity is required" : false }}
                                            render={({ field }) => (
                                                <NumberField
                                                    {...field}
                                                    label="Quantity"
                                                    size="small"
                                                    min={1}
                                                    max={100}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                />
                                            )}
                                        />
                                    </div>



                                </form>
                                
                            </DialogContent>

                            <DialogActions
                                sx={{
                                    justifyContent: 'center'
                                }}
                            >
                                <CTAButton
                                    text={mode === "create" ? "Add" : "Edit"}
                                    type="submit"
                                    form="item-form"
                                    className="px-4 py-2 w-[90%]"
                                />
                            </DialogActions>

                        </motion.div>
                        
                    </Dialog>

                    </ConfigProvider>
                }
            </AnimatePresence>

        </>
    )
};

export default ItemDailog;
