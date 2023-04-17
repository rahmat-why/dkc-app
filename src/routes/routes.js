import { Router } from 'express'
import * as schoolController from "./../controllers/schoolController.js"
import * as gpReportDkrController from "./../controllers/gpReportDkrController.js"
import * as programDkrController from "./../controllers/programDkrController.js"
import * as structureDkrController from "./../controllers/structureDkrController.js"
import * as dkrController from "./../controllers/dkrController.js"
import * as profileOfficerController from "./../controllers/profileOfficerController.js"
import * as areaCoordinatorController from "./../controllers/areaCoordinatorController.js"
import * as skDkrController from "./../controllers/skDkrController.js"
import * as dataPotensiController from "./../controllers/dataPotensiController.js"
import * as loginController from "./../controllers/loginController.js"

import loginMiddleware from './../middlewares/loginMiddleware.js'
import * as bannerController from "./../controllers/bannerController.js"
import * as agendaController from "./../controllers/agendaController.js"
import * as achievementController from "./../controllers/achievementController.js"
import * as goalController from "./../controllers/goalController.js"
import * as program_dkcController from "./../controllers/program_dkcController.js"
import * as scout_documentController from "../controllers/scout-documentController.js"
import * as speech_leader_dkcController from "./../controllers/speech_leader_dkcController.js"
import * as productController from "./../controllers/productController.js"

import multer from 'multer';
import path from 'path'
import fs from 'fs';

// general (without file)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// document (file)
const storageUpload = (directory) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            fs.mkdirSync("./upload/"+directory, { recursive: true });
            cb(null, "./upload/"+directory);
        },
        filename: function (req, file, cb) {
            const extension = path.extname(file.originalname);
            cb(null, Date.now()+extension)
        }
    })
}
const uploadFile = (directory, filetypes) => {
    return multer({ 
        storage: storageUpload(directory),
        fileFilter: (req, file, cb) => {
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = filetypes.test(file.mimetype);
        
            if (extname && mimetype) {
                return cb(null, true);
            } else {
                cb('Error: Extension invalid!');
            }
        } 
    });
} 

const router = Router()
const filetypes_image = /jpeg|jpg|png|gif/;
const filetypes_document = /pdf|docx/;

// school
router.get('/api/schools/:dkr_id', schoolController.getAll)
router.post('/api/schools', loginMiddleware, upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), schoolController.store)
router.put('/api/schools/:school_id', loginMiddleware, upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), schoolController.update)
router.delete('/api/schools/:school_id', loginMiddleware, schoolController.destroy)

// gp report dkr
router.get('/api/gp-reports/:type/:dkr_id', gpReportDkrController.getAll)
router.post('/api/gp-reports', uploadFile("gp-report", filetypes_document).single('document'), gpReportDkrController.store)
router.delete('/api/gp-reports/:report_id', gpReportDkrController.destroy)

// program dkr
router.get('/api/program-dkr/:dkr_id', programDkrController.getAll)
router.post('/api/program-dkr', upload.fields([
    { name: 'month', maxCount: 1 },
    { name: 'year', maxCount: 1 },
    { name: 'program_name', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), loginMiddleware, programDkrController.store)
router.put('/api/program-dkr/:program_id', upload.fields([
    { name: 'month', maxCount: 1 },
    { name: 'year', maxCount: 1 },
    { name: 'program_name', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), programDkrController.update)
router.delete('/api/program-dkr/:program_id', loginMiddleware, programDkrController.destroy)

// structure dkr
router.get('/api/structures-dkr/:dkr_id', structureDkrController.getAll)
router.post('/api/structures-dkr', uploadFile("structure-dkr", filetypes_image).single('image'), structureDkrController.store)
router.delete('/api/structures-dkr/:structure_id', structureDkrController.destroy)

// dkr
router.get('/api/dkr', dkrController.getAll)
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

// profile officer
router.get('/api/officers', profileOfficerController.getAll)
router.post('/api/officers', loginMiddleware, uploadFile("profile-officer", filetypes_image).single('image'), profileOfficerController.store)
router.delete('/api/officers/:officer_id', loginMiddleware, profileOfficerController.destroy)

// area coordinator
router.get('/api/area-coordinators', areaCoordinatorController.getAll)
router.post('/api/area-coordinators', loginMiddleware, uploadFile("profile-officer", filetypes_image).single('image'), areaCoordinatorController.store)
router.delete('/api/area-coordinators/:coordinator_id', loginMiddleware, areaCoordinatorController.destroy)

// sk dkr
router.get('/api/sk-dkr/:dkr_id', skDkrController.getAll)
router.post('/api/sk-dkr', loginMiddleware, uploadFile("sk-dkr", filetypes_document).single('document'), skDkrController.store)
router.delete('/api/sk-dkr/:sk_id', loginMiddleware, skDkrController.destroy)

// data potensi
router.get('/api/data-potensi/:school_id/:dkr_id', dataPotensiController.getAll)

// router.post('/api/data-potensi', upload.fields([
//     { name: 'month', maxCount: 1 },
//     { name: 'year', maxCount: 1 },
//     { name: 'program_name', maxCount: 1 },
//     { name: 'dkr_id', maxCount: 1 },
// ]), dataPotensiController.store)

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
router.post('/api/banners', uploadFile("banner").single('image'), bannerController.store)

//destroy
router.delete('/api/banners/:banner_id', bannerController.destroy)


//agenda
router.get('/api/agendas', agendaController.getAll)

router.post('/api/agendas', upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'scheduleAt', maxCount: 1 },
]), agendaController.store)

router.put('/api/agendas/:agenda_id', upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'scheduleAt', maxCount: 1 },
]), agendaController.update)

router.delete('/api/agendas/:agenda_id', agendaController.destroy)

//achievement
router.get('/api/achievements',achievementController.getAll)

router.post('/api/achievements', upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'description', maxCount: 1 },
]), achievementController.store)

router.put('/api/achievements/:achievement_id', upload.fields([
    { name: 'title', maxCount: 1 },
    { name: 'description', maxCount: 1 },
]), achievementController.update)

router.delete('/api/achievements/:achievement_id', achievementController.destroy)

//Goal
router.get('/api/goals/misi',goalController.getAllMisi)
router.get('/api/goals/visi',goalController.getAllVisi)
router.get('/api/goals',goalController.getAll)

router.post('/api/goals', upload.fields([
    { name: 'type', maxCount: 1 },
    { name: 'description', maxCount: 1 },
]), goalController.store)

router.put('/api/goals/:goal_id', upload.fields([
    { name: 'type', maxCount: 1 },
    { name: 'description', maxCount: 1 },
]), goalController.update)

router.delete('/api/goals/:goal_id', goalController.destroy)

//program dkc
router.get('/api/programs-dkc',program_dkcController.getAll)

router.post('/api/programs-dkc', upload.fields([
    { name: 'program_name', maxCount: 1 },
    { name: 'year', maxCount: 1 },
]), program_dkcController.store)

router.put('/api/programs-dkc/:program_id', upload.fields([
    { name: 'program_name', maxCount: 1 },
    { name: 'year', maxCount: 1 },
]), program_dkcController.update)

router.delete('/api/programs-dkc/:program_id', program_dkcController.destroy)

//scout document

//get
router.get('/api/scout-documents', scout_documentController.getAll)

//post
router.post('/api/scout-documents', uploadFile("scout-document").single('document'), scout_documentController.store)

//destroy
router.delete('/api/scout-documents/:document_id', scout_documentController.destroy)


//speech_leader_dkc

//get
router.get('/api/speechs', speech_leader_dkcController.getAll)

//post
router.post('/api/speechs', uploadFile("spech_leader_dkc").single('image'), speech_leader_dkcController.store)

//destroy
router.delete('/api/speechs/:speech_id', speech_leader_dkcController.destroy)

//Product
//get
router.get('/api/products', productController.getAll)

//post
router.post('/api/products', uploadFile("product").single('image'), productController.store)

//destroy
router.delete('/api/products/:product_id', productController.destroy)

export default router
