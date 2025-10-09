import { Box, Divider, Typography, useTheme } from "@mui/material";
import TextNavbar from "../../components/common/TextNavbar";
import { useParams } from "react-router-dom";
import { PurchaseOrderMaster } from "../../models/PurchaseOrderMaster";
import MasterOrderDetailsTable from "./components/MasterOrderDetailsTable";
import PrimaryButton from "../../components/common/PrimaryButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import OrderItemsTable from "./components/OrderItemsTable";
import { useEffect, useState } from "react";
import AddOrderItemsDialog from "./components/AddOrderItemsDialogue";
import {
  fetchPurchaseOrderItemsById,
  fetchPurchaseOrderMasterByID,
} from "../../services/ApiServices";
import type { PurchaseOrderItem } from "../../models/PurchaseOrderItem";
import { exportToExcel } from "../../utills/csvUtils";
import { showSnackbar } from "../../services/snackbarService";
import { DownloadRounded, WarningRounded } from "@mui/icons-material";

function ViewPurchaseOrderPage() {
  const theme = useTheme();
  const [openDialogue, setOpenDialogue] = useState(false);
  const [purchaseOrderMaster, setPurchaseOrderMaster] =
    useState<PurchaseOrderMaster | null>(null);
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);
  const { order_id } = useParams<{ order_id: string }>();
  const bgColorMap = {
    pending: { color: theme.palette.warning.main },
    completed: { color: theme.palette.primary.main },
    cancelled: { color: theme.palette.error.main },
  };

  useEffect(() => {
    fetchData();
    console.log("fetch data");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order_id]);

  const fetchData = async () => {
    if (!order_id) return;

    await fetchPurchaseOrderMasterByID(Number(order_id))
      .then((data) => {
        setPurchaseOrderMaster(PurchaseOrderMaster.fromJSON(data));
      })
      .catch((err) => {
        console.error("Error fetching order master data:", err);
      });

    await fetchPurchaseOrderItemsById(Number(order_id))
      .then((order_items) => setOrderItems(order_items ?? []))
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  };

  if (!purchaseOrderMaster) return <p>Loading...</p>;

  return (
    <>
      <TextNavbar
        label={"# " + order_id}
        color={bgColorMap[purchaseOrderMaster.status].color}
      />

      <Box mx={4} my={2}>
        <MasterOrderDetailsTable order={purchaseOrderMaster} />
        <Box display="flex" alignItems="center" my={3}>
          <PrimaryButton
            label="Add"
            startIcon={<AddRoundedIcon />}
            onClick={() => setOpenDialogue(true)}
          />

          <Divider flexItem sx={{ mx: 2, flexGrow: 1, alignItems: "center" }}>
            <Typography variant="h5">Order Items</Typography>
          </Divider>

          <PrimaryButton
            label="Download"
            startIcon={<DownloadRounded />}
            onClick={() => {
              if (orderItems.length === 0) {
                showSnackbar("Add order items to export excel file", "warning", <WarningRounded />);
                return;
              }
              exportToExcel(
                purchaseOrderMaster,
                orderItems,
                `${order_id}_${purchaseOrderMaster.distributor?.user_name}.xlsx`
              );
            }}
          />
        </Box>
        {/* <Divider sx={{ my: 3 }}>
          {" "}
          <Typography variant="h5">Order Items</Typography>{" "}
        </Divider>{" "}
        <Grid display="flex" justifyContent="space-between" my={3}>
          {" "}
          <PrimaryButton label="Add" startIcon={<AddRoundedIcon />} />{" "}
          <PrimaryButton
            label="Print"
            startIcon={<LocalPrintshopRoundedIcon />}
          />{" "}
        </Grid> */}

        <OrderItemsTable order_items={orderItems} onUpdate={fetchData} />
      </Box>

      {/* Add Order Items Dialogue */}
      <AddOrderItemsDialog
        order_id={Number(order_id)}
        open={openDialogue}
        onClose={() => {
          setOpenDialogue(false);
          fetchData();
        }}
      />
    </>
  );
}

export default ViewPurchaseOrderPage;
