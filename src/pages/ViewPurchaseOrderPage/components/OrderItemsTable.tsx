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
} from "@mui/material";
import type { PurchaseOrderItem } from "../../../models/PurchaseOrderItem";

interface Props {
  order_items: Array<PurchaseOrderItem>;
}
function OrderItemsTable({ order_items }: Props) {
  const theme = useTheme();
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
                "Size",
                "Qty",
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
              <TableRow >
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
                <TableCell sx={{ typography: "h6" }}>{item.size}</TableCell>
                <TableCell sx={{ typography: "h6" }}>{item.qty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default OrderItemsTable;
