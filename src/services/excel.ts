import * as XLSX from 'xlsx-js-style';

export const exportExcel = (data: any[], filename: string) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Set the workbook's view to RTL for full compatibility.
  if (!workbook.Workbook) {
    workbook.Workbook = {};
  }
  if (!workbook.Workbook.Views) {
    workbook.Workbook.Views = [];
  }
  workbook.Workbook.Views[0] = {
    ...workbook.Workbook.Views[0],
    RTL: true,
  };

  // Set the worksheet's RTL property.
  worksheet['!rtl'] = true;

  // Calculate and set column widths based on content.
  const columnWidths = Object.keys(data[0]).map((key, index) => {
    const headerWidth = key.length;
    const maxDataWidth = Math.max(
      ...data.map((row) => (row[key] ? String(row[key]).length : 0))
    );
    return { wch: Math.max(headerWidth, maxDataWidth) + 2 }; // Add a small buffer
  });
  worksheet['!cols'] = columnWidths;

  if (worksheet['!ref']) {
    // Iterate through all cells to apply centering and RTL.
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { c: C, r: R };
        const cellRef = XLSX.utils.encode_cell(cellAddress);

        if (worksheet[cellRef]) {
          // Use the 's' property to apply style.
          worksheet[cellRef].s = {
            alignment: {
              horizontal: 'center',
              vertical: 'center',
              readingOrder: 2, // Set readingOrder to 2 for RTL
            },
          };
        }
      }
    }
  }

  // Append the styled worksheet to the workbook and write the file.
  XLSX.utils.book_append_sheet(workbook, worksheet, filename);
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};