const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema ({
    name : {
        type : String
    },
    hod : {
        type : String
    },
    description : {
        type : String
    },
    duties : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
});

mongoose.model('departments'. accountSchema);