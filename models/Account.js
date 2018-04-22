const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema ({
    staff:{
        type:Schema.Types.ObjectId,
            ref:'staff'
    },
    paySlip : [{
        basicpay : {
            type : Number
        },
        housingallowance : {
            type : Number
        },
        feedingallowance : {
            type : Number
        },
        carallowance : {
            type : Number
        },
        educationallowance : {
            type : Number
        },
        tax : {
            type : Number
        },
        pension : {
            type : Number
        },
        payMonth : {
            type : String
        },
        details : {
            type : String
        },
        date : {
            type : Date,
            default : Date.now
        }
    }],
    loan : [{
        amount : {
            type : Number
        },
        startDate : {
            type : Date
        },
        endDate : {
            type : Date
        },
        purpose : {
            type : String
        },
        details : {
            type : String
        },
        date : {
            type : Date,
            default : Date.now
        }
    }]
});

mongoose.model('accounts'. accountSchema);