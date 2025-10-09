import {
  Box,
  List,
  Pagination,
  Select,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MyTextField from "../../components/common/MyTextField";
import { searchSchema } from "../../components/MySchema";
import PrimaryButton from "../../components/common/PrimaryButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PurchaseOrderDetailsCard from "./components/PurchaseOrderDetailsCard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  PurchaseOrderMaster,
  type PurchaseOrderMasterJSON,
} from "../../models/PurchaseOrderMaster";
import { useState, useEffect, useCallback, useMemo } from "react";
import CreatePurchaseOrderDialogue from "./components/CreatePurchaseOrderDialogue";
import { deleteOrderByID, fetchAllOrders } from "../../services/ApiServices";
import { showSnackbar } from "../../services/snackbarService";
import { ErrorOutlineRounded, TaskAltRounded } from "@mui/icons-material";
import TextNavbar from "../../components/common/TextNavbar";

type FormData = yup.InferType<typeof searchSchema>;

function MyPurchaseOrdersPage() {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [orders, setOrders] = useState<PurchaseOrderMaster[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { control, watch } = useForm<FormData>({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = watch("search")?.toLowerCase() || "";

  // ✅ reusable fetch function
  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data: PurchaseOrderMasterJSON[] = await fetchAllOrders();
      const mapped = (data ?? []).map((e) => PurchaseOrderMaster.fromJSON(e));
      setOrders(mapped);
    } catch (err) {
      showSnackbar(
        "Error fetching orders: " + err,
        "error",
        <ErrorOutlineRounded />
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ fetch orders on page load
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  // ✅ handle dialog close and refetch
  const handleCloseDialog = (shouldRefresh: boolean = false) => {
    setOpenDialogue(false);
    if (shouldRefresh) {
      getOrders();
    }
  };

  // ✅ filtered data
  const filteredOrders = useMemo(() => {
    return orders.filter(
      (order) =>
        order.order_id
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        order.distributor?.user_name
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    );
  }, [orders, searchValue]);

  // ✅ pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  useEffect(() => {
    // reset to page 1 when search changes
    setPage(1);
  }, [searchValue, rowsPerPage]);

  return (
    <>
      <TextNavbar label={"Purchase Orders"} color={"transparent"} />

      <Box sx={{ mx: 4, mb: 4 }}>
        {/* Search + Add */}
        <Box
          sx={{
            position: "sticky",
            top: 64,
            backgroundColor: "background.default",
            zIndex: 10,
          }}
        >
          <Box display="flex" alignItems="center" gap={2} width="100%">
            <MyTextField
              name="search"
              placeholder="Search by Order No or Distributor"
              control={control}
              type="text"
              borderRadius={8}
              startIcon={<SearchRoundedIcon />}
              fullWidth
            />
            <PrimaryButton
              label="Add"
              startIcon={<AddRoundedIcon />}
              onClick={() => setOpenDialogue(true)}
              sx={{ flexShrink: 0 }}
            />
          </Box>
        </Box>

        {loading ? (
          <Typography mt={4}>Loading orders...</Typography>
        ) : filteredOrders.length === 0 ? (
          <Typography mt={4}>No orders found.</Typography>
        ) : (
          <>
            <List>
              {paginatedOrders.map((ele) => (
                <PurchaseOrderDetailsCard
                  purchaseOrderMaster={ele}
                  key={ele.order_id}
                  onUpdate={getOrders}
                  onDelete={async (order_id) => {
                    try {
                      const result = await deleteOrderByID(order_id);
                      if (result.status === "success") {
                        showSnackbar(
                          "Order deleted successfully",
                          "success",
                          <TaskAltRounded />
                        );
                        getOrders();
                      } else {
                        showSnackbar(
                          `Delete failed: ${result.message || result.error}`,
                          "error",
                          <ErrorOutlineRounded />
                        );
                      }
                    } catch (error) {
                      showSnackbar(
                        `Error deleting order: ${error}`,
                        "error",
                        <ErrorOutlineRounded />
                      );
                    }
                  }}
                />
              ))}
            </List>

            {/* Pagination controls */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={3}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">Rows per page:</Typography>
                <Select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  size="small"
                >
                  {[10, 20, 50, 100].map((n) => (
                    <MenuItem key={n} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, val) => setPage(val)}
                color="primary"
              />
            </Stack>
          </>
        )}
      </Box>

      {/* Create Purchase Order Dialogue */}
      <CreatePurchaseOrderDialogue
        open={openDialogue}
        onClose={() => handleCloseDialog(true)}
      />
    </>
  );
}

export default MyPurchaseOrdersPage;
