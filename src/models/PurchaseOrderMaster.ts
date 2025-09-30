import { Distributor, type DistributorJSON } from "./Distributor";

export type OrderStatus = "pending" | "completed" | "cancelled";

export interface PurchaseOrderMasterJSON {
  order_id: number;
  distributor_id: string;
  distributor?: DistributorJSON;
  total_qty: number;
  remarks: string;
  status: OrderStatus;
  dateTimestamp: Date; // store as ISO string
}

export class PurchaseOrderMaster {
  constructor(
    public order_id: number,
    public distributor_id: string,
    public total_qty: number,
    public remarks: string,
    public status: OrderStatus,
    public dateTimestamp: Date,
    public distributor?: Distributor
  ) {}

  static fromJSON(json: PurchaseOrderMasterJSON): PurchaseOrderMaster {
    return new PurchaseOrderMaster(
      json.order_id,
      json.distributor_id,
      json.total_qty,
      json.remarks,
      json.status,
      new Date(json.dateTimestamp),
      json.distributor ? Distributor.fromJSON(json.distributor) : undefined
    );
  }

  toJSON(): PurchaseOrderMasterJSON {
    return {
      order_id: this.order_id,
      distributor_id: this.distributor_id,
      total_qty: this.total_qty,
      remarks: this.remarks,
      status: this.status,
      dateTimestamp: this.dateTimestamp,
      distributor: this.distributor ? this.distributor.toJSON() : undefined,
    };
  }
}
export { Distributor };

