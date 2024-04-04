import Schema from 'validate'

export const adminLoginValidateSchema = new Schema({
    email: {
      type: String,
      required: true,
      match: /\S+@\S+\.\S+/,
      message: {
        type:"email must be string!",
        required: 'email is required!',
        match: 'Invalid email format'
      }
    },
    password: {
      type: String,
      required:true,
      length: { min: 6 },
      message: {
        type: "password must be string!",
        required: "password is required!",
        length : 'password must contain more then 6 characters!'
      }
    }
  });
