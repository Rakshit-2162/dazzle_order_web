import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Collapse,
  Paper,
  useTheme,
} from "@mui/material";
import { ExpandMore, ChevronRight, Check, Close } from "@mui/icons-material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import type { Product } from "../../../models/Product";
import type { PurchaseOrderItemJSON } from "../../../models/PurchaseOrderItem";

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
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<Record<number, string>>({});

  // Group products by category
  const groupedProducts = products_list.reduce(
    (acc, product) => {
      if (!acc[product.categoryName]) {
        acc[product.categoryName] = [];
      }
      acc[product.categoryName].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleAddToCart = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const existingQty = getCartQuantity(productId);
    setEditingProduct(productId);
    setQuantities((prev) => ({ 
      ...prev, 
      [productId]: existingQty > 0 ? String(existingQty) : "1" 
    }));
  };

  const handleConfirmQuantity = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const qty = parseInt(quantities[productId] || "1");
    if (qty > 0) {
      setCart((prev) => {
        const existing = prev.find((item) => item.product_id === productId);
        if (existing) {
          return prev.map((item) =>
            item.product_id === productId ? { ...item, qty: qty } : item
          );
        }
        return [...prev, { order_id: order_id, product_id: productId, qty: qty }];
      });
    }
    setEditingProduct(null);
  };

  const handleCancelQuantity = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProduct(null);
    setQuantities((prev) => {
      const newQty = { ...prev };
      delete newQty[productId];
      return newQty;
    });
  };

  const getCartQuantity = (productId: number) => {
    return cart.find((item) => item.product_id === productId)?.qty || 0;
  };

  return (
    <Box sx={{ m: 2, width: "100%" }}>
      <Typography variant="h5" mb={2}>
        Select Products
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 3 }}>
        {Object.entries(groupedProducts).map(
          ([categoryName, products], index) => (
            <Box
              key={categoryName}
              sx={{
                borderBottom:
                  index !== Object.entries(groupedProducts).length - 1 ? 1 : 0,
                borderColor: "divider",
                width: "100%",
              }}
            >
              {/* Category Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "action.hover" },
                }}
                onClick={() => toggleCategory(categoryName)}
              >
                {expandedCategories.includes(categoryName) ? (
                  <ExpandMore sx={{ mr: 1, color: "text.secondary" }} />
                ) : (
                  <ChevronRight sx={{ mr: 1, color: "text.secondary" }} />
                )}
                <Typography variant="subtitle1" fontWeight="bold">
                  {categoryName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  ({products.length} products)
                </Typography>
              </Box>

              {/* Products List */}
              <Collapse in={expandedCategories.includes(categoryName)}>
                <Box>
                  {products.map((product) => (
                    <Box
                      key={product.productId}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        pl: 6,
                        borderTop: 1,
                        borderColor: "divider",
                        "&:hover": { bgcolor: "background.paper" },
                      }}
                    >
                      {/* Product Info */}
                      <Box sx={{ flexGrow: 1, ml: 1, mx: 2 }}>
                        <Typography variant="body1" fontWeight="medium">
                          {product.productName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Code: {product.productCode} | Size:{" "}
                          {product.productSize}
                        </Typography>
                      </Box>

                      {/* Cart Actions */}
                      {editingProduct === product.productId ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <TextField
                            size="small"
                            type="number"
                            value={quantities[product.productId] || ""}
                            onChange={(e) =>
                              setQuantities((prev) => ({
                                ...prev,
                                [product.productId]: e.target.value,
                              }))
                            }
                            onClick={(e) => e.stopPropagation()}
                            inputProps={{ min: 1 }}
                            sx={{ width: "80px" }}
                            placeholder="Qty"
                          />
                          <IconButton
                            color="success"
                            onClick={(e) =>
                              handleConfirmQuantity(product.productId, e)
                            }
                          >
                            <Check />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={(e) =>
                              handleCancelQuantity(product.productId, e)
                            }
                          >
                            <Close />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          {getCartQuantity(product.productId) > 0 && (
                            <Typography variant="body2" fontWeight="bold">
                              Qty: {getCartQuantity(product.productId)}
                            </Typography>
                          )}
                          <IconButton
                            color={
                              theme.palette.mode === "dark"
                                ? "inherit"
                                : "primary"
                            }
                            onClick={(e) =>
                              handleAddToCart(product.productId, e)
                            }
                          >
                            <ShoppingCartRoundedIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Collapse>
            </Box>
          )
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
                • {product?.productName} ({product?.categoryName}) - Qty:{" "}
                {item.qty}
              </Typography>
            );
          })}
        </Box>
      )}
    </Box>
  );
}