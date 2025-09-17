// export const domain = "http://192.168.18.214:2000";
export const frontend = "https://sonasutra.in";
export const domain = "https://backend.sonasutra.in";
export const rupees = "₹";

export const endpoint = {

  email_insider: `${domain}/api/v1/insert-external-leads`,
  login: `${domain}/api/v1/login-user`,
  //admin
  login_super_user: `${domain}/api/v1/login-super-user`,
  //dashboard 
  get_dashboard_Count: `${domain}/api/v1/get-dashboard-details`,
  //store
  create_store: `${domain}/api/v1/create-store`,
  get_store: `${domain}/api/v1/get-store`,
  update_store: `${domain}/api/v1/update-store`,
  delete_store: `${domain}/api/v1/delete-store`,
  //role
  create_role: `${domain}/api/v1/create-role`,
  get_role: `${domain}/api/v1/get-role`,
  get_role_by_id: `${domain}/api/v1/get-role-by-id`,
  update_role: `${domain}/api/v1/update-role`,
  delete_role: `${domain}/api/v1/delete-role`,
  // user
  create_user: `${domain}/api/v1/create-user`,
  get_user: `${domain}/api/v1/get-user`,
  get_user_by_id: `${domain}/api/v1/get-user-by-id`,
  update_user: `${domain}/api/v1/update-user-by-id`,
  delete_user: `${domain}/api/v1/delete-user`,
  //permission
  get_role_permission: `${domain}/api/v1/get-role-permission`,
  assign_role_permission: `${domain}/api/v1/assign-permission-to-role`,
  get_type_role_permission: `${domain}/api/v1/get-type-of-permission`,
  remove_permission: `${domain}/api/v1/remove-permission-from-role`,

  //category user
  category_product: `${domain}/api/v1/create-product-category`,
  get_product_categroy: `${domain}/api/v1/get-product-category`,
  get_product_categroy_by_id: `${domain}/api/v1/get-product-category-by-id`,
  upddate_product: `${domain}/api/v1/update-product-category`,
  delete_product_category: `${domain}/api/v1/delete-product-category`,

  // subcategory
  sub_category_product: `${domain}/api/v1/create-product-subcategory`,
  get_product_subcategory: `${domain}/api/v1/get-product-subcategory`,
  get_product_subcategory_by_id: `${domain}/api/v1/get-product-subcategory-by-id`,
  update_product_subcategory: `${domain}/api/v1/update-product-subcategory`,
  delete_product_subcategory: `${domain}/api/v1/delete-product-subcategory`,

  //product
  create_product: `${domain}/api/v1/create-product`,
  get_product_all: `${domain}/api/v1/get-all-products`,
  get_product_by_id: `${domain}/api/v1/get-product-by-id`,
  update_product: `${domain}/api/v1/update-product`,
  delete_product: `${domain}/api/v1/delete-product`,

  //productimage
  upload_product_image: `${domain}/api/v1/upload-product-image`,
  get_product_image: `${domain}/api/v1/get-product-image`,
  update_product_image: `${domain}/api/v1/update-product-image`,
  delete_product_image: `${domain}/api/v1/delete-product-image`,

  //variant
  create_product_variant: `${domain}/api/v1/create-product-varients-with-attributes`,
  get_product_variant: `${domain}/api/v1/get-product-varients`,
  update_product_variant: `${domain}/api/v1/update-product-varients`,
  delete_product_variant: `${domain}/api/v1/delete-product-varients`,

  //unit
  create_product_unitt: `${domain}/api/v1/create-units`,
  get_product_unitt: `${domain}/api/v1/get-all-units`,
  update_product_unitt: `${domain}/api/v1/update-units`,
  delete_product_unitt: `${domain}/api/v1/delete-units`,

  //bnanner
  create_banner: `${domain}/api/v1/create-banner`,
  get_banner: `${domain}/api/v1/get-banner`,
  update_banner: `${domain}/api/v1/update-banner`,
  delete_banner: `${domain}/api/v1/delete-banner`,
  status_banner: `${domain}/api/v1/change-banner-status`,

  //collection
  create_collection: `${domain}/api/v1/create-collections`,
  get_collection: `${domain}/api/v1/get-collections`,
  update_collection: `${domain}/api/v1/update-collections`,
  delete_collection: `${domain}/api/v1/delete-collections`,

  //bnanner
  create_video: `${domain}/api/v1/create-videos`,
  get_video: `${domain}/api/v1/get-videos`,
  update_video: `${domain}/api/v1/update-videos`,
  delete_video: `${domain}/api/v1/delete-videos`,


  // address shipping
  add_shipping_Address: `${domain}/api/v1/add-shipping-address`,
  get_shipping_Address: `${domain}/api/v1/get-shipping-address`,
  set_shipping_Address: `${domain}/api/v1/set-shipping-address-as-default`,

  //payment order 
  create_order_payment: `${domain}/api/v1/creata-order-payment`,


  //rankmlm
   get_rank_deatils: `${domain}/api/v1/get-rank-details-by-admin`,
  update_rank_deatils: `${domain}/api/v1/update-rank-details-by-admin`,
  get_distributor_details: `${domain}/api/v1/get-distributer-details`,
  get_rank_achivers_details: `${domain}/api/v1/get-rank-achievers-details`,

  // attribute
  create_product_attributes: `${domain}/api/v1/create-product-attributes`,
  get_product_attributes: `${domain}/api/v1/get-product-attributes`,
  update_product_attributes: `${domain}/api/v1/update-product-attributes`,
  delete_product_attributes: `${domain}/api/v1/delete-product-attributes`,

  // product attribute values
  create_update_product_attributes: `${domain}/api/v1/add-update-product-varients`,
  get_product_attributes_value: `${domain}/api/v1/get-product-attribute-value`,
  delete_product_attributes_value: `${domain}/api/v1/delete-attribute-value`,

  // update_product_attributes_value: `${domain}/api/v1/update-attribute-value`,

  //master materuial
  create_master_material: `${domain}/api/v1/create-master-materials`,
  get_master_material: `${domain}/api/v1/get-master-materials`,
  update_master_material: `${domain}/api/v1/update-master-materials`,
  delete_master_material: `${domain}/api/v1/delete-master-materials`,

  //backup material 
  get_master_material_backup: `${domain}/api/v1/get-master-material-backup`,

  //purity
  create_material_purity: `${domain}/api/v1/create-materials-purity`,
  update_material_purity: `${domain}/api/v1/update-materials-purity`,
  get_material_purity: `${domain}/api/v1/get-materials-purity`,


  //insider email
  get_external_leads: `${domain}/api/v1/get-external-leads`,

  // egold order
  get_order_egold: `${domain}/api/v1/get-egold-order-details`,
  get_order_egold_detail_by: `${domain}/api/v1/get-egold-order-details-by-order-id`,

  //get_demo call
  req_demo_call: `${domain}/api/v1/u-req-demo-call`,
  get_demo_call: `${domain}/api/v1/get-demo-calls`,
  update_demo_call: `${domain}/api/v1/update-demo-calls`,

  //material
  create_material: `${domain}/api/v1/create-materials`,
  get_material: `${domain}/api/v1/get-materials`,
  update_material: `${domain}/api/v1/update-materials`,
  delete_material: `${domain}/api/v1/delete-materials`,

  //variant material
  create_variant_material: `${domain}/api/v1/create-variant-material`,
  get_variant_material: `${domain}/api/v1/get-variant-material`,
  update_variant_material: `${domain}/api/v1/update-variant-material`,
  delete_variant_material: `${domain}/api/v1/delete-variant-material`,

  // inventory
  create_product_inventory: `${domain}/api/v1/create-product-inventory`,
  get_product_inventory: `${domain}/api/v1/get-product-inventory`,
  update_product_inventory: `${domain}/api/v1/update-product-inventory`,

  // discount
  create_discount: `${domain}/api/v1/create-discount`,
  get_discount: `${domain}/api/v1/get-discount`,
  update_discount: `${domain}/api/v1/update-discount`,
  delete_discount: `${domain}/api/v1/delete-discount`,

  //product discount
  create_product_discount: `${domain}/api/v1/create-product-discount`,
  get_product_discount: `${domain}/api/v1/get-product-discount`,
  update_product_discount: `${domain}/api/v1/update-product-discount`,
  delete_product_discount: `${domain}/api/v1/delete-product-discount`,

  //tax
  create_tax: `${domain}/api/v1/create-tax`,
  get_tax: `${domain}/api/v1/get-tax`,
  update_tax: `${domain}/api/v1/update-tax`,
  delete_tax: `${domain}/api/v1/delete-tax`,

  // product_tax
  create_product_tax: `${domain}/api/v1/create-product-tax`,
  get_product_tax: `${domain}/api/v1/get-product-tax`,
  update_product_tax: `${domain}/api/v1/update-product-tax`,
  delete_product_tax: `${domain}/api/v1/delete-product-tax`,

  //
  get_custom_order: `${domain}/api/v1/get-custom-orders`,
  create_custom_order: `${domain}/api/v1/u-create-custom-order`,
  get_order_status: `${domain}/api/v1/update-order-status`,

  //coupon 
  create_coupon: `${domain}/api/v1/create-coupon`,
  get_coupon: `${domain}/api/v1/get-coupon`,
  update_coupon: `${domain}/api/v1/update-coupon`,
  update_coupon_status: `${domain}/api/v1/update-coupon-status`,

  //range 
  create_coupon_range: `${domain}/api/v1/create-coupon-range`,
  get_coupon_range: `${domain}/api/v1/get-coupon-range`,
  update_coupon_range: `${domain}/api/v1/update-coupon-range`,

  //payment
  create_payment_method: `${domain}/api/v1/create-payment-method`,
  get_payment_method: `${domain}/api/v1/get-payment-method`,

  //customer
  create_customer: `${domain}/api/v1/create-customer`,
  get_login_customer: `${domain}/api/v1/login-customer`,
  get_all_customer: `${domain}/api/v1/get-all-customer`,
  get_customer_profile: `${domain}/api/v1/get-customer-profile`,
  update_customer_profile: `${domain}/api/v1/update-customer-profile`,

  // user 

  //auth
  login_customer: `${domain}/api/v1/login-customer`,
  //prduct 
  get_categroy_user: `${domain}/api/v1/u-get-category`,
  get_sub_categroy_user: `${domain}/api/v1/u-get-sub-category`,
  get_product_user: `${domain}/api/v1/u-get-product`,
  u_get_variant: `${domain}/api/v1/u-get-varients`,


  u_filte_by: `${domain}/api/v1/u-filter-by`,
  filter_u_filte_by: `${domain}/api/v1/u-filtered-data`,


  //wishlist 
  create_wishlist: `${domain}/api/v1/create-wish-list-items`,
  get_wishlist: `${domain}/api/v1/get-wish-list-items`,
  remove_wishlist: `${domain}/api/v1/remove-wish-list-items`,

  //cart 
  create_cart: `${domain}/api/v1/create-cart-items`,
  get_cart: `${domain}/api/v1/get-cart-items`,
  remove_cart: `${domain}/api/v1/remove-from-cart-items`,


  change_password: `${domain}/api/v1/change-customer-password`,
  disable_customer_account: `${domain}/api/v1/dissable-customer-account`,

  create_order: `${domain}/api/v1/create-order`,
  get_order: `${domain}/api/v1/get-order-details`,
  get_order_detail_by: `${domain}/api/v1/get-order-details-by-order-id`,


  //similar_items
  similar_items: `${domain}/api/v1/u-get-similar-items`,
  latest_items: `${domain}/api/v1/u-get-latest-items`,
  recent_items: `${domain}/api/v1/u-get-recent-viewed-items`,
  related_sub_items: `${domain}/api/v1/u-get-related-subcategories`,
  get_discount_high: `${domain}/api/v1/u-get-highlt-discount-product`,
  get_most_frequent: `${domain}/api/v1/u-get-most-frequent-search-items`,
  get_categroy_filtered_item: `${domain}/api/v1/u-get-home-filtered-items`,
  get_search_product: `${domain}/api/v1/u-get-search-product`,

  //user coupon
  get_coupon_varient: `${domain}/api/v1/u-get-coupon-on-varient`,
    review_customer: `${domain}/api/v1/create-product-review`,
  checkd_order_placed: `${domain}/api/v1/check-order-placed`,
  
  get_customer_review: `${domain}/api/v1/get-product-review`,
  get_customer_single_review: `${domain}/api/v1/get-single-product-review`,
  get_continue_browsing: `${domain}/api/v1/u-get-continue-browing-items`,

  //mlm api 
  get_distributor_name: `${domain}/api/v1/get-distributor-name`,
  distributor_registration: `${domain}/api/v1/distributor-registration`,
  get_profile_distributor: `${domain}/api/v1/get-distributor-profile`,
  get_distributor_dashboard: `${domain}/api/v1/get-distributor-dashboard`,
  get_master_material_price: `${domain}/api/v1/get-master-material-pice`,
  create_egold_price: `${domain}/api/v1/create-egold-order`,
  create_egold_price_sell: `${domain}/api/v1/create-egold-sell-order`,

  
  

};
