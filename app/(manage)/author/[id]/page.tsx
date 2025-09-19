import { BlogPostType } from "@/types/blogs-types";
import { connectDB } from "@/utils/db";
import Blog from "@/models/blogs.models";
import User from "@/models/users.models";
import { Metadata } from "next";
import { ErrorMessage } from "@/lib/ErrorMessage";
import { isValidObjectId } from "mongoose";
import serializeDocument from "@/utils/date-formatter";
import AuthorPage, { Author } from "@/app/(settings)/profile/id-omponent/Profile";
import ProfileNEW from "@/app/(manage)/author/[id]/ProfileComponent/ProfileNew";
import { isValidUrl } from "@/lib/common-function";

async function getPostData(id: string) {
    try {
        await connectDB();
        let user: Author | null = null;
        if (!isValidObjectId(id)) {
            const username = decodeURIComponent(id);
            user = await User.findOne({ username }).lean() as unknown as Author;
        } else {
            user = await User.findById(id).lean() as unknown as Author;
        }
        // console.log(`User: ${JSON.stringify(user)}`);
        if (!user) {
            return { success: false, statusCode: 404 };
        }
        let postData = await Blog.find({
            createdBy: user.email,
            status: { $nin: ["draft", "archived", "deleted"] }
        }).lean() as unknown as BlogPostType[];
        if (!postData || postData.length === 0) {
            return { success: false, statusCode: 404 };
        }
        user = serializeDocument(user);
        postData = postData.map(serializeDocument);
        return {
            success: true,
            data: postData as BlogPostType[],
            author: user ? { ...user, _id: user._id.toString() } as Author : null
        };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const response = await getPostData(params.id);

    if (!response || !response.success || !response.author) {
        return {
            title: "Reporter Not Found | ScamAlert",
            description: "The requested reporter profile could not be found on ScamAlert. Explore verified scam reports and community-shared experiences.",
            openGraph: {
                title: "Reporter Not Found",
                description: "This reporter does not exist or has not submitted any scam reports. Discover scam awareness resources and safety guides on ScamAlert.",
                images: [{ url: "/default-profile.jpg", width: 1200, height: 630 }]
            },
            other: {
                "robots": "noindex, follow",
                "keywords": "scam reports, fraud awareness, scam prevention, community reports, scam alert platform"
            }
        };
    }

    const { author, data: posts } = response;

    function formatAuthorName(name: string): string {
        const words = name.split(" ");
        return words.length > 2 ? `${words.slice(0, 2).join(" ")}...` : name;
    }

    const reporterName = formatAuthorName(author.name);
    const description = `${author.name}'s scam reports and shared experiences on ScamAlert. Stay informed and avoid scams with trusted community insights.`;
    const url = `https://scamalert.in/reporter/${author.username}`;
    let thumbnail;
    if (isValidUrl(author.image))
        thumbnail = author.image;
    else if (author.image && !isValidUrl(author.image))
        thumbnail = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_300,h_300,c_fill,g_auto/${author.image}`;
    else thumbnail = "/default-profile.jpg";

    const lastUpdated = new Date(author?.updatedAt ?? new Date()).toISOString();

    return {
        title: `${reporterName} - Scam Reports & Community Insights | ScamAlert`,
        description,
        keywords: "scam reports, fraud awareness, scam prevention, community reports, ScamAlert",
        openGraph: {
            title: `🛡️ ${reporterName}’s Scam Reports & Safety Tips | ScamAlert`,
            description,
            url,
            siteName: "ScamAlert",
            type: "profile",
            images: [thumbnail],
            locale: "en_US"
        },
        twitter: {
            card: "summary_large_image",
            site: "@ScamAlert",
            creator: `@${author.username}`,
            title: `${reporterName} - Scam Reports & Community Alerts`,
            description,
            images: [{ url: thumbnail }]
        },
        alternates: {
            canonical: url
        },
        other: {
            "robots": "index, follow",
            "og:profile:first_name": author.name.split(" ")[0],
            "og:profile:last_name": author.name.split(" ").slice(1).join(" ") || "",
            "og:profile:username": author.username,
            "profile:last_updated": lastUpdated,
            "article:author": author.name,
            "profile:tagline": author.bio || "Scam Reporter & Community Member"
        }
    };
}

// export async function generateStaticParams() {
//     await connectDB();
//     const posts = await User.find({}, { username: 1, _id: 1 });

//     return posts.flatMap(post => [
//         { id: post._id.toString() },
//         { id: post.username }
//     ]);
// }

export default async function IndividualProfile({ params }: { params: { id: string } }) {
    const response = await getPostData(params.id);

    if (!response || !response.success) {
        switch (response?.statusCode) {
            case 404:
                return <ErrorMessage message="Reporter not found" />;
            case 403:
                return <ErrorMessage message="You don't have permission to view this report" />;
            case 401:
                return <ErrorMessage message="Please login to view this report" />;
            default:
                return <ErrorMessage message={response?.error || 'Failed to load report'} />;
        }
    }

    if (!response.data) {
        return <ErrorMessage message="No reports found for this reporter" />;
    }

    if (!response.author) {
        return <ErrorMessage message="Reporter not found" />;
    }

    // return <AuthorPage author={response.author} authorPosts={response.data} />;
    return <ProfileNEW authorPosts={response.data} author={response.author} />;
}