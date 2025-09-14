"use client";
import React, { useState } from 'react';
import { ScamCategory, ScamType } from './page';

const Report = ({ categories, types }: { categories: ScamCategory[], types: ScamType[] }) => {
    const [formData, setFormData] = useState({
        // Core details
        title: '',
        narrative: '',
        scamTypeId: '',
        platform: '',
        incidentDate: '',
        city: '',
        state: '',
        moneyLost: '',

        // Contact method
        methodOfContact: '',
        targetDemographic: '',
        sophisticationLevel: 'basic',

        // Financial details
        initialAmount: '',
        totalLoss: '',
        bankInvolved: '',
        transactionMethod: '',

        // Categories
        categoryId: '',
        subCategoryId: '',

        // Optional fields
        tags: '',
        isAnonymous: true
    });

    const [selectedCategory, setSelectedCategory] = useState<ScamCategory | null>(null);
    const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleCategoryChange = (categoryId: string) => {
        const category = categories.find(cat => cat.name === categoryId);
        setSelectedCategory(category || null);
        setFormData(prev => ({
            ...prev,
            categoryId,
            subCategoryId: '' // Reset subcategory when category changes
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setEvidenceFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const submitFormData = new FormData();

        // Add all form fields
        Object.entries(formData).forEach(([key, value]) => {
            submitFormData.append(key, value.toString());
        });

        // Add files
        evidenceFiles.forEach((file, index) => {
            submitFormData.append(`evidenceFiles`, file);
        });

        try {
            const res = await fetch('/api/report', {
                method: 'POST',
                body: submitFormData
            });

            if (!res.ok) {
                throw new Error('Failed to submit report');
            }

            alert('Report submitted successfully!');
            // Reset form or redirect
        } catch (error) {
            console.error('Error submitting report:', error);
            alert('Failed to submit report. Please try again.');
        }
    };

    const platforms = ["WhatsApp", "Instagram", "Facebook", "Telegram", "Email", "Phone Call", "Other"];
    const contactMethods = ["Cold Call", "SMS", "Email", "Social Media DM", "In-person", "Other"];
    const demographics = ["Students", "Elderly", "Job Seekers", "Business Owners", "Others"];
    const sophisticationLevels = ["basic", "intermediate", "advanced"];
    const transactionMethods = [
        "UPI", "Net Banking", "Credit/Debit Card", "Cash", "Cheque",
        "Bank Transfer (NEFT/RTGS/IMPS)", "Wallet (Paytm, PhonePe, etc.)",
        "Gift Card/Recharge Card", "Cryptocurrency", "Other"
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-red-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">Report a Scam</h1>
                        <p className="text-red-100 mt-2">Help protect others by sharing your experience</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        {/* Privacy Setting */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    name="isAnonymous"
                                    checked={formData.isAnonymous}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="text-sm font-medium text-blue-900">
                                    Submit this report anonymously
                                </span>
                            </label>
                        </div>

                        {/* Basic Information */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Report Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Brief title describing the scam"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Detailed Description *
                                </label>
                                <textarea
                                    name="narrative"
                                    value={formData.narrative}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    placeholder="Describe what happened in detail. Include how you were contacted, what the scammer said or did, and how the scam unfolded."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Scam Category *
                                    </label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={(e) => handleCategoryChange(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category.name} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedCategory && selectedCategory.subCategories.length > 0 && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sub-category
                                        </label>
                                        <select
                                            name="subCategoryId"
                                            value={formData.subCategoryId}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        >
                                            <option value="">Select sub-category</option>
                                            {selectedCategory.subCategories.map((subCat) => (
                                                <option key={subCat.name} value={subCat.name}>
                                                    {subCat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Scam Type *
                                    </label>
                                    <select
                                        name="scamTypeId"
                                        value={formData.scamTypeId}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Select scam type</option>
                                        {types.map((type) => (
                                            <option key={type.name} value={type.name}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Platform Used *
                                    </label>
                                    <select
                                        name="platform"
                                        value={formData.platform}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Select platform</option>
                                        {platforms.map((platform) => (
                                            <option key={platform} value={platform}>
                                                {platform}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Contact & Targeting Details */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Contact & Targeting Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        How were you contacted?
                                    </label>
                                    <select
                                        name="methodOfContact"
                                        value={formData.methodOfContact}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Select method</option>
                                        {contactMethods.map((method) => (
                                            <option key={method} value={method}>
                                                {method}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Target Demographic
                                    </label>
                                    <select
                                        name="targetDemographic"
                                        value={formData.targetDemographic}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Select demographic</option>
                                        {demographics.map((demo) => (
                                            <option key={demo} value={demo}>
                                                {demo}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sophistication Level
                                    </label>
                                    <select
                                        name="sophisticationLevel"
                                        value={formData.sophisticationLevel}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        {sophisticationLevels.map((level) => (
                                            <option key={level} value={level}>
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Location & Date */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Location & Date</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Incident Date
                                    </label>
                                    <input
                                        type="date"
                                        name="incidentDate"
                                        value={formData.incidentDate}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Enter city"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="Enter state"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Financial Details */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Financial Impact</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Initial Amount Requested (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="initialAmount"
                                        value={formData.initialAmount}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Total Money Lost (₹)
                                    </label>
                                    <input
                                        type="number"
                                        name="totalLoss"
                                        value={formData.totalLoss}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bank Involved
                                    </label>
                                    <input
                                        type="text"
                                        name="bankInvolved"
                                        value={formData.bankInvolved}
                                        onChange={handleInputChange}
                                        placeholder="Name of bank"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Transaction Method
                                    </label>
                                    <select
                                        name="transactionMethod"
                                        value={formData.transactionMethod}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Select method</option>
                                        {transactionMethods.map((method) => (
                                            <option key={method} value={method}>
                                                {method}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Evidence Upload */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Evidence (Optional)</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Evidence Files
                                </label>
                                <p className="text-sm text-gray-500 mb-3">
                                    Screenshots, photos, documents, or other evidence (Max 10 files, 5MB each)
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    accept="image/*,.pdf,.doc,.docx,.txt"
                                    className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                                {evidenceFiles.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-600">Selected files:</p>
                                        <ul className="text-sm text-gray-500 mt-1">
                                            {evidenceFiles.map((file, index) => (
                                                <li key={index}>• {file.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Additional Information</h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="e.g. fake job, lottery scam, romance scam (comma separated)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4 pt-6 border-t">
                            <button
                                type="button"
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Save as Draft
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
                            >
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Report;