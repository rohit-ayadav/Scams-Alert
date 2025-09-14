import mongoose from "mongoose";
import ScamIdentifier from "./identifier.models";

const evidenceSchema = new mongoose.Schema({
    url: { type: String, required: true },
    mimeType: { type: String },
    size: { type: Number },
    ocrText: { type: String },
    piiRedacted: { type: Boolean, default: false }
});

const reportSchema = new mongoose.Schema({
    // Author info
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isAnonymous: { type: Boolean, default: true },

    // Core Scam details
    title: { type: String, required: true },
    narrative: { type: String, required: true },
    scamTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "ScamType", required: true },
    platform: {
        type: String,
        enum: ["WhatsApp", "Instagram", "Facebook", "Telegram", "Email", "Phone Call", "Other"],// physical type like otp, social etc
        required: true
    },
    incidentDate: { type: Date },
    city: { type: String },
    state: { type: String },
    country: { type: String, default: "IN" },
    moneyLost: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },

    // Identifiers & Evidence
    identifiers: [ScamIdentifier.schema],
    evidenceFiles: [evidenceSchema],

    // Community & moderation
    status: {
        type: String,
        enum: ["unreviewed", "community_reviewed", "mod_verified", "rejected", "removed"],
        default: "unreviewed"
    },
    riskScore: { type: Number, default: 0 },
    votes: {
        useful: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        misleading: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    },
    commentsCount: { type: Number, default: 0 },

    // Categories (admin-managed)
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "ScamCategory" },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId },

    // Additional scam details
    methodOfContact: {
        type: String,
        enum: ["Cold Call", "SMS", "Email", "Social Media DM", "In-person", "Other"]
    },
    targetDemographic: {
        type: String,
        enum: ["Students", "Elderly", "Job Seekers", "Business Owners", "Others"]
    },
    sophisticationLevel: {
        type: String,
        enum: ["basic", "intermediate", "advanced"],
        default: "basic"
    },

    // Financial impact details
    financialDetails: {
        initialAmount: { type: Number },
        totalLoss: { type: Number },
        recoveredAmount: { type: Number, default: 0 },
        bankInvolved: { type: String },
        transactionMethod: {
            type: String,
            enum: [
                "UPI",
                "Net Banking",
                "Credit/Debit Card",
                "Cash",
                "Cheque",
                "Bank Transfer (NEFT/RTGS/IMPS)",
                "Wallet (Paytm, PhonePe, etc.)",
                "Gift Card/Recharge Card",
                "Cryptocurrency",
                "Other"
            ]
        },
        refundStatus: {
            type: String,
            enum: ["not_attempted", "pending", "partial", "full", "denied"],
            default: "not_attempted"
        }
    },

    // Optional advanced fields
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    slug: { type: String, unique: true },
    searchKeywords: [{ type: String }],
    relatedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: "ScamReport" }],
    timeline: [
        {
            step: { type: String },
            time: { type: Date }
        }
    ],
    dispute: {
        isDisputed: { type: Boolean, default: false }, // dispute means the report's validity is challenged
        statement: { type: String }
    },
    modNotes: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Auto-update updatedAt
reportSchema.pre("save", function (next) {
    this.updatedAt = new Date();

    // Auto-generate slug from title if not present
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    }

    // Optional: generate searchKeywords from title, narrative, tags
    if (!this.searchKeywords || this.searchKeywords.length === 0) {
        const keywords = this.title.split(" ").concat(this.tags || []);
        this.searchKeywords = keywords.map(k => k.toLowerCase());
    }

    next();
});

const ScamReport = mongoose.models.ScamReport || mongoose.model("ScamReport", reportSchema);
export default ScamReport;
