import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Stack,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { DistributorJSON } from "../../../models/Distributor";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PrimaryButton from "../../../components/common/PrimaryButton";
import SecondaryButton from "../../../components/common/SecondaryButton";
import { useState } from "react";
import { TaskAltRounded, ErrorOutlineRounded } from "@mui/icons-material";
import { deleteDistributor } from "../../../services/ApiServices";
import { showSnackbar } from "../../../services/snackbarService";

interface ShowAllDistributorsTableProps {
  distributors: DistributorJSON[];
  onUpdate: () => void;
}

function ShowAllDistributorsTable({
  distributors,
  onUpdate
}: ShowAllDistributorsTableProps) {
  const theme = useTheme();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // delete handler
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      console.log(deleteId);
      
      const response = await deleteDistributor(deleteId);

      if (response) {
        showSnackbar("Distributor deleted successfully", "success", <TaskAltRounded />);
        setDeleteId(null);
        onUpdate();
      } else {
        showSnackbar("Error occurred", "error", <ErrorOutlineRounded />);
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
          height: "70vh",
          borderRadius: 3,
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
                "Distributor ID",
                "Distributor Name",
                "Mobile",
                "Company Name",
                "Location",
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
            {distributors.map((item, index) => (
              <TableRow key={item.user_id}>
                <TableCell sx={{ typography: "h6" }}>{index + 1}</TableCell>
                <TableCell sx={{ typography: "h6" }}>
                  {item.distributor_id}
                </TableCell>
                <TableCell sx={{ typography: "h6" }}>
                  {item.user_name}
                </TableCell>
                <TableCell sx={{ typography: "h6" }}>
                  {item.user_mobile}
                </TableCell>
                <TableCell sx={{ typography: "h6" }}>
                  {item.user_company_name}
                </TableCell>
                <TableCell sx={{ typography: "h6" }}>
                  {item.city_state}
                </TableCell>
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
                        // setEditItem(item);
                      }}
                    />
                    <DeleteOutlineRoundedIcon
                      sx={{ fontSize: 22, color: "red", cursor: "pointer" }}
                      onClick={() => {
                        // on delete click
                        setDeleteId(item.user_id);
                      }}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Drawer */}

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
            Distributor: {""}
            <strong>
              {distributors.find((item) => item.user_id === deleteId)
                ?.user_name || ""}
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

export default ShowAllDistributorsTable;
