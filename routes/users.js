const {Router} = require('express');
const {check} = require('express-validator');
const {userGet, userPut, userPost, userDelete, userPatch} = require('../controllers/users');
const { esRolValido, esMailValido, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const role = require('../models/role');
 
const router = Router();

router.get('/', userGet);      
 
router.put('/:id',[
   check('id','No es un ID Valido').isMongoId(),
   check('id').custom(existeUsuarioPorId),
   validarCampos
], userPut);     
 
router.post('/',[
    check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password debe ser Valido').isLength({min:6}),
    //check('correo','Formato del Correo No Valido').isEmail(),
    //check('rol','No es un Rol Valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(esMailValido),
    check('rol').custom(esRolValido),
    validarCampos   
] ,userPost);  

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router;