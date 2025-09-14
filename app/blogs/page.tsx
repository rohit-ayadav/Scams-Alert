"use client";
import React, { Suspense, use, useCallback, useEffect, useState } from 'react'
import { StatsType } from '@/types/blogs-types';
import { BlogPostType, UserType, stateType } from '@/types/blogs-types';
import { useInView } from '@react-spring/web';
import { useSearchParams } from 'next/navigation';
import LoadingEffect from '@/lib/LoadingEffect';
import { useTheme } from '@/context/ThemeContext';
import HomePageBlogCollection from '@/app/blogs/components/HomePageBlogCollection';

interface PostsData {
    success: boolean;
    data: BlogPostType[];
    users: Record<string, UserType>;
    stats: StatsType;
    metadata: {
        currentPage: number;
        totalPages: number;
        totalPosts: number;
        hasMore: boolean;
    };
}

const BlogCollectionComponent = () => {
    const [ref, inView] = useInView();
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'all';
    const author = searchParams.get('author') || 'all';
    const sortBy = searchParams.get('sortBy') || 'newest';

    const [state, setState] = useState<stateType>({
        posts: [] as BlogPostType[],
        users: {} as Record<string, UserType>,
        loading: true,
        loadingMore: false,
        error: null as string | null,
        searchTerm: searchTerm,
        sortBy: sortBy,
        category: category,
        author: author,
        readingTime: 'all',
        dateRange: 'all',
        page: 1,
        limit: 6,
        stats: {
            totalLikes: 0,
            totalViews: 0,
            totalBlogs: 0,
            totalUsers: 0
        } as StatsType,
        metadata: {
            currentPage: 1,
            totalPages: 1,
            totalPosts: 0,
            hasMore: false,
            resultsPerPage: 9
        },
        statsLoading: true,
        initialized: false,
        techNews: false
    });
    const [searchLoading, setSearchLoading] = useState(false);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        setSearchLoading(true);
        const timer = setTimeout(() => {
            if (state.initialized) {
                fetchPosts();
            }
            setSearchLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [state.searchTerm]);

    useEffect(() => {
        state.initialized = true;
    }, []);

    useEffect(() => {
        if (inView && state.metadata.hasMore && !state.loadingMore && !state.loading && state.initialized) {
            setState(prev => ({ ...prev, loadingMore: true, page: prev.page + 1 }));
        }
    }, [inView, state.metadata.hasMore]);

    const fetchPosts = async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const res = await fetch(`/api/blogs?page=${state.page}&limit=${state.limit}&sortBy=${state.sortBy}&search=${state.searchTerm}&category=${state.category}&author=${state.author}&readingTime=${state.readingTime}&dateRange=${state.dateRange}&technews=${state.techNews}`);
            const data: PostsData = await res.json();

            setState(prev => ({
                ...prev,
                posts: state.page === 1 ? data.data : [...state.posts, ...data.data],
                users: data.users,
                stats: data.stats,
                metadata: {
                    ...data.metadata,
                    resultsPerPage: state.metadata.resultsPerPage
                },
                loading: false,
                loadingMore: false,
                statsLoading: false
            }));
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                error: error.message,
                loading: false,
                loadingMore: false
            }));
        }
    };

    useEffect(() => {
        if (state.initialized) {
            fetchPosts();
        }
    }, [state.page, state.category, state.sortBy, state.initialized, state.readingTime, state.author, state.dateRange]);

    const handleRetry = useCallback(() => {
        setState(prev => ({
            ...prev,
            page: 1,
            loading: true,
            error: null
        }));
        fetchPosts();
    }, [fetchPosts]);

    return (
        <>
            <HomePageBlogCollection state={state} handleRetry={handleRetry} setState={setState} searchLoading={searchLoading} />
            <div
                ref={ref}
                className={`text-center mt-0 py-8 mb-0
                ${state.metadata.hasMore ? 'block' : 'hidden'} 
                ${state.loadingMore ? 'hidden' : 'block'}
                ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}
            >
            </div>
        </>
    );
}

const BlogCollection = () => {
    return (
        <Suspense fallback={<LoadingEffect />}>
            <BlogCollectionComponent />
        </Suspense>
    )

}

export default BlogCollection;