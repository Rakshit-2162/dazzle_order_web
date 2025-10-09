/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  IconButton,
  useTheme,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";
import type { Product } from "../../../models/Product";
import type { PurchaseOrderItemJSON } from "../../../models/PurchaseOrderItem";
import { showSnackbar } from "../../../services/snackbarService";
import { ErrorOutlineRounded, TaskAltRounded } from "@mui/icons-material";

interface StepSelectOrderItemsProps {
  products_list: Product[];
  order_id: number;
  cart: PurchaseOrderItemJSON[];
  setCart: React.Dispatch<React.SetStateAction<PurchaseOrderItemJSON[]>>;
}

export default function StepSelectOrderItems({
  order_id,
  products_list,
  cart,
  setCart,
}: StepSelectOrderItemsProps) {
  const theme = useTheme();
  const [searchCode, setSearchCode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState("");
  const qtyInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  // Handle when user presses Enter in code field
  const handleCodeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchCode.trim() !== "") {
      const found = products_list.find(
        (p) => p.productCode.toLowerCase() === searchCode.trim().toLowerCase()
      );

      if (found) {
        setSelectedProduct(found);
        setQty("");
        setTimeout(() => qtyInputRef.current?.focus(), 100);
      } else {
        showSnackbar("Product not found", "error", <ErrorOutlineRounded />);
      }
    }
  };

  // Handle when user presses Enter in qty field
  const handleQtyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && selectedProduct && Number(qty) > 0) {
      const existing = cart.find(
        (item) => item.product_id === selectedProduct.productId
      );
      if (existing) {
        // update qty
        setCart((prev) =>
          prev.map((item) =>
            item.product_id === selectedProduct.productId
              ? { ...item, qty: Number(qty) }
              : item
          )
        );
        showSnackbar("Quantity updated", "success", <TaskAltRounded />);
      } else {
        setCart((prev) => [
          ...prev,
          { order_id, product_id: selectedProduct.productId, qty: Number(qty) },
        ]);
        showSnackbar("Product added to cart", "success", <TaskAltRounded />);
      }

      // Reset for next entry
      setSelectedProduct(null);
      setSearchCode("");
      setQty("");
      setTimeout(() => codeInputRef.current?.focus(), 100);
    }
  };

  return (
    <Box sx={{ m: 2, width: "100%" }}>
      <Typography variant="h5" mb={2}>
        Add Products by Code
      </Typography>

      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Product Code Input */}
        <TextField
          inputRef={codeInputRef}
          label="Enter Product Code"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          onKeyDown={handleCodeEnter}
          placeholder="Type or scan product code"
          fullWidth
        />

        {/* If product found, show details and quantity input */}
        {selectedProduct && (
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "grey.100",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {selectedProduct.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Code: {selectedProduct.productCode} | Size:{" "}
                {selectedProduct.productSize}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                label="Qty"
                size="small"
                type="number"
                inputRef={qtyInputRef}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                onKeyDown={handleQtyEnter}
                inputProps={{ min: 1 }}
                sx={{ width: 90 }}
              />
              <IconButton
                color="success"
                onClick={() => {
                  if (Number(qty) > 0 && selectedProduct) {
                    handleQtyEnter({
                      key: "Enter",
                      preventDefault: () => {},
                    } as any);
                  }
                }}
              >
                <Check />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => {
                  setSelectedProduct(null);
                  setSearchCode("");
                  setQty("");
                  setTimeout(() => codeInputRef.current?.focus(), 100);
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <Box sx={{ mt: 3, p: 2, borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom fontWeight="bold">
            Cart Summary ({cart.length} items)
          </Typography>
          {cart.map((item) => {
            const product = products_list.find(
              (p) => p.productId === item.product_id
            );
            return (
              <Typography key={item.product_id} variant="body2">
                • {product?.productName} ({product?.productCode}) - Qty:{" "}
                {item.qty}
              </Typography>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
