import { Router } from 'express';

import * as wifiController from '../controllers/wifiController';

import { checkAuthenticatedUserMiddleware } from '../middlewares/authMiddleware';
import { wifisMiddleware } from '../middlewares/wifiMiddleware';

const router = Router();

router.use( checkAuthenticatedUserMiddleware );

router.post("/wifi", wifisMiddleware, wifiController.createWifi);
router.get("/wifi", wifiController.getAllWifis);
router.get("/wifi/:id", wifiController.getWifiById);
router.delete("/wifi/:id", wifiController.deleteWifi);

export default router;
