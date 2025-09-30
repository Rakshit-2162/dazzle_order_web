import { Product, type ProductJSON } from "./Product";

export interface PurchaseOrderItemJSON {
  order_id: number;
  product_id: number;
  product?: ProductJSON;
  qty: number;
}

export class PurchaseOrderItem {
  constructor(
    public order_id: number,
    public product_id: number,
    public qty: number,
    public product?: Product
  ) {}

  static fromJSON(json: PurchaseOrderItemJSON): PurchaseOrderItem {
    return new PurchaseOrderItem(
      json.order_id,
      json.product_id,
      json.qty,
      json.product ? Product.fromJSON(json.product) : undefined
    );
  }

  toJSON(): PurchaseOrderItemJSON {
    return {
      order_id: this.order_id,
      product_id: this.product_id,
      qty: this.qty,
      product: this.product ? this.product.toJSON() : undefined,
    };
  }
}
