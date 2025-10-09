import httpClient from "./httpClient";
import { APIRoutes } from "./ApiRoutes";
import type { PurchaseOrderMasterJSON } from "../models/PurchaseOrderMaster";
import type { PurchaseOrderItemJSON } from "../models/PurchaseOrderItem";

export const login = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("admin_email", email);
  formData.append("admin_password", password);

  const response = await httpClient.post(APIRoutes.admin.login, formData);

  const { success, adminRecord } = response.data;

  if (!success) {
    throw new Error("Invalid email or password");
  }

  return { user: adminRecord };
};

export const signup = async () => {};

// ------ FETCH ALL DISTRIBUTORS ------
export const fetchAllDistributors = async () => {
  const response = await httpClient.post(APIRoutes.user.fetchAll);
  return response.data["userRecord"];
};

// ------ CREATE A DISTRIBUTOR ------
export const createDistributor = async (data: {
  distributor_id: string;
  user_name: string;
  user_mobile: string;
  user_company_name: string;
  user_password: string;
  city_state: string;
}) => {
  const body = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      body.append(key, value);
    });
  const response = await httpClient.post(APIRoutes.user.register, body);
  return response.data;
};

// ------ DELETE A DISTRIBUTOR ------
export const deleteDistributor = async (user_id: number) => { 
  const body = new FormData();
  body.append("user_id", String(user_id));
  const response = await httpClient.post(APIRoutes.user.delete, body);
  return response.data;
};

// ------ FETCH ALL PRODUCTS ------
export const fetchAllProducts = async () => {
  const response = await httpClient.post(
    APIRoutes.product.fetchAllProductsList
  );
  return response.data["productsRecord"];
};

// ------ FETCH ALL PURCHASE ORDERS ------
export const fetchAllOrders = async () => {
  const response = await httpClient.post(
    APIRoutes.purchaseOrderMaster.fetchAllOrders
  );
  return response.data["orderRecord"];
};

// ------ FETCH ORDER MASTER DETAILS BY ID ------
export const fetchPurchaseOrderMasterByID = async (order_id: number) => {
  const response = await httpClient.get(
    `${APIRoutes.purchaseOrderMaster.fetchOrderByID}?order_id=${order_id}`
  );
  return response.data.orderRecord;
};

// ------ CREATE PURCHASE ORDER ------
export const createPurchaseOrder = async (
  purchaseOrderMaster: PurchaseOrderMasterJSON
) => {
  const response = await httpClient.post(
    APIRoutes.purchaseOrderMaster.createOrder,
    purchaseOrderMaster
  );
  return response.data;
};

// ------ ADD PURCHASE ORDER ITEMS ------
export const addPurchaseOrderItems = async (
  order_items: PurchaseOrderItemJSON[]
) => {
  const formData = new FormData();
  formData.append("order_items", JSON.stringify(order_items));

  const response = await httpClient.post(
    APIRoutes.purchaseOrderItem.addOrderItems,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return response.data;
};

// ------ FETCH PURCHASE ORDER ITEMS BY ID ------
export const fetchPurchaseOrderItemsById = async (order_id: number) => {
  const response = await httpClient.get(
    `${APIRoutes.purchaseOrderItem.fetchOrderItemsById}?order_id=${order_id}`
  );
  return response.data["orderItemsRecord"];
};

// ------ DELETE PURCHASE ORDER BY ID ------
export const deleteOrderByID = async (order_id: number) => {
  const response = await httpClient.post(
    APIRoutes.purchaseOrderMaster.deleteOrderByID,
    { order_id }
  );
  return response.data;
};

// ------ UPDATE PURCHASE ORDER BY ID ------
export const updateOrderByID = async (
  order_master: PurchaseOrderMasterJSON
) => {
  const response = await httpClient.post(
    APIRoutes.purchaseOrderMaster.updateOrderByID,
    JSON.stringify(order_master)
  );
  return response.data;
};

// ------ UPDATE ORDER ITEM ------
export const updateOrderItem = async (order_item: PurchaseOrderItemJSON) => {
  const response = await httpClient.post(
    APIRoutes.purchaseOrderItem.updateOrderItem,
    JSON.stringify(order_item)
  );
  return response.data;
};

export const deleteOrderItem = async (order_item: PurchaseOrderItemJSON) => {
  const response = await httpClient.post(
    APIRoutes.purchaseOrderItem.deleteOrderItem,
    JSON.stringify(order_item)
  );
  return response.data;
};
