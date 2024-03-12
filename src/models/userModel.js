const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: String,
  locality: String,
  mobile: String,
  pincode: String,
  city: String,
  landmark: String,
  address: String,
  alternateMobileNumber: String,
  isDefault: Boolean,
  locationType: {
    type: String,
    enum: ["home", "work"],
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  mobile: String,
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  profile: {
    name: String,
    avatar: String,
    addresses: [addressSchema],
    phone: String,
    dateOfBirth: Date,
  },
  defaultAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "address",
  },

  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving it to the database
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const User = mongoose.model("user", userSchema, "users", {
  overwriteModels: true,
});
module.exports = User;
