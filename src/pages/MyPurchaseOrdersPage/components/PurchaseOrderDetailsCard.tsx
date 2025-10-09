import {
  Box,
  Card,
  Divider,
  Stack,
  Typography,
  useTheme,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";
import { formatToIST } from "../../../utills/DateFormatter";
import { PurchaseOrderMaster } from "../../../models/PurchaseOrderMaster";
import { useState } from "react";
import SecondaryButton from "../../../components/common/SecondaryButton";
import PrimaryButton from "../../../components/common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { BorderColorRounded } from "@mui/icons-material";
import EditPurchaseOrderDialogue from "./EditPurchaseOrderDialogue";

interface PurchaseOrderDetailsCardProps {
  purchaseOrderMaster: PurchaseOrderMaster;
  onDelete: (order_id: number) => void;
  onUpdate: () => void;
}

function PurchaseOrderDetailsCard({
  purchaseOrderMaster,
  onDelete,
  onUpdate,
}: PurchaseOrderDetailsCardProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const formattedDate = formatToIST(purchaseOrderMaster.dateTimestamp);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

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

  const { icon, color, label } = statusMap[purchaseOrderMaster.status];

  const handle3DotClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuPosition(null);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMenuPosition({ top: event.clientY, left: event.clientX });
  };

  const confirmDelete = () => {
    onDelete(purchaseOrderMaster.order_id);
    setOpenDeleteDialog(false);
    handleMenuClose();
  };

  return (
    <>
      <Card
        onContextMenu={handleContextMenu}
        onClick={() =>
          navigate(
            `/dashboard/viewAllPurchaseOrders/${purchaseOrderMaster.order_id}`
          )
        }
        sx={{
          borderRadius: 3,
          cursor: "pointer",
          my: 1,
          boxShadow: 0,
          border: theme.palette.mode === "dark" ? 0 : 1,
          borderColor:
            theme.palette.mode === "dark" ? "" : theme.palette.grey[400],
          p: 1.2,
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
          {/* Left info */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2 }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            flex={1}
            sx={{ width: "100%" }}
          >
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
              {"# " + purchaseOrderMaster.order_id}
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={{ xs: 0.5, sm: 2 }}
              sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
            >
              <Typography variant="h5" sx={{ fontSize: { xs: 14, sm: 18 } }}>
                {purchaseOrderMaster.distributor?.user_name}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 16 } }}>
                {purchaseOrderMaster.total_qty + " item(s)"}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: { xs: 12, sm: 16 } }}>
                {formattedDate}
              </Typography>
            </Stack>
          </Stack>

          {/* Status & 3-dot menu */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              display="inline-flex"
              alignItems="center"
              borderRadius={2}
              bgcolor={color}
              px={{ xs: 1, sm: 1.5 }}
              py={{ xs: 0.5, sm: 0.8 }}
              mt={{ xs: 1, sm: 0 }}
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

            <IconButton size="small" onClick={handle3DotClick}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Card>

      {/* 3-dot menu */}
      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={handleMenuClose}
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
      >
        <MenuItem
          onClick={() => {
            setOpenEditDialog(true);
            handleMenuClose();
          }}
          sx={{
            color: theme.palette.mode === "dark" ? "white" : "primary.main",
          }}
        >
          <BorderColorRounded sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteDialog(true);
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteOutlineRoundedIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Right-click menu */}
      <Menu
        open={!!menuPosition}
        onClose={handleMenuClose}
        anchorReference="anchorPosition"
        slotProps={{ paper: { sx: { borderRadius: 3 } } }}
        anchorPosition={
          menuPosition
            ? { top: menuPosition.top, left: menuPosition.left }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            setOpenEditDialog(true);
            handleMenuClose();
          }}
          sx={{
            color: theme.palette.mode === "dark" ? "white" : "primary.main",
          }}
        >
          <BorderColorRounded sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteDialog(true);
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteOutlineRoundedIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Delete confirmation */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
        sx={{ backdropFilter: "blur(1px)" }}
        slotProps={{ paper: { sx: { borderRadius: 4 } } }}
      >
        <DialogTitle variant="h5">Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete order #{purchaseOrderMaster.order_id}?
        </DialogContent>
        <DialogActions>
          <Box display="flex" gap={1}>
            <SecondaryButton
              label="Cancel"
              onClick={() => setOpenDeleteDialog(false)}
            />
            <PrimaryButton
              label="Delete"
              onClick={confirmDelete}
              color="error"
            />
          </Box>
        </DialogActions>
      </Dialog>

      {/* Edit Dialogue */}
      <EditPurchaseOrderDialogue
        purchaseOrderMaster={purchaseOrderMaster}
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          onUpdate();
        }}
      />
    </>
  );
}

export default PurchaseOrderDetailsCard;
