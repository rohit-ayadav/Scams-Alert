"use client";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Assuming you have this utility
import { Briefcase, GraduationCap, CreditCard, TrendingDown, ShoppingCart, Link2, ShieldAlert, Heart, Coins, Wrench, Laptop, AlertTriangle } from "lucide-react";

const CategoryBrowser = () => {
    const { isDarkMode } = useTheme();
    const router = useRouter();

    // Add icons to scam categories with color variants

    const CATEGORIES_WITH_ICONS = [
        {
            value: "job",
            label: "Job / Employment Scam",
            icon: <Briefcase size={24} />,
            gradient: "from-blue-500 to-cyan-600"
        },
        {
            value: "internship",
            label: "Internship Scam",
            icon: <GraduationCap size={24} />,
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            value: "loan",
            label: "Loan / Finance Scam",
            icon: <CreditCard size={24} />,
            gradient: "from-purple-500 to-indigo-600"
        },
        {
            value: "investment",
            label: "Investment / Trading Scam",
            icon: <TrendingDown size={24} />,
            gradient: "from-red-500 to-orange-600"
        },
        {
            value: "ecommerce",
            label: "E-commerce / Online Purchase Scam",
            icon: <ShoppingCart size={24} />,
            gradient: "from-green-500 to-emerald-600"
        },
        {
            value: "phishing",
            label: "Phishing / Fraud Links",
            icon: <Link2 size={24} />,
            gradient: "from-yellow-500 to-amber-600"
        },
        {
            value: "identity",
            label: "Identity Theft",
            icon: <ShieldAlert size={24} />,
            gradient: "from-pink-500 to-rose-600"
        },
        {
            value: "romance",
            label: "Romance / Relationship Scam",
            icon: <Heart size={24} />,
            gradient: "from-red-500 to-rose-600"
        },
        {
            value: "crypto",
            label: "Crypto / Digital Asset Scam",
            icon: <Coins size={24} />,
            gradient: "from-indigo-500 to-blue-600"
        },
        {
            value: "service",
            label: "Fake Services / Agencies",
            icon: <Wrench size={24} />,
            gradient: "from-teal-500 to-green-600"
        },
        {
            value: "techsupport",
            label: "Tech Support Scam",
            icon: <Laptop size={24} />,
            gradient: "from-gray-500 to-slate-600"
        },
        {
            value: "others",
            label: "Others",
            icon: <AlertTriangle size={24} />,
            gradient: "from-gray-400 to-gray-600"
        }
    ];


    const handleCategoryClick = (category: string) => {
        router.push(`/reports?category=${category}`);
    };

    // Container animations
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    // Card animations
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className={cn(
            "py-16",
            isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
        )}>
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    <span className={cn(
                        "inline-block pb-2 border-b-2",
                        isDarkMode ? "border-blue-400" : "border-blue-600"
                    )}>
                        Explore by Category
                    </span>
                </h2>
                <p className={cn(
                    "text-center mb-8 max-w-2xl mx-auto",
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                    Discover content tailored to your interests. Select a category to explore specialized articles and insights.
                </p>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {CATEGORIES_WITH_ICONS.map((category, index) => (
                        <motion.div
                            key={category.value}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCategoryClick(category.value)}
                            className="cursor-pointer"
                        >
                            <Card className={cn(
                                "h-full transition-all duration-300 overflow-hidden border",
                                isDarkMode ?
                                    "bg-gray-800 hover:bg-gray-700 border-gray-700" :
                                    "bg-white hover:bg-blue-50/80 border-gray-200"
                            )}>
                                <div className={`h-1.5 w-full bg-gradient-to-r ${category.gradient}`}></div>
                                <CardContent className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
                                    <div className={cn(
                                        "mb-3 p-2 rounded-full",
                                        isDarkMode ?
                                            "text-blue-300 bg-blue-900/20" :
                                            "text-blue-600 bg-blue-100"
                                    )}>
                                        {category.icon}
                                    </div>
                                    <CardTitle className={cn(
                                        "text-center text-sm sm:text-base font-medium",
                                        isDarkMode ? "text-gray-100" : "text-gray-800"
                                    )}>
                                        {category.label}
                                    </CardTitle>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default CategoryBrowser;