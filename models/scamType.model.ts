// scamType.model.ts
import mongoose from "mongoose";

const scamTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // e.g., "UPI/Bank Fraud"
    description: { type: String, default: "" },           // optional details
    isActive: { type: Boolean, default: true },           // enable/disable scam type
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

scamTypeSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const ScamType = mongoose.models.ScamType || mongoose.model("ScamType", scamTypeSchema);
export default ScamType;
