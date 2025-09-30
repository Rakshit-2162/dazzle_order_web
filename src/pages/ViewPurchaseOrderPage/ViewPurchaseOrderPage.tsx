import { Box, Divider, Typography, useTheme } from "@mui/material";
import TextNavbar from "../../components/common/TextNavbar";
import { useParams } from "react-router-dom";
import { PurchaseOrderMaster } from "../../models/PurchaseOrderMaster";
import MasterOrderDetailsTable from "./components/MasterOrderDetailsTable";
import PrimaryButton from "../../components/common/PrimaryButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import OrderItemsTable from "./components/OrderItemsTable";
import {
  PurchaseOrderItem,
  type PurchaseOrderItemJSON,
} from "../../models/PurchaseOrderItem";
import { useEffect, useState } from "react";
import AddOrderItemsDialog from "./components/AddOrderItemsDialogue";
import { fetchPurchaseOrderMasterByID } from "../../services/ApiServices";

function ViewPurchaseOrderPage() {
  const theme = useTheme();
  const [openDialogue, setOpenDialogue] = useState(false);
  const [purchaseOrderMaster, setPurchaseOrderMaster] =
    useState<PurchaseOrderMaster | null>(null);
  // const [orderItems, setOrderItems] = useState<PurchaseOrderItem | null>(null);
  const { order_id } = useParams<{ order_id: string }>();
  const bgColorMap = {
    pending: { color: theme.palette.warning.main },
    completed: { color: theme.palette.primary.main },
    cancelled: { color: theme.palette.error.main },
  };

  useEffect(() => {
    if (!order_id) return;

    fetchPurchaseOrderMasterByID(Number(order_id)).then((data) => {
      setPurchaseOrderMaster(PurchaseOrderMaster.fromJSON(data));
    });
  }, [order_id]);

  if (!purchaseOrderMaster) return <p>Loading...</p>;

  const orderItemsJSON: PurchaseOrderItemJSON[] = [];

  const order_items: PurchaseOrderItem[] = orderItemsJSON.map((item) =>
    PurchaseOrderItem.fromJSON(item)
  );

  return (
    <>
      <TextNavbar
        label={"# " + order_id}
        color={bgColorMap[purchaseOrderMaster.status].color}
      />

      <Box mx={4} my={2}>
        <MasterOrderDetailsTable
          order={PurchaseOrderMaster.fromJSON(purchaseOrderMaster)}
        />
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
            label="Print"
            startIcon={<LocalPrintshopRoundedIcon />}
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

        <OrderItemsTable order_items={order_items} />
      </Box>

      {/* Add Order Items Dialogue */}
      <AddOrderItemsDialog
        order_id={Number(order_id)}
        open={openDialogue}
        onClose={() => setOpenDialogue(false)}
      />
    </>
  );
}

export default ViewPurchaseOrderPage;
