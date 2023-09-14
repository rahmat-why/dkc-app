import { Router } from 'express'
import * as schoolController from "./../controllers/schoolController.js"
import * as gpReportDkrController from "./../controllers/gpReportDkrController.js"
import * as programDkrController from "./../controllers/programDkrController.js"
import * as dkrController from "./../controllers/dkrController.js"
import * as profileOfficerController from "./../controllers/profileOfficerController.js"
import * as areaCoordinatorController from "./../controllers/areaCoordinatorController.js"
import * as dataPotensiController from "./../controllers/dataPotensiController.js"
import * as loginController from "./../controllers/loginController.js"
import * as sakaController from "./../controllers/sakaController.js"
import connection from '../config/db.config.js'

import loginMiddleware from './../middlewares/loginMiddleware.js'
import * as bannerController from "./../controllers/bannerController.js"
import * as agendaController from "./../controllers/agendaController.js"
import * as achievementController from "./../controllers/achievementController.js"
import * as goalController from "./../controllers/goalController.js"
import * as program_dkcController from "./../controllers/program_dkcController.js"
import * as scout_documentController from "../controllers/scout-documentController.js"
import * as speech_leader_dkcController from "./../controllers/speech_leader_dkcController.js"
import * as productController from "./../controllers/productController.js"
import * as reportSakaController from "./../controllers/reportSakaController.js"
import * as dataPotensiSakaController from "./../controllers/dataPotensiSakaController.js"
import * as exportController from "./../controllers/exportController.js";

import multer from 'multer';
import path from 'path'
import fs from 'fs';

const router = Router()
const filetypes_image = /jpeg|jpg|png|gif/;
const filetypes_document = /pdf/;

// general (without file)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// document (file)
// document (file)
const storageUpload = (directory) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            fs.mkdirSync('./upload/' + directory, { recursive: true });
            cb(null, './upload/' + directory);
        },
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            cb(null, Date.now() + extension);
        },
    });
};

const uploadFile = (directory, filetypes) => {
    var fileSize;
    if(filetypes == filetypes_image) {
        fileSize = 1024 * 1024; // 1 mb in bytes
    }else{
        fileSize = 3072 * 1024; // 3 mb in bytes
    }

    return multer({
        storage: storageUpload(directory),
        limits: {
            fileSize: fileSize, // 800 KB in bytes
        },
        fileFilter: (req, file, cb) => {
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);

            if (extname && mimetype) {
                return cb(null, true);
            } else {
                cb('Error: Extension invalid!');
            }
        },
    });
};


//query
router.get('/api/data-potensi/segment', (req, res) => {
    connection.query('SELECT stages.name, IFNULL(SUM(total_member), 0) as value FROM stages LEFT JOIN data_potensis ON data_potensis.stage_id = stages.stage_id GROUP BY stages.stage_id')
        .then(([results, metadata]) => {
            res.json(results); // Menampilkan hasil query sebagai respons JSON
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

router.get('/api/data-potensi/:school_id/:dkr_id', (req, res) => {
    const { dkr_id, school_id } = req.params
    const current_year = new Date().getFullYear();

    connection.query('SELECT stages.stage_id, stages.name as stage_name, IFNULL(total_member, 0) as total_member, IFNULL(mens_member, 0) as mens_member, IFNULL(womens_member, 0) as womens_member FROM stages LEFT JOIN ( SELECT stage_id, mens_member, womens_member, total_member FROM data_potensis WHERE school_id = "'+school_id+'" AND dkr_id = "'+dkr_id+'" AND year="'+current_year+'" ) dp ON dp.stage_id = stages.stage_id')
        .then(([results, metadata]) => {
            res.json(results); // Menampilkan hasil query sebagai respons JSON
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error!' });
        });
});

router.get('/api/data-potensi-saka/:saka_id', (req, res) => {
    const { saka_id } = req.params
    const current_year = new Date().getFullYear();

    connection.query('SELECT dkrs.dkr_id, dkrs.name, IFNULL(sq.mens_member, 0) as total_mens_member,IFNULL(sq.womens_member, 0) as total_womens_member FROM dkrs LEFT JOIN ( SELECT sq.dkr_id, SUM(sq.mens_member) as mens_member, SUM(sq.womens_member) as womens_member  FROM data_potensi_sakas sq WHERE sq.saka_id = "' + saka_id +'" AND year = "'+current_year+'" GROUP BY sq.dkr_id ) AS sq on sq.dkr_id = dkrs.dkr_id')
        .then(([results, metadata]) => {
            res.json(results); // Menampilkan hasil query sebagai respons JSON
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error!' });
        });
});

// school
router.get('/api/schools/:dkr_id', schoolController.getAll)
router.post('/api/schools/:dkr_id', loginMiddleware, upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 }
]), schoolController.store)
router.put('/api/schools/:school_id', loginMiddleware, upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 }
]), schoolController.update)
router.delete('/api/schools/:school_id', loginMiddleware, schoolController.destroy)

// gp report dkr
router.get('/api/gp-reports/:type/:dkr_id', gpReportDkrController.getAll)

router.post(
    '/api/gp-reports/:dkr_id',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("gp-report", filetypes_document).single('document')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }

            next();
        });
    },
    gpReportDkrController.store
);

router.delete('/api/gp-reports/:report_id', loginMiddleware, gpReportDkrController.destroy)

// program dkr
router.get('/api/program-dkr/:dkr_id', programDkrController.getAll)
router.post('/api/program-dkr/:dkr_id', loginMiddleware, upload.fields([
    { name: 'month', maxCount: 1 },
    { name: 'year', maxCount: 1 },
    { name: 'program_name', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), programDkrController.store)
router.put('/api/program-dkr/:program_id', loginMiddleware, upload.fields([
    { name: 'month', maxCount: 1 },
    { name: 'year', maxCount: 1 },
    { name: 'program_name', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), programDkrController.update)
router.delete('/api/program-dkr/:program_id', loginMiddleware, programDkrController.destroy)

// dkr
router.get('/api/dkr', dkrController.getAll)
router.get('/api/dkr/:dkr_id', dkrController.getByDkr_id)
router.get('/api/dkr/area/:area_id', dkrController.getByArea)
router.post('/api/dkr', loginMiddleware, upload.fields([
    { name: 'name', maxCount: 1 },
    { name: 'area_id', maxCount: 1 },
    { name: 'username', maxCount: 1 },
    { name: 'password', maxCount: 1 },
]), dkrController.store)
router.put('/api/dkr/:dkr_id', loginMiddleware, upload.fields([
    { name: 'name', maxCount: 1 },
    { name: 'area_id', maxCount: 1 },
    { name: 'username', maxCount: 1 },
    { name: 'password', maxCount: 1 },
]), dkrController.update)
router.delete('/api/dkr/:dkr_id', loginMiddleware, dkrController.destroy)

// structure dkr
router.get('/api/structures-dkr/:dkr_id', dkrController.getStructureDkr)

router.post(
    '/api/structures-dkr/:dkr_id',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("structure-dkr", filetypes_image).single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }
            next();
        });
    },
    dkrController.storeStructureDkr
);

// sk dkr
router.get('/api/sk-dkr/:dkr_id', dkrController.getSkDkr)
router.post(
    '/api/sk-dkr/:dkr_id',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("sk-dkr", filetypes_document).single('document')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }

            next(); // Continue to the controller if no errors occurred
        });
    },
    dkrController.storeSkDkr
);

// profile officer
router.get('/api/officers', profileOfficerController.getAll)
router.get('/api/officers/:scope_id',profileOfficerController.getByScope)

router.post(
    '/api/officers',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("profile-officer", filetypes_image).single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }

            next(); // Continue to the controller if no errors occurred
        });
    },
    profileOfficerController.store
);

router.delete('/api/officers/:officer_id', loginMiddleware, profileOfficerController.destroy)

// area coordinator
router.get('/api/area-coordinators', areaCoordinatorController.getAll)

router.post(
    '/api/area-coordinators',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("area-coordinator", filetypes_image).single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }

            next(); // Continue to the controller if no errors occurred
        });
    },
    areaCoordinatorController.store
);

router.delete('/api/area-coordinators/:coordinator_id', loginMiddleware, areaCoordinatorController.destroy)

router.post('/api/data-potensi/:dkr_id', upload.fields([
    { name: 'school_id', maxCount: 1 },
    { name: 'data', maxCount: 1 }
]), dataPotensiController.store)

// login
router.post('/api/login', upload.fields([
    { name: 'username', maxCount: 1 },
    { name: 'password', maxCount: 1 },
]), loginController.login)

router.get('/api/check-login', loginController.checkLogin)


//banner

//get
router.get('/api/banners', bannerController.getAll)

//post
router.post(
    '/api/banners',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("banner", filetypes_image).single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }

            next(); // Continue to the controller if no errors occurred
        });
    },
    bannerController.store
);

//destroy
router.delete('/api/banners/:banner_id', loginMiddleware, bannerController.destroy)


//agenda
router.get('/api/agendas', agendaController.getAll)

router.post('/api/agendas', loginMiddleware, upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'scheduleAt', maxCount: 1 },
]), agendaController.store)

router.put('/api/agendas/:agenda_id', loginMiddleware, upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'scheduleAt', maxCount: 1 },
]), agendaController.update)

router.delete('/api/agendas/:agenda_id', agendaController.destroy)

//achievement
router.get('/api/achievements',achievementController.getAll)

router.post('/api/achievements', loginMiddleware, upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'description', maxCount: 1 },
]), achievementController.store)

router.put('/api/achievements/:achievement_id', loginMiddleware, upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'description', maxCount: 1 },
]), achievementController.update)

router.delete('/api/achievements/:achievement_id', loginMiddleware, achievementController.destroy)

//Goal
router.get('/api/goals/misi',goalController.getAllMisi)
router.get('/api/goals/visi',goalController.getAllVisi)
router.get('/api/goals',goalController.getAll)

router.post('/api/goals', loginMiddleware, upload.fields([
    { name: 'type', maxCount: 1 },
    { name: 'description', maxCount: 1 },
]), goalController.store)

router.put('/api/goals/:goal_id', loginMiddleware, upload.fields([
    { name: 'type', maxCount: 1 },
    { name: 'description', maxCount: 1 },
]), goalController.update)

router.delete('/api/goals/:goal_id', loginMiddleware, goalController.destroy)

//program dkc
router.get('/api/programs-dkc',program_dkcController.getAll)
router.get('/api/programs-dkc/:year',program_dkcController.getByYear)
router.post('/api/programs-dkc', loginMiddleware, upload.fields([
    { name: 'program_name', maxCount: 1 },
    { name: 'year', maxCount: 1 },
]), program_dkcController.store)

router.put('/api/programs-dkc/:program_id', loginMiddleware, upload.fields([
    { name: 'program_name', maxCount: 1 },
    { name: 'year', maxCount: 1 },
]), program_dkcController.update)

router.delete('/api/programs-dkc/:program_id', loginMiddleware, program_dkcController.destroy)

//scout document

//get
router.get('/api/scout-documents', scout_documentController.getAll)

//post
router.post(
    '/api/scout-documents',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("scout-document", filetypes_document).single('document')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }

            next(); // Continue to the controller if no errors occurred
        });
    },
    scout_documentController.store
);

//destroy
router.delete('/api/scout-documents/:document_id', loginMiddleware, scout_documentController.destroy)


//speech_leader_dkc

//get
router.get('/api/speechs', speech_leader_dkcController.getAll)

//post
router.post(
    '/api/speechs',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("spech_leader_dkc", filetypes_image).single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }

            next(); // Continue to the controller if no errors occurred
        });
    },
    speech_leader_dkcController.store
);

//destroy
router.delete('/api/speechs/:speech_id', loginMiddleware, speech_leader_dkcController.destroy)

//Product
//get
router.get('/api/products', productController.getAll)

//post
router.post(
    '/api/products',
    loginMiddleware,
    (req, res, next) => {
        uploadFile("product", filetypes_image).single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ success: false, message: "Ukuran file terlalu besar! (image: 1 mb; document: 3 mb)", data: {} });
            } else if (err) {
                return res.status(400).json({ success: false, message: "File tidak valid!", data: {} });
            }

            next(); // Continue to the controller if no errors occurred
        });
    },
    productController.store
);

//destroy
router.delete('/api/products/:product_id', loginMiddleware, productController.destroy)

//Saka
//get
router.get('/api/saka', sakaController.getAll);

//post saka
router.post('/api/saka', sakaController.store);

//update sk_saka
router.post('/api/saka/upload-sk-saka/:saka_id', uploadFile("sk_saka", filetypes_document).single('document'), sakaController.uploadDocumentSkSaka);

//update sk_saka
router.post('/api/saka/upload-sk-pinsaka/:saka_id', uploadFile("sk_pinsaka", filetypes_document).single('document'), sakaController.uploadDocumentSkPinsaka);

//destroy
router.delete('/api/saka/:saka_id', sakaController.destroy);

//Report Saka
//get
router.get('/api/report-saka', reportSakaController.getAll);

//post Report Saka
router.post('/api/report-saka', uploadFile("report-saka", filetypes_document).single('document'), reportSakaController.store);

//destroy
router.delete('/api/report-saka/:report_id', reportSakaController.destroy);


//Data Potensi Saka
//post
router.post('/api/data-potensi-saka', dataPotensiSakaController.store)

//export to excel data potensi saka
router.get("/api/export-data-potensi-saka/:year", exportController.getDataExportDataPotensiSaka);

//export to excel data potensi
router.get("/api/export-data-potensi/:year", exportController.getDataExportDataPotensi)


export default router
