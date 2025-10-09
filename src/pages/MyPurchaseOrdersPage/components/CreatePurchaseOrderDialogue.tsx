import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import PrimaryButton from "../../../components/common/PrimaryButton";
import SecondaryButton from "../../../components/common/SecondaryButton";
import { useEffect, useState } from "react";
import type { DistributorJSON } from "../../../models/Distributor";
import MyTextField from "../../../components/common/MyTextField";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPurchaseOrderSchema } from "../../../components/MySchema";
import { type PurchaseOrderMasterJSON } from "../../../models/PurchaseOrderMaster";
import {
  createPurchaseOrder,
  fetchAllDistributors,
} from "../../../services/ApiServices";
import { showSnackbar } from "../../../services/snackbarService";
import { ErrorOutlineRounded, TaskAltRounded } from "@mui/icons-material";

// ------------------ TypeScript Form Type ------------------
interface FormData {
  distributor_id: string;
  remarks: string;
}

// ------------------ Component Props ------------------
interface CreatePurchaseOrderDialogueProps {
  open: boolean;
  onClose: () => void;
}

function CreatePurchaseOrderDialogue({
  open,
  onClose,
}: CreatePurchaseOrderDialogueProps) {
  const theme = useTheme();
  const [distributors, setDistributors] = useState<DistributorJSON[]>([]);

  // ------------------ useForm Setup ------------------
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(createPurchaseOrderSchema),
    defaultValues: {
      distributor_id: "",
      remarks: "",
    },
  });

  // Fetch distributors when dialog opens
  useEffect(() => {
    if (open) {
      fetchAllDistributors()
        .then((data) => {
          setDistributors(data ?? []);
        })
        .catch((error) => {
          showSnackbar(
            `Error fetching distributors: ${error}`,
            "error",
            <ErrorOutlineRounded />
          );
          setDistributors([]);
        });
    } else {
      reset();
    }
  }, [open, reset]);

  // ------------------ Submit Handler ------------------
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const purchaseOrderMaster: PurchaseOrderMasterJSON = {
        order_id: 0,
        distributor_id: data.distributor_id,
        total_qty: 0,
        remarks: data.remarks,
        status: "pending",
        dateTimestamp: new Date(),
      };

      await createPurchaseOrder(purchaseOrderMaster);
      showSnackbar("Order created", "success", <TaskAltRounded />);

      onClose();
    } catch (error) {
      showSnackbar(
        `Error creating purchase order: ${error}`,
        "error",
        <ErrorOutlineRounded />
      );
    }
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      sx={{ backdropFilter: "blur(2px)" }}
      slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      onClose={(_, reason) => {
        if (reason !== "backdropClick") onClose();
      }}
    >
      <DialogTitle variant="h4">Create New Order</DialogTitle>
      <DialogContent>
        {/* Distributor Dropdown */}
        <Controller
          name="distributor_id"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Select
                {...field}
                displayEmpty
                sx={{
                  borderRadius: 3,
                  bgcolor:
                    theme.palette.mode === "dark" ? "#101624" : "#ECECEC",
                  "& fieldset": { border: "none" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      borderRadius: 3,
                    },
                  },
                }}
                renderValue={(value) => {
                  const dist = distributors.find(
                    (d) => d.distributor_id === value
                  );
                  return dist
                    ? `${dist.distributor_id} - ${dist.user_name}`
                    : "No distributor selected";
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {distributors.map((dist) => (
                  <MenuItem
                    key={dist.distributor_id}
                    value={dist.distributor_id}
                  >
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Typography
                        variant="h5"
                        bgcolor={
                          theme.palette.mode === "dark"
                            ? ""
                            : theme.palette.grey[300]
                        }
                        px={1}
                        py={0.5}
                        borderRadius={2}
                      >
                        {dist.distributor_id}
                      </Typography>
                      <Typography variant="h5" color="text.primary" mx={2}>
                        {dist.user_name}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />

        {/* Remarks (optional) */}
        <MyTextField
          name="remarks"
          control={control}
          placeholder="Remarks"
          type="text"
        />
      </DialogContent>

      <DialogActions>
        <SecondaryButton label="Cancel" onClick={onClose} color="primary" />
        <PrimaryButton label="Save" onClick={handleSubmit(onSubmit)} />
      </DialogActions>
    </Dialog>
  );
}

export default CreatePurchaseOrderDialogue;
