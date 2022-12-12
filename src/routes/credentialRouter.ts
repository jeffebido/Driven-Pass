import { Router } from 'express';

import * as credentialController from '../controllers/credentialController';

import { checkAuthenticatedUserMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use( checkAuthenticatedUserMiddleware );

router.post("/credentials", credentialController.createCredential);
router.get("/credentials", credentialController.getAllCredentials);
router.get("/credentials/:id", credentialController.getCredentialById);
router.delete("/credentials/:id", credentialController.deleteCredential);


export default router;
