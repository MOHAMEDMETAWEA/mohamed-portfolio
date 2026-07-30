'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Github, Linkedin, Mail, Phone, MapPin, GraduationCap, Briefcase, 
  ExternalLink, Download, ChevronDown, Brain, Code, Database, 
  Cpu, Layers, Zap, MessageSquare, FileText, Award, Calendar,
  Star, GitBranch, Rocket, Bot, Eye, Heart, Music, Leaf, Sparkles,
  Aperture, Activity, Server, BookOpen, Lightbulb, Menu, X, Workflow,
  TrendingUp, Users, GitFork, ArrowUpRight, Play, ChevronRight,
  Terminal, Cog, Gauge, BarChart3, RefreshCw, Cloud, Send, Loader2,
  ArrowUp, Utensils
} from 'lucide-react'

import { useMagnetic } from "@/hooks/use-magnetic"
import { TextReveal, CharacterReveal } from "@/components/animations/text-reveal"
import { TiltCard } from "@/components/animations/tilt-card"
import { CustomCursor } from "@/components/animations/custom-cursor"

// ─── Animation Components ──────────────────────────────────────────

function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, x, y, handleMouseLeave } = useMagnetic();
  return (
    <motion.div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
}

const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const heroFloat = {
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
  }
}

const cardHover = {
  rest: { scale: 1, y: 0, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" },
  hover: { 
    scale: 1.03, 
    y: -8, 
    boxShadow: "0 20px 40px -12px rgba(16,185,129,0.25)",
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } 
  }
}

const buttonGlow = {
  rest: { boxShadow: "0 4px 14px 0 rgba(16,185,129,0.25)" },
  hover: { 
    boxShadow: "0 6px 20px 0 rgba(16,185,129,0.45)",
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: { scale: 0.97 }
}

const linkHover = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2, ease: "easeOut" } }
}

// ─── Portfolio Data ──────────────────────────────────────────────────

const personalInfo = {
  name: "Mohamed Mostafa Metawea",
  role: "AI Engineer · Generative AI & Agentic Systems",
  specialization: "Machine Learning · Deep Learning · LLM Applications · n8n Automation",
  location: "6 October City, Giza, Egypt",
  phone: "+20 105 548 5561",
  email: "mohamedmostafametawea@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohamed-mostafa-metawea",
  github: "https://github.com/MOHAMEDMETAWEA",
  bio: "Motivated AI and Machine Learning engineer with a strong foundation in machine learning, deep learning, and generative AI. Experienced in building end-to-end projects, including data processing, model development, and deployment using modern tools and frameworks. Skilled in Python, NLP, and computer vision, with growing expertise in LLM applications and scalable AI systems. Eager to apply technical knowledge, learn quickly, and contribute to impactful real-world projects in a collaborative environment."
}

const education = {
  degree: "B.Sc. Communication & Electronics Engineering",
  university: "October 6 University",
  period: "2020-2025",
  gpa: "3.44/4.0",
  highlights: [
    "Specialized in AI & Machine Learning applications",
    "Strong foundation in signal processing and electronics",
    "Applied engineering principles to AI system design"
  ]
}

const experience = {
  title: "Machine Learning Intern",
  company: "Cellula Technologies",
  period: "Feb 2025 – Mar 2025",
  responsibilities: [
    "Developed machine learning models for predictive maintenance, improving model performance using cross-validation and feature engineering",
    "Containerized and deployed 3 ML models as REST APIs using Flask and Docker, enabling real-time inference and consistent deployment environments",
    "Collaborated with cross-functional teams on AI-driven solutions for industrial applications",
    "Implemented data preprocessing and feature engineering workflows for production ML pipelines"
  ]
}

const skills = {
  "Programming & APIs": { 
    skills: ["Python", "SQL", "C++", "FastAPI", "Flask", "REST APIs", "Object-Oriented Programming"],
    level: 92,
    icon: Code
  },
  "Machine Learning": { 
    skills: ["Scikit-learn", "TensorFlow", "XGBoost", "LightGBM", "Feature Engineering", "Model Evaluation", "Ensemble Methods"],
    level: 90,
    icon: Brain
  },
  "Deep Learning": { 
    skills: ["Neural Networks", "CNN", "RNN", "LSTM", "Transformers", "Transfer Learning", "PyTorch", "Keras"],
    level: 88,
    icon: Cpu
  },
  "Generative AI & LLMs": { 
    skills: ["LangChain", "OpenAI API", "RAG", "AI Agents", "Prompt Engineering", "Fine-tuning", "RLHF", "Vector Databases", "MCP"],
    level: 92,
    icon: Sparkles
  },
  "Computer Vision": { 
    skills: ["OpenCV", "YOLO", "CNN Vision Models", "Vision Transformers", "Face Recognition", "Image Classification", "Object Detection"],
    level: 85,
    icon: Eye
  },
  "NLP & Text Analytics": { 
    skills: ["Transformers", "BERT", "GPT Models", "Text Classification", "NER", "Sentiment Analysis", "Tokenization", "Word Embeddings"],
    level: 88,
    icon: MessageSquare
  },
  "MLOps & Deployment": { 
    skills: ["Docker", "FastAPI", "MLflow", "CI/CD", "Cloud Deployment", "Prometheus", "API Integration"],
    level: 82,
    icon: Server
  },
  "Cloud & Automation": { 
    skills: ["Microsoft Azure", "AWS", "Cloudflare Workers", "n8n", "Git", "Power BI"],
    level: 80,
    icon: Cloud
  },
  "Databases & Data": { 
    skills: ["MongoDB", "PostgreSQL", "FAISS", "ChromaDB", "Data Pipelines", "Data Visualization"],
    level: 78,
    icon: Database
  }
}

const projects = [
  {
    id: 18,
    title: "Restaurant n8n AI Agent",
    featured: true,
    isNew: true,
    description: "Complete Restaurant Management System powered by n8n and AI Agents. Automates the entire workflow from customer ordering to kitchen management and inventory tracking. Features multi-modal interaction and real-time database synchronization with Supabase.",
    tech: ["n8n", "AI Agents", "Supabase", "PostgreSQL", "WhatsApp API", "Automation"],
    category: "Agentic AI",
    icon: Utensils,
    github: "https://github.com/MOHAMEDMETAWEA/Restaurant_n8n_AI_Agent",
    image: null,
    video: "/restaurant_management_system.mp4"
  },
  {
    id: 17,
    title: "Dream AI Analyses Project",
    featured: true,
    isNew: true,
    description: "Comprehensive AI analyses project exploring data-driven insights through generative AI applications.",
    tech: ["Python", "Generative AI", "Data Analysis", "NLP", "Machine Learning"],
    category: "Agentic AI",
    icon: Brain,
    github: "https://github.com/MOHAMEDMETAWEA/dream-ai-project",
    image: null,
    video: "/Dreams_Analyses.mp4"
  },
  {
    id: 1,
    title: "MedAgent — Autonomous Clinical Orchestrator",
    version: "v5.3.0",
    featured: true,
    isNew: true,
    description: "Production-grade clinical AI orchestrator built with 14 specialized agents (Triage, Diagnostic, Pharmacotherapy, Differential Diagnosis, Patient Safety, etc.). Features RAG with FAISS over medical guidelines (NIH, WHO), Tree-of-Thought reasoning with confidence scoring, AES-256 encryption, JWT-based RBAC, and full observability via Prometheus and OpenTelemetry.",
    tech: ["LangGraph", "GPT-4o", "RAG", "FAISS", "FastAPI", "Docker", "Prometheus", "OpenTelemetry"],
    category: "Agentic AI",
    icon: Bot,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null,
    video: "/Med-Agent-Test.mp4"
  },
  {
    id: 2,
    title: "AI Personal Assistant — Multi-Agent System",
    featured: true,
    isNew: true,
    description: "Production-ready multi-agent AI system with central Orchestrator routing tasks across 9 specialized sub-agents (Calendar, Email, Search, Weather, Notes, Reminders, Social Media, Data Analysis, Web Automation). Features multi-modal input via WhatsApp & Telegram with voice and image processing.",
    tech: ["n8n", "OpenRouter", "Groq", "Gemini", "Multi-Agent", "OAuth2", "WhatsApp API"],
    category: "Agentic AI",
    icon: Bot,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: "/project-ai-assistant.png"
  },
  {
    id: 3,
    title: "AI-Based Face Recognition Attendance System",
    featured: true,
    description: "CNN-based face recognition system achieving 95% accuracy with sub-second inference latency. Implements liveness detection and anti-spoofing preventing 98% of replay attacks. Automated attendance workflow reducing manual effort by 80%.",
    tech: ["Python", "CNN", "OpenCV", "Flask", "Liveness Detection", "Deep Learning"],
    category: "Computer Vision",
    icon: Eye,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 4,
    title: "Heart Disease Risk Prediction System",
    featured: false,
    description: "LightGBM/XGBoost ensemble achieving 92% recall and 0.90 F1-score on held-out clinical data, optimized for high sensitivity. Applied SHAP for model interpretability and deployed as interactive Streamlit web app.",
    tech: ["LightGBM", "XGBoost", "SHAP", "Streamlit", "Feature Engineering", "Scikit-learn"],
    category: "Healthcare AI",
    icon: Heart,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 5,
    title: "Multilabel Comment Toxicity Detection",
    featured: false,
    description: "Multi-label NLP classification model using TF-IDF and Scikit-learn. Reduced false positives by 18% using threshold optimization and feature engineering for detecting threats, obscenity, insults, and hate speech.",
    tech: ["Python", "TF-IDF", "Scikit-learn", "NLP", "Threshold Optimization"],
    category: "NLP",
    icon: MessageSquare,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 6,
    title: "Job-Resume Matching System",
    featured: false,
    description: "An intelligent recruitment assistant that matches candidate resumes with job descriptions using NLP and semantic similarity. Helps HR teams automate initial screening processes.",
    tech: ["Python", "NLP", "Sentence Transformers", "Streamlit", "FAISS"],
    category: "NLP",
    icon: FileText,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 7,
    title: "FashionGAN - Generative Fashion",
    featured: false,
    description: "A Generative Adversarial Network for creating synthetic fashion images. Demonstrates expertise in GAN architectures, image generation, and creative AI applications.",
    tech: ["Python", "TensorFlow", "GANs", "Deep Learning", "Computer Vision"],
    category: "Generative AI",
    icon: Sparkles,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 8,
    title: "Deep Audio Classification",
    featured: false,
    description: "A deep learning system for classifying audio files into different categories. Implements CNNs on spectrograms for accurate audio pattern recognition.",
    tech: ["Python", "TensorFlow", "Librosa", "CNNs", "Audio Processing"],
    category: "Deep Learning",
    icon: Music,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 9,
    title: "Potato Disease Classification",
    featured: false,
    description: "Computer vision system for identifying potato plant diseases from leaf images. Helps farmers with early disease detection using CNN-based image classification.",
    tech: ["Python", "TensorFlow", "CNNs", "Transfer Learning", "Plant Village Dataset"],
    category: "Computer Vision",
    icon: Leaf,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 10,
    title: "Iris Detection System",
    featured: false,
    description: "Biometric iris recognition system implementing image processing and pattern matching for identity verification. Demonstrates classic computer vision techniques.",
    tech: ["Python", "OpenCV", "Image Processing", "Pattern Recognition"],
    category: "Computer Vision",
    icon: Aperture,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 11,
    title: "Deep CNN Emotion Recognition",
    featured: false,
    description: "Real-time facial emotion recognition using deep convolutional neural networks. Detects emotions from facial expressions for human-computer interaction applications.",
    tech: ["Python", "Keras", "CNNs", "OpenCV", "FER2013 Dataset"],
    category: "Computer Vision",
    icon: Activity,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 12,
    title: "Healthcare Predictive Analytics",
    featured: false,
    description: "A comprehensive analytics platform for healthcare data prediction. Includes patient readmission prediction, resource optimization, and clinical decision support.",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Healthcare Analytics"],
    category: "Healthcare AI",
    icon: Activity,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 13,
    title: "FastAPI Projects Collection",
    featured: false,
    description: "A collection of production-ready REST APIs built with FastAPI. Includes authentication, database integration, and deployment best practices.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "JWT Authentication"],
    category: "Backend",
    icon: Server,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 14,
    title: "Deep Learning Book RAG",
    featured: false,
    description: "Advanced RAG system built on Ian Goodfellow's Deep Learning book with hybrid search (vector + keyword), query expansion, multi-stage reranking, chapter filtering, and persistent conversation history. Features a Streamlit UI for interactive Q&A over deep learning concepts.",
    tech: ["Python", "LangChain", "Streamlit", "FAISS", "RAG", "Hybrid Search", "Reranking"],
    category: "Generative AI",
    icon: BookOpen,
    github: "https://github.com/MOHAMEDMETAWEA/Deep-Learning-Book_RAG",
    image: null,
    video: "/RAG_DeepLearningBook.mp4"
  },
  {
    id: 15,
    title: "Prompt Engineering",
    featured: false,
    description: "A comprehensive exploration of prompt engineering techniques for LLMs. Includes best practices, optimization strategies, and practical examples for various use cases.",
    tech: ["Python", "OpenAI API", "LangChain", "Prompt Engineering"],
    category: "Generative AI",
    icon: Lightbulb,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 16,
    title: "DEPI Generative & Agentic AI Projects",
    featured: false,
    description: "Collection of projects completed during the DEPI Generative AI Professional program. Showcases advanced skills in LLMs, agentic systems, and AI application development.",
    tech: ["Python", "LangChain", "OpenAI", "RAG", "Multi-Agent Systems", "LLMs"],
    category: "Generative AI",
    icon: Rocket,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
]

const certifications = [
  {
    title: "AI Engineering Specialization",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "9-course specialization covering OpenAI suite, LangChain, RAG, vector databases, AI agents, and MCP",
    icon: Bot,
    certificateUrl: "/Coursera KA9W2QX9ME4U.pdf",
    verifyUrl: "https://coursera.org/verify/specialization/KA9W2QX9ME4U"
  },
  {
    title: "Learn AI Agents",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Comprehensive course on building autonomous AI agents with modern frameworks and tools",
    icon: Bot,
    certificateUrl: "/Coursera 9LXRFGOHE9Y8.pdf",
    verifyUrl: "https://coursera.org/verify/9LXRFGOHE9Y8"
  },
  {
    title: "Build AI Apps with LangChain.js",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Practical course on building production AI applications using LangChain.js framework",
    icon: Code,
    certificateUrl: "/Coursera GQ84048LIJG7.pdf",
    verifyUrl: "https://coursera.org/verify/GQ84048LIJG7"
  },
  {
    title: "Learn OpenAI's Assistant API",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Hands-on training with OpenAI's Assistant API for building intelligent conversational AI",
    icon: MessageSquare,
    certificateUrl: "/Coursera RWD0Q1ORABUQ.pdf",
    verifyUrl: "https://coursera.org/verify/RWD0Q1ORABUQ"
  },
  {
    title: "Intro to Dall-E and GPT Vision",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Course covering DALL-E image generation and GPT Vision for multimodal AI applications",
    icon: Eye,
    certificateUrl: "/Coursera 9CJFM7RPO753.pdf",
    verifyUrl: "https://coursera.org/verify/9CJFM7RPO753"
  },
  {
    title: "Intro to Model Context Protocol (MCP)",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Introduction to MCP for connecting AI models with external tools and data sources",
    icon: Cpu,
    certificateUrl: "/Coursera AXMGLBYIMYJF.pdf",
    verifyUrl: "https://coursera.org/verify/AXMGLBYIMYJF"
  },
  {
    title: "RAG with Embeddings & Vector Databases",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Comprehensive course on Retrieval-Augmented Generation, embeddings, and vector databases for production AI systems",
    icon: Database,
    certificateUrl: "/Coursera D6ZYH0HP6SM3.pdf",
    verifyUrl: "https://coursera.org/verify/D6ZYH0HP6SM3"
  },
  {
    title: "Intro to AI Engineering",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Foundational course introducing AI engineering concepts, tools, and best practices for building AI-powered applications",
    icon: Rocket,
    certificateUrl: "/Coursera 29TTEDKUJRP1.pdf",
    verifyUrl: "https://coursera.org/verify/29TTEDKUJRP1"
  },
  {
    title: "Open-source AI Models",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Course covering open-source AI models, their deployment, and integration into production applications",
    icon: Code,
    certificateUrl: "/Coursera AWWBPIHIVH5S.pdf",
    verifyUrl: "https://coursera.org/verify/AWWBPIHIVH5S"
  },
  {
    title: "Deploy AI Apps with Cloudflare",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Practical course on deploying AI applications using Cloudflare's edge computing platform and serverless functions",
    icon: Cloud,
    certificateUrl: "/Coursera PTC1WJO0Y35E.pdf",
    verifyUrl: "https://coursera.org/verify/PTC1WJO0Y35E"
  },
  {
    title: "AI Workflow: Business Priorities & Data Ingestion",
    issuer: "IBM/Coursera",
    period: "Mar 2025",
    description: "Enterprise-focused course on AI workflows, business alignment, and data ingestion strategies for AI projects",
    icon: Workflow,
    certificateUrl: "/Coursera 7EZ36W89PBT4.pdf",
    verifyUrl: "https://coursera.org/verify/7EZ36W89PBT4"
  },
  {
    title: "Multimodal GenAI & RAG Apps",
    issuer: "DeepLearning.AI",
    period: "2025",
    description: "Advanced course on building multimodal generative AI applications with RAG architectures",
    icon: Layers,
    certificateUrl: "/cert-multimodal-rag.pdf",
    verifyUrl: null
  },
  {
    title: "AWS AI Practitioner Certificate",
    issuer: "Amazon Web Services",
    period: "2025",
    description: "AWS certification validating knowledge of AI/ML services and best practices on AWS cloud platform",
    icon: Cloud,
    certificateUrl: "/AWS_AIPractitionerCertificate.png",
    verifyUrl: null
  },
  {
    title: "Future Skills Academy",
    issuer: "UNDP-MBRF",
    period: "2025",
    description: "Learning pathway covering soft skills, digital skills, and AI fundamentals",
    icon: Layers,
    certificateUrl: "/cert-future-skills.pdf",
    verifyUrl: null
  },
  {
    title: "Generative AI Professional",
    issuer: "DEPI",
    period: "Nov 2025 – Jun 2026",
    description: "Comprehensive program covering LLMs, RAG systems, agentic AI, and production deployment",
    icon: Brain,
    certificateUrl: "/generative-ai-applications-specialist.png",
    verifyUrl: null
  },
  {
    title: "Post-Training LLMs: Fine-Tuning & RLHF",
    issuer: "DeepLearning.AI",
    period: "Completed",
    description: "Advanced techniques for fine-tuning large language models with reinforcement learning",
    icon: Cpu,
    certificateUrl: "/generative-ai-advanced-fine-tuning-for-llms.png",
    verifyUrl: null
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI/Stanford",
    period: "Oct 2025",
    description: "3-course specialization by Andrew Ng covering supervised learning, unsupervised learning, recommender systems, and reinforcement learning",
    icon: Brain,
    certificateUrl: "/Coursera K2UKWZ4APRL6.pdf",
    verifyUrl: "https://coursera.org/verify/specialization/K2UKWZ4APRL6"
  },
  {
    title: "Unsupervised Learning, Recommenders & RL",
    issuer: "DeepLearning.AI/Stanford",
    period: "Oct 2025",
    description: "Advanced ML course covering clustering, anomaly detection, recommender systems, and reinforcement learning techniques",
    icon: TrendingUp,
    certificateUrl: "/Coursera VTHCGLVU4BQP.pdf",
    verifyUrl: "https://coursera.org/verify/VTHCGLVU4BQP"
  },
  {
    title: "Advanced Learning Algorithms",
    issuer: "DeepLearning.AI/Stanford",
    period: "Oct 2025",
    description: "Course covering neural networks, decision trees, and best practices for building and training ML models by Andrew Ng",
    icon: TrendingUp,
    certificateUrl: "/Coursera 7KHL0EX5HTK6.pdf",
    verifyUrl: "https://coursera.org/verify/7KHL0EX5HTK6"
  },
  {
    title: "IBM Data Science Professional",
    issuer: "DEPI",
    period: "Completed",
    description: "Comprehensive data science curriculum including Python, SQL, and ML",
    icon: Database,
    certificateUrl: "/cert-pending.svg",
    verifyUrl: null
  },
  {
    title: "Orange AI Level 1 Certification",
    issuer: "Orange",
    period: "Completed",
    description: "Industry-recognized certification in AI fundamentals and applications",
    icon: Award,
    certificateUrl: "/cert-pending.svg",
    verifyUrl: null
  },
  {
    title: "The Python and Django Learning Guide",
    issuer: "Udemy",
    period: "Jul 2024",
    description: "9-hour comprehensive course on Python programming and Django web framework",
    icon: Code,
    certificateUrl: "/cert-image-1.png",
    verifyUrl: null
  },
  {
    title: "Introduction to Python",
    issuer: "DataCamp",
    period: "Sep 2024",
    description: "Foundational Python course covering basic syntax, lists, functions, and packages",
    icon: Code,
    certificateUrl: "/cert-image-2.png",
    verifyUrl: null
  },
  {
    title: "Data Analytics Bootcamp",
    issuer: "Alexander Freberg",
    period: "Completed",
    description: "Comprehensive bootcamp covering core data analytics skills and tools",
    icon: BarChart3,
    certificateUrl: "/cert-whatsapp.jpeg",
    verifyUrl: null
  },
  {
    title: "Machine Learning with Python (V2)",
    issuer: "IBM / Coursera",
    period: "Apr 2026",
    description: "Comprehensive course covering machine learning concepts and applications using Python",
    icon: Brain,
    certificateUrl: "/cert-machine-learning-python-ibm.pdf",
    verifyUrl: "https://coursera.org/verify/U79HGNZL84DQ"
  },
  {
    title: "IBM AI Engineering Professional Certificate",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Comprehensive 14-course professional certificate covering machine learning, deep learning, neural networks, generative AI, LLMs, transformers, and AI agents",
    icon: Award,
    certificateUrl: "/cert-ibm-ai-engineering-pro.pdf",
    verifyUrl: "https://coursera.org/verify/professional-cert/MW0S92MWY4XF"
  },
  {
    title: "Introduction to Deep Learning & Neural Networks with Keras",
    issuer: "IBM / Coursera",
    period: "Apr 2026",
    description: "Foundational course on deep learning concepts, neural network architectures, and building models with Keras",
    icon: Brain,
    certificateUrl: "/cert-intro-dl-neural-networks-keras.pdf",
    verifyUrl: "https://coursera.org/verify/9IA9AJ2BHUDQ"
  },
  {
    title: "Introduction to Neural Networks and PyTorch",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Hands-on course covering neural network fundamentals and practical implementation using PyTorch framework",
    icon: Cpu,
    certificateUrl: "/cert-intro-neural-networks-pytorch.pdf",
    verifyUrl: "https://coursera.org/verify/ORVGWOJ5SF3V"
  },
  {
    title: "Deep Learning with PyTorch",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Advanced deep learning techniques and model building using PyTorch for production applications",
    icon: Cpu,
    certificateUrl: "/cert-dl-pytorch.pdf",
    verifyUrl: "https://coursera.org/verify/VOBNR11IEJFP"
  },
  {
    title: "Deep Learning with Keras and TensorFlow",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Comprehensive course on building and training deep learning models using Keras and TensorFlow frameworks",
    icon: Brain,
    certificateUrl: "/cert-dl-keras-tensorflow.pdf",
    verifyUrl: "https://coursera.org/verify/J3AG39R9KN19"
  },
  {
    title: "AI Capstone Project with Deep Learning",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Capstone project applying deep learning skills to solve real-world AI challenges end-to-end",
    icon: Rocket,
    certificateUrl: "/cert-ai-capstone-deep-learning.pdf",
    verifyUrl: "https://coursera.org/verify/6XEL75XUDVWO"
  },
  {
    title: "Gen AI Foundational Models for NLP & Language Understanding",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Course on foundational generative AI models for natural language processing and language understanding",
    icon: MessageSquare,
    certificateUrl: "/cert-gen-ai-foundational-models-nlp.pdf",
    verifyUrl: "https://coursera.org/verify/UHDL3UISTU3A"
  },
  {
    title: "Generative AI Language Modeling with Transformers",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Advanced course on generative AI language modeling techniques using transformer architectures",
    icon: Sparkles,
    certificateUrl: "/cert-gen-ai-language-modeling-transformers.pdf",
    verifyUrl: "https://coursera.org/verify/VCAE9IAGFC4Y"
  },
  {
    title: "Generative AI and LLMs: Architecture and Data Preparation",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "In-depth course on LLM architectures, data preparation pipelines, and generative AI system design",
    icon: Layers,
    certificateUrl: "/cert-gen-ai-llms-architecture.pdf",
    verifyUrl: "https://coursera.org/verify/GGP8IG8M8RQ2"
  },
  {
    title: "Generative AI Engineering and Fine-Tuning Transformers",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Practical course on engineering generative AI solutions and fine-tuning transformer models",
    icon: Cog,
    certificateUrl: "/cert-gen-ai-engineering-transformers.pdf",
    verifyUrl: "https://coursera.org/verify/I74ORD2QWJNB"
  },
  {
    title: "Generative AI Advanced Fine-Tuning for LLMs",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Advanced techniques for fine-tuning large language models including RLHF, LoRA, and PEFT methods",
    icon: TrendingUp,
    certificateUrl: "/cert-gen-ai-fine-tuning-llms.pdf",
    verifyUrl: "https://coursera.org/verify/G6BGF0RXM8UZ"
  },
  {
    title: "Fundamentals of AI Agents Using RAG and LangChain",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Course on building AI agents using Retrieval-Augmented Generation and LangChain framework",
    icon: Bot,
    certificateUrl: "/cert-ai-agents-rag-langchain.pdf",
    verifyUrl: "https://coursera.org/verify/RWIMWPQSJ2YL"
  },
  {
    title: "Project: Generative AI Applications with RAG and LangChain",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Hands-on project building production generative AI applications using RAG pipelines and LangChain",
    icon: Rocket,
    certificateUrl: "/cert-gen-ai-rag-langchain-project.pdf",
    verifyUrl: "https://coursera.org/verify/05ZHA5PO3OJ4"
  }
  ,
  // Auto-added: unreferenced public assets (filename -> minimal certification entry)
  {
    title: "cert-advanced-learning-algorithms.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-advanced-learning-algorithms.pdf",
    verifyUrl: null
  },
  {
    title: "cert-ai-agents.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-ai-agents.pdf",
    verifyUrl: null
  },
  {
    title: "cert-ai-engineering.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-ai-engineering.pdf",
    verifyUrl: null
  },
  {
    title: "cert-assistant-api.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-assistant-api.pdf",
    verifyUrl: null
  },
  {
    title: "cert-aws-ai.png",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-aws-ai.png",
    verifyUrl: null
  },
  {
    title: "cert-cloudflare-ai.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-cloudflare-ai.pdf",
    verifyUrl: null
  },
  {
    title: "cert-dalle-gpt-vision.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-dalle-gpt-vision.pdf",
    verifyUrl: null
  },
  {
    title: "cert-ibm-ai-workflow.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-ibm-ai-workflow.pdf",
    verifyUrl: null
  },
  {
    title: "cert-intro-ai-eng.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-intro-ai-eng.pdf",
    verifyUrl: null
  },
  {
    title: "cert-langchain.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-langchain.pdf",
    verifyUrl: null
  },
  {
    title: "cert-mcp.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-mcp.pdf",
    verifyUrl: null
  },
  {
    title: "cert-ml-specialization.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-ml-specialization.pdf",
    verifyUrl: null
  },
  {
    title: "cert-opensource-ai.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-opensource-ai.pdf",
    verifyUrl: null
  },
  {
    title: "cert-rag-embeddings.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-rag-embeddings.pdf",
    verifyUrl: null
  },
  {
    title: "cert-unsupervised-learning.pdf",
    issuer: "Various",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/cert-unsupervised-learning.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera 05ZHA5PO3OJ4.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera 05ZHA5PO3OJ4.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera 6XEL75XUDVWO.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera 6XEL75XUDVWO.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera 9IA9AJ2BHUDQ.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera 9IA9AJ2BHUDQ.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera CTGWDS950MKC.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera CTGWDS950MKC.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera G6BGF0RXM8UZ.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera G6BGF0RXM8UZ.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera GGP8IG8M8RQ2.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera GGP8IG8M8RQ2.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera HHEB3VS9FIJC.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera HHEB3VS9FIJC.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera I74ORD2QWJNB.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera I74ORD2QWJNB.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera J3AG39R9KN19.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera J3AG39R9KN19.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera MW0S92MWY4XF.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera MW0S92MWY4XF.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera NANC9WTEWYDL.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera NANC9WTEWYDL.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera ORVGWOJ5SF3V.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera ORVGWOJ5SF3V.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera RWIMWPQSJ2YL.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera RWIMWPQSJ2YL.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera S5DD3AFNRB3L.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera S5DD3AFNRB3L.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera U79HGNZL84DQ.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera U79HGNZL84DQ.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera UHDL3UISTU3A.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera UHDL3UISTU3A.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera VCAE9IAGFC4Y.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera VCAE9IAGFC4Y.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera VOBNR11IEJFP.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera VOBNR11IEJFP.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera YUJETL39JUMZ.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera YUJETL39JUMZ.pdf",
    verifyUrl: null
  },
  {
    title: "Coursera Z7KTIV7G08FZ.pdf",
    issuer: "Coursera",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/Coursera Z7KTIV7G08FZ.pdf",
    verifyUrl: null
  },
  {
    title: "DeepLearningwithPyTorch_Badge20260505-31-6nitb6.pdf",
    issuer: "DeepLearning.AI",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/DeepLearningwithPyTorch_Badge20260505-31-6nitb6.pdf",
    verifyUrl: null
  },
  {
    title: "generative-ai-and-llms-architecture-and-data-prepar.png",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/generative-ai-and-llms-architecture-and-data-prepar.png",
    verifyUrl: null
  },
  {
    title: "generative-ai-engineering-with-transformers-llms.png",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/generative-ai-engineering-with-transformers-llms.png",
    verifyUrl: null
  },
  {
    title: "generative-ai-foundational-models-for-nlp-language-.png",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/generative-ai-foundational-models-for-nlp-language-.png",
    verifyUrl: null
  },
  {
    title: "generative-ai-language-modeling-with-transformers.png",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/generative-ai-language-modeling-with-transformers.png",
    verifyUrl: null
  },
  {
    title: "ibm-ai-engineering-professional-certificate-v3.png",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/ibm-ai-engineering-professional-certificate-v3.png",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260420-31-csiheo.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260420-31-csiheo.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260423-32-ln2aw4.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260423-32-ln2aw4.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260501-31-5gwit6.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260501-31-5gwit6.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260503-31-3skljl.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260503-31-3skljl.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260506-31-q10eyq.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260506-31-q10eyq.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260507-32-7730t3.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260507-32-7730t3.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260511-32-23n0o4.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260511-32-23n0o4.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260513-31-2siepf.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260513-31-2siepf.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260513-31-433bp2.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260513-31-433bp2.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260513-31-thu13l.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260513-31-thu13l.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260514-33-5lhuqb.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260514-33-5lhuqb.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260515-32-h8xidq.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260515-32-h8xidq.pdf",
    verifyUrl: null
  },
  {
    title: "IBMDesign20260515-32-j0ejf7.pdf",
    issuer: "IBM",
    period: "",
    description: "",
    icon: Award,
    certificateUrl: "/IBMDesign20260515-32-j0ejf7.pdf",
    verifyUrl: null
  },
  {
    title: "Project: Generative AI Applications with RAG and LangChain",
    issuer: "IBM / Coursera",
    period: "May 2026",
    description: "Hands-on project building production generative AI applications using RAG pipelines and LangChain",
    icon: Rocket,
    certificateUrl: "/cert-gen-ai-rag-langchain-project.pdf",
    verifyUrl: "https://coursera.org/verify/05ZHA5PO3OJ4"
  }
]

// Language colors for GitHub stats
const languageColors: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#2B7489',
  JavaScript: '#F1E05A',
  Jupyter: '#DA5B0B',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Dockerfile: '#384D54',
}

// ─── AI Chatbot Responses ────────────────────────────────────────────

const aiResponses: Record<string, string> = {
  "hello": "Hello! 👋 I'm Mohamed's AI Assistant. I can help you learn about his skills, projects, and experience. What would you like to know?",
  "hi": "Hi there! 👋 I'm Mohamed's AI Personal Assistant demo. Ask me about his projects, skills, or experience!",
  "skills": "Mohamed's top skills include:\n• Python, TensorFlow, PyTorch\n• LangChain, RAG, AI Agents\n• Computer Vision (OpenCV, YOLO)\n• NLP (Transformers, BERT, GPT)\n• MLOps (Docker, FastAPI, MLflow)\n• n8n Workflow Automation",
  "projects": "Mohamed has 18+ projects including:\n🍽️ Restaurant n8n AI Agent — Complete System\n✨ Dream AI Analyses — Data-Driven Insights\n🏥 MedAgent — Clinical AI with 14 agents\n🤖 AI Personal Assistant — 9 sub-agents\n👁️ Face Recognition Attendance System\n❤️ Heart Disease Prediction\n🧠 And many more in GenAI & CV!",
  "restaurant": "The Restaurant n8n AI Agent is a complete management system that automates ordering, kitchen workflows, and inventory using n8n and Supabase. It features an AI agent that handles customer requests via WhatsApp/Telegram!",
  "dream ai": "Dream AI Analyses is a project exploring data-driven insights through generative AI applications. It showcases the integration of NLP and Machine Learning for comprehensive data analysis.",
  "experience": "Mohamed interned at Cellula Technologies (Feb-Mar 2025) as an ML Engineer, where he deployed 3 ML models as REST APIs using Flask and Docker, and developed predictive maintenance systems.",
  "contact": "You can reach Mohamed at:\n📧 mohamedmostafametawea@gmail.com\n📱 +20 105 548 5561\n🔗 LinkedIn: mohamed-mostafa-metawea\n💻 GitHub: MOHAMEDMETAWEA",
  "education": "Mohamed holds a B.Sc. in Communication & Electronics Engineering from October 6 University (2020-2025) with a GPA of 3.44/4.0, specializing in AI & ML.",
  "medagent": "MedAgent is a production-grade clinical AI orchestrator (v5.3.0) featuring 14 specialized agents, RAG with FAISS over NIH/WHO guidelines, Tree-of-Thought reasoning, AES-256 encryption, and full observability via Prometheus.",
  "assistant": "The AI Personal Assistant is a multi-agent system with a central Orchestrator routing tasks across 9 sub-agents: Calendar, Email, Search, Weather, Notes, Reminders, Social Media, Data Analysis, and Web Automation. It supports WhatsApp & Telegram with voice/image processing!",
  "certifications": "Mohamed has 38+ certifications including:\n🎓 IBM AI Engineering Professional Certificate\n🎓 AI Engineering Specialization (Coursera)\n🎓 ML Specialization (Stanford/DeepLearning.AI)\n🎓 AWS AI Practitioner\n🎓 Generative AI Professional (DEPI)\n🎓 12 IBM Generative AI & Deep Learning courses\nAnd many more!",
}

function getAIResponse(input: string): string {
  const lower = input.toLowerCase().trim()
  
  for (const [key, response] of Object.entries(aiResponses)) {
    if (lower.includes(key)) return response
  }
  
  if (lower.includes("who") || lower.includes("about")) {
    return "Mohamed is an AI Engineer specializing in Generative AI & Agentic Systems. He builds intelligent multi-agent systems, computer vision solutions, and NLP applications. Ask me about his 'skills', 'projects', or 'experience'!"
  }
  
  if (lower.includes("hire") || lower.includes("work") || lower.includes("job")) {
    return "Mohamed is actively looking for opportunities in AI Engineering! He's open to roles in Generative AI, Agentic Systems, MLOps, and AI Research. Reach out via email at mohamedmostafametawea@gmail.com 🚀"
  }
  
  return "I can tell you about Mohamed's skills, projects, experience, education, certifications, or contact info. Try asking about any of these! 💡"
}

// ─── AI Chatbot Component ────────────────────────────────────────────

function AIChatbot() {
  const [messages, setMessages] = useState<{role: 'user' | 'ai'; text: string}[]>([
    { role: 'ai', text: "👋 Hi! I'm Mohamed's AI Assistant. Ask me about his skills, projects, or experience!" }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = useCallback(() => {
    if (!input.trim()) return
    
    const userMessage = input.trim()
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getAIResponse(userMessage)
      setMessages(prev => [...prev, { role: 'ai', text: response }])
      setIsTyping(false)
    }, 600 + Math.random() * 800)
  }, [input])

  const suggestions = ["Skills", "Projects", "Experience", "Contact"]

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Personal Assistant" : "Open AI Personal Assistant"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center"
        whileHover={{ scale: 1.1, boxShadow: "0 8px 30px rgba(16,185,129,0.5)" }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? { rotate: 0 } : { rotate: 0 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-emerald-400"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-200/60 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">AI Personal Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    <span className="text-emerald-100 text-xs">Online • Demo Mode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[320px] overflow-y-auto p-4 space-y-3 scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-md'
                      : 'bg-slate-100 text-slate-700 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                    <motion.div className="w-2 h-2 bg-slate-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-slate-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
                    <motion.div className="w-2 h-2 bg-slate-400 rounded-full" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <motion.button
                    key={s}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInput(s)
                      setTimeout(() => {
                        setMessages(prev => [...prev, { role: 'user', text: s }])
                        setIsTyping(true)
                        setTimeout(() => {
                          setMessages(prev => [...prev, { role: 'ai', text: getAIResponse(s) }])
                          setIsTyping(false)
                        }, 600 + Math.random() * 800)
                      }, 50)
                      setInput('')
                    }}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium hover:bg-emerald-100 transition-colors border border-emerald-200/50"
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 px-3 py-1.5 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
                <Terminal className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none py-1.5"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Animated Section Wrapper ────────────────────────────────────────

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Scroll Progress Indicator ───────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  )
}

// ─── Back to Top Button ──────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          aria-label="Back to top"
          whileHover={{ scale: 1.1, boxShadow: "0 8px 25px rgba(16,185,129,0.4)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ─── GitHub Stats Component ──────────────────────────────────────────

function GitHubStats() {
  const [stats, setStats] = useState<{
    totalRepos: number
    totalStars: number
    totalForks: number
    followers: number
    languages: { name: string; count: number }[]
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const GH_USER = 'MOHAMEDMETAWEA'
    const headers = { 'Accept': 'application/vnd.github.v3+json' }
    Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`, { headers }).then(r => r.ok ? r.json() : Promise.reject()),
      fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`, { headers }).then(r => r.ok ? r.json() : Promise.reject())
    ])
      .then(([user, userRepos]) => {
        const languageStats: Record<string, number> = {}
        let totalStars = 0
        let totalForks = 0
        userRepos.forEach((repo: { language?: string | null; stargazers_count?: number; forks_count?: number }) => {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
          }
          totalStars += repo.stargazers_count || 0
          totalForks += repo.forks_count || 0
        })
        const sortedLanguages = Object.entries(languageStats)
          .sort(([, a], [, b]) => (b as number) - (a as number))
          .slice(0, 8)
          .map(([name, count]) => ({ name, count: count as number }))
        setStats({
          totalRepos: user.public_repos ?? 0,
          totalStars,
          totalForks,
          followers: user.followers ?? 0,
          languages: sortedLanguages
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white/5 rounded-xl p-4 animate-pulse">
            <div className="h-8 w-16 bg-white/10 rounded mb-2"></div>
            <div className="h-4 w-24 bg-white/10 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!stats) return null

  const statItems = [
    { icon: GitBranch, value: `${stats.totalRepos}+`, label: "Repositories", gradient: "from-emerald-500/10 to-teal-500/10", border: "border-emerald-500/20", iconColor: "text-emerald-400" },
    { icon: Star, value: stats.totalStars, label: "Stars Earned", gradient: "from-amber-500/10 to-orange-500/10", border: "border-amber-500/20", iconColor: "text-amber-400" },
    { icon: GitFork, value: stats.totalForks, label: "Forks", gradient: "from-blue-500/10 to-indigo-500/10", border: "border-blue-500/20", iconColor: "text-blue-400" },
    { icon: Users, value: stats.followers, label: "Followers", gradient: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/20", iconColor: "text-purple-400" },
  ]

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {statItems.map((item, idx) => {
        const Icon = item.icon
        return (
          <motion.div 
            key={idx} 
            variants={scaleIn}
            whileHover={{ scale: 1.05, y: -3 }}
            className={`bg-gradient-to-br ${item.gradient} backdrop-blur-sm border ${item.border} rounded-xl p-4 text-center cursor-default`}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Icon className={`h-5 w-5 ${item.iconColor}`} />
              <span className="text-2xl font-bold text-white">{item.value}</span>
            </div>
            <p className="text-slate-400 text-sm">{item.label}</p>
          </motion.div>
        )
      })}

      {/* Language Distribution */}
      {stats.languages.length > 0 && (
        <motion.div variants={fadeInUp} className="col-span-2 md:col-span-4 mt-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-400" />
              Top Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {stats.languages.map((lang) => (
                <motion.div 
                  key={lang.name}
                  whileHover={{ scale: 1.08 }}
                  className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 hover:bg-white/10 transition-colors cursor-default"
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: languageColors[lang.name] || '#8B8B8B' }}
                  />
                  <span className="text-white text-sm">{lang.name}</span>
                  <span className="text-slate-400 text-xs">{lang.count}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ─── Skills Visualization ────────────────────────────────────────────

function SkillBar({ name, data, index }: { name: string; data: { skills: string[]; level: number; icon: React.ComponentType<{ className?: string }> }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const Icon = data.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: "0 16px 40px -8px rgba(16,185,129,0.2)" }}
      className="bg-white rounded-xl p-5 shadow-lg border border-slate-100 hover:border-emerald-200 transition-all duration-300 cursor-default"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg"
          >
            <Icon className="h-5 w-5 text-emerald-600" />
          </motion.div>
          <h3 className="font-semibold text-slate-900">{name}</h3>
        </div>
        <span className="text-sm font-medium text-emerald-600">{data.level}%</span>
      </div>
      
      <div className="mb-3">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${data.level}%` } : {}}
            transition={{ duration: 1.2, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5">
        {data.skills.map((skill, sIdx) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.08 + 0.4 + sIdx * 0.04 }}
          >
            <Badge variant="secondary" className="bg-slate-50 text-slate-600 text-xs hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default">
              {skill}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Project Card ────────────────────────────────────────────────────

function ProjectCard({ project, isFeatured = false }: { project: typeof projects[0]; isFeatured?: boolean }) {
  const Icon = project.icon
  const [isOpen, setIsOpen] = useState(false)
  const hasVideo = Boolean((project as any).video)

  return (
    <>
      <TiltCard className="h-full">
        <motion.div
          variants={fadeInUp}
          whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(16,185,129,0.2)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`group relative overflow-hidden rounded-2xl h-full ${
            isFeatured 
              ? 'bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 border border-emerald-100/50' 
              : 'bg-white border border-slate-200'
          } shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
          onClick={() => setIsOpen(true)}
      >
        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 text-xs">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          </div>
        )}
        
        {/* New badge */}
        {project.isNew && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 text-xs animate-pulse">
              New
            </Badge>
          </div>
        )}

        {/* Media preview if available */}
        {(project.image || hasVideo) && (
          <div className="h-48 overflow-hidden relative bg-slate-900 group">
            {hasVideo ? (
              <>
                <motion.video 
                  src={(project as any).video} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="metadata"
                  aria-label={`${project.title} Video Preview`}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-slate-900 flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform">
                    <Play className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
                    <span>Watch Demo</span>
                  </div>
                </div>
              </>
            ) : (
              <motion.img 
                src={project.image || ''} 
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className={`p-2.5 rounded-xl transition-colors ${
              isFeatured 
                ? 'bg-emerald-100 group-hover:bg-emerald-200' 
                : 'bg-slate-100 group-hover:bg-emerald-100'
            }`}>
              <Icon className={`h-5 w-5 ${isFeatured ? 'text-emerald-600' : 'text-slate-600 group-hover:text-emerald-600'} transition-colors`} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold truncate ${isFeatured ? 'text-lg text-slate-900' : 'text-base text-slate-800 group-hover:text-emerald-600'} transition-colors`}>
                {project.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Badge variant="outline" className="text-xs">
                  {project.category}
                </Badge>
                {hasVideo && (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 text-[10px] py-0">
                    Video Demo
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-slate-50 text-slate-600">
                {tech}
              </Badge>
            ))}
            {project.tech.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-slate-50 text-slate-500">
                +{project.tech.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {hasVideo ? (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs h-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(true)
                  }}
                >
                  <Play className="h-3.5 w-3.5 mr-1 fill-white" />
                  Watch Demo
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 h-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.github, '_blank', 'noopener,noreferrer')
                  }}
                >
                  <Github className="h-4 w-4 mr-1.5" />
                  View Code
                </Button>
              )}
            </motion.div>
            <motion.div 
              className="flex items-center text-xs text-slate-400"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>Details</span>
              <ChevronRight className="h-3 w-3 ml-1" />
            </motion.div>
          </div>
        </div>
        
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
        </motion.div>
      </TiltCard>

      {/* Project Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Icon className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">{project.title}</DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{project.category}</Badge>
                  {project.version && <Badge variant="secondary">{project.version}</Badge>}
                  {hasVideo && <Badge className="bg-emerald-100 text-emerald-700">Interactive Video Demo</Badge>}
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {/* Media in modal */}
            {(project.image || hasVideo) && (
              <div className="rounded-xl overflow-hidden bg-black flex justify-center items-center relative border border-slate-800">
                {hasVideo ? (
                  <video 
                    src={(project as any).video} 
                    controls
                    autoPlay
                    loop
                    playsInline
                    title={`${project.title} Full Demo Video`}
                    className="w-full max-h-80 object-contain"
                  />
                ) : (
                  <img 
                    src={project.image || ''} 
                    alt={project.title}
                    className="w-full max-h-80 object-cover"
                  />
                )}
              </div>
            )}
            
            <DialogDescription className="text-slate-600 text-base leading-relaxed">
              {project.description}
            </DialogDescription>
            
            <div>
              <h4 className="font-medium text-slate-900 mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Badge key={tech} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button asChild className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code on GitHub
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

// ─── GitHub Repos Section ────────────────────────────────────────────

function GitHubRepos() {
  const [repos, setRepos] = useState<typeof projects>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const GH_USER = 'MOHAMEDMETAWEA'
    fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=30`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then((repoList: {
        id: number
        name: string
        description: string | null
        html_url: string
        stargazers_count: number
        forks_count: number
        language: string | null
        topics: string[]
        pushed_at: string
      }[]) => {
        const transformed = repoList
          .filter(repo => !repo.name.startsWith('.'))
          .slice(0, 6)
          .map((repo) => ({
            id: `gh-${repo.id}`,
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            description: repo.description || 'No description available',
            github: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language,
            topics: repo.topics || [],
            updatedAt: repo.pushed_at,
            tech: (repo.topics || []).slice(0, 4).length > 0 ? (repo.topics || []).slice(0, 4) : [repo.language || 'Code'],
            category: repo.language || 'Project',
            icon: (repo.topics || []).includes('n8n') ? Workflow : (repo.topics || []).includes('ai') ? Bot : Code,
            featured: false,
            image: null,
            version: null
          }))
        setRepos(transformed)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-xl p-5 animate-pulse border border-slate-200">
            <div className="h-5 w-32 bg-slate-100 rounded mb-3"></div>
            <div className="h-4 w-full bg-slate-100 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-slate-100 rounded mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-5 w-16 bg-slate-100 rounded"></div>
              <div className="h-5 w-20 bg-slate-100 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {repos.map((repo) => {
        const Icon = repo.icon || Code
        return (
          <motion.div
            key={repo.id}
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: "0 12px 30px -8px rgba(16,185,129,0.15)" }}
            className="group bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors"
              >
                <Icon className="h-4 w-4 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              </motion.div>
              <h3 className="font-medium text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
                {repo.title}
              </h3>
            </div>
            
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">{repo.description}</p>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
              {repo.tech.slice(0, 3).map((tech: string) => (
                <Badge key={tech} variant="secondary" className="text-xs bg-slate-50 text-slate-600">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stars}
                  </span>
                )}
                {repo.forks > 0 && (
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks}
                  </span>
                )}
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                  <a href={repo.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3 w-3 mr-1" />
                    View
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// ─── Particle Background ─────────────────────────────────────────────

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ─── Main Portfolio Component ────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for gradient effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Track active section for nav highlights
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact']
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(sectionId)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Advanced Animation Layer */}
      <CustomCursor />
      
      {/* Scroll Progress */}
      <ScrollProgressBar />
      
      {/* Back to Top */}
      <BackToTop />
      
      {/* AI Chatbot */}
      <AIChatbot />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50" />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl" />
      </div>

      {/* Navigation Header */}
      <header>
        <motion.nav 
          role="navigation"
          aria-label="Main navigation"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div 
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => scrollToSection('hero')}
              >
                <Avatar className="h-10 w-10 border-2 border-emerald-500 ring-2 ring-emerald-500/20">
                  <AvatarImage src="/avatar.png" alt={personalInfo.name} />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">MM</AvatarFallback>
                </Avatar>
                <span className={`font-bold text-lg ${scrolled ? 'text-slate-900' : 'text-slate-800'}`}>
                  Mohamed Metawea
                </span>
              </motion.div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : scrolled 
                          ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 border-t border-slate-200">
                  <div className="flex flex-col gap-1">
                    {navItems.map((item, idx) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
                        onClick={() => scrollToSection(item.id)}
                        className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                          activeSection === item.id
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>

    <main id="main-content">

      {/* ═══════════════════════════ HERO SECTION ═══════════════════════════ */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            className="absolute -inset-[100px] opacity-50"
            style={{
              background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.15), transparent 80%)`
            }}
          />
        </div>
        <ParticleField />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                  <Badge className="mb-4 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200 px-4 py-1.5 border-0 cursor-default">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Available for Opportunities
                  </Badge>
                </motion.div>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                <CharacterReveal text="Hi, I'm" className="inline-flex mr-3" />
                <motion.span 
                  className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_200%] inline-block"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Mohamed
                </motion.span>
              </motion.h1>
              
              <motion.div variants={fadeInUp} className="text-xl sm:text-2xl text-slate-600 mb-4 font-medium h-8 overflow-hidden">
                <TextReveal text={personalInfo.role} stagger={0.03} />
              </motion.div>
              
              <motion.p variants={fadeInUp} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold mb-6 text-lg">
                {personalInfo.specialization}
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {personalInfo.bio}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <MagneticButton>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200/50 border-0"
                    onClick={() => scrollToSection('projects')}
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    View Projects
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-white/50 backdrop-blur-sm"
                    asChild
                  >
                    <a href="/Mohamed_Mostafa_Metawea_CV.pdf" download>
                      <Download className="mr-2 h-5 w-5" />
                      Download CV
                    </a>
                  </Button>
                </MagneticButton>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 justify-center lg:justify-start">
                {[
                  { href: personalInfo.github, icon: Github },
                  { href: personalInfo.linkedin, icon: Linkedin },
                  { href: `mailto:${personalInfo.email}`, icon: Mail }
                ].map(({ href, icon: Icon }, idx) => (
                  <MagneticButton key={idx}>
                    <Button variant="ghost" size="icon" className="hover:bg-emerald-50 hover:text-emerald-600 rounded-xl" asChild>
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-5 w-5" />
                      </a>
                    </Button>
                  </MagneticButton>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <motion.div 
                className="relative"
                variants={heroFloat}
                initial="initial"
                animate="animate"
              >
                {/* Decorative elements */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-full blur-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl transform rotate-6 opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl transform -rotate-3 opacity-20" />
                
                <motion.img
                  src="/my-photo.jpg"
                  alt={personalInfo.name}
                  className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white z-10"
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Floating Tech Icons */}
                <motion.div 
                  className="absolute -top-6 -right-6 p-3 bg-white rounded-2xl shadow-lg border border-emerald-100 z-20"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="h-6 w-6 text-emerald-500" />
                </motion.div>
                <motion.div 
                  className="absolute top-1/2 -left-10 p-2.5 bg-white rounded-2xl shadow-lg border border-teal-100 z-20"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Code className="h-5 w-5 text-teal-500" />
                </motion.div>
                <motion.div 
                  className="absolute bottom-10 -right-8 p-2 bg-white rounded-2xl shadow-lg border border-cyan-100 z-20"
                  animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Sparkles className="h-4 w-4 text-cyan-500" />
                </motion.div>
                
                {/* Floating badges */}
                <motion.div 
                  initial={{ opacity: 0, x: 30, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-slate-100"
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-slate-700">18+ AI Projects</span>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -30, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-slate-100"
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-medium text-slate-700">38+ Certifications</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.button 
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.button>
      </section>

      {/* ═══════════════════════════ ABOUT SECTION ═══════════════════════════ */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700 bg-emerald-50/50">
              About Me
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Engineering the Future of{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Intelligent Systems
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Education Card */}
            <AnimatedSection delay={0.1}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl"
                      >
                        <GraduationCap className="h-6 w-6 text-emerald-600" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-xl">Education</CardTitle>
                        <CardDescription>{education.period}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{education.degree}</h3>
                    <p className="text-emerald-600 font-medium mb-3">{education.university}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-slate-500">GPA:</span>
                      <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-0">{education.gpa}</Badge>
                    </div>
                    <ul className="space-y-2">
                      {education.highlights.map((highlight, idx) => (
                        <motion.li 
                          key={idx} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.12 }}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12 + 0.1, type: "spring" }}
                          />
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>

            {/* Experience Card */}
            <AnimatedSection delay={0.2}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <motion.div 
                        whileHover={{ rotate: -10, scale: 1.1 }}
                        className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl"
                      >
                        <Briefcase className="h-6 w-6 text-teal-600" />
                      </motion.div>
                      <div>
                        <CardTitle className="text-xl">Experience</CardTitle>
                        <CardDescription>{experience.period}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">{experience.title}</h3>
                    <p className="text-teal-600 font-medium mb-4">{experience.company}</p>
                    <ul className="space-y-2">
                      {experience.responsibilities.map((resp, idx) => (
                        <motion.li 
                          key={idx} 
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.12 }}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12 + 0.1, type: "spring" }}
                          />
                          {resp}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* GitHub Stats */}
          <AnimatedSection delay={0.3}>
            <motion.div 
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Github className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-bold text-white">GitHub Activity</h3>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/10" asChild>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Profile
                    </a>
                  </Button>
                </motion.div>
              </div>
              <GitHubStats />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════ AI ENGINEERING PILLARS ═══════════════════════════ */}
      <section className="py-16 px-4 relative bg-slate-900 text-white my-8 rounded-3xl mx-4 lg:mx-auto max-w-7xl overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Core Specialization
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              AI System Pillars & Architecture
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              End-to-end engineering of intelligent multi-agent orchestrations, enterprise RAG systems, computer vision pipelines, and scalable MLOps.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Bot,
                title: "Agentic Systems",
                subtitle: "Multi-Agent Orchestrations",
                desc: "LangGraph, LangChain, n8n workflows, Tree-of-Thought planning, Model Context Protocol (MCP), and autonomous tool execution.",
                gradient: "from-emerald-500/20 to-teal-500/20",
                badge: "LangGraph · MCP"
              },
              {
                icon: Sparkles,
                title: "Generative AI & RAG",
                subtitle: "Enterprise Vector Search",
                desc: "FAISS vector indexing, hybrid search, cross-encoder reranking, prompt engineering, and LLM post-training fine-tuning (LoRA/PEFT).",
                gradient: "from-teal-500/20 to-cyan-500/20",
                badge: "FAISS · LoRA"
              },
              {
                icon: Eye,
                title: "Computer Vision",
                subtitle: "Deep Perception & Biometrics",
                desc: "YOLO object detection, CNN emotion recognition, facial biometric authentication with anti-spoofing liveness detection.",
                gradient: "from-cyan-500/20 to-blue-500/20",
                badge: "OpenCV · YOLO"
              },
              {
                icon: Server,
                title: "MLOps & Deployment",
                subtitle: "Production Infrastructure",
                desc: "Docker containerization, FastAPI RESTful services, CI/CD pipelines, MLflow experiment tracking, and Prometheus observability.",
                gradient: "from-blue-500/20 to-emerald-500/20",
                badge: "Docker · FastAPI"
              }
            ].map((pillar, idx) => {
              const PillarIcon = pillar.icon
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-gradient-to-br ${pillar.gradient} bg-slate-800/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 flex flex-col justify-between shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-white/10 rounded-xl">
                        <PillarIcon className="h-6 w-6 text-emerald-400" />
                      </div>
                      <Badge variant="outline" className="text-[10px] text-emerald-300 border-emerald-500/30">
                        {pillar.badge}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{pillar.title}</h3>
                    <p className="text-xs font-semibold text-emerald-400 mb-3">{pillar.subtitle}</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ SKILLS SECTION ═══════════════════════════ */}
      <section id="skills" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700 bg-emerald-50/50">
              Technical Skills
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Technologies &{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(skills).map(([name, data], idx) => (
              <SkillBar key={name} name={name} data={data} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PROJECTS SECTION ═══════════════════════════ */}
      <section id="projects" className="py-20 px-4 relative bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700 bg-emerald-50/50">
              Featured Work
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A collection of 15+ projects showcasing expertise in AI, Machine Learning, Computer Vision, NLP, and n8n Automation
            </p>
          </AnimatedSection>

          {/* Featured Projects */}
          <AnimatedSection className="mb-12" delay={0.1}>
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-amber-500" />
              <h3 className="text-xl font-semibold text-slate-900">Featured Projects</h3>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.filter(p => p.featured).map((project) => (
                <ProjectCard key={project.id} project={project} isFeatured />
              ))}
            </motion.div>
          </AnimatedSection>

          {/* All Projects Grid */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-2 mb-6">
              <GitBranch className="h-5 w-5 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-900">All Projects</h3>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {projects.filter(p => !p.featured).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Live GitHub Repos */}
          <AnimatedSection className="mt-12" delay={0.3}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="h-5 w-5 text-emerald-500" />
                </motion.div>
                <h3 className="text-xl font-semibold text-slate-900">Latest from GitHub</h3>
              </div>
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                Live Data
              </Badge>
            </div>
            <GitHubRepos />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════ EXPERIENCE SECTION ═══════════════════════════ */}
      <section id="experience" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700 bg-emerald-50/50">
              Career Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Professional{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <motion.div 
                className="absolute left-8 top-0 bottom-0 w-0.5"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ background: "linear-gradient(to bottom, #10b981, #14b8a6, #06b6d4)" }}
              />
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-20"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="absolute left-0 w-16 h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-500 flex items-center justify-center"
                >
                  <Briefcase className="h-7 w-7 text-emerald-600" />
                </motion.div>
                
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.3 }}>
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <CardTitle className="text-xl">{experience.title}</CardTitle>
                          <p className="text-emerald-600 font-medium">{experience.company}</p>
                        </div>
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                          <Calendar className="h-3 w-3 mr-1" />
                          {experience.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {experience.responsibilities.map((resp, idx) => (
                          <motion.li 
                            key={idx} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.12 }}
                            className="flex items-start gap-3"
                          >
                            <motion.div 
                              className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.12 + 0.1, type: "spring" }}
                            />
                            <span className="text-slate-600">{resp}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CERTIFICATIONS SECTION ═══════════════════════════ */}
      <section id="certifications" className="py-20 px-4 relative bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700 bg-emerald-50/50">
              Credentials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Professional{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-slate-600">{certifications.length} industry-recognized certifications in AI and Data Science</p>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {certifications.map((cert, idx) => {
              const Icon = cert.icon
              return (
                <motion.div key={idx} variants={fadeInUp}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 16px 40px -8px rgba(16,185,129,0.15)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group border border-slate-200 hover:border-emerald-300 transition-all duration-300 bg-white/80 backdrop-blur-sm h-full">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <motion.div 
                            whileHover={{ rotate: 12, scale: 1.1 }}
                            className="p-2.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl group-hover:from-emerald-200 group-hover:to-teal-200 transition-colors"
                          >
                            <Icon className="h-5 w-5 text-emerald-600" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                              {cert.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-sm text-emerald-600 font-medium">{cert.issuer}</span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-500">{cert.period}</span>
                            </div>
                            
                            {cert.verifyUrl && (
                              <div className="mt-1">
                                <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                                  ID: {cert.verifyUrl.split('/').pop()}
                                </Badge>
                              </div>
                            )}

                            <p className="text-sm text-slate-600 mt-2 line-clamp-2">{cert.description}</p>
                            
                            {/* Certificate Actions */}
                            {(cert.certificateUrl || cert.verifyUrl) && (
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                                {cert.certificateUrl && (
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      className="h-7 text-xs border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                      asChild
                                    >
                                      <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                                        <Download className="h-3 w-3 mr-1" />
                                        View Certificate
                                      </a>
                                    </Button>
                                  </motion.div>
                                )}
                                {cert.verifyUrl && (
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-7 text-xs text-slate-500 hover:text-emerald-600"
                                      asChild
                                    >
                                      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-3 w-3 mr-1" />
                                        Verify
                                      </a>
                                    </Button>
                                  </motion.div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ CONTACT SECTION ═══════════════════════════ */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Get in Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Let&apos;s Build Something{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Ready to bring AI-powered solutions to your next project? Let&apos;s discuss how we can work together.
            </p>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
          >
            {[
              { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
              { icon: MapPin, label: 'Location', value: personalInfo.location, href: null },
              { icon: Linkedin, label: 'LinkedIn', value: 'Connect', href: personalInfo.linkedin }
            ].map(({ icon: Icon, label, value, href }, idx) => (
              <motion.div key={idx} variants={scaleIn}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(16,185,129,0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group">
                    <CardContent className="pt-6 text-center">
                      <motion.div 
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        className="p-3 bg-emerald-500/20 rounded-xl w-fit mx-auto mb-3 group-hover:bg-emerald-500/30 transition-colors"
                      >
                        <Icon className="h-6 w-6 text-emerald-400" />
                      </motion.div>
                      <p className="text-slate-400 text-sm mb-1">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-white hover:text-emerald-400 transition-colors text-sm break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{value}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="flex flex-wrap justify-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.06, boxShadow: "0 8px 30px rgba(16,185,129,0.35)" }} 
              whileTap={{ scale: 0.97 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 border-0" asChild>
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Send Email
                </a>
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.06, boxShadow: "0 8px 20px rgba(255,255,255,0.1)" }} 
              whileTap={{ scale: 0.97 }}
            >
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Profile
                </a>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </main>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" alt={personalInfo.name} />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs">MM</AvatarFallback>
              </Avatar>
              <span className="text-slate-400 text-sm">
                © 2026 {personalInfo.name}. All rights reserved.
              </span>
            </motion.div>
            <div className="flex items-center gap-4">
              {[
                { href: personalInfo.github, icon: Github, label: "GitHub Profile" },
                { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn Profile" },
                { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email Mohamed" }
              ].map(({ href, icon: Icon, label }, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon" aria-label={label} className="hover:bg-slate-800 hover:text-emerald-400" asChild>
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                      <Icon className="h-5 w-5 text-slate-400" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
