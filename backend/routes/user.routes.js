const {register,
    login,
    logout,
    getAllUsers,
    getuserById,
    updateUser,
    getAdmins}=require('../controllers/user.js');
const router=require('express').Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',logout);

router.get('/getAll',getAllUsers);
router.get('/getuserbyid/:id',getuserById);
router.put('/update/:id',updateUser);
router.get('/getAdmins',getAdmins);

module.exports=router;