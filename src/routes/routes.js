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
router.get('/api/gp-reports/:dkr_id', gpReportDkrController.getAll)
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
router.get('/api/data-potensi', dataPotensiController.getAll)

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

export default router