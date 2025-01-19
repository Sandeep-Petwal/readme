# React Router DOM - Complete Guide
## 1. Using createBrowserRouter (Recommended)

### 1. Create Router Configuration

```jsx
// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Products, { loader as productsLoader } from "./pages/Products";
import ProductDetail, { 
  loader as productLoader,
  action as productAction 
} from "./pages/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader,
        children: [
          {
            path: ":id",
            element: <ProductDetail />,
            loader: productLoader,
            action: productAction,
          },
        ],
      },
    ],
  },
]);
```

### 2. Implement Root Layout

```jsx
// src/layouts/Root.jsx
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root() {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      <main className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </main>
    </>
  );
}

export default Root;
```

### 3. Use RouterProvider

```jsx
// src/main.jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

### 4. Implement Data Loading

```jsx
// src/pages/Products.jsx
export async function loader({ request }) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  
  const products = await fetchProducts(category);
  
  return { products };
}

function Products() {
  const { products } = useLoaderData();
  
  return (
    <div>
      {products.map(product => (
        <Link key={product.id} to={`/products/${product.id}`}>
          {product.name}
        </Link>
      ))}
    </div>
  );
}
```

### 5. Implement Form Actions

```jsx
// src/pages/ProductDetail.jsx
export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  
  await updateProduct(params.id, updates);
  return redirect(`/products/${params.id}`);
}

function ProductDetail() {
  const { product } = useLoaderData();
  const navigation = useNavigation();
  
  return (
    <Form method="post">
      <input type="text" name="name" defaultValue={product.name} />
      <button 
        type="submit"
        disabled={navigation.state === "submitting"}
      >
        {navigation.state === "submitting" 
          ? "Updating..." 
          : "Update Product"
        }
      </button>
    </Form>
  );
}
```

### 6. Error Handling

```jsx
// src/pages/ErrorPage.jsx
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <p>
        {error.status === 404 
          ? "Page not found!" 
          : error.message
        }
      </p>
    </div>
  );
}
```

### Key Benefits of createBrowserRouter

1. **Data Loading**
   - Built-in loader functions
   - Automatic loading states
   - Parallel data fetching

2. **Form Handling**
   - Built-in action functions
   - Automatic pending states
   - Progressive enhancement

3. **Error Handling**
   - Automatic error boundaries
   - Error elements per route
   - TypeScript support

4. **Pending Navigation**
   - Automatic pending UI
   - Navigation state management
   - Loading indicators




<br />
<br />
<br />

## 2. Alternative Setup Using BowserRouter
A comprehensive guide to implementing React Router DOM v6 in your React applications.

## Table of Contents
- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [Core Concepts](#core-concepts)
- [Advanced Features](#advanced-features)
- [Protected Routes](#protected-routes)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)

## Installation

```bash
# Using npm
npm install react-router-dom

```

## Basic Setup

### 1. Configure Router

```jsx
// src/main.jsx or src/index.jsx
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 2. Define Routes

```jsx
// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

## Core Concepts

### 1. Navigation Components

```jsx
// Using Link Component
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
    </nav>
  );
}

// Using NavLink (with active state)
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <NavLink 
        to="/"
        className={({ isActive }) => isActive ? "active" : ""}
      >
        Home
      </NavLink>
    </nav>
  );
}
```

### 2. Programmatic Navigation

```jsx
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await loginUser();
    if (success) {
      navigate("/dashboard", { 
        replace: true,
        state: { from: "login" }
      });
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### 3. Route Parameters

```jsx
// Using URL Parameters
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  
  return <div>Product ID: {id}</div>;
}

// Using Search Parameters
import { useSearchParams } from "react-router-dom";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  
  return (
    <div>
      <select 
        value={category} 
        onChange={(e) => setSearchParams({ category: e.target.value })}
      >
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
    </div>
  );
}
```

## Advanced Features

### 1. Nested Routes

```jsx
function App() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Overview />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

// Parent Component with Outlet
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

### 2. Protected Routes

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth(); // Your auth hook
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Usage in Routes
<Routes>
  <Route 
    path="/dashboard" 
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } 
  />
</Routes>
```

### 3. Lazy Loading Routes

```jsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <Routes>
      <Route 
        path="/dashboard" 
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        } 
      />
    </Routes>
  );
}
```

## Best Practices

1. **Route Organization**
   - Keep routes in a separate configuration file
   - Group related routes together
   - Use consistent naming conventions

```jsx
// src/routes/index.jsx
const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "", element: <Overview /> },
      { path: "profile", element: <Profile /> },
    ],
  },
];
```

2. **Error Handling**
```jsx
// Custom Error Boundary for Routes
function RouteErrorBoundary() {
  const error = useRouteError();
  
  return (
    <div>
      <h1>Oops!</h1>
      <p>{error.message}</p>
    </div>
  );
}
```

3. **Location State**
```jsx
// Passing state through navigation
navigate("/success", { 
  state: { 
    transaction: "completed",
    id: "123" 
  } 
});

// Accessing state
function Success() {
  const location = useLocation();
  const { transaction, id } = location.state || {};
  
  return <div>Transaction {id}: {transaction}</div>;
}
```

## Common Patterns

### 1. Route Loading States

```jsx
import { useNavigation } from "react-router-dom";

function LoadingWrapper({ children }) {
  const navigation = useNavigation();
  
  if (navigation.state === "loading") {
    return <div>Loading...</div>;
  }
  
  return children;
}
```

### 2. Modal Routes

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />}>
          {/* Modal Route */}
          <Route 
            path=":id" 
            element={<ProductModal />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
```

### 3. Breadcrumbs

```jsx
function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/')
    .filter(Boolean);
    
  return (
    <nav>
      <Link to="/">Home</Link>
      {paths.map((path, index) => (
        <span key={path}>
          {' > '}
          <Link 
            to={`/${paths.slice(0, index + 1).join('/')}`}
          >
            {path}
          </Link>
        </span>
      ))}
    </nav>
  );
}
```



