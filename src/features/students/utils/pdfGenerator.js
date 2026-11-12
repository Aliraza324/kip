/**
 * Lightweight in-browser PDF Blob generator
 * Generates valid PDF 1.4 documents without heavy external dependencies.
 */

export const generateMaterialPdfBlob = (material) => {
  const sanitize = (str) =>
    (str || "")
      .replace(/[\\()]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const title = sanitize(material.title || "Study Material");
  const subject = sanitize(material.subject || "General");
  const author = sanitize(material.author || "KIPClassin Faculty");
  const date = sanitize(material.uploadedDate || "2026");
  const desc = sanitize(material.description || "");

  let stream = `BT
/F1 22 Tf
50 720 Td
(${title}) Tj
/F2 12 Tf
0 -26 Td
(Subject: ${subject}  |  Instructor: ${author}  |  Date: ${date}) Tj
/F2 10 Tf
0 -20 Td
(KIPClassin Official Academic Learning Materials - Authorized Copy) Tj
0 -30 Td
(${desc}) Tj
0 -36 Td
/F1 14 Tf
(Study Notes & Outline:) Tj
/F2 11 Tf
`;

  (material.previewContent || []).forEach((line) => {
    const cleanLine = sanitize(line);
    stream += `0 -22 Td\n(• ${cleanLine}) Tj\n`;
  });

  stream += `ET`;

  const streamLength = stream.length;

  const pdfSource = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${stream}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 7
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000244 00000 n 
0000000300 00000 n 
0000000380 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
450
%%EOF`;

  return new Blob([pdfSource], { type: "application/pdf" });
};

export const openMaterialInBrowser = (material) => {
  const blob = generateMaterialPdfBlob(material);
  const blobUrl = URL.createObjectURL(blob);
  const newTab = window.open(blobUrl, "_blank");

  if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
    // Popup was blocked by browser
    return false;
  }
  return true;
};

export const downloadMaterialFile = (material) => {
  const blob = generateMaterialPdfBlob(material);
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = `${material.title.replace(/\s+/g, "_")}.${material.type === "video" ? "mp4" : "pdf"}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
};

