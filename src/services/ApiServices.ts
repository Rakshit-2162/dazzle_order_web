import httpClient from "./httpClient";
import { APIRoutes } from "./ApiRoutes";
import type { PurchaseOrderMasterJSON } from "../models/PurchaseOrderMaster";

export const login = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("admin_email", email);
  formData.append("admin_password", password);

  const response = await httpClient.post(APIRoutes.admin.login, formData);
  console.log(response);

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

// ------ FETCH ALL PRODUCTS ------
export const fetchAllProducts = async () => {
  const response = await httpClient.post(APIRoutes.product.fetchAllProductsList);
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
