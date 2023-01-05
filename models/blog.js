const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required:true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps:true });


// create the model from the schema blogSchema
const Blog = mongoose.model('Blog', blogSchema);
// allows us to use the collection elsewhere in the project
module.exports = Blog;