import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function (this: any) {
      return this.provider === "credentials";
    }
  },
  image: {
    type: String
  },
  provider: {
    type: String,
    enum: ["google", "facebook", "twitter", "linkedin", "credentials"],
    default: "credentials"
  },
  providerId: {
    type: String
  },
  username: {
    type: String,
    unique: false,
    required: false
  },
  bio: {
    type: String,
    default: ""
  },
  reportsCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  theme: {
    type: String,
    default: "system"
  },
  role: {
    type: String,
    default: "user",
    required: true
  },
  resetPasswordToken: {
    type: String,
    required: false,
    trim: true,
    default: "",
  },
  resetPasswordTokenDate: {
    type: Date,
    required: false,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    required: false,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  website: {
    type: String,
    default: ""
  },
  socialLinks: [
    {
      platform: {
        type: String,
        enum: ["linkedin", "twitter", "facebook", "instagram", "other"]
      },
      url: String
    }
  ]
});

userSchema.pre("save", async function (next) {
  this.updatedAt = new Date();

  if (this.isModified("password") && typeof this.password === "string") {
    // Check if password is already hashed (bcrypt hashes start with $2b$ or $2a$)
    if (!this.password.startsWith("$2b$") && !this.password.startsWith("$2a$")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  if (typeof this.password !== "string") {
    throw new Error("Kindly login using your social account");
  }
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;