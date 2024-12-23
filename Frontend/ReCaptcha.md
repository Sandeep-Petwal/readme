# Implementing Google reCAPTCHA v3 in React and Express

## Step 1: Get reCAPTCHA Keys

1. Go to the [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).
2. Register a new site.
3. Select reCAPTCHA v3.
4. Add your domains.
5. You'll receive:
   - **Site Key** (for frontend)
   - **Secret Key** (for backend)

## Step 2: Frontend Implementation (React)

1. Install the package:

   ```bash
   npm install react-google-recaptcha-v3
   ```

2. Wrap your app with the provider in App.js:

```jsx
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="YOUR_SITE_KEY">
      {/* Your app components */}
    </GoogleReCaptchaProvider>
  );
}
```

## Step 3. Use the `useGoogleReCaptcha` hook in your component:

```jsx

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useState } from 'react';

function LoginForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }

    // Get reCAPTCHA token
    const token = await executeRecaptcha('login');

    try {
      const response = await fetch('your-api-endpoint/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token
        }),
      });

      const data = await response.json();
      // Handle response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields */}
      <button type="submit">Login</button>
    </form>
  );
}


```


## Step 3: Backend Implementation (Express)
### 1. Middleware

```js
// middleware/recaptcha.js
const axios = require('axios');

const verifyRecaptcha = async (req, res, next) => {
  const { recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ error: 'reCAPTCHA token is required' });
  }

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    );

    const { success, score } = response.data;

    if (!success || score < 0.5) {
      return res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }

    next();
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({ error: 'reCAPTCHA verification failed' });
  }
};

module.exports = verifyRecaptcha;
```

### Use middleware in your routes