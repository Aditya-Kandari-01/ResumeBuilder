const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const extractResumeText = async (file) => {
  if (!file) {
    throw new Error("Resume file is required");
  }

  const extension = file.originalname
    .split(".")
    .pop()
    .toLowerCase();

  if (extension === "pdf") {
    const pdf = await new pdfParse.PDFParse(
      Uint8Array.from(file.buffer)
    );

    const result = await pdf.getText();

    return result.text;
  }

  if (extension === "docx") {
    const result = await mammoth.extractRawText({
      buffer: file.buffer
    });

    return result.value;
  }

  throw new Error("Unsupported file format. Upload PDF or DOCX.");
};

module.exports = { extractResumeText };