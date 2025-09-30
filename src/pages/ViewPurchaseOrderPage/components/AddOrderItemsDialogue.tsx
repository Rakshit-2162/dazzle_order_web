import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import StepReviewOrderItems from "../steps/StepReviewOrderItems";
import StepSelectOrderItems from "../steps/StepSelectOrderItems";
import CustomStepper from "../../../components/CustomStepper";
import { useTranslation } from "react-i18next";
import type { Product } from "../../../models/Product";
import type { PurchaseOrderItemJSON } from "../../../models/PurchaseOrderItem";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../../../services/ApiServices";

interface AddOrderItemsDialogProps {
  order_id: number;
  open: boolean;
  onClose: () => void;
}

const AddOrderItemsDialog = ({ order_id, open, onClose }: AddOrderItemsDialogProps) => {
  const { t } = useTranslation();
  const steps = t("addOrderItemsSteps", {
    returnObjects: true,
  }) as string[];
  const [products_list, setProductsList] = useState<Product[]>([]);
  const [, setLoading] = useState(false);
  
  // Lift cart state to parent
  const [cart, setCart] = useState<PurchaseOrderItemJSON[]>([]);

  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchAllProducts()
        .then((products) => setProductsList(products ?? []))
        .catch((err) => {
          console.error("Error fetching products:", err);
          setProductsList([]);
        })
        .finally(() => setLoading(false));
    } else {
      // Reset cart when dialog closes
      setCart([]);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      fullScreen
      maxWidth="lg"
      slotProps={{ paper: { sx: { borderRadius: 4 } } }}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          onClose();
        }
      }}
    >
      <DialogTitle>
        <Stack display={'flex'} justifyContent={'space-between'} direction={'row'} alignItems={'center'}>
          <Typography variant="h4">Add Order Items</Typography>
          <IconButton onClick={onClose}><Close /></IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box mx={4}>
          <CustomStepper
            steps={steps}
            stepContents={[
              <StepSelectOrderItems 
                order_id={order_id} 
                products_list={products_list}
                cart={cart}
                setCart={setCart}
              />,
              <StepReviewOrderItems 
                order_id={order_id}
                cart={cart}
                products_list={products_list}
              />,
            ]}
            onConfirm={() => console.log("Confirm clicked 🚀", cart)}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderItemsDialog;