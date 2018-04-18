const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    firstName : {
        type : String
    },
    middleName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    image : {
        type : String
    },
    qualification : [{
        qualificationName : {
            type : String
        },
        institution : {
            type : String
        },
        year : {
            type : Number
        }
    }],
    homeAddress : [{
        street : {
            type : String
        },
        town : {
            type : String
        },
        state : {
            type : String
        }
    }],
    department : [{
        type : Schema.Types.ObjectId,
        ref : 'departments'
    }],
    position : [{
        grade : {
            type : String
        },
        level : {
            type : String
        },
        designation : {
            type : String
        },
        date : {
            type : Date,
            default : Date.now
        }
    }],
    appraisal : {
        type :Schema.Types.ObjectId,
        ref : 'Appraisal'
    },
    employmentDate : {
        type : Date
    },
    maritalStatus : {
        status : {
            type :String
        },
        partnerName : {
            type : String
        },
        childrenNumber : {
            type : Number
        }
    },
    medical : {
        type : Schema.Types.ObjectId,
        ref : 'medicals'
    },
    salary : {
        type : Schema.Types.ObjectId,
        ref : 'salary'
    },
    employeeStatus : {
        type : String
    },
    staffPriviledge : {
        type : String
    },
    registrationStatus : {
        type : Boolean,
        default : false
    }
});


mongoose.model('staff', staffSchema, 'staff') ;