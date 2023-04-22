import express from 'express'
import controller from '../controllers/message.js'
import controllerUser  from "../controllers/user.js"


var router = express.Router();

router.post('/save', controller.save)
router.get('/messages', controller.getMessages)
router.post('/login', controllerUser.login)
router.post('/createuser', controllerUser.createUser)

export default router