// app/resources/page.tsx
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ShieldCheck, Phone, FileText, AlertTriangle } from "lucide-react";

export default function ResourcesPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Resources to Stay Safe from Scams</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Explore guides, official links, tools, and community tips to protect yourself from frauds and scams.
                </p>
            </div>

            <div className="grid gap-10 md:gap-16">
                {/* Scam Prevention Guides */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Book className="h-6 w-6 text-blue-500" /> Scam Prevention Guides
                    </h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            { title: "How to Spot Fake Job Offers", link: "/reports/category/job" },
                            { title: "Avoid Loan & EMI Scams", link: "/reports/category/loan" },
                            { title: "Safe Online Shopping Practices", link: "/reports/category/shopping" },
                        ].map((guide, idx) => (
                            <Card key={idx} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{guide.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Link href={guide.link}>
                                        <Button variant="outline" size="sm">Read Guide</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Helplines & Official Links */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <Phone className="h-6 w-6 text-green-500" /> Helplines & Official Links
                    </h2>
                    <ul className="space-y-4">
                        <li>
                            <a href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
                                Report Cyber Crime - Government of India
                            </a>
                        </li>
                        <li>
                            <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
                                RBI Fraud Awareness Portal
                            </a>
                        </li>
                        <li>
                            Local Police Helpline: <span className="font-medium">100</span>
                        </li>
                    </ul>
                </section>

                {/* Tools & Checklists */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-purple-500" /> Tools & Checklists
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Verify Company Registration</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <a href="https://www.mca.gov.in/" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline">Check Now</Button>
                                </a>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Scam Report Checklist</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <a href="/checklist.pdf" download>
                                    <Button variant="outline">Download PDF</Button>
                                </a>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Popular Scam Categories */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                        <AlertTriangle className="h-6 w-6 text-red-500" /> Popular Scam Categories
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { name: "Job Scams", link: "/reports/category/job" },
                            { name: "Loan Scams", link: "/reports/category/loan" },
                            { name: "Online Shopping Scams", link: "/reports/category/shopping" },
                            { name: "Phishing", link: "/reports/category/phishing" },
                        ].map((cat, idx) => (
                            <Link
                                key={idx}
                                href={cat.link}
                                className="px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
