import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import type { PurchaseOrderMaster } from "../../../models/PurchaseOrderMaster";
import { formatDateTime } from "../../../utills/DateFormatter";

interface Props {
  order: PurchaseOrderMaster;
}

function MasterOrderDetailsTable({ order }: Props) {
  const theme = useTheme();
  const formattedDate = formatDateTime(order.dateTimestamp);

  return (
    <>
      <TableContainer
        component={Paper}
        aria-label="simple table"
        sx={{
          borderRadius: 3,
          border: theme.palette.mode === "dark" ? 0 : 1,
          borderColor:
            theme.palette.mode === "dark" ? "" : theme.palette.grey[400],
        }}
      >
        <Table
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
              {["Distributor Name", "Total Qty", "Created On", "Remarks"].map(
                (heading) => (
                  <TableCell key={heading}>
                    <Typography variant="h5" fontWeight={600}>{heading}</Typography>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell sx={{ typography: "h6" }}>
                {order.distributor?.user_name}
              </TableCell>
              <TableCell sx={{ typography: "h6" }}>
                {order.total_qty + " item(s)"}
              </TableCell>
              <TableCell sx={{ typography: "h6" }}>{formattedDate}</TableCell>
              <TableCell sx={{ typography: "h6" }}>{order.remarks}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MasterOrderDetailsTable;
