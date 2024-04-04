import Schema from 'validate'

export const AddEmployeeValidateSchema = new Schema({
    name: {
      type: String,
      required: true,
      message: {
        type:"name must be string!",
        required: 'name is required!',
      }
    },
    email: {
      type: String,
      required: true,
      match: /\S+@\S+\.\S+/,
      message: {
        type:"email must be string!",
        required: 'email is required!',
        match: 'Invalid email format'
      }
    }
  });