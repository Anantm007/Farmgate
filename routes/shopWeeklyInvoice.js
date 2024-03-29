const fs = require("fs");
const PDFDocument = require("pdfkit");
var path = require('path'); 

function shopWeeklyInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc, invoice) {
  doc
    .image(path.join(__dirname,'logo.png'), 50, 25, { width: 100 })
    .fillColor("#444444")
    .fontSize(20)
    .text(invoice.shipping.name, 110, 57)
    .fontSize(10)
    .text(invoice.shipping.name, 200, 50, { align: "right" })
    .text(invoice.shipping.address, 200, 65, { align: "right" })
    .text(`ABN: ${invoice.shipping.ABN}`, 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Total:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.total),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text('Farmgate Market', 300, customerInformationTop)
    .font("Helvetica")
    .text('Level 1, 49 George Street Norwood', 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Order Id",
    "Total Items",
    "Order Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.orders.length; i++) {
    const order = invoice.orders[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      order._id,
      order.items.length,
      formatCurrency(order.subtotal)
    );

    generateHr(doc, position + 20);
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

  const duePosition = subtotalPosition + 25;
  doc.font("Helvetica");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    `Farmgate Fees (${invoice.invoiceChargePercentage}%)`,
    "",
    formatCurrency(invoice.FarmgateFees)
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
      "For any queries please contact us through the portal at www.farmgate-market.com. Thank you!",
      50,
      780,
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
    .text(description, 250, y)
    .text(unitCost, 410, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "$" + (cents).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

module.exports = {
  shopWeeklyInvoice
};
