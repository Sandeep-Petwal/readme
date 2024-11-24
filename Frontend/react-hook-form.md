# React Hook Form - 

React Hook Form is a library for managing form state and validation in React applications using hooks. Here's an explanation of the topics related to React Hook Form:

## `useForm()`

The `useForm()` hook is used to initialize the React Hook Form. It returns an object containing several methods and properties that are essential for managing forms.

```javascript
const {
  register,
  handleSubmit,
  reset,
  watch,
  setError,
  clearErrors,
  formState: { errors, isSubmitting },
} = useForm();
```

### `register`

- `register` is a function that registers inputs to the form. It's typically used with the \`ref\` attribute of form elements to integrate with React Hook Form.

```javascript
<input
  {...register("username", {
    required: { value: true, message: "Username is Required..." },
    minLength: { value: 4, message: "Minimum Lenght is 4" },
    maxLength: { value: 8, message: "Max Lenght is 8" },
  })}
/>
```

### `handleSubmit`

- `handleSubmit` is a function that you attach to your form element's \`onSubmit\` event. It will validate the inputs before invoking your onSubmit function.
```javascript
const onSubmit = (data) => {
  // Handle form submission logic
}
```

### `reset`

- `reset` is a function that resets all the fields and errors within the form.
```javascript
reset();
```

### `watch`

- `watch` is a function that allows you to watch the value of one or more inputs and trigger re-renders when those values change.

```javascript
const value = watch("fieldName");
```

### `setError`

- `setError` is a function that allows you to manually set an error message for a specific input.
```javascript
setError("fieldName", { type: "manual", message: "This field is required" });
```

### `clearErrors`

- `clearErrors` is a function that allows you to clear errors for specific inputs.
```javascript
clearErrors("fieldName");
```

### `formState`

- `formState` is an object that contains various properties related to the form's state.
  - \`errors\`: An object containing validation errors for each input.
  - \`isSubmitting\`: A boolean indicating whether the form is currently being submitted.
```javascript
const { errors, isSubmitting } = formState;
```

