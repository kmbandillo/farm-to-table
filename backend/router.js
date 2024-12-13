import { Router } from 'express';
import { signUp, login, checkIfLoggedIn, addAdmin } from './controllers/authController.js';
import { createProduct, getAllProducts, deleteProduct, updateProduct, searchProducts } from './controllers/productController.js'; // Import product controllers
import { getCustomers, updateUser, getUserDetails } from './controllers/userController.js';
import { addTransaction, getPendingTransactions, updateTransactionStatus, cancelTransaction, getCustomerOrders, cancelOrder, getTotalPrices, getTotalCounts, getCompletedOrders, getUserCompletedOrders } from './controllers/transactionController.js';

const router = Router();

router.post('/signup', signUp);

// Authentication routes
router.post('/signup', signUp);
router.post('/login', login);
router.post('/checkifloggedin', checkIfLoggedIn);
router.post('/addadmin', addAdmin);
router.post('/products', createProduct); 
router.get('/getproducts', getAllProducts);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);
router.get('/search', searchProducts);

// User routes
router.get('/getcustomers', getCustomers);
router.post('/user/:userId', updateUser);
router.get('/user-deets/:userId', getUserDetails);
router.get('/user-transactions/:userId', getUserCompletedOrders);

export default router;
