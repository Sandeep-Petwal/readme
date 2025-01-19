## React Context API - Step by Step by Sandeep Prasad

### Step 1. Create the Context

- You can also set a default value in the context.

```javascript
import { createContext } from "react";

// Create the context
export const MyContext = createContext("default value");
```

### Step 2. Create a Provider

- The provider is responsible for passing data down to the components that need it.

```javascript
// MyContextProvider.jsx
import { MyContext } from "./MyContext";
import { useState } from "react";

// Create a provider component
export const MyContextProvider = ({ children }) => {
  const [value, setValue] = useState("Initial Value");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};
```

- you can use step 1 and 2 in single file

### Step 3. Wrap Your App with the Provider

- Wrap the root of your app or any component tree that needs access to the context.

```javascript
// index.js
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MyContextProvider } from "./MyContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MyContextProvider>
    <App />
  </MyContextProvider>
);
```

### Step 4. Consuming Context Data

- Use `useContext` in any child component to access the context values.

```javascript
// MyComponent.jsx
import { useContext } from "react";
import { MyContext } from "./MyContext";

const MyComponent = () => {
  const { value, setValue } = useContext(MyContext);

  const handleChange = () => {
    setValue("New Value");
  };

  return (
    <div>
      <p>Current Value: {value}</p>
      <button onClick={handleChange}>Change Value</button>
    </div>
  );
};

export default MyComponent;
```

### Step 5. Accessing Default Values (Optional)

- If a component is not wrapped in a provider, it will use the default value set in `createContext`.

```javascript
const value = useContext(MyContext);
```

---

### Step 6. Creating a Custom Hook for Context (Optional)

- Instead of using useContext directly in your components, you can create a custom hook that wraps around it. This will make your context consumption more reusable and abstracted.

```javascript
// useMyContext.jsx
import { useContext } from "react";
import { MyContext } from "./MyContext";

// Custom hook for accessing MyContext
export const useMyContext = () => {
  const context = useContext(MyContext);

  // If the context is undefined, it means that the component is not wrapped with the provider.
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};
```

- Now, instead of calling useContext(MyContext) directly in your components, you can use the  seMyContext hook.

```javascript
// MyComponent.jsx
import { useMyContext } from "./useMyContext";

const MyComponent = () => {
  const { value, setValue } = useMyContext();

  const handleChange = () => {
    setValue("New Value");
  };

  return (
    <div>
      <p>Current Value: {value}</p>
      <button onClick={handleChange}>Change Value</button>
    </div>
  );
};

export default MyComponent;
};
```

---

### Recap:

1. **Create Context** with `createContext()` and export it.
2. **Create Provider** to pass down values and wrap the necessary part of your app.
3. **Wrap Your App** with the Provider so components can access the context.
4. **Consume Context** using `useContext()` inside any component that needs it.
