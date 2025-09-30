const HOST_CONNECTION = "http://127.0.0.1/api_dazzle_order";

export const APIRoutes = {
  // ------ ADMIN ------
  admin: {
    signUp: `${HOST_CONNECTION}/admin/signup.php`,
    validateEmail: `${HOST_CONNECTION}/admin/validate_email.php`,
    login: `${HOST_CONNECTION}/admin/login.php`,
    resetPassword: `${HOST_CONNECTION}/admin/reset_password.php`,
    fetchDetails: `${HOST_CONNECTION}/admin/fetch_admin_details.php`,
    updateDetails: `${HOST_CONNECTION}/admin/update_admin_details.php`,
  },

  // ------ USER / DISTRIBUTOR ------
  user: {
    validateMobile: `${HOST_CONNECTION}/user/validate_mobile.php`,
    validateDistributorId: `${HOST_CONNECTION}/user/validate_distributor_id.php`,
    register: `${HOST_CONNECTION}/user/register_user.php`,
    login: `${HOST_CONNECTION}/user/login.php`,
    fetchAll: `${HOST_CONNECTION}/user/fetch_all_distributors.php`,
    delete: `${HOST_CONNECTION}/user/delete_distributor.php`,
  },

  // ------ CATEGORY ------
  category: {
    validateId: `${HOST_CONNECTION}/category/validate_category_id.php`,
    add: `${HOST_CONNECTION}/category/add_category.php`,
    fetch: `${HOST_CONNECTION}/category/fetch_category.php`,
    delete: `${HOST_CONNECTION}/category/delete_category.php`,
    deactivate: `${HOST_CONNECTION}/category/deactivate_category.php`,
    fetchAll: `${HOST_CONNECTION}/category/fetch_all_category.php`,
  },

  // ------ PRODUCT ------
  product: {
    validateCode: `${HOST_CONNECTION}/product/validate_product_code.php`,
    add: `${HOST_CONNECTION}/product/add_product.php`,
    fetch: `${HOST_CONNECTION}/product/fetch_products.php`,
    update: `${HOST_CONNECTION}/product/update_product.php`,
    delete: `${HOST_CONNECTION}/product/delete_product.php`,
    fetchInfo: `${HOST_CONNECTION}/product/fetch_product_info.php`,
    deactivate: `${HOST_CONNECTION}/product/deactivate_products.php`,
    deleteBulk: `${HOST_CONNECTION}/product/delete_products.php`,
    showInactive: `${HOST_CONNECTION}/product/show_inactive_products.php`,
    fetchInactiveByCategory: `${HOST_CONNECTION}/product/fetch_category_wise_inactive_products.php`,
    fetchAll: `${HOST_CONNECTION}/product/fetch_all_products.php`,
    activate: `${HOST_CONNECTION}/product/activate_product.php`,
    fetchAllProductsList: `${HOST_CONNECTION}/product/fetch_all_products_list.php`,
  },

  // ------ ORDER MASTER ------
  orderMaster: {
    place: `${HOST_CONNECTION}/order_master/place_order.php`,
    fetch: `${HOST_CONNECTION}/order_master/fetch_order.php`,
    fetchAll: `${HOST_CONNECTION}/order_master/fetch_all_orders.php`,
    acceptOrReject: `${HOST_CONNECTION}/order_master/accept_or_reject_order.php`,
    dispatch: `${HOST_CONNECTION}/order_master/dispatch_order.php`,
    delivered: `${HOST_CONNECTION}/order_master/order_delivered.php`,
    delete: `${HOST_CONNECTION}/order_master/delete_order.php`,
  },

  // ------ ORDER ITEMS ------
  orderItems: {
    add: `${HOST_CONNECTION}/order_item/add_order_items.php`,
    fetch: `${HOST_CONNECTION}/order_item/fetch_order_items.php`,
    delete: `${HOST_CONNECTION}/order_item/delete_order_items.php`,
  },

  // ------ PURCHASE ORDER MASTER ------
  purchaseOrderMaster: {
    createOrder: `${HOST_CONNECTION}/purchase_order_master/create_purchase_order.php`,
    fetchAllOrders: `${HOST_CONNECTION}/purchase_order_master/fetch_all_purchase_orders.php`,
    fetchOrderByID: `${HOST_CONNECTION}/purchase_order_master/fetch_order_by_id.php`,
  },

  // ------ PURCHASE ORDER ITEM ------
  purchaseOrderItem: {},

  // ------ STATUS ------
  status: {
    add: `${HOST_CONNECTION}/status/add_status.php`,
    fetchImages: `${HOST_CONNECTION}/status/fetch_status_images.php`,
    delete: `${HOST_CONNECTION}/status/delete_status.php`,
  },

  // ------ RETAILERS ------
  retailer: {
    fetchAll: `${HOST_CONNECTION}/retailer/fetch_retailers.php`,
  },

  // ------ RETAILER CATEGORY TABLE ------
  retailerCategory: {
    registerDistributor: `${HOST_CONNECTION}/retailer_category_table/register_new_distributor.php`,
    fetch: `${HOST_CONNECTION}/retailer_category_table/fetch_retailer_category.php`,
    delete: `${HOST_CONNECTION}/retailer_category_table/delete_distributor_category.php`,
  },
};
