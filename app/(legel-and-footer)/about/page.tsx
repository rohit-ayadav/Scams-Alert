"use client";
import React from 'react';
import {
  Mail, Linkedin, Instagram, Twitter, AlertTriangle, Users, BarChart, Lock, Sparkles, ArrowRight, BookOpen, Globe, Search, Award, Shield, FileText, Calendar, TrendingDown,
  HeartHandshake, Briefcase, ShoppingBag, ShieldAlert, User, LayoutDashboard, PenTool,
  Book, Eye, MessageSquare, UserCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from '@/context/ThemeContext';
import { GitHub } from 'react-feather';

const AboutPage = () => {
  const { isDarkMode } = useTheme();

  // Features for ScamAlert
  const features = [
    {
      title: "Easy Scam Reporting",
      description: "Quickly share your scam experience with our simple and guided editor to warn others.",
      icon: <PenTool className="w-6 h-6 text-primary" />
    },
    {
      title: "Track Your Reports",
      description: "Manage all your submitted reports in one dashboard and monitor their impact and visibility.",
      icon: <LayoutDashboard className="w-6 h-6 text-primary" />
    },
    {
      title: "Your Safety Profile",
      description: "Build a profile that highlights your reports and contributions to community fraud awareness.",
      icon: <User className="w-6 h-6 text-primary" />
    },
    {
      title: "Fraud Detection Tools",
      description: "Access advanced tools and resources to identify, prevent, and fight various types of scams.",
      icon: <ShieldAlert className="w-6 h-6 text-primary" />
    },
    {
      title: "Safety Guides & Resources",
      description: "Read comprehensive guides on how to stay safe from financial, online, and offline fraud.",
      icon: <Book className="w-6 h-6 text-primary" />
    },
    {
      title: "Global Awareness Network",
      description: "Your reports help spread awareness and protect people worldwide from similar frauds.",
      icon: <Globe className="w-6 h-6 text-primary" />
    },
    {
      title: "Community Safety Drives",
      description: "Participate in awareness campaigns, workshops, and events to promote scam safety education.",
      icon: <Users className="w-6 h-6 text-primary" />
    },
    {
      title: "Accessible to Everyone",
      description: "Whether you're a student, professional, senior citizen, or business owner—ScamAlert protects all.",
      icon: <HeartHandshake className="w-6 h-6 text-primary" />
    }
  ];

  // Target Audience for ScamAlert
  const audiences = [
    {
      title: "Job Fraud Victims",
      description: "For individuals who have faced fake job offers, recruitment scams, work-from-home frauds, or employment-related scams.",
      icon: <Briefcase className="w-6 h-6 text-primary" />
    },
    {
      title: "Online Shopping Victims",
      description: "For consumers who were cheated while shopping online through fake websites, fraudulent sellers, or fake products.",
      icon: <ShoppingBag className="w-6 h-6 text-primary" />
    },
    {
      title: "Investment Fraud Victims",
      description: "For those who lost money in crypto scams, Ponzi schemes, fake trading platforms, or other financial frauds.",
      icon: <TrendingDown className="w-6 h-6 text-primary" />
    },
    {
      title: "General Public",
      description: "For anyone who wants to stay safe, learn about scams, and help build a fraud-aware community.",
      icon: <Users className="w-6 h-6 text-primary" />
    }
  ];

  // Platform benefits
  const benefits = [
    {
      title: "Real Stories, Real Impact",
      description: "Every report shared helps prevent others from falling victim to similar scams.",
      icon: <MessageSquare className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Verified Community",
      description: "Our community verification system ensures authentic and reliable scam reports.",
      icon: <UserCheck className="w-6 h-6 text-green-500" />
    },
    {
      title: "Anonymous Reporting",
      description: "Share your experience anonymously while still helping others stay safe.",
      icon: <Eye className="w-6 h-6 text-purple-500" />
    },
    {
      title: "Expert Analysis",
      description: "Get insights and analysis from fraud prevention experts and cybersecurity professionals.",
      icon: <Award className="w-6 h-6 text-blue-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-900 dark:to-red-950/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,transparent,black)] opacity-10"></div>
        <div className="container mx-auto px-4 py-16 sm:py-20 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 items-center">
            <div className="lg:col-span-3">
              <Badge className="mb-4 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30">
                Protecting Communities Together
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Welcome to <span className="text-red-600 dark:text-red-400">ScamAlert</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl">
                Building scam-free awareness through community reporting and shared experiences. Your story can save someone else from fraud.
              </p>
              <div className="mt-8 flex gap-4 flex-wrap">
                <Button size="lg" className="rounded-md bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
                  onClick={() => window.location.href = "/create"}
                >
                  Report a Scam <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-md border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => window.location.href = "/reports"}
                >
                  Browse Reports
                </Button>
              </div>
            </div>
            <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl dark:shadow-red-900/10 ring-1 ring-gray-200 dark:ring-gray-800">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-gradient-to-tr from-red-100 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30">
                <img
                  src="/logo.png"
                  alt="ScamAlert Platform - Community-driven scam reporting and awareness"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30">
              Our Mission
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Empowering Communities Through Shared Awareness
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              To create a safer digital and physical world by empowering individuals to share their scam experiences,
              educate others about fraud tactics, and build a community where everyone can learn from each other's
              experiences to avoid becoming victims of scams and fraudulent activities.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center rounded-full px-6 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Join thousands protecting their communities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
              What We Offer
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Comprehensive Fraud Prevention Tools
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              ScamAlert provides all the tools and features you need to report scams, stay informed, and protect yourself and others.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="group overflow-hidden transition-all duration-300 border-transparent bg-white dark:bg-gray-800/50 hover:shadow-lg dark:hover:shadow-gray-800/10 dark:border-gray-800 hover:border-red-100 dark:hover:border-red-900/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center transition-colors group-hover:bg-red-100 dark:group-hover:bg-red-900/30">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30">
              Platform Benefits
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose ScamAlert?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our platform stands out with unique features designed to maximize community safety and fraud prevention.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Target Audience Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
              Who We Protect
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Who is ScamAlert for?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our platform serves everyone who wants to stay safe from scams and help protect their community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {audiences.map((audience, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-900/50 border border-transparent hover:border-purple-100 dark:hover:border-purple-900/50 bg-white dark:bg-gray-800/50"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  {audience.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {audience.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Built By Community Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30">
                Our Story
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                Built By & For the Community
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                ScamAlert was born from the need to create a centralized platform where people could share their scam
                experiences and help others avoid similar frauds. We believe that community knowledge is the strongest
                defense against scammers and fraudsters worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/30">
                Leadership
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
                Meet the Founder
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The visionary behind ScamAlert's mission to create safer communities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-12 items-center">
              <div className="order-2 md:order-1 md:col-span-4">
                <h3 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">Rohit Kumar Yadav</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  A passionate technology enthusiast and cybersecurity advocate with expertise in building secure web platforms.
                  With a strong background in community building and fraud prevention awareness, Rohit has dedicated himself
                  to creating tools that help people stay safe from online and offline scams.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                  Having witnessed the devastating effects of scams on individuals and families, he envisioned ScamAlert as
                  a platform where real experiences could be shared to prevent others from falling victim to similar frauds.
                  His mission is to build the world's most comprehensive scam awareness community.
                </p>
                <div className="flex gap-4 items-center flex-wrap">
                  <a
                    href="mailto:rohitkuyada@gmail.com"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                    aria-label="Email Rohit Kumar Yadav"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rohitkumaryadav-rky/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                    aria-label="Rohit Kumar Yadav on LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://instagram.com/rohit.ayadav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                    aria-label="Rohit Kumar Yadav on Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://github.com/rohit-ayadav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                    aria-label="Rohit Kumar Yadav on GitHub"
                  >
                    <GitHub size={20} />
                  </a>
                  <a
                    href="https://x.com/rohit_ayadav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                    aria-label="Rohit Kumar Yadav on Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
              <div className="order-1 md:order-2 md:col-span-3 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border-8 border-white dark:border-gray-800 shadow-xl dark:shadow-gray-900/30 w-64 h-64 sm:w-72 sm:h-72">
                  <img
                    src="/founder.jpg"
                    alt="Rohit Kumar Yadav - Founder of ScamAlert"
                    className="h-full w-full object-cover object-center transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-red-200 dark:bg-grid-red-900 [mask-image:linear-gradient(0deg,transparent,black)] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30">
            Join the Movement
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Share your experience. Protect others. Build safer communities.
            Start contributing to a fraud-free world by sharing your story and helping others stay safe from scams.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="rounded-md text-base bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600">
              Report Your Experience <Shield className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-md border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              Learn About Scams
            </Button>
          </div>
        </div>
      </div>

      {/* Connect Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
              Stay Connected
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-8">
              Join Our Safety Community
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <a href="https://ScamAlert.in" className="hover:text-red-600 dark:hover:text-red-400">ScamAlert.in</a>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <a href="mailto:support@scamalert.in" className="hover:text-red-600 dark:hover:text-red-400">support@scamalert.in</a>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Stay Updated</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">Follow us for daily scam alerts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <a href="https://whatsapp.com/channel/0029VaVd6px8KMqnZk7qGJ2t" className="hover:text-red-600 dark:hover:text-red-400">Join our Safety WhatsApp Channel</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Enhancement - Hidden sections for SEO */}
      <div className="sr-only">
        <h2>ScamAlert - Community-Driven Scam Reporting and Fraud Prevention Platform</h2>
        <p>
          ScamAlert is the ultimate platform for reporting scams, sharing fraud experiences, and building community awareness.
          Features include easy scam reporting, fraud detection tools, safety guides, community verification, anonymous reporting,
          and expert analysis for comprehensive fraud prevention.
        </p>
        <p>
          Keywords: scam reporting, fraud prevention, online safety, cybersecurity awareness, scam alerts, fraud community,
          consumer protection, scam awareness, financial fraud prevention, identity theft protection, online scam reports
        </p>
      </div>
    </div>
  );
};

export default AboutPage;