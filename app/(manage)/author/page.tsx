"use server";
import { connectDB } from '@/utils/db';
import User from '@/models/users.models';
import Blog from '@/models/blogs.models';
import AuthorsPage from './AuthorsPage';

type UserType = {
    email: string;
    name: string;
    image: string;
    bio: string;
    follower: number;
    following: number;
    noOfBlogs: number;
    createdAt: string;
    updatedAt: string;
    theme: string;
    _id: string;
    website?: string;
    socialLinks?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        instagram?: string;
        facebook?: string;
    };
    isEmailVerified: boolean;
    username: string;
    role: string;
};

async function getAuthorData() {
    try {
        await connectDB();
        const authors = await User.find({
            email: { $in: (await Blog.distinct('createdBy')) }
        }).lean();

        const mappedAuthors: UserType[] = authors.map((author: any) => ({
            email: author.email,
            name: author.name,
            image: author.image,
            bio: author.bio,
            follower: author.follower,
            following: author.following,
            noOfBlogs: author.noOfBlogs,
            createdAt: author.createdAt?.toString() ?? '',
            updatedAt: author.updatedAt?.toString() ?? '',
            theme: author.theme,
            _id: author._id?.toString() ?? '',
            website: author.website,
            socialLinks: author.socialLinks,
            isEmailVerified: author.isEmailVerified,
            username: author.username,
            role: author.role,
        }));

        return {
            success: true,
            authors: mappedAuthors,
            totalAuthors: mappedAuthors.length,
            message: ''
        };
    } catch (err: any) {
        return {
            success: false,
            authors: [],
            message: err.message || '',
            totalAuthors: 0
        };
    }
}

const AurhorsHomePage = async function () {

    return (
        <AuthorsPage {...await getAuthorData()} />
    );
}

export default AurhorsHomePage;