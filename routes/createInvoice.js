const fs = require("fs");
const PDFDocument = require("pdfkit");
var path = require("path");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image(path.join(__dirname, "logo.png"), 400, 35, {
      width: 150,
    })
    .fillColor("#444444")
    .fontSize(10)
    .text("Farmgate Ag", 50, 35, { align: "left" })
    .text("Level 1, 49 George Street Norwood, S.A.", 50, 50, { align: "left" })
    .text("ABN: 91688399669", 50, 65, { align: "left" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160)
    .font("Helvetica-Bold")
    .fontSize(10)
    .text("AUTHORISATION TO LEAVE - PRIORITY FOOD", 300, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Order Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Total:", 50, customerInformationTop + 30)
    .text(formatCurrency(invoice.total), 150, customerInformationTop + 30)

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.suburb + ", " + invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);

  {
    invoice.instructions.length > 0 &&
      doc
        .fontSize(11)
        .font("Helvetica-Bold")
        .text("Order Instructions: ", 140, customerInformationTop + 75)
        .text(invoice.instructions, 270, customerInformationTop + 75);
  }
}

function generateInvoiceTable(doc, invoice) {
  let i;
  let invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Cost",
    "Quantity",
    "Item Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  let flag = 0,
    position,
    j = 0;
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    position = invoiceTableTop + (j + 1) * 30;
    j = j + 1;
    generateTableRow(
      doc,
      position,
      item.itemName,
      item.description.substring(0, 20),
      formatCurrency(item.price),
      item.quantity + " x " + item.variant,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
    if (position >= 660 && flag === 0) {
      doc.addPage();
      invoiceTableTop = 0;
      flag = 1;
      j = 0;
    }
  }

  if (i > 11) {
    i = 0;
    invoiceTableTop = position;
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Shipping",
    "",
    formatCurrency(invoice.shippingAmount)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "GST @ 0%",
    "",
    formatCurrency(invoice.tax)
  );
  doc.font("Helvetica");

  const xxx = duePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    xxx,
    "",
    "",
    "Grand Total",
    "",
    formatCurrency(invoice.total)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "If there may be security issues with us being granted access to your property for parcel delivery please contact us through the portal at www.farmgate-market.com. Thank you!",
      50,
      750,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 200, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "(AUD) $" + cents.toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

module.exports = {
  createInvoice,
};
