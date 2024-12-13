import needle from 'needle';

// // Save a new user
// needle.post('http://localhost:3000/save-user', {
//     firstName: 'Jan',
//     middleName: 'Michael',
//     lastName: 'Doe',
//     userType: 'Customer',
//     email: 'john.doe@example.com',
//     password: 'password123',
// }, (err, res) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('User Saved:', res.body);
//     }
// });

// // Save another user
// needle.post('http://localhost:3000/save-user', {
//     firstName: 'Jane',
//     middleName: 'Alice',
//     lastName: 'Smith',
//     userType: 'Admin',
//     email: 'jane.smith@example.com',
//     password: 'adminpassword',
// }, (err, res) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('User Saved:', res.body);
//     }
// });

// Show all users
needle.get('http://localhost:3002/getproducts', (err, res) => {
    (err, res) =>{
        console.log(res.body);
    }
});

// // Save a new product
// needle.post('http://localhost:3000/save-product', {
//     productID: 'P001',
//     productName: 'Rice',
//     productDescription: 'High-quality organic rice',
//     productType: 1,  // 1: Crop
//     productQuantity: 100,
//     price: 50,
// }, (err, res) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Product Saved:', res.body);
//     }
// });

// // Save another product
// needle.post('http://localhost:3000/save-product', {
//     productID: 'P002',
//     productName: 'Chicken',
//     productDescription: 'Fresh poultry',
//     productType: 2,  // 2: Poultry
//     productQuantity: 50,
//     price: 150,
// }, (err, res) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Product Saved:', res.body);
//     }
// });

// // Show all products
// needle.get('http://localhost:3000/products', (err, res) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('All Products:', res.body);
//     }
// });

