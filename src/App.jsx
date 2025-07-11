// // E-Commerce React Project (With Navbar, Auth, Cart Total)

// import React, { useState, useEffect, createContext, useContext } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AuthContext = createContext();
// const CartContext = createContext();

// const App = () => {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Navbar />
//         <div className="container mt-4">
//           <Routes />
//         </div>
//       </CartProvider>
//     </AuthProvider>
//   );
// };

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const { cart } = useContext(CartContext);
//   const [showLoginForm, setShowLoginForm] = useState(false);
//   const [showCart, setShowCart] = useState(false);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//       <a className="navbar-brand" href="#">MyShop</a>
//       <div className="ms-auto d-flex align-items-center">
//         {user && (
//           <button className="btn btn-sm btn-outline-light me-3" onClick={() => setShowCart(!showCart)}>
//             Cart ({cart.length})
//           </button>
//         )}
//         {user ? (
//           <>
//             <span className="text-white me-3">Hi, {user.username}</span>
//             <button className="btn btn-sm btn-outline-light" onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <button className="btn btn-sm btn-outline-light" onClick={() => setShowLoginForm(!showLoginForm)}>
//             {showLoginForm ? "Close" : "Login / Register"}
//           </button>
//         )}
//       </div>
//       {!user && showLoginForm && <AuthForm />}
//       {user && showCart && <Cart />}
//     </nav>
//   );
// };

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const register = (username, password) => {
//     localStorage.setItem("user", JSON.stringify({ username, password }));
//     alert("Registered successfully. Please log in.");
//   };
//   const login = (username, password) => {
//     const stored = JSON.parse(localStorage.getItem("user"));
//     if (stored && stored.username === username && stored.password === password) {
//       setUser({ username });
//     } else {
//       alert("Invalid credentials");
//     }
//   };
//   const logout = () => setUser(null);
//   return (
//     <AuthContext.Provider value={{ user, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [message, setMessage] = useState("");

//   const addToCart = (product) => {
//     const exists = cart.find((item) => item.id === product.id);
//     if (!exists) {
//       setCart([...cart, product]);
//       setMessage("Product added to cart!");
//       setTimeout(() => setMessage(""), 2000);
//     }
//   };

//   const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
//   const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, message, total }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const Routes = () => {
//   return (
//     <>
//       <ProductList />
//     </>
//   );
// };

// const AuthForm = () => {
//   const { login, register } = useContext(AuthContext);
//   const [isLogin, setIsLogin] = useState(true);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     isLogin ? login(username, password) : register(username, password);
//   };

//   return (
//     <div className="position-absolute top-100 end-0 bg-light p-4 mt-2 shadow" style={{ width: "300px", zIndex: 999 }}>
//       <h5>{isLogin ? "Login" : "Register"}</h5>
//       <form onSubmit={handleSubmit}>
//         <input type="text" className="form-control mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
//         <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button className="btn btn-primary w-100 mb-2">{isLogin ? "Login" : "Register"}</button>
//         <button type="button" className="btn btn-link w-100" onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const { addToCart, message } = useContext(CartContext);

//   useEffect(() => {
//     axios.get("https://fakestoreapi.com/products")
//       .then((res) => setProducts(res.data))
//       .catch(() => alert("Failed to fetch products."));
//   }, []);

//   return (
//     <>
//       {message && <div className="alert alert-success mt-3">{message}</div>}
//       <div className="row mt-3">
//         {products.map((product) => (
//           <div key={product.id} className="col-md-4 mb-4">
//             <div className="card h-100">
//               <img src={product.image} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} alt={product.title} />
//               <div className="card-body">
//                 <h5 className="card-title">{product.title}</h5>
//                 <p className="card-text">${product.price}</p>
//                 <button className="btn btn-success" onClick={() => addToCart(product)}>Add to Cart</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// const Cart = () => {
//   const { cart, removeFromCart, total } = useContext(CartContext);

//   if (cart.length === 0) return <h5 className="text-center">Cart is Empty</h5>;

//   return (
//     <div className="position-absolute top-100 end-0 bg-white shadow p-4 mt-2" style={{ width: "350px", zIndex: 999 }}>
//       <h5 className="mb-3">Cart</h5>
//       <div className="row">
//         {cart.map((item) => (
//           <div key={item.id} className="col-12 mb-3">
//             <div className="d-flex align-items-center">
//               <img src={item.image} style={{ width: '60px', height: '60px', objectFit: 'contain' }} alt={item.title} className="me-3" />
//               <div>
//                 <h6 className="mb-0">{item.title}</h6>
//                 <small>${item.price}</small>
//               </div>
//               <button className="btn btn-sm btn-danger ms-auto" onClick={() => removeFromCart(item.id)}>Remove</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <h6 className="text-end">Total: ${total}</h6>
//     </div>
//   );
// };

// export default App;
// Importing necessary modules and dependencies
import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios"; // For making API calls
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling

// Creating Contexts for Authentication and Cart Management
const AuthContext = createContext();
const CartContext = createContext();

// Root App Component
const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <div className="container mt-4">
          <Routes />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

// Navbar Component for Navigation, Login, and Cart View
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="#">MyShop</a>
      <div className="ms-auto d-flex align-items-center">
        {/* Show Cart Button if user is logged in */}
        {user && (
          <button className="btn btn-sm btn-outline-light me-3" onClick={() => setShowCart(!showCart)}>
            Cart ({cart.length})
          </button>
        )}
        {/* Show Login/Register or Logout Button */}
        {user ? (
          <>
            <span className="text-white me-3">Hi, {user.username}</span>
            <button className="btn btn-sm btn-outline-light" onClick={logout}>Logout</button>
          </>
        ) : (
          <button className="btn btn-sm btn-outline-light" onClick={() => setShowLoginForm(!showLoginForm)}>
            {showLoginForm ? "Close" : "Login / Register"}
          </button>
        )}
      </div>
      {/* Conditional rendering of Login form or Cart */}
      {!user && showLoginForm && <AuthForm />}
      {user && showCart && <Cart />}
    </nav>
  );
};

// Authentication Context Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Registration logic using localStorage
  const register = (username, password) => {
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Registered successfully. Please log in.");
  };

  // Login logic by comparing localStorage credentials
  const login = (username, password) => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.username === username && stored.password === password) {
      setUser({ username });
    } else {
      alert("Invalid credentials");
    }
  };

  // Logout function
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Cart Context Provider for managing cart state
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  // Function to add product to cart
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      setCart([...cart, product]);
      setMessage("Product added to cart!");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // Remove item by ID
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, message, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Simulated routing component (can be extended to use React Router)
const Routes = () => {
  return (
    <>
      <ProductList />
    </>
  );
};

// Authentication Form Component for login/register toggle
const AuthForm = () => {
  const { login, register } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    isLogin ? login(username, password) : register(username, password);
  };

  return (
    <div className="position-absolute top-100 end-0 bg-light p-4 mt-2 shadow" style={{ width: "300px", zIndex: 999 }}>
      <h5>{isLogin ? "Login" : "Register"}</h5>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="btn btn-primary w-100 mb-2">{isLogin ? "Login" : "Register"}</button>
        <button type="button" className="btn btn-link w-100" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </form>
    </div>
  );
};

// Component to display product list fetched from API
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, message } = useContext(CartContext);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to fetch products."));
  }, []);

  return (
    <>
      {/* Show alert if product is added */}
      {message && <div className="alert alert-success mt-3">{message}</div>}
      <div className="row mt-3">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.image} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <button className="btn btn-success" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// Cart Component to display items in the cart with remove option
const Cart = () => {
  const { cart, removeFromCart, total } = useContext(CartContext);

  if (cart.length === 0) return <h5 className="text-center">Cart is Empty</h5>;

  return (
    <div className="position-absolute top-100 end-0 bg-white shadow p-4 mt-2" style={{ width: "350px", zIndex: 999 }}>
      <h5 className="mb-3">Cart</h5>
      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-12 mb-3">
            <div className="d-flex align-items-center">
              <img src={item.image} style={{ width: '60px', height: '60px', objectFit: 'contain' }} alt={item.title} className="me-3" />
              <div>
                <h6 className="mb-0">{item.title}</h6>
                <small>${item.price}</small>
              </div>
              <button className="btn btn-sm btn-danger ms-auto" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <h6 className="text-end">Total: ${total}</h6>
    </div>
  );
};

// Exporting the App component as default
export default App;
