import { Router } from 'express'
import * as schoolController from "./../controllers/schoolController.js"
import * as gpReportDkrController from "./../controllers/gpReportDkrController.js"

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router()

// school
router.get('/api/schools', schoolController.getAll)

router.post('/api/schools', upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), schoolController.store)

router.put('/api/schools/:school_id', upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), schoolController.update)

router.delete('/api/schools/:school_id', schoolController.destroy)

// gp report dkr
router.get('/api/gp-report-dkrs', gpReportDkrController.getAll)
router.post('/api/gp-report-dkrs', upload.fields([
    { name: 'school_name', maxCount: 1 },
    { name: 'gudep_number', maxCount: 1 },
    { name: 'dkr_id', maxCount: 1 },
]), gpReportDkrController.store)

export default router