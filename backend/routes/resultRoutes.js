const express = require('express');
const router = express.Router();
const {
    getResults,
    createResult,
    updateResult,
    deleteResult
} = require('../controllers/resultcontroller');

router.get('/', getResults);
router.post('/', createResult);
//router.get('/:id', getresults);
router.put('/:id', updateResult);
router.delete('/:id', deleteResult);

module.exports = router;