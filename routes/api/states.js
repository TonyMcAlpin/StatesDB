const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');

router.route('/')
    .get(statesController.getAllStates)
    //.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), statesController.createNewState)
    //.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), statesController.updateState)
    //.delete(verifyRoles(ROLES_LIST.Admin), statesController.deleteState);

router.get('/:code', statesController.getState);

module.exports = router;