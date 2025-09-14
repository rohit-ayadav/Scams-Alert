import ScamCategory from '@/models/category.models';
import ScamType from '@/models/scamType.model';
import { connectDB } from '@/utils/db';
import React from 'react'
import Report from './Report';
import serializeDocument from '@/utils/date-formatter';

export interface ScamCategory {
    name: string;
    description: string;
    subCategories: {
        name: string;
        description: string;
    }[];
}
export interface ScamType {
    name: string;
    description: string;
}
const fetchData = async () => {
    await connectDB();
    const categories = await ScamCategory.find({}).lean();
    const types = await ScamType.find({}).lean();
    const categoriesStr = serializeDocument(categories);
    const typesStr = serializeDocument(types);
    return { categories: categoriesStr, types: typesStr };
}

const ReportPage = async () => {
    const { categories, types } = await fetchData() as unknown as { categories: ScamCategory[], types: ScamType[] };

    return (
        <div>
            {/* <>{categories.length === 0 && types.length === 0 && <div>No categories or types available</div>}</>
            <>
                <h1 className='text-3xl font-bold mb-4'>Report a Scam</h1>
                <pre>
                    {JSON.stringify(categories, null, 2)}
                </pre>
                <pre>
                    {JSON.stringify(types, null, 2)}
                </pre>
            </> */}

            <Report categories={categories} types={types} />
        </div>
    )
}

export default ReportPage;