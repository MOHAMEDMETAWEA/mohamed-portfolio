'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
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
  Terminal, Cog, Gauge, BarChart3, RefreshCw
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.3, ease: "easeOut" } }
}

// Portfolio Data
const personalInfo = {
  name: "Mohamed Mostafa Metawea",
  role: "AI Engineer & Automation Specialist",
  specialization: "Generative AI, Agentic Systems & n8n Automation",
  location: "6 October City, Giza, Egypt",
  phone: "+20 155 055 9108",
  email: "mm3796703@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohamed-mostafa-metawea",
  github: "https://github.com/MOHAMEDMETAWEA",
  bio: "I architect intelligent systems that bridge the gap between cutting-edge AI research and real-world impact. From autonomous multi-agent clinical orchestrators to automated n8n workflows, I transform complex problems into elegant, production-ready solutions. My passion lies in building AI systems that think, adapt, and deliver measurable value."
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
  period: "Feb 2025 - Mar 2025",
  responsibilities: [
    "Developed and optimized machine learning models for real-world applications",
    "Collaborated with cross-functional teams on AI-driven solutions",
    "Gained hands-on experience with production ML pipelines",
    "Implemented data preprocessing and feature engineering workflows"
  ]
}

const skills = {
  "AI/ML & Deep Learning": { 
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenAI API", "LangChain", "Hugging Face"],
    level: 95,
    icon: Brain
  },
  "Computer Vision": { 
    skills: ["OpenCV", "YOLO", "MediaPipe", "Face Recognition", "Object Detection", "Image Classification"],
    level: 88,
    icon: Eye
  },
  "NLP & LLMs": { 
    skills: ["Transformers", "BERT", "GPT Models", "RAG Systems", "Text Classification", "Sentiment Analysis"],
    level: 90,
    icon: MessageSquare
  },
  "Automation & n8n": { 
    skills: ["n8n Workflows", "API Integration", "Webhook Automation", "Process Automation", "Data Pipelines"],
    level: 85,
    icon: Workflow
  },
  "Backend Development": { 
    skills: ["Python", "FastAPI", "Streamlit", "Git", "Docker", "Linux"],
    level: 85,
    icon: Code
  },
  "Databases & Vector Stores": { 
    skills: ["PostgreSQL", "MongoDB", "ChromaDB", "Pinecone", "FAISS"],
    level: 80,
    icon: Database
  }
}

const projects = [
  {
    id: 1,
    title: "MedAgent — Autonomous Clinical Orchestrator",
    version: "v5.3.0",
    featured: true,
    description: "An AI-powered multi-agent system designed to automate patient interactions, appointment scheduling, and clinical workflows. Features autonomous agents for symptom analysis, doctor recommendations, and healthcare navigation.",
    tech: ["Python", "LangChain", "OpenAI", "FastAPI", "Multi-Agent Systems", "RAG"],
    category: "Agentic AI",
    icon: Bot,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 2,
    title: "AI-Based Face Recognition Attendance System",
    featured: true,
    description: "A complete biometric attendance solution using deep learning for face detection and recognition. Implements liveness detection to prevent spoofing, with real-time tracking and comprehensive reporting dashboard.",
    tech: ["Python", "OpenCV", "Face Recognition", "Deep Learning", "Streamlit", "SQLite"],
    category: "Computer Vision",
    icon: Eye,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: "n8n-1",
    title: "Restaurant_n8n_AI_Agent",
    featured: true,
    isNew: true,
    description: "An intelligent AI agent built with n8n for restaurant automation. Handles customer inquiries, reservation management, menu recommendations, and automated order processing through conversational AI.",
    tech: ["n8n", "AI Agents", "Webhooks", "API Integration", "Automation"],
    category: "n8n Automation",
    icon: Workflow,
    github: "https://github.com/MOHAMEDMETAWEA/Restaurant_n8n_AI_Agent",
    image: "/project-n8n-1.png"
  },
  {
    id: "n8n-2",
    title: "My-n8n-Assistant",
    featured: true,
    isNew: true,
    description: "A personal AI assistant powered by n8n workflows. Automates daily tasks, integrates with multiple services, provides intelligent responses, and streamlines productivity through custom automation chains.",
    tech: ["n8n", "AI Assistant", "Workflow Automation", "API Integration"],
    category: "n8n Automation",
    icon: Cog,
    github: "https://github.com/MOHAMEDMETAWEA/My-n8n-Assistant",
    image: "/project-n8n-2.png"
  },
  {
    id: 3,
    title: "Heart Disease Risk Prediction System",
    featured: false,
    description: "A machine learning system that predicts cardiovascular disease risk using patient health metrics. Employs ensemble methods and feature engineering to achieve high accuracy in early detection.",
    tech: ["Python", "Scikit-learn", "XGBoost", "Flask", "Pandas", "NumPy"],
    category: "Healthcare AI",
    icon: Heart,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 4,
    title: "Multilabel Comment Toxicity Detection",
    featured: false,
    description: "NLP system for detecting multiple types of toxicity in online comments including threats, obscenity, insults, and identity-based hate. Uses transformer models for accurate multi-label classification.",
    tech: ["Python", "TensorFlow", "BERT", "NLP", "Deep Learning"],
    category: "NLP",
    icon: MessageSquare,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
    title: "Mini RAG App",
    featured: false,
    description: "A Retrieval-Augmented Generation application demonstrating modern LLM integration with vector databases. Implements document ingestion, embedding, and semantic search.",
    tech: ["Python", "LangChain", "ChromaDB", "OpenAI", "RAG"],
    category: "Generative AI",
    icon: Database,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  },
  {
    id: 14,
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
    id: 15,
    title: "DEPI Generative & Agentic AI Projects",
    featured: false,
    description: "Collection of projects completed during the DEPI Generative AI Professional program. Showcases advanced skills in LLMs, agentic systems, and AI application development.",
    tech: ["Python", "LangChain", "OpenAI", "RAG", "Multi-Agent Systems", "LLMs"],
    category: "Generative AI",
    icon: Rocket,
    github: "https://github.com/MOHAMEDMETAWEA",
    image: null
  }
]

const certifications = [
  {
    title: "AI Engineering Specialization",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "9-course specialization covering OpenAI suite, LangChain, RAG, vector databases, AI agents, and MCP",
    icon: Bot,
    certificateUrl: "/cert-ai-engineering.pdf",
    verifyUrl: "https://coursera.org/verify/specialization/KA9W2QX9ME4U"
  },
  {
    title: "Learn AI Agents",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Comprehensive course on building autonomous AI agents with modern frameworks and tools",
    icon: Bot,
    certificateUrl: "/cert-ai-agents.pdf",
    verifyUrl: "https://coursera.org/verify/9LXRFGOHE9Y8"
  },
  {
    title: "Build AI Apps with LangChain.js",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Practical course on building production AI applications using LangChain.js framework",
    icon: Code,
    certificateUrl: "/cert-langchain.pdf",
    verifyUrl: "https://coursera.org/verify/GQ84048LIJG7"
  },
  {
    title: "Learn OpenAI's Assistant API",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Hands-on training with OpenAI's Assistant API for building intelligent conversational AI",
    icon: MessageSquare,
    certificateUrl: "/cert-assistant-api.pdf",
    verifyUrl: "https://coursera.org/verify/RWD0Q1ORABUQ"
  },
  {
    title: "Intro to Dall-E and GPT Vision",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Course covering DALL-E image generation and GPT Vision for multimodal AI applications",
    icon: Eye,
    certificateUrl: "/cert-dalle-gpt-vision.pdf",
    verifyUrl: "https://coursera.org/verify/9CJFM7RPO753"
  },
  {
    title: "Intro to Model Context Protocol (MCP)",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Introduction to MCP for connecting AI models with external tools and data sources",
    icon: Cpu,
    certificateUrl: "/cert-mcp.pdf",
    verifyUrl: "https://coursera.org/verify/AXMGLBYIMYJF"
  },
  {
    title: "RAG with Embeddings & Vector Databases",
    issuer: "Scrimba/Coursera",
    period: "Mar 2025",
    description: "Comprehensive course on Retrieval-Augmented Generation, embeddings, and vector databases for production AI systems",
    icon: Database,
    certificateUrl: "/cert-rag-embeddings.pdf",
    verifyUrl: "https://coursera.org/verify/D6ZYH0HP6SM3"
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
    certificateUrl: null,
    verifyUrl: null
  },
  {
    title: "Post-Training LLMs: Fine-Tuning & RLHF",
    issuer: "DeepLearning.AI",
    period: "Completed",
    description: "Advanced techniques for fine-tuning large language models with reinforcement learning",
    icon: Cpu,
    certificateUrl: null,
    verifyUrl: null
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    period: "Completed",
    description: "Foundational and advanced ML concepts taught by Andrew Ng",
    icon: Brain,
    certificateUrl: null,
    verifyUrl: null
  },
  {
    title: "IBM Data Science Professional",
    issuer: "DEPI",
    period: "Completed",
    description: "Comprehensive data science curriculum including Python, SQL, and ML",
    icon: Database,
    certificateUrl: null,
    verifyUrl: null
  },
  {
    title: "Orange AI Level 1 Certification",
    issuer: "Orange",
    period: "Completed",
    description: "Industry-recognized certification in AI fundamentals and applications",
    icon: Award,
    certificateUrl: null,
    verifyUrl: null
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

// Animated section wrapper
function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// GitHub Stats Component
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
    fetch('/api/github?type=stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.data)
        }
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

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      <motion.div variants={scaleIn} className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <GitBranch className="h-5 w-5 text-emerald-400" />
          <span className="text-2xl font-bold text-white">{stats.totalRepos}+</span>
        </div>
        <p className="text-slate-400 text-sm">Repositories</p>
      </motion.div>

      <motion.div variants={scaleIn} className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm border border-amber-500/20 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Star className="h-5 w-5 text-amber-400" />
          <span className="text-2xl font-bold text-white">{stats.totalStars}</span>
        </div>
        <p className="text-slate-400 text-sm">Stars Earned</p>
      </motion.div>

      <motion.div variants={scaleIn} className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <GitFork className="h-5 w-5 text-blue-400" />
          <span className="text-2xl font-bold text-white">{stats.totalForks}</span>
        </div>
        <p className="text-slate-400 text-sm">Forks</p>
      </motion.div>

      <motion.div variants={scaleIn} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Users className="h-5 w-5 text-purple-400" />
          <span className="text-2xl font-bold text-white">{stats.followers}</span>
        </div>
        <p className="text-slate-400 text-sm">Followers</p>
      </motion.div>

      {/* Language Distribution */}
      {stats.languages.length > 0 && (
        <motion.div variants={fadeInUp} className="col-span-2 md:col-span-4 mt-4">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-emerald-400" />
              Top Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {stats.languages.map((lang, idx) => (
                <div 
                  key={lang.name}
                  className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5"
                >
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: languageColors[lang.name] || '#8B8B8B' }}
                  />
                  <span className="text-white text-sm">{lang.name}</span>
                  <span className="text-slate-400 text-xs">{lang.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Skills visualization component
function SkillBar({ name, data, index }: { name: string; data: { skills: string[]; level: number; icon: React.ComponentType<{ className?: string }> }; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const Icon = data.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl p-5 shadow-lg border border-slate-100 hover:shadow-xl hover:border-emerald-200 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg">
            <Icon className="h-5 w-5 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-slate-900">{name}</h3>
        </div>
        <span className="text-sm font-medium text-emerald-600">{data.level}%</span>
      </div>
      
      <div className="mb-3">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: `${data.level}%` } : {}}
            transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1.5">
        {data.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="bg-slate-50 text-slate-600 text-xs hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

// Project card component with modal
function ProjectCard({ project, isFeatured = false }: { project: typeof projects[0]; isFeatured?: boolean }) {
  const Icon = project.icon
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className={`group relative overflow-hidden rounded-2xl ${
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

        {/* Image preview if available */}
        {project.image && (
          <div className="h-40 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        
        <div className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className={`p-2.5 rounded-xl transition-colors ${
              isFeatured 
                ? 'bg-emerald-100 group-hover:bg-emerald-200' 
                : 'bg-slate-100 group-hover:bg-emerald-100'
            }`}>
              <Icon className={`h-5 w-5 ${isFeatured ? 'text-emerald-600' : 'text-slate-600 group-hover:text-emerald-600'} transition-colors`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold truncate ${isFeatured ? 'text-lg text-slate-900' : 'text-base text-slate-800 group-hover:text-emerald-600'} transition-colors`}>
                {project.title}
              </h3>
              <Badge variant="outline" className="text-xs mt-1">
                {project.category}
              </Badge>
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.github, '_blank')
              }}
            >
              <Github className="h-4 w-4 mr-1.5" />
              View
            </Button>
            <div className="flex items-center text-xs text-slate-400">
              <span>Click for details</span>
              <ChevronRight className="h-3 w-3 ml-1" />
            </div>
          </div>
        </div>
        
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>

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
                </div>
              </div>
            </div>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {/* Image in modal */}
            {project.image && (
              <div className="rounded-xl overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
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
                  View on GitHub
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

// GitHub Repos Section
function GitHubRepos() {
  const [repos, setRepos] = useState<typeof projects>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/github?type=repos')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Transform and filter repos
          const transformed = data.data.slice(0, 6).map((repo: {
            id: number
            name: string
            description: string
            url: string
            stars: number
            forks: number
            language: string | null
            topics: string[]
            pushedAt: string
          }) => ({
            id: `gh-${repo.id}`,
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            description: repo.description,
            github: repo.url,
            stars: repo.stars,
            forks: repo.forks,
            language: repo.language,
            topics: repo.topics,
            updatedAt: repo.pushedAt,
            tech: repo.topics.slice(0, 4).length > 0 ? repo.topics.slice(0, 4) : [repo.language || 'Code'],
            category: repo.language || 'Project',
            icon: repo.topics.includes('n8n') ? Workflow : repo.topics.includes('ai') ? Bot : Code,
            featured: false,
            image: null,
            version: null
          }))
          setRepos(transformed)
        }
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
      animate="visible"
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {repos.map((repo) => {
        const Icon = repo.icon || Code
        return (
          <motion.div
            key={repo.id}
            variants={fadeInUp}
            whileHover={{ y: -3 }}
            className="group bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <Icon className="h-4 w-4 text-slate-600 group-hover:text-emerald-600 transition-colors" />
              </div>
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
              <Button variant="ghost" size="sm" className="h-7 text-xs" asChild>
                <a href={repo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3 w-3 mr-1" />
                  View
                </a>
              </Button>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

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

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
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
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-emerald-100 text-emerald-700'
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
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 border-t border-slate-200">
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-all ${
                          activeSection === item.id
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="order-2 lg:order-1 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="mb-4 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200 px-4 py-1.5 border-0">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Available for Opportunities
                </Badge>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Mohamed
                </span>
              </motion.h1>
              
              <motion.h2 variants={fadeInUp} className="text-xl sm:text-2xl text-slate-600 mb-4 font-medium">
                {personalInfo.role}
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-semibold mb-6 text-lg">
                {personalInfo.specialization}
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {personalInfo.bio}
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200/50 border-0"
                    onClick={() => scrollToSection('projects')}
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    View Projects
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
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
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 justify-center lg:justify-start">
                {[
                  { href: personalInfo.github, icon: Github },
                  { href: personalInfo.linkedin, icon: Linkedin },
                  { href: `mailto:${personalInfo.email}`, icon: Mail }
                ].map(({ href, icon: Icon }, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="icon" className="hover:bg-emerald-50 hover:text-emerald-600" asChild>
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-5 w-5" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
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
                  className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white"
                  whileHover={{ scale: 1.02 }}
                />
                
                {/* Floating badges */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-slate-700">17+ Projects</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-slate-100"
                >
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-medium text-slate-700">7 Certifications</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.button 
          onClick={() => scrollToSection('about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.button>
      </section>

      {/* About Section */}
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
            <AnimatedSection>
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ rotate: 10 }}
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
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Experience Card */}
            <AnimatedSection>
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ rotate: -10 }}
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
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                        {resp}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* GitHub Stats */}
          <AnimatedSection>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Github className="h-6 w-6 text-white" />
                  <h3 className="text-xl font-bold text-white">GitHub Activity</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/10" asChild>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View Profile
                  </a>
                </Button>
              </div>
              <GitHubStats />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
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

      {/* Projects Section */}
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
              A collection of 17+ projects showcasing expertise in AI, Machine Learning, Computer Vision, NLP, and n8n Automation
            </p>
          </AnimatedSection>

          {/* Featured Projects */}
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-amber-500" />
              <h3 className="text-xl font-semibold text-slate-900">Featured Projects</h3>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {projects.filter(p => p.featured).map((project) => (
                <ProjectCard key={project.id} project={project} isFeatured />
              ))}
            </motion.div>
          </AnimatedSection>

          {/* All Projects Grid */}
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-6">
              <GitBranch className="h-5 w-5 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-900">All Projects</h3>
            </div>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {projects.filter(p => !p.featured).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Live GitHub Repos */}
          <AnimatedSection className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-emerald-500" />
                <h3 className="text-xl font-semibold text-slate-900">Latest from GitHub</h3>
              </div>
              <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                Live Data
              </Badge>
            </div>
            <GitHubRepos />
          </AnimatedSection>
        </div>
      </section>

      {/* Experience Timeline Section */}
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
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500" />
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-20"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="absolute left-0 w-16 h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-500 flex items-center justify-center"
                >
                  <Briefcase className="h-7 w-7 text-emerald-600" />
                </motion.div>
                
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
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-slate-600">{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
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
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {certifications.map((cert, idx) => {
              const Icon = cert.icon
              return (
                <motion.div key={idx} variants={fadeInUp}>
                  <Card className="group border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <motion.div 
                          whileHover={{ rotate: 10 }}
                          className="p-2.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl group-hover:from-emerald-200 group-hover:to-teal-200 transition-colors"
                        >
                          <Icon className="h-5 w-5 text-emerald-600" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {cert.title}
                          </h3>
                          <p className="text-sm text-emerald-600 font-medium">{cert.issuer}</p>
                          <p className="text-xs text-slate-500 mt-1">{cert.period}</p>
                          <p className="text-sm text-slate-600 mt-2 line-clamp-2">{cert.description}</p>
                          
                          {/* Certificate Actions */}
                          {(cert.certificateUrl || cert.verifyUrl) && (
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                              {cert.certificateUrl && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-7 text-xs border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                                  asChild
                                >
                                  <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer">
                                    <Download className="h-3 w-3 mr-1" />
                                    Certificate
                                  </a>
                                </Button>
                              )}
                              {cert.verifyUrl && (
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
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
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
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm group">
                  <CardContent className="pt-6 text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
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
            ))}
          </motion.div>

          <AnimatedSection className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 border-0" asChild>
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Send Email
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
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
                © 2025 {personalInfo.name}. All rights reserved.
              </span>
            </motion.div>
            <div className="flex items-center gap-4">
              {[
                { href: personalInfo.github, icon: Github },
                { href: personalInfo.linkedin, icon: Linkedin },
                { href: `mailto:${personalInfo.email}`, icon: Mail }
              ].map(({ href, icon: Icon }, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.1, y: -2 }}>
                  <Button variant="ghost" size="icon" className="hover:bg-slate-800 hover:text-emerald-400" asChild>
                    <a href={href} target="_blank" rel="noopener noreferrer">
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
