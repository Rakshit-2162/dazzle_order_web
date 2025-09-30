import { Box, Card, Divider, Stack, Typography, useTheme } from "@mui/material";
import type { PurchaseOrderMaster } from "../models/PurchaseOrderMaster";
import { useNavigate } from "react-router-dom";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import { formatDateTime } from "../utills/DateFormatter";

interface PurchaseOrderDetailsCardProps {
  purchaseOrderMaster: PurchaseOrderMaster;
}

function PurchaseOrderDetailsCard(props: PurchaseOrderDetailsCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const formattedDate = formatDateTime(props.purchaseOrderMaster.dateTimestamp);
  const statusMap = {
    pending: {
      icon: (
        <WarningAmberRoundedIcon fontSize="small" sx={{ color: "white" }} />
      ),
      color: theme.palette.warning.main,
      label: "Pending",
    },
    completed: {
      icon: (
        <CheckCircleOutlineRoundedIcon
          fontSize="small"
          sx={{ color: "white" }}
        />
      ),
      color: theme.palette.primary.main,
      label: "Completed",
    },
    cancelled: {
      icon: (
        <DoNotDisturbAltRoundedIcon fontSize="small" sx={{ color: "white" }} />
      ),
      color: theme.palette.error.main,
      label: "Cancelled",
    },
  };

  const { icon, color, label } = statusMap[props.purchaseOrderMaster.status];

  return (
    <>
      <Card
        onClick={() => navigate(`/dashboard/viewAllPurchaseOrders/${props.purchaseOrderMaster.order_id}`)}
        sx={{
          borderRadius: 3,
          cursor: "pointer",
          my: 1,
          boxShadow: 0,
          border: theme.palette.mode === 'dark' ? 0 : 1,
          borderColor: theme.palette.mode === 'dark' ? '' : theme.palette.grey[400],
          p: { xs: 1.5, sm: 2 }, // smaller padding on mobile
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2 }}
          useFlexGap
          sx={{
            flexWrap: "wrap",
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          {/* Left side (Order + Distributor) */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2 }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            flex={1}
            sx={{ width: "100%" }}
          >
            {/* Order number */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                bgcolor: theme.palette.mode === "dark" ? "#101624" : "#ECECEC",
                px: { xs: 1.5, sm: 2 },
                py: { xs: 0.8, sm: 1 },
                fontWeight: 600,
                fontSize: { xs: 16, sm: 20 },
                minWidth: { xs: "auto", sm: 70 },
              }}
            >
              {"# " + props.purchaseOrderMaster.order_id}
            </Box>

            {/* Distributor info */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={{ xs: 0.5, sm: 2 }}
              sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
            >
              <Typography variant="h5" sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {props.purchaseOrderMaster.distributor?.user_name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 16 } }}>
                {props.purchaseOrderMaster.total_qty + " item(s)"}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 16 } }}>
                {formattedDate}
              </Typography>
            </Stack>
          </Stack>

          {/* Status box */}
          <Box
            display="inline-flex"
            alignItems="center"
            borderRadius={2}
            bgcolor={color}
            px={{ xs: 1, sm: 1.5 }}
            py={{ xs: 0.5, sm: 0.8 }}
            mt={{ xs: 1, sm: 0 }} // small margin-top on mobile
          >
            {icon}
            <Typography
              variant="h6"
              ml={0.5}
              color="white"
              sx={{ fontSize: { xs: 12, sm: 16 } }}
            >
              {label}
            </Typography>
          </Box>
        </Stack>
      </Card>
    </>
  );
}

export default PurchaseOrderDetailsCard;
