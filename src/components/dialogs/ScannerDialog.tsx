import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import CTAButton from "../common/CTAButton";
import { AnimatePresence, motion } from "motion/react";
import BarcodeScanner from "react-qr-barcode-scanner";

const ScannerDialog = ({ children, onScan } : { children: React.ReactNode, onScan?: (barcode: string) => void }) => {

    const [open,setOpen] = useState<boolean>(false);
    const [scanner,setScanner] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
        setScanner(true);
    }

    const handleClose = () => {
        setOpen(false);
        setScanner(false);
    }

    const handleScan = (barcode: string) => {
        console.log('Scanned:', barcode);
        onScan?.(barcode);
        handleClose();
    }

    const childWithOnClick = React.cloneElement(children as React.ReactElement, {
        onClick: handleOpen
    } as any)

    return (
       <>
       {childWithOnClick}
      <AnimatePresence>
        {open && (
          <Dialog
            open={open}
            onClose={handleClose}
            className="border border-border"
            maxWidth="md"
            fullWidth
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
              <DialogTitle className="text-center text-foreground">Scan Item Barcode</DialogTitle>
              <DialogContent>
                {
                    scanner && (
                        <BarcodeScanner
                        onUpdate={(_,res) => {
                            if(res) handleScan(res.getText());
                        }}
                        onError={(err) => {
                            console.error('Scanner error:', err);
                        }}
                        />
                    )
                }
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center'
                }}
              >
                <CTAButton
                  text="Cancel"
                  onClick={handleClose}
                  className="px-4 py-2"
                />
              </DialogActions>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
       </>
    )
}

export default ScannerDialog;