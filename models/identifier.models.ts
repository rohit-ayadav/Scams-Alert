import mongoose from "mongoose";

const identifierSchema = new mongoose.Schema({
    kind: {
        type: String,
        enum: ["phone", "email", "upi", "url", "social", "ip", "other"],
        required: true
    },
    value: { type: String, required: true },
    normalized: { type: String, required: true }, // e.g., lowercase/email, digits-only phone/UPI
    firstSeen: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now },
    timesReported: { type: Number, default: 1 },

    // Optional metadata
    scamTypes: [{ type: String }], // types of scams this identifier appeared in
    platforms: [{ type: String }], // platforms where identifier was used
    relatedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }]
});

// Middleware: update lastSeen and timesReported automatically
identifierSchema.pre("save", function (next) {
    if (!this.firstSeen) this.firstSeen = new Date();
    this.lastSeen = new Date();
    next();
});

// Unique index to avoid duplicate identifiers
identifierSchema.index({ kind: 1, normalized: 1 }, { unique: true });

const ScamIdentifier = mongoose.models.ScamIdentifier || mongoose.model("ScamIdentifier", identifierSchema);
export default ScamIdentifier;
