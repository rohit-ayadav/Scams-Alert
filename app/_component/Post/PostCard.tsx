import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Eye, ThumbsUp, ImageIcon, ArrowRight, Clipboard, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from '@/context/ThemeContext';
import { BlogPostType, UserType } from '@/types/blogs-types';
import UserAvatar from './UserAvatar';
import { formatCount } from '@/lib/common-function';

interface BlogPostCardProps {
    post: BlogPostType;
    user?: UserType;
    showActions?: boolean;
    author?: UserType;
}

export const getCategoryColor = (category: string): { bg: string; text: string; border: string } => {
    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
        DSA: {
            bg: 'bg-blue-100/90 dark:bg-blue-900/90',
            text: 'text-blue-800 dark:text-blue-200',
            border: 'border-blue-200 dark:border-blue-800'
        },
        WebDev: {
            bg: 'bg-purple-100/90 dark:bg-purple-900/90',
            text: 'text-purple-800 dark:text-purple-200',
            border: 'border-purple-200 dark:border-purple-800'
        },
        "Job Posting": {
            bg: 'bg-green-100/90 dark:bg-green-900/90',
            text: 'text-green-800 dark:text-green-200',
            border: 'border-green-200 dark:border-green-800'
        },
        AI: {
            bg: 'bg-orange-100/90 dark:bg-orange-900/90',
            text: 'text-orange-800 dark:text-orange-200',
            border: 'border-orange-200 dark:border-orange-800'
        },
        ML: {
            bg: 'bg-red-100/90 dark:bg-red-900/90',
            text: 'text-red-800 dark:text-red-200',
            border: 'border-red-200 dark:border-red-800'
        },
        "Skill Development": {
            bg: 'bg-yellow-100/90 dark:bg-yellow-900/90',
            text: 'text-yellow-800 dark:text-yellow-200',
            border: 'border-yellow-200 dark:border-yellow-800'
        },
        "Resume and Cover Letter Guidance": {
            bg: 'bg-indigo-100/90 dark:bg-indigo-900/90',
            text: 'text-indigo-800 dark:text-indigo-200',
            border: 'border-indigo-200 dark:border-indigo-800'
        },
        "Interview Preparation": {
            bg: 'bg-pink-100/90 dark:bg-pink-900/90',
            text: 'text-pink-800 dark:text-pink-200',
            border: 'border-pink-200 dark:border-pink-800'
        },
        "Tech-news": {
            bg: 'bg-cyan-100/90 dark:bg-cyan-900/90',
            text: 'text-cyan-800 dark:text-cyan-200',
            border: 'border-cyan-200 dark:border-cyan-800'
        },
        Internship: {
            bg: 'bg-teal-100/90 dark:bg-teal-900/90',
            text: 'text-teal-800 dark:text-teal-200',
            border: 'border-teal-200 dark:border-teal-800'
        },
        Others: {
            bg: 'bg-gray-100/90 dark:bg-gray-800/90',
            text: 'text-gray-800 dark:text-gray-200',
            border: 'border-gray-200 dark:border-gray-700'
        }
    };
    return colors[category] || colors.Others;
};

export const PostCard = ({ post, user, showActions = false, author }: BlogPostCardProps) => {
    const router = useRouter();
    const { isDarkMode } = useTheme();
    const categoryColor = getCategoryColor(post.category);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const copyLink = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        e.stopPropagation();

        const formattedDate = formatDate(post.createdAt);
        // const text = `Read this amazing blog post titled "${post.title}" by ${author?.name || user?.name || 'Anonymous'} on ${formattedDate}\n\nRead more at ${window.location.origin}/blogs/${slug}`;
        const text = `${post.title}\nRead here: ${window.location.origin}/blogs/${slug}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            toast.success('Link copied to clipboard');
        } else {
            toast.error('Clipboard API not available');
        }
    };

    const truncateText = (text: string, maxLength: number): string => {
        if (!text) return '';

        // 1. Remove HTML tags
        let plainText = text.replace(/<[^>]+>/g, '');

        // 2. Remove Markdown headings (#, ##, ###, etc. at the beginning of lines)
        plainText = plainText.replace(/^#+\s*/gm, '');

        // 3. Remove bold, italic, code markdown
        plainText = plainText.replace(/(\*\*|__)(.*?)\1|(\*|_)(.*?)\3|`([^`]+)`/g, '$2$4$5').trim();

        if (plainText.length <= maxLength) return plainText;

        // 4. Truncate without cutting in the middle of a word
        const ellipsisIndex = plainText.lastIndexOf(' ', maxLength);
        const safeTruncate = ellipsisIndex !== -1
            ? plainText.substring(0, ellipsisIndex)
            : plainText.substring(0, maxLength);

        return safeTruncate.trim() + '...';
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            const response = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            toast.success('Post deleted successfully');
            router.refresh();
        } catch (error) {
            toast.error('Failed to delete post');
            console.error(error);
        }
    };

    return (
        <Card className={`h-full overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md ${isDarkMode ? 'dark bg-zinc-900 hover:shadow-zinc-800 border-zinc-800' : 'bg-white hover:shadow-gray-200 border-gray-200'} group`}>
            <Link
                href={post.category === 'Tech-news' ? `/tech-news/${post.slug}` : `/blogs/${post.slug}`}
                className="flex-1 flex flex-col group relative"
                title={`Read "${post.title}"`}
            >
                <div className="relative">
                    <div
                        className={`h-32 sm:h-40 md:h-48 w-full bg-gradient-to-br ${isDarkMode ? 'from-blue-900 to-indigo-950 group-hover:from-blue-800 group-hover:to-indigo-900' : 'from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200'} transition-all duration-300`}
                        style={{
                            backgroundImage: post.thumbnail ? `url(${post.thumbnail})` : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                        aria-label={post.title}
                        title={post.thumbnail ? `Click to read the post` : `No thumbnail available for "${post.title}"`}
                    >
                        {!post.thumbnail && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ImageIcon className={`h-12 w-12 ${isDarkMode ? 'text-blue-600' : 'text-blue-400'} opacity-50`} />
                            </div>
                        )}
                    </div>

                    <div className="absolute top-2 left-2 z-10">
                        <Badge
                            variant="outline"
                            className={`capitalize text-xs shadow-sm ${categoryColor.bg} ${categoryColor.text} ${categoryColor.border}`}
                            title={`Category: ${post.category}`}
                        >
                            {post.category}
                        </Badge>
                    </div>
                </div>

                <CardContent className={`flex-1 flex flex-col p-3 sm:p-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}
                            title={`Published on ${formatDate(post.createdAt)}`}
                        >
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.createdAt)}
                        </span>

                        <div className="flex items-center gap-2">
                            <span
                                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}
                                title={`${post.views || 0} views`}
                            >
                                <Eye className="h-3 w-3" />
                                {formatCount(post.views || 0)?.toLocaleString() || 0}
                            </span>
                            <span
                                className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-1`}
                                title={`${post.likes || 0} likes`}
                            >
                                <ThumbsUp className="h-3 w-3" />
                                {formatCount(post.likes || 0)?.toLocaleString() || 0}
                            </span>
                        </div>
                    </div>

                    <h3
                        className={`text-sm sm:text-base md:text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-100 group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'} transition-colors line-clamp-2`}
                        title={post.title}
                    >
                        {post.title}
                    </h3>

                    <p
                        className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2 sm:line-clamp-3 mb-2 flex-1`}
                        title={truncateText(post.content, 320)}
                    >
                        {truncateText(post.content, user ? 120 : 250)}
                    </p>

                    {user && (
                        <div className="mt-auto pt-2 flex items-center justify-between">
                            <div title='Click to view author profile' className="flex items-center gap-2">
                                <UserAvatar user={user} isDarkMode={isDarkMode} />
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => copyLink(e, post.slug)}
                                    className={`${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'} transition-colors`}
                                    title="Copy link to this post"
                                >
                                    <Clipboard className="h-4 w-4" />
                                </button>

                                <span
                                    className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} flex items-center gap-1 group-hover:gap-2 transition-all`}
                                    title="Click to read more"
                                >
                                    Read more
                                    <ArrowRight className="h-3 w-3" />
                                </span>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Link>

            {
                showActions && (
                    <CardFooter className={`p-3 border-t ${isDarkMode ? 'border-zinc-800' : 'border-gray-200'} flex items-center justify-between`}>
                        <div />

                        <div className="flex items-center gap-2">
                            <Link
                                href={`/edit/${post.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
                            >
                                Edit
                            </Link>
                            <button
                                className={`text-xs ${isDarkMode ? 'text-red-400' : 'text-red-600'} hover:underline`}
                                onClick={(e) => handleDelete(e, post._id)}
                            >
                                Delete
                            </button>
                            <Link
                                href={`/stats/${post.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className={`text-xs ${isDarkMode ? 'text-green-400' : 'text-green-600'} hover:underline`}
                            >
                                Stats
                            </Link>
                        </div>
                    </CardFooter>
                )
            }
        </Card >
    );
};

export default PostCard;