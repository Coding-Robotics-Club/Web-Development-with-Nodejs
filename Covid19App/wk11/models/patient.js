const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PatientSchema = new Schema({
  first_name: String,
  last_name: String,
  birthdate: String,
  vaccination_place: String,
  vaccine_type: String,
  vaccine_manufacturer: String,
  dose_1_date: Date,
  dose_2_date: Date,
  p_id: String,
  p_name: String
});

module.exports = mongoose.model('patient', PatientSchema);