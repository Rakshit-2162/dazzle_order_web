import { Box, List } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Navbar from "../../components/common/Navbar";
import MyTextField from "../../components/common/MyTextField";
import { searchSchema } from "../../components/MySchema";
import PrimaryButton from "../../components/common/PrimaryButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PurchaseOrderDetailsCard from "../../components/PurchaseOrderDetailsCard";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  PurchaseOrderMaster,
  type PurchaseOrderMasterJSON,
} from "../../models/PurchaseOrderMaster";
import { useState, useEffect, useCallback } from "react";
import CreatePurchaseOrderDialogue from "./components/CreatePurchaseOrderDialogue";
import { fetchAllOrders } from "../../services/ApiServices";  

type FormData = yup.InferType<typeof searchSchema>;

function MyPurchaseOrdersPage() {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [orders, setOrders] = useState<PurchaseOrderMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { control } = useForm<FormData>({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  // ✅ reusable fetch function
  const getOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data: PurchaseOrderMasterJSON[] = await fetchAllOrders();
      const mapped = data.map((e) => PurchaseOrderMaster.fromJSON(e));
      setOrders(mapped);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load purchase orders");
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

  return (
    <>
      <Navbar
        buttons={[
          { label: "Purchase Orders", onClick: () => {}, type: "text" },
        ]}
      />

      <Box sx={{ mx: 4 }}>
        <Box display="flex" alignItems="center" gap={2} width="100%">
          <MyTextField
            name="search"
            placeholder="Search"
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

        {loading && <p>Loading orders...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <List>
          {orders.map((ele) => (
            <PurchaseOrderDetailsCard
              purchaseOrderMaster={ele}
              key={ele.order_id}
            />
          ))}
        </List>
      </Box>

      {/* Create Purchase Order Dialogue */}
      <CreatePurchaseOrderDialogue
        open={openDialogue}
        onClose={(refresh?: boolean) => handleCloseDialog(refresh)}
      />
    </>
  );
}

export default MyPurchaseOrdersPage;
