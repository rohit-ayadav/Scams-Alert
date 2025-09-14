import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import ScamReport from "@/models/report.models";

export async function POST(request: NextRequest) {
    await connectDB();
    const { title, narrative, scamTypeId, platform, incidentDate, city, state, country, moneyLost, currency, identifiers, evidenceFiles, isAnonymous, authorId, categoryId, subCategoryId, methodOfContact, targetDemographic, sophisticationLevel, financialDetails } = await request.json();
    if (!title || !narrative || !scamTypeId || !platform) {
        return NextResponse.json({ message: "Please fill in all required fields" }, { status: 400 });
    }
    try {
        const report = new ScamReport({
            title,
            narrative,
            scamTypeId,
            platform,
            incidentDate,
            city,
            state,
            country,
            moneyLost,
            currency,
            identifiers,
            evidenceFiles,
            isAnonymous,
            authorId,
            categoryId,
            subCategoryId,
            methodOfContact,
            targetDemographic,
            sophisticationLevel,
            financialDetails
        });
        await report.save();
        return NextResponse.json({ message: "Report submitted successfully" }, { status: 201 });
    } catch (error: any) {
        console.error("Error submitting report:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}