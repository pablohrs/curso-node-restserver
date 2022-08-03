const {Router} = require('express');
const {check} = require('express-validator');
const {userGet, userPut, userPost, userDelete, userPatch} = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');
const role = require('../models/role');
 
const router = Router();

router.get('/', userGet);      
 
router.put('/:id', userPut);     

router.post('/',[
    check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
    check('password', 'El password debe ser Valido').isLength({min:6}),
    check('correo','Formato del Correo No Valido').isEmail(),
    //check('rol','No es un Rol Valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(async(rol='') =>{
          const existeRol = await role.findOne({rol});
          if (!existeRol){
            throw new Error('El Rol No es Valido BD')
          }
    }),
    validarCampos   
] ,userPost);  

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router;