//sample lang (for milestone 1 lang to XD)
// yung apat na controllers lang talaga ang need natin
import mongoose from 'mongoose';

await mongoose.connect("mongodb://127.0.0.1:27017/farm_to_table",
    {
    useNewUrlParser: true, useUnifiedTopology: true
}
);

// User model
const User = mongoose.model('User', {
    firstName: String,
    middleName: String,
    lastName: String,
    userType: String,
    email: String,
    password: {type: String, required: true, select: false },
  });
  
  // Product model
  const Product = mongoose.model('Product', {
    productID: String,
    productName: String,
    productDescription: String,
    productType: Number, // 1: Crop, 2: Poultry
    productQuantity: Number,
    price: Number,
  });
  const Order = mongoose.model('Order Transaction', {
    transactionID: mongoose.Schema.Types.ObjectId,
    productID: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    orderQuantity: Number,
    orderStatus: Number,
    email: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateOfOrder: Date,
  });

  const saveUser = async (req, res) => {
    const { firstName, middleName, lastName, userType, email, password } = req.body;
  
    if (!firstName || !middleName || !lastName || !userType || !email || !password) {
      res.send({ inserted: false });
      return;
    }
  
    try {
      const newUser = new User({ firstName: firstName, middleName: middleName, lastName: lastName, userType: userType, email: email, password:password });
      const savedUser = await newUser.save();
      res.send({ inserted: true, user: savedUser });
    } catch (err) {
      res.send({ inserted: false });
    }
  };

  const showUsers = async (req, res) => {
      const users = await User.find();
      res.send({ users: users });
  };
  
  const saveProduct = async (req, res) => {
    const { productID, productName, productDescription, productType, productQuantity, price } = req.body;
  
    if (!productID || !productName || !productDescription || !productType || !productQuantity || !price) {
      res.send({ inserted: false });
      return;
    }
  
    try {
      const newProduct = new Product({ productID, productName, productDescription, productType, productQuantity, price });
      const savedProduct = await newProduct.save();
      res.send({ inserted: true, product: savedProduct });
    } catch (err) {
      res.send({ inserted: false }); 
    }
  };
  
  const showProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.send({ products });
    } catch (err) {
      res.send({ products: [], error: "Error fetching products" });
    }
  };

  const saveOrder = async (req, res) => {
    const {orderQuantity, orderStatus, dateofOrder} = req.body;

    if (!orderQuantity || !orderStatus) {
      res.send({ inserted: false });
      return;
    }
    try {
    const newOrder = new Order({transactionID: Order.transactionID, productID: Product.productID,
      orderQuantity, orderStatus, email: User._id, dateOfOrder});
    const savedOrder = await newOrder.save();
    res.send({ inserted: true, order: savedOrder });
    }
    catch(err) {
      res.send({ inserted: false});
    }
  }

  const showOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.send({ orders });
    } catch (err) {
      res.send({ orders: [], error: "Error fetching orders" });
    }
  };

  
export { saveUser, showUsers, saveProduct, showProducts, saveOrder, showOrders };