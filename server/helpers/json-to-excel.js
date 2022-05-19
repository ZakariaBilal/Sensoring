const XLSX = require('xlsx');

module.exports = (data, sheetName) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    const buffer = XLSX.write(wb, {
        type: 'buffer',
        bookType: "xlsx"
    });
    return buffer;
}