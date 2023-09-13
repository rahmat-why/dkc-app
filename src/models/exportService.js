// const xlsx = require('xlsx');
// const path = require('path'); // Anda perlu mengimpor modul 'path' untuk menggunakan path.resolve()
import connection from "../config/db.config.js";

    //FUNCTION TO READ ALL DATA OTOPEDS
export const getDataPotensiSaka = async (year) => {
    try {
        const query = 'CALL ExportDataPotensiSaka(:year)'
        const results = connection.query(query, { 
			replacements: { year },
			type: connection.QueryTypes.RAW 
		})
        console.log(results)
        return results;
    }
    catch (error) {
        throw new Error(`Failed to read data potensi saka: ${error.message}`);
    }
}

export const getDataPotensi = async (year) => {
    try {
        const query = 'CALL ExportDataPotensi(:year)'
        const results = connection.query(query, { 
			replacements: { year },
			type: connection.QueryTypes.RAW 
		})
        console.log(results)
        return results;
    }
    catch (error) {
        throw new Error(`Failed to read data potensi: ${error.message}`);
    }
}

