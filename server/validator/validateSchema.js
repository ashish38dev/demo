import Schema from 'validate'

export const ValidateSchema = new Schema({
    ids: {
        type: Array,
        required: true,
        each: {
            type: 'string', // Validate each element in the array to be a string
            message: {
                type: "ids must be an array of strings!",
            }
        },
        message: {
            required: 'ids are required!',
        }
    },
    date: {
        type: String,
        required: true,
        message: {
            type: "date must be string!",
            required: 'date is required!',
        }
    },
    time: {
        type: String,
        required: true,
        message: {
            type: "time must be string!",
            required: 'time is required!'
        }
    },
    comment: {
        type: String,
        required: true,
        length: { max: 200 }, // Set maximum length of comment to 200 characters
        message: {
            type: "comment must be string!",
            required: 'comment is required!',
            length: 'comment cannot be longer than 200 characters!'
        }
    }
});
