import ScamCategory from '@/models/category.models';
import ScamType from '@/models/scamType.model';
import { connectDB } from '@/utils/db';
import React from 'react';

interface Category {
    name: string;
    description: string;
    subCategories: {
        name: string;
        description: string;
    }[];
}
interface ScamType {
    name: string;
    description: string;
}


async function seedDatabase(): Promise<string> {
    try {
        await connectDB();

        const categories = [
            {
                name: "Financial Scam",
                description: "Scams related to money, banking, and investments",
                subCategories: [
                    { name: "UPI/Bank Fraud", description: "Fraudulent bank transfers, UPI scams" },
                    { name: "Investment/Crypto Scam", description: "Fake investments or crypto schemes" },
                    { name: "Insurance Scam", description: "Fake insurance or claim scams" },
                    { name: "Loan Scam", description: "Fraudulent loan offers" }
                ]
            },
            {
                name: "Social Engineering",
                description: "Scams using psychological manipulation",
                subCategories: [
                    { name: "Romance Scam", description: "Online dating/romance scams" },
                    { name: "Job Scam", description: "Fake jobs, placement fraud" },
                    { name: "Education/Admission Scam", description: "Fake courses or admissions" },
                    { name: "Charity/Donation Scam", description: "Fake donation requests" }
                ]
            },
            {
                name: "E-commerce & Online",
                description: "Scams happening on online platforms",
                subCategories: [
                    { name: "E-commerce/Fake Seller Scam", description: "Fake sellers on e-commerce sites" },
                    { name: "Rental/Home Scam", description: "Fake rental listings or property scams" },
                    { name: "Travel/Tourism Scam", description: "Fake travel deals or bookings" }
                ]
            },
            {
                name: "Other",
                description: "Miscellaneous scams",
                subCategories: [
                    { name: "Tech Support Scam", description: "Fake tech support calls/messages" },
                    { name: "Lottery/Prize Scam", description: "Fake lottery or prize notifications" },
                    { name: "Identity Theft", description: "Identity or personal information fraud" }
                ]
            }
        ];

        for (const category of categories) {
            const exists = await ScamCategory.findOne({ name: category.name });
            if (!exists) {
                await ScamCategory.create(category);
            }
        }

        const scamTypes = [
            { name: "UPI/Bank Fraud", description: "Fraudulent UPI or bank transfers" },
            { name: "Phishing/Email Scam", description: "Phishing emails or fake notifications" },
            { name: "Social Media Scam", description: "Scams via Instagram, Facebook, WhatsApp" },
            { name: "Job Scam", description: "Fake job offers or placement fraud" },
            { name: "Investment/Crypto Scam", description: "Fake investments or crypto schemes" },
            { name: "Romance/Online Dating Scam", description: "Online dating/romance scams" },
            { name: "Lottery/Prize Scam", description: "Fake lottery or prize notifications" },
            { name: "E-commerce/Fake Seller Scam", description: "Fake sellers on e-commerce sites" },
            { name: "Tech Support/Call Center Scam", description: "Fake tech support calls/messages" },
            { name: "Rental/Home Scam", description: "Fake rental listings or property scams" },
            { name: "Charity/Donation Scam", description: "Fake donation requests" },
            { name: "Travel/Tourism Scam", description: "Fake travel deals or bookings" },
            { name: "Insurance Scam", description: "Fake insurance or claim scams" },
            { name: "Education/Admission Scam", description: "Fake courses or admissions" },
            { name: "Identity Theft", description: "Identity or personal information fraud" },
            { name: "Gift Card/Recharge Scam", description: "Fake gift card or recharge scams" },
            { name: "Other", description: "Miscellaneous scams" }
        ];

        for (const type of scamTypes) {
            const exists = await ScamType.findOne({ name: type.name });
            if (!exists) {
                await ScamType.create(type);
            }
        }

        return "Seeding completed!";
    } catch (err: any) {
        return "Error seeding database: " + err?.message || err;
    }
}
const fetchData = async () => {
    // fetch all that is seeded to verify
    await connectDB();
    const categories = await ScamCategory.find({}).lean();
    const types = await ScamType.find({}).lean();
    return { categories, types };
}

const Test = async () => {
    const status = await seedDatabase();
    const data = await fetchData();

    return (
        <div>
            <div>
                <h2>Status:</h2>
                <pre>{status}</pre>
            </div>
            <div>
                <h2>Categories:</h2>
                <pre>{JSON.stringify(data.categories, null, 2)}</pre>
            </div>
            <div>
                <h2>Types:</h2>
                <pre>{JSON.stringify(data.types, null, 2)}</pre>
            </div>
        </div>
    );
};

export default Test;

/*

Categories:
[
  {
    "_id": "68bc4cf57f43832a80f7b56f",
    "name": "Financial Scam",
    "description": "Scams related to money, banking, and investments",
    "subCategories": [
      {
        "name": "UPI/Bank Fraud",
        "description": "Fraudulent bank transfers, UPI scams",
        "_id": "68bc4cf57f43832a80f7b570"
      },
      {
        "name": "Investment/Crypto Scam",
        "description": "Fake investments or crypto schemes",
        "_id": "68bc4cf57f43832a80f7b571"
      },
      {
        "name": "Insurance Scam",
        "description": "Fake insurance or claim scams",
        "_id": "68bc4cf57f43832a80f7b572"
      },
      {
        "name": "Loan Scam",
        "description": "Fraudulent loan offers",
        "_id": "68bc4cf57f43832a80f7b573"
      }
    ],
    "createdAt": "2025-09-06T15:02:13.883Z",
    "updatedAt": "2025-09-06T15:02:13.890Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf67f43832a80f7b578",
    "name": "Social Engineering",
    "description": "Scams using psychological manipulation",
    "subCategories": [
      {
        "name": "Romance Scam",
        "description": "Online dating/romance scams",
        "_id": "68bc4cf67f43832a80f7b579"
      },
      {
        "name": "Job Scam",
        "description": "Fake jobs, placement fraud",
        "_id": "68bc4cf67f43832a80f7b57a"
      },
      {
        "name": "Education/Admission Scam",
        "description": "Fake courses or admissions",
        "_id": "68bc4cf67f43832a80f7b57b"
      },
      {
        "name": "Charity/Donation Scam",
        "description": "Fake donation requests",
        "_id": "68bc4cf67f43832a80f7b57c"
      }
    ],
    "createdAt": "2025-09-06T15:02:14.117Z",
    "updatedAt": "2025-09-06T15:02:14.118Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf67f43832a80f7b583",
    "name": "E-commerce & Online",
    "description": "Scams happening on online platforms",
    "subCategories": [
      {
        "name": "E-commerce/Fake Seller Scam",
        "description": "Fake sellers on e-commerce sites",
        "_id": "68bc4cf67f43832a80f7b584"
      },
      {
        "name": "Rental/Home Scam",
        "description": "Fake rental listings or property scams",
        "_id": "68bc4cf67f43832a80f7b585"
      },
      {
        "name": "Travel/Tourism Scam",
        "description": "Fake travel deals or bookings",
        "_id": "68bc4cf67f43832a80f7b586"
      }
    ],
    "createdAt": "2025-09-06T15:02:14.305Z",
    "updatedAt": "2025-09-06T15:02:14.306Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf67f43832a80f7b589",
    "name": "Other",
    "description": "Miscellaneous scams",
    "subCategories": [
      {
        "name": "Tech Support Scam",
        "description": "Fake tech support calls/messages",
        "_id": "68bc4cf67f43832a80f7b58a"
      },
      {
        "name": "Lottery/Prize Scam",
        "description": "Fake lottery or prize notifications",
        "_id": "68bc4cf67f43832a80f7b58b"
      },
      {
        "name": "Identity Theft",
        "description": "Identity or personal information fraud",
        "_id": "68bc4cf67f43832a80f7b58c"
      }
    ],
    "createdAt": "2025-09-06T15:02:14.393Z",
    "updatedAt": "2025-09-06T15:02:14.394Z",
    "__v": 0
  }
]
Types:
[
  {
    "_id": "68bc4cf67f43832a80f7b58f",
    "name": "UPI/Bank Fraud",
    "description": "Fraudulent UPI or bank transfers",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:14.844Z",
    "updatedAt": "2025-09-06T15:02:14.845Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf67f43832a80f7b592",
    "name": "Phishing/Email Scam",
    "description": "Phishing emails or fake notifications",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:14.926Z",
    "updatedAt": "2025-09-06T15:02:14.926Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf77f43832a80f7b595",
    "name": "Social Media Scam",
    "description": "Scams via Instagram, Facebook, WhatsApp",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:15.102Z",
    "updatedAt": "2025-09-06T15:02:15.103Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf77f43832a80f7b598",
    "name": "Job Scam",
    "description": "Fake job offers or placement fraud",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:15.185Z",
    "updatedAt": "2025-09-06T15:02:15.185Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf77f43832a80f7b59b",
    "name": "Investment/Crypto Scam",
    "description": "Fake investments or crypto schemes",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:15.267Z",
    "updatedAt": "2025-09-06T15:02:15.268Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf77f43832a80f7b59e",
    "name": "Romance/Online Dating Scam",
    "description": "Online dating/romance scams",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:15.357Z",
    "updatedAt": "2025-09-06T15:02:15.358Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf77f43832a80f7b5a1",
    "name": "Lottery/Prize Scam",
    "description": "Fake lottery or prize notifications",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:15.458Z",
    "updatedAt": "2025-09-06T15:02:15.459Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf77f43832a80f7b5a4",
    "name": "E-commerce/Fake Seller Scam",
    "description": "Fake sellers on e-commerce sites",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:15.543Z",
    "updatedAt": "2025-09-06T15:02:15.544Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf77f43832a80f7b5a7",
    "name": "Tech Support/Call Center Scam",
    "description": "Fake tech support calls/messages",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:15.625Z",
    "updatedAt": "2025-09-06T15:02:15.625Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf77f43832a80f7b5aa",
    "name": "Rental/Home Scam",
    "description": "Fake rental listings or property scams",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:15.990Z",
    "updatedAt": "2025-09-06T15:02:15.990Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf87f43832a80f7b5ad",
    "name": "Charity/Donation Scam",
    "description": "Fake donation requests",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:16.069Z",
    "updatedAt": "2025-09-06T15:02:16.069Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf87f43832a80f7b5b0",
    "name": "Travel/Tourism Scam",
    "description": "Fake travel deals or bookings",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:16.152Z",
    "updatedAt": "2025-09-06T15:02:16.152Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf87f43832a80f7b5b3",
    "name": "Insurance Scam",
    "description": "Fake insurance or claim scams",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:16.229Z",
    "updatedAt": "2025-09-06T15:02:16.230Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf87f43832a80f7b5b6",
    "name": "Education/Admission Scam",
    "description": "Fake courses or admissions",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:16.312Z",
    "updatedAt": "2025-09-06T15:02:16.312Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf87f43832a80f7b5b9",
    "name": "Identity Theft",
    "description": "Identity or personal information fraud",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:16.391Z",
    "updatedAt": "2025-09-06T15:02:16.391Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf87f43832a80f7b5bc",
    "name": "Gift Card/Recharge Scam",
    "description": "Fake gift card or recharge scams",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:16.473Z",
    "updatedAt": "2025-09-06T15:02:16.473Z",
    "__v": 0
  },
  {
    "_id": "68bc4cf87f43832a80f7b5bf",
    "name": "Other",
    "description": "Miscellaneous scams",
    "isActive": true,
    "createdAt": "2025-09-06T15:02:16.551Z",
    "updatedAt": "2025-09-06T15:02:16.551Z",
    "__v": 0
  }
]
*/