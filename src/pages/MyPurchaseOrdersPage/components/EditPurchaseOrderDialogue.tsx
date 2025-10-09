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
import type {
  PurchaseOrderMaster,
  PurchaseOrderMasterJSON,
} from "../../../models/PurchaseOrderMaster";
import {
  fetchAllDistributors,
  updateOrderByID,
} from "../../../services/ApiServices";
import { showSnackbar } from "../../../services/snackbarService";
import { ErrorOutlineRounded, TaskAltRounded } from "@mui/icons-material";
import isEqual from "lodash.isequal"; // 👈 install with: npm install lodash.isequal

// ------------------ TypeScript Form Type ------------------
interface FormData {
  distributor_id: string;
  remarks: string;
}

// ------------------ Component Props ------------------
interface EditPurchaseOrderDialogueProps {
  purchaseOrderMaster: PurchaseOrderMaster;
  open: boolean;
  onClose: () => void;
}

function EditPurchaseOrderDialogue({
  purchaseOrderMaster,
  open,
  onClose,
}: EditPurchaseOrderDialogueProps) {
  const theme = useTheme();
  const [isChanged, setIsChanged] = useState(false);
  const [distributors, setDistributors] = useState<DistributorJSON[]>([]);

  // ------------------ useForm Setup ------------------
  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    resolver: yupResolver(createPurchaseOrderSchema),
    defaultValues: {
      distributor_id: purchaseOrderMaster?.distributor_id?.toString() || "",
      remarks: purchaseOrderMaster?.remarks || "",
    },
  });
  const watchedValues = watch();

  // Detect changes
  useEffect(() => {
    const originalValues = {
      distributor_id: purchaseOrderMaster?.distributor_id?.toString() || "",
      remarks: purchaseOrderMaster?.remarks || "",
    };

    setIsChanged(!isEqual(watchedValues, originalValues));
  }, [watchedValues, purchaseOrderMaster]);

  // Reset form when dialog opens or when props change
  useEffect(() => {
    if (open && purchaseOrderMaster) {
      reset({
        distributor_id: purchaseOrderMaster.distributor_id?.toString() || "",
        remarks: purchaseOrderMaster.remarks || "",
      });
    }
  }, [open, purchaseOrderMaster, reset]);

  // Fetch distributors when dialog opens
  useEffect(() => {
    if (open) {
      fetchAllDistributors()
        .then((data) => setDistributors(data ?? []))
        .catch((error) => {
          showSnackbar(
            `Error fetching distributors: ${error}`,
            "error",
            <ErrorOutlineRounded />
          );
          setDistributors([]);
        });
    }
  }, [open]);

  // ------------------ Submit Handler ------------------
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const updatedOrder: PurchaseOrderMasterJSON = {
        ...purchaseOrderMaster,
        distributor_id: data.distributor_id,
        remarks: data.remarks,
      };

      await updateOrderByID(updatedOrder);
      showSnackbar("Order updated successfully", "success", <TaskAltRounded />);
      onClose();
    } catch (error) {
      showSnackbar(
        `Error updating purchase order: ${error}`,
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
      <DialogTitle variant="h4">Edit Purchase Order</DialogTitle>
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
                  slotProps: {
                    paper: {
                      sx: { maxHeight: 300, borderRadius: 3 },
                    },
                  },
                }}
                renderValue={(value) => {
                  const dist = distributors.find(
                    (d) => d.distributor_id === value
                  );
                  return dist
                    ? `${dist.distributor_id} - ${dist.user_name}`
                    : "Select Distributor";
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

        {/* Remarks Field */}
        <MyTextField
          name="remarks"
          control={control}
          placeholder="Remarks (optional)"
          type="text"
        />
      </DialogContent>

      <DialogActions>
        <SecondaryButton label="Cancel" onClick={onClose} color="primary" />
        <PrimaryButton
          label="Update"
          onClick={handleSubmit(onSubmit)}
          disabled={!isChanged}
        />
      </DialogActions>
    </Dialog>
  );
}

export default EditPurchaseOrderDialogue;
