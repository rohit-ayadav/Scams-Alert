// category.model.ts
import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" }
});

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    subCategories: [subCategorySchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

categorySchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

const ScamCategory = mongoose.models.ScamCategory || mongoose.model("ScamCategory", categorySchema);
export default ScamCategory;
