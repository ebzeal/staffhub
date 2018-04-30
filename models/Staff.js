const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  qualification: [
    {
      qualificationName: {
        type: String
      },
      institution: {
        type: String
      },
      year: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  homeAddress: [
    {
      street: {
        type: String
      },
      town: {
        type: String
      },
      state: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  department: [
    {
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  position: [
    {
      grade: {
        type: String
      },
      level: {
        type: String
      },
      designation: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  appraisal: {
    type: Schema.Types.ObjectId,
    ref: "Appraisal"
  },
  employmentDate: {
    type: Date
  },
  relations: [
    {
      maritalStatus: {
        type: String
      },
      nextOfKin: {
        type: String
      },
      childrenNumber: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  medical: {
    type: Schema.Types.ObjectId,
    ref: "medicals"
  },
  salary: {
    type: Schema.Types.ObjectId,
    ref: "salary"
  },
  employeeStatus: {
    type: String
  },
  staffPriviledge: {
    type: String,
    default: "staff"
  },
  registrationStatus: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("staff", staffSchema, "staff");
