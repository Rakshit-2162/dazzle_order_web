import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { PurchaseOrderItemJSON } from "../../../models/PurchaseOrderItem";
import type { Product } from "../../../models/Product";

interface StepReviewOrderItemsProps {
  order_id: number;
  cart: PurchaseOrderItemJSON[];
  products_list: Product[];
}

function StepReviewOrderItems({ order_id, cart, products_list }: StepReviewOrderItemsProps) {
  order_id.toString();
  
  return (
    <Box sx={{ m: 2, width: "100%" }}>
      <Typography variant="h5" mb={2}>
        Review Order Items
      </Typography>

      {cart.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
          <Typography variant="body1" color="text.secondary">
            No items added to cart yet. Go back to select products.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{borderRadius: 3}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Code</strong></TableCell>
                <TableCell><strong>Size</strong></TableCell>
                <TableCell align="right"><strong>Quantity</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.map((item) => {
                const product = products_list.find(
                  (p) => p.productId === item.product_id
                );
                return (
                  <TableRow key={item.product_id}>
                    <TableCell>{product?.productName}</TableCell>
                    <TableCell>{product?.categoryName}</TableCell>
                    <TableCell>{product?.productCode}</TableCell>
                    <TableCell>{product?.productSize}</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          Total Items: {cart.length}
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          Total Quantity: {cart.reduce((sum, item) => sum + item.qty, 0)}
        </Typography>
      </Box>
    </Box>
  );
}

export default StepReviewOrderItems;