const Connection = require("../database/Connection");

module.exports = {
  getInventory: async () => {
    try {
      const query = `select 
        tbl_inventory.* ,
        DATE_FORMAT(deliveryDate,'%Y-%m-%d') as deliveryDate, 
        DATE_FORMAT(expirationDate,'%Y-%m-%d') as expirationDate, 
        tbl_supplier.name ,
        tbl_supplier.contactNumber ,
        tbl_supplier.item 
         from tbl_inventory 
         Inner Join tbl_supplier 
         ON tbl_inventory.supplierId = tbl_supplier.supplierId `;

      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },
  getInventoryItems: async () => {
    try {
      const query = `select 
         DISTINCT list ,
         inventoryId  ,
         quantity 
         from tbl_inventory `;

      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },
  updateInventoryItems: async (payload) => {
    try {
      const query = `
      UPDATE tbl_inventory 
      SET  quantity=quantity - '${payload.quantity}' 
      WHERE inventoryId=${payload.inventoryId} `;

      await Connection(query);

      return true;
    } catch (err) {
      return false;
    }
  },
  getAllSupplier: async () => {
    try {
      const query = `
      SELECT * FROM tbl_supplier `;

      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },
};
