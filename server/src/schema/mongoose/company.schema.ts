const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: String,
});

export default mongoose.model("company", CompanySchema);
