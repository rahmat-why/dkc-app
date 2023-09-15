import * as exportService from "../models/exportService.js"
import xlsx from "xlsx";
import path from "path";

function formatDateTime(date) {
   const year = date.getFullYear().toString();
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const day = date.getDate().toString().padStart(2, '0');
   const hours = date.getHours().toString().padStart(2, '0');
   const minutes = date.getMinutes().toString().padStart(2, '0');
   const seconds = date.getSeconds().toString().padStart(2, '0');
   const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
 
   return `${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`;
}

export async function getDataExportDataPotensiSaka(req, res) {
   try {
      const { year } = req.params;
      //CALL FUNCTION READ ALL DATA
      const datapotensisaka = await exportService.getDataPotensiSaka(year)
      // Mengambil waktu saat ini
      const currentTime = new Date();
      // Memformat waktu saat ini menjadi string
      const formattedDateTime = formatDateTime(currentTime);
      // Membuat nama file dengan format waktu saat ini
      const fileName = `${formattedDateTime}.xlsx`;

      // Mengambil kunci (key) dari objek pertama dalam array
      const workSheetColumnNames = Object.keys(datapotensisaka[0]);
      const workSheetName = "Data Potensi Saka"
      // Generate the Excel file
      const excelFilePath = path.resolve(`./upload/export-data-potensi-saka/${fileName}`);

      exportDataPotensiSakatoExcel(datapotensisaka, workSheetColumnNames, workSheetName, excelFilePath)
      
      // Set HTTP headers for the response
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      // Send the file as a response
      res.sendFile(excelFilePath);
      
   }  catch (error) {
      //RESULT IF READ ALL DATA FAILED
      console.error(error.message);
      return res.status(500).json({ success: false, message: error.message, data: null });
   }
}

export async function getDataExportDataPotensi(req, res) {
   try {
      const { year } = req.params;
      //CALL FUNCTION READ ALL DATA FROM OtopedService.js
      const datapotensi = await exportService.getDataPotensi(year)
      // Mengambil waktu saat ini
      const currentTime = new Date();
      // Memformat waktu saat ini menjadi string
      const formattedDateTime = formatDateTime(currentTime);
      // Membuat nama file dengan format waktu saat ini
      const fileName = `${formattedDateTime}.xlsx`;

      // Mengambil kunci (key) dari objek pertama dalam array
      const workSheetColumnNames = Object.keys(datapotensi[0]);
      const workSheetName = "Data Potensi"
      // Generate the Excel file
      const excelFilePath = path.resolve(`./upload/export-data-potensi/${fileName}`);

      exportDataPotensitoExcel(datapotensi, workSheetColumnNames, workSheetName, excelFilePath)
      
      // Set HTTP headers respon
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      // Send the file as a response
      res.sendFile(excelFilePath);
   }  catch (error) {
      //RESULT IF READ ALL DATA FAILED
      console.error(error.message);
      return res.status(500).json({ success: false, message: error.message, data: null });
   }
}

const exportExcel = (data, workSheetColumnNames, workSheetNames, filePath) => {
   const workBook = xlsx.utils.book_new();
   const workSheetData = [
       workSheetColumnNames,
       ...data
   ];
   const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
   xlsx.utils.book_append_sheet(workBook, workSheet, workSheetNames);
   xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportDataPotensitoExcel = (datapotensi, workSheetColumnNames, workSheetName, filePath) => {
   const data = datapotensi.map((dataPotensiItem) => {
     return workSheetColumnNames.map((columnName) => dataPotensiItem[columnName]);
   });
   console.log(data);
 
   exportExcel(data, workSheetColumnNames, workSheetName, filePath);
 };

const exportDataPotensiSakatoExcel = (datapotensisaka, workSheetColumnNames, workSheetName, filePath) => {
   const data = datapotensisaka.map((dataPotensiSakaItem) => {
     return workSheetColumnNames.map((columnName) => dataPotensiSakaItem[columnName]);
   });
 
   exportExcel(data, workSheetColumnNames, workSheetName, filePath);
};


const exportDataPotensitoExcelOld = (datapotensi, workSheetColumnNames, workSheetName, filePath) => {
   const data = datapotensi.map(data => {
       return [data.school_name, data['Calon Penegak_mens_member'], data['Calon Penegak_womens_member'], data['Penegak Bantara_mens_member'], data['Penegak Bantara_womens_member'], data['Penegak Laksana_mens_member'], data['Penegak Laksana_womens_member'], data['Penegak Garuda_mens_member'], data['Penegak Garuda_womens_member'], data['Calon Pandega_mens_member'], data['Calon Pandega_womens_member'], data['Pandega_mens_member'], data['Pandega_womens_member'], data['Pandega Garuda_mens_member'], data['Pandega Garuda_womens_member']];
   });

   exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

const exportDataPotensiSakatoExcelOld = (datapotensisaka, workSheetColumnNames, workSheetName, filePath) => {
   const data = datapotensisaka.map(dataPotensi => {
       return [dataPotensi.dkr_name, dataPotensi['Saka kesekian_mens_member'], dataPotensi['Saka kesekian_womens_member'], dataPotensi['Saka kesekian 2_mens_member'], dataPotensi['Saka kesekian 2_womens_member'], dataPotensi['Name2x_mens_member'], dataPotensi['Name2x_womens_member'], dataPotensi['Namexx_mens_member'], dataPotensi['Namexx_womens_member']];
   });

   exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}
