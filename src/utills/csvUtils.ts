import type { PurchaseOrderItem } from "../models/PurchaseOrderItem";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import type { PurchaseOrderMaster } from "../models/PurchaseOrderMaster";
import { formatDateTime } from "./DateFormatter";

export async function exportToExcel(
  order_master: PurchaseOrderMaster,
  order_items: PurchaseOrderItem[],
  filename: string
) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Sheet 1");

  const categories = Array.from(
    new Set(order_items.map((item) => item.product?.categoryName))
  ).filter(Boolean) as string[];

  const header = ["Product (Code)", ...categories];
  const totalColumns = header.length;

  // --- Helper function to add metadata row ---
  const addMetadataRow = (
    label: string,
    value: string | number | undefined
  ) => {
    if (value === undefined || value === null) return;

    const row = sheet.addRow([label, value]);
    if (totalColumns > 2) {
      sheet.mergeCells(row.number, 2, row.number, totalColumns);
    }

    row.getCell(1).font = { bold: true };
    row.getCell(1).alignment = { horizontal: "left", vertical: "middle" };
    row.getCell(2).alignment = { horizontal: "left", vertical: "middle" };

    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    });
  };

  // --- Add order metadata before items ---
  addMetadataRow("Order ID", order_master.order_id);
  addMetadataRow("Distributor", order_master.distributor?.user_name);
  addMetadataRow("Total Qty", `${order_master.total_qty} item(s)`);
  addMetadataRow("Remarks", order_master.remarks);
  addMetadataRow("Date", formatDateTime(order_master.dateTimestamp));

  // --- Add blank row ---
  sheet.addRow([]);

  // --- Items table header ---
  const headerRow = sheet.addRow(header);

  headerRow.font = { bold: true };
  headerRow.alignment = { horizontal: "center", vertical: "middle" };

  const productMap: Record<string, Record<string, number>> = {};
  order_items.forEach((item) => {
    if (!item.product) return;

    const productKey = `${item.product.productName} (${item.product.productCode})`;
    const category = item.product.categoryName;

    if (!productMap[productKey]) productMap[productKey] = {};
    if (!productMap[productKey][category]) productMap[productKey][category] = 0;

    productMap[productKey][category] += item.qty;
  });

  Object.entries(productMap).forEach(([productKey, catMap]) => {
    const row: (string | number)[] = [productKey];
    categories.forEach((cat) => {
      const val = catMap[cat] ?? 0;
      row.push(val === 0 ? "-" : val);
    });
    const newRow = sheet.addRow(row);
    newRow.alignment = { horizontal: "center", vertical: "middle" };
  });

  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
        left: { style: "thin" },
      };
    });
  });

  sheet.columns?.forEach((col) => {
    if (!col) return; // ✅ safeguard
    let maxLength = 10;
    col.eachCell?.({ includeEmpty: true }, (cell) => {
      const len = cell.value ? cell.value.toString().length : 0;
      if (len > maxLength) maxLength = len;
    });
    col.width = maxLength;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), filename);
}
