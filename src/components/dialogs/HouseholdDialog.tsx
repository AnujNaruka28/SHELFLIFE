import { Dialog, DialogTitle, DialogContent, FormControl, OutlinedInput, DialogActions } from "@mui/material";
import { useState } from "react";
import React from "react";
import CTAButton from "../common/CTAButton";
import type { JoinDialogProps } from "../../types/JoinDialogProps";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useSelector } from "react-redux";
import { APIMethods, APIService } from "../../lib/APIService";
import { API_HOUSEHOLD } from "../../lib/apis";
import { useDispatch } from "react-redux";
import { authSuccess } from "../../lib/features/authSlice";
import type { AppDispatch } from "../../lib/store";
import { toast } from "react-toastify";

const useAppDispatch = () => useDispatch<AppDispatch>();

type HouseholdDialogMode = "join" | "create";

interface HouseholdDialogProps extends JoinDialogProps {
  mode: HouseholdDialogMode;
}

const HouseholdDialog = ({ title, children, mode }: HouseholdDialogProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();
  const { token } = useSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOpen = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const childWithOnClick = React.cloneElement(children, {
    onClick: handleOpen
  } as any);

  const handleSubmit = async () => {
    try {
      const isJoin = mode === "join";
      const endpoint = isJoin ? API_HOUSEHOLD.join : API_HOUSEHOLD.create;
      const payload = isJoin ? { inviteCode: inputValue } : { name: inputValue };
      const successMessage = isJoin ? "Joined household successfully" : "Household created successfully";

      const response = await APIService(endpoint, APIMethods.POST, payload);

      if (response?.status === 200 && response?.data?.data) {
        toast.success(successMessage);
        dispatch(authSuccess({ 
          user: response.data.data.user, 
          token: response.data.data.token 
        }));
        handleClose();
        navigate('/dashboard');
      } else {
        toast.error(`Failed to ${mode} household: Invalid server response`);
      }

    } catch (error) {
      console.error(`Error ${mode === "join" ? "joining" : "creating"} household:`, error);
      toast.error(`Failed to ${mode === "join" ? "join" : "create"} household`);
    }
  };


  const placeholder = mode === "join" ? "Enter invitation code" : "Enter household name";
  const buttonText = mode === "join" ? "Join" : "Create";
  const inputId = mode === "join" ? "invitation-code" : "household-name";
  const inputName = mode === "join" ? "invitation-code" : "household-name";

  return (
    <>
      {childWithOnClick}
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={handleClose}
            className="border border-border"
            sx={{
              '& .MuiPaper-root': {
                borderRadius: 0
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogTitle className="text-center text-foreground">{title}</DialogTitle>
              <DialogContent>
                <FormControl>
                  <OutlinedInput
                    placeholder={placeholder}
                    id={inputId}
                    name={inputName}
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center'
                }}
              >
                <CTAButton
                  text={buttonText}
                  onClick={handleSubmit}
                  className="px-4 py-2"
                />
              </DialogActions>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default HouseholdDialog;
