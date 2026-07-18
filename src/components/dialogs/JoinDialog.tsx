import { Dialog, DialogTitle, DialogContent, FormControl, OutlinedInput, DialogActions } from "@mui/material";
import { useState } from "react";
import React from "react";
import CTAButton from "../common/CTAButton";
import type { JoinDialogProps } from "../../types/JoinDialogProps";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

const JoinDialog = ({ title, children }: JoinDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const childWithOnClick = React.cloneElement(children, {
    onClick: handleOpen
  } as any);

  const handleJoin = () => {
      handleClose();
      navigate('/dashboard');
      // TODO: Call backend join endpoint
  };

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
                    placeholder="Enter invitation code"
                    id="invitation-code"
                    name="invitation-code"
                  />
                </FormControl>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center'
                }}
              >
                <CTAButton
                  text="Join"
                  onClick={handleJoin}
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

export default JoinDialog;