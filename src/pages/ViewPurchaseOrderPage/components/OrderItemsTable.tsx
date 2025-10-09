import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  useTheme,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type { PurchaseOrderItem } from "../../../models/PurchaseOrderItem";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useState } from "react";
import SecondaryButton from "../../../components/common/SecondaryButton";
import PrimaryButton from "../../../components/common/PrimaryButton";
import {
  deleteOrderItem,
  updateOrderItem,
} from "../../../services/ApiServices";
import { showSnackbar } from "../../../services/snackbarService";
import { ErrorOutlineRounded, TaskAltRounded } from "@mui/icons-material";

interface Props {
  order_items: Array<PurchaseOrderItem>;
  onUpdate: () => void;
}
function OrderItemsTable({ order_items, onUpdate }: Props) {
  const theme = useTheme();
  const [editItem, setEditItem] = useState<PurchaseOrderItem | null>(null);
  const [newQty, setNewQty] = useState<number>(0);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // update handler
  const handleUpdate = async () => {
    if (!editItem) return;

    try {
      const order_item = {
        order_id: editItem.order_id,
        product_id: editItem.product_id,
        qty: newQty,
      };

      // Call the API directly with JSON
      const response = await updateOrderItem(order_item);

      if (response["status"] === "success") {
        showSnackbar(response["message"], "success", <TaskAltRounded />);
        setEditItem(null);
        onUpdate();
      } else {
        showSnackbar(response["message"], "error", <ErrorOutlineRounded />);
      }
    } catch (error) {
      showSnackbar(`Update failed: ${error}`, "error", <ErrorOutlineRounded />);
    }
  };

  // delete handler
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const order_item = order_items.find(
        (item) => item.product_id === deleteId
      );
      if (!order_item) return;

      const data = {
        order_id: order_item.order_id,
        product_id: order_item.product_id,
        qty: order_item.qty,
      };

      const response = await deleteOrderItem(data);

      if (response["status"] === "success") {
        showSnackbar(response["message"], "success", <TaskAltRounded />);
        setDeleteId(null);
        onUpdate();
      } else {
        showSnackbar(response["message"], "error", <ErrorOutlineRounded />);
      }
    } catch (error) {
      showSnackbar(`Update failed: ${error}`, "error", <ErrorOutlineRounded />);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        aria-label="simple table"
        sx={{
          borderRadius: 3,
          maxHeight: 450,
          border: theme.palette.mode === "dark" ? 0 : 1,
          borderColor:
            theme.palette.mode === "dark" ? "" : theme.palette.grey[400],
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            width: "100%",
            "& th": {
              borderRight: `1px solid ${
                theme.palette.mode === "dark"
                  ? theme.palette.grey[600] // dark mode
                  : theme.palette.grey[300] // light mode
              }`,
            },
            "& td": {
              borderRight: `1px solid ${theme.palette.divider}`,
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
            "& th:last-child, & td:last-child": {
              borderRight: 0, // no right border on last column
            },
            "& tr:last-child td": {
              borderBottom: 0, // no bottom border on last row
            },
            "& thead th": {
              borderBottom: `1px solid ${
                theme.palette.mode === "dark"
                  ? theme.palette.grey[900]
                  : theme.palette.common.white
              }`,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.common.white
                  : theme.palette.grey[900],
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[900]
                  : theme.palette.common.white,
            },
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "Sr. No.",
                "Category",
                "Product Code",
                "Product Name",
                "Qty",
                "Actions",
              ].map((heading) => (
                <TableCell key={heading}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {heading}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {order_items.map((item, index) => (
              <TableRow key={item.product_id}>
                <TableCell sx={{ typography: "h6" }}>{index + 1}</TableCell>
                <TableCell sx={{ typography: "h6" }}>
                  {item.product?.categoryName}
                </TableCell>
                <TableCell sx={{ typography: "h6" }}>
                  {item.product?.productCode}
                </TableCell>
                <TableCell sx={{ typography: "h6" }}>
                  {item.product?.productName}
                </TableCell>
                <TableCell sx={{ typography: "h6" }}>{item.qty}</TableCell>
                <TableCell>
                  <Stack
                    direction={"row"}
                    sx={{
                      justifyContent: "space-evenly",
                      alignContent: "center",
                      display: "flex",
                    }}
                  >
                    <BorderColorRoundedIcon
                      sx={{
                        fontSize: 22,
                        cursor: "pointer",
                        color:
                          theme.palette.mode === "dark"
                            ? "white"
                            : theme.palette.primary.main,
                      }}
                      onClick={() => {
                        // on edit click
                        setEditItem(item);
                        setNewQty(item.qty);
                      }}
                    />
                    <DeleteOutlineRoundedIcon
                      sx={{ fontSize: 22, color: "red", cursor: "pointer" }}
                      onClick={() => {
                        // on delete click
                        setDeleteId(item.product_id);
                      }}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={!!editItem}
        onClose={() => setEditItem(null)}
        maxWidth="sm"
        fullWidth
        sx={{ backdropFilter: "blur(1px)" }}
        slotProps={{ paper: { sx: { borderRadius: 4 } } }}
      >
        <DialogTitle variant="h5">Edit Quantity</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" mb={1}>
            Product Code: <strong>{editItem?.product?.productCode}</strong>
          </Typography>
          <TextField
            type="number"
            fullWidth
            value={newQty}
            onChange={(e) => setNewQty(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <SecondaryButton label="Cancel" onClick={() => setEditItem(null)} />
          <PrimaryButton
            label="Save"
            onClick={handleUpdate}
            variant="contained"
          />
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        maxWidth="sm"
        sx={{ backdropFilter: "blur(1px)" }}
        slotProps={{ paper: { sx: { borderRadius: 4 } } }}
      >
        <DialogTitle variant="h5">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" mb={1}>
            Product Code:{" "}
            <strong>
              {order_items.find((item) => item.product_id === deleteId)?.product
                ?.productCode || ""}
            </strong>
          </Typography>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <SecondaryButton label="Cancel" onClick={() => setDeleteId(null)} />
          <PrimaryButton
            label="Delete"
            onClick={handleDelete}
            color="error"
            variant="contained"
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderItemsTable;
