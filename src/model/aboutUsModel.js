const { string } = require("i/lib/util");
const mongoose = require("mongoose");
const aboutUsSchema = new mongoose.Schema(
  {
    section_a: {
      a_content: {
        a_heading: {
          type: String,
        },
        a_paragraph: {
          type: String,
        },
      },
      a_image: {
        type: String,
      },
    },
    section_b: {
      b_content: {
        b_heading: {
          type: String,
        },
        b_paragraph: {
          type: String,
        },
      },
      b_image: {
        type: String,
      },
    },
    section_c: {
      c_content: {
        c_heading: {
          type: String,
        },
        c_paragraph: {
          type: String,
        },
      },
      c_image: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

aboutUsSchema.set("toJSON",{
  transform:(document, returnObject)=>{
      returnObject.id = returnObject._id.toString();
      delete returnObject._id;
      delete returnObject.__v
      delete  returnObject.password
  }
})

module.exports = mongoose.model('aboutUs',aboutUsSchema)


