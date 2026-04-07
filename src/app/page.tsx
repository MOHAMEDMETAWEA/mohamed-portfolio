'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  Github, Linkedin, Mail, Phone, MapPin, GraduationCap, Briefcase, 
  ExternalLink, Download, ChevronDown, Brain, Code, Database, 
  Cpu, Layers, Zap, MessageSquare, FileText, Award, Calendar,
  Star, GitBranch, Rocket, Bot, Eye, Heart, Music, Leaf, Sparkles,
  Aperture, Activity, Server, BookOpen, Lightbulb, Menu, X
} from 'lucide-react'

// Portfolio Data
const personalInfo = {
  name: "Mohamed Mostafa Metawea",
  role: "AI Engineer",
  specialization: "Generative AI & Agentic Systems",
  location: "6 October City, Giza, Egypt",
  phone: "+20 155 055 9108",
  email: "mm3796703@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohamed-mostafa-metawea",
  github: "https://github.com/MOHAMEDMETAWEA",
  bio: "Passionate AI Engineer with a strong foundation in Machine Learning, Deep Learning, and Generative AI. I build intelligent systems that solve real-world problems, from autonomous clinical orchestrators to computer vision applications. My expertise spans across NLP, Computer Vision, and Agentic AI systems, with a focus on creating impactful, production-ready solutions."
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
  "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenAI API", "LangChain", "Hugging Face"],
  "Computer Vision": ["OpenCV", "YOLO", "MediaPipe", "Face Recognition", "Object Detection", "Image Classification"],
  "NLP": ["Transformers", "BERT", "GPT Models", "RAG Systems", "Text Classification", "Sentiment Analysis"],
  "Development": ["Python", "FastAPI", "Streamlit", "Git", "Docker", "Linux"],
  "Databases": ["PostgreSQL", "MongoDB", "ChromaDB", "Pinecone"],
  "Tools": ["Jupyter", "VS Code", "Google Colab", "Weights & Biases"]
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
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 2,
    title: "AI-Based Face Recognition Attendance System",
    featured: true,
    description: "A complete biometric attendance solution using deep learning for face detection and recognition. Implements liveness detection to prevent spoofing, with real-time tracking and comprehensive reporting dashboard.",
    tech: ["Python", "OpenCV", "Face Recognition", "Deep Learning", "Streamlit", "SQLite"],
    category: "Computer Vision",
    icon: Eye,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 3,
    title: "Heart Disease Risk Prediction System",
    featured: false,
    description: "A machine learning system that predicts cardiovascular disease risk using patient health metrics. Employs ensemble methods and feature engineering to achieve high accuracy in early detection.",
    tech: ["Python", "Scikit-learn", "XGBoost", "Flask", "Pandas", "NumPy"],
    category: "Healthcare AI",
    icon: Heart,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 4,
    title: "Multilabel Comment Toxicity Detection",
    featured: false,
    description: "NLP system for detecting multiple types of toxicity in online comments including threats, obscenity, insults, and identity-based hate. Uses transformer models for accurate multi-label classification.",
    tech: ["Python", "TensorFlow", "BERT", "NLP", "Deep Learning"],
    category: "NLP",
    icon: MessageSquare,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 5,
    title: "Job-Resume Matching System",
    featured: false,
    description: "An intelligent recruitment assistant that matches candidate resumes with job descriptions using NLP and semantic similarity. Helps HR teams automate initial screening processes.",
    tech: ["Python", "NLP", "Sentence Transformers", "Streamlit", "FAISS"],
    category: "NLP",
    icon: FileText,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 6,
    title: "FashionGAN - Generative Fashion",
    featured: false,
    description: "A Generative Adversarial Network for creating synthetic fashion images. Demonstrates expertise in GAN architectures, image generation, and creative AI applications.",
    tech: ["Python", "TensorFlow", "GANs", "Deep Learning", "Computer Vision"],
    category: "Generative AI",
    icon: Sparkles,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 7,
    title: "Deep Audio Classification",
    featured: false,
    description: "A deep learning system for classifying audio files into different categories. Implements CNNs on spectrograms for accurate audio pattern recognition.",
    tech: ["Python", "TensorFlow", "Librosa", "CNNs", "Audio Processing"],
    category: "Deep Learning",
    icon: Music,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 8,
    title: "Potato Disease Classification",
    featured: false,
    description: "Computer vision system for identifying potato plant diseases from leaf images. Helps farmers with early disease detection using CNN-based image classification.",
    tech: ["Python", "TensorFlow", "CNNs", "Transfer Learning", "Plant Village Dataset"],
    category: "Computer Vision",
    icon: Leaf,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 9,
    title: "Iris Detection System",
    featured: false,
    description: "Biometric iris recognition system implementing image processing and pattern matching for identity verification. Demonstrates classic computer vision techniques.",
    tech: ["Python", "OpenCV", "Image Processing", "Pattern Recognition"],
    category: "Computer Vision",
    icon: Aperture,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 10,
    title: "Deep CNN Emotion Recognition",
    featured: false,
    description: "Real-time facial emotion recognition using deep convolutional neural networks. Detects emotions from facial expressions for human-computer interaction applications.",
    tech: ["Python", "Keras", "CNNs", "OpenCV", "FER2013 Dataset"],
    category: "Computer Vision",
    icon: Activity,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 11,
    title: "Healthcare Predictive Analytics",
    featured: false,
    description: "A comprehensive analytics platform for healthcare data prediction. Includes patient readmission prediction, resource optimization, and clinical decision support.",
    tech: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Healthcare Analytics"],
    category: "Healthcare AI",
    icon: Activity,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 12,
    title: "FastAPI Projects Collection",
    featured: false,
    description: "A collection of production-ready REST APIs built with FastAPI. Includes authentication, database integration, and deployment best practices.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "JWT Authentication"],
    category: "Backend",
    icon: Server,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 13,
    title: "Mini RAG App",
    featured: false,
    description: "A Retrieval-Augmented Generation application demonstrating modern LLM integration with vector databases. Implements document ingestion, embedding, and semantic search.",
    tech: ["Python", "LangChain", "ChromaDB", "OpenAI", "RAG"],
    category: "Generative AI",
    icon: Database,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 14,
    title: "Prompt Engineering",
    featured: false,
    description: "A comprehensive exploration of prompt engineering techniques for LLMs. Includes best practices, optimization strategies, and practical examples for various use cases.",
    tech: ["Python", "OpenAI API", "LangChain", "Prompt Engineering"],
    category: "Generative AI",
    icon: Lightbulb,
    github: "https://github.com/MOHAMEDMETAWEA"
  },
  {
    id: 15,
    title: "DEPI Generative & Agentic AI Projects",
    featured: false,
    description: "Collection of projects completed during the DEPI Generative AI Professional program. Showcases advanced skills in LLMs, agentic systems, and AI application development.",
    tech: ["Python", "LangChain", "OpenAI", "RAG", "Multi-Agent Systems", "LLMs"],
    category: "Generative AI",
    icon: Rocket,
    github: "https://github.com/MOHAMEDMETAWEA"
  }
]

const certifications = [
  {
    title: "Generative AI Professional",
    issuer: "DEPI",
    period: "Nov 2025 – Jun 2026",
    description: "Comprehensive program covering LLMs, RAG systems, agentic AI, and production deployment",
    icon: Brain
  },
  {
    title: "AI Engineering Specialization",
    issuer: "Scrimba/Coursera",
    period: "9 Courses Completed",
    description: "In-depth training on AI engineering principles, MLOps, and practical AI development",
    icon: GraduationCap
  },
  {
    title: "Post-Training LLMs: Fine-Tuning & RLHF",
    issuer: "DeepLearning.AI",
    period: "Completed",
    description: "Advanced techniques for fine-tuning large language models with reinforcement learning",
    icon: Cpu
  },
  {
    title: "AI Training Program",
    issuer: "NTI, Egypt",
    period: "Completed",
    description: "National training initiative covering AI fundamentals and applications",
    icon: Layers
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    period: "Completed",
    description: "Foundational and advanced ML concepts taught by Andrew Ng",
    icon: Brain
  },
  {
    title: "IBM Data Science Professional",
    issuer: "DEPI",
    period: "Completed",
    description: "Comprehensive data science curriculum including Python, SQL, and ML",
    icon: Database
  },
  {
    title: "Orange AI Level 1 Certification",
    issuer: "Orange",
    period: "Completed",
    description: "Industry-recognized certification in AI fundamentals and applications",
    icon: Award
  }
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-emerald-500">
                <AvatarImage src="/avatar.png" alt={personalInfo.name} />
                <AvatarFallback>MM</AvatarFallback>
              </Avatar>
              <span className={`font-bold text-lg ${scrolled ? 'text-slate-900' : 'text-slate-800'}`}>
                Mohamed Metawea
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
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
                </button>
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
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
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
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Available for Opportunities
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
                Hi, I&apos;m{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Mohamed
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-slate-600 mb-4 font-medium">
                {personalInfo.role}
              </h2>
              <p className="text-emerald-600 font-medium mb-6 text-lg">
                {personalInfo.specialization}
              </p>
              <p className="text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {personalInfo.bio}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-200"
                  onClick={() => scrollToSection('projects')}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  View Projects
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  asChild
                >
                  <a href="/Mohamed_Mostafa_Metawea_CV.pdf" download>
                    <Download className="mr-2 h-5 w-5" />
                    Download CV
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <Button variant="ghost" size="icon" className="hover:bg-slate-100" asChild>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5 text-slate-700" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100" asChild>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5 text-slate-700" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100" asChild>
                  <a href={`mailto:${personalInfo.email}`}>
                    <Mail className="h-5 w-5 text-slate-700" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl transform -rotate-3 opacity-20"></div>
                <img
                  src="/my-photo.jpg"
                  alt={personalInfo.name}
                  className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-slate-700">15+ Projects</span>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="text-sm font-medium text-slate-700">7 Certifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-emerald-600 transition-colors animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700">
              About Me
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Passionate About Building{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Intelligent Systems
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <GraduationCap className="h-6 w-6 text-emerald-600" />
                  </div>
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
                  <Badge className="bg-emerald-100 text-emerald-700">{education.gpa}</Badge>
                </div>
                <ul className="space-y-2">
                  {education.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Experience Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-teal-100 rounded-xl">
                    <Briefcase className="h-6 w-6 text-teal-600" />
                  </div>
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
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2"></div>
                      {resp}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700">
              Technical Skills
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Technologies &{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, skillList], idx) => (
              <Card key={category} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${
                      idx % 3 === 0 ? 'bg-emerald-100' : idx % 3 === 1 ? 'bg-teal-100' : 'bg-cyan-100'
                    }`}>
                      {idx % 3 === 0 ? (
                        <Brain className={`h-5 w-5 ${idx % 3 === 0 ? 'text-emerald-600' : idx % 3 === 1 ? 'text-teal-600' : 'text-cyan-600'}`} />
                      ) : idx % 3 === 1 ? (
                        <Code className="h-5 w-5 text-teal-600" />
                      ) : (
                        <Database className="h-5 w-5 text-cyan-600" />
                      )}
                    </div>
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700">
              Featured Work
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A collection of 15+ projects showcasing expertise in AI, Machine Learning, Computer Vision, and NLP
            </p>
          </div>

          {/* Featured Projects */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.filter(p => p.featured).map((project) => {
                const IconComponent = project.icon
                return (
                  <Card key={project.id} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                            <IconComponent className="h-6 w-6 text-emerald-600" />
                          </div>
                          <div>
                            <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                              {project.title}
                            </CardTitle>
                            {project.version && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                {project.version}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-700">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <CardDescription className="text-slate-600 mt-2 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-white text-slate-700">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View on GitHub
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* All Projects Grid */}
          <div>
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-slate-400" />
              All Projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.filter(p => !p.featured).map((project) => {
                const IconComponent = project.icon
                return (
                  <Card key={project.id} className="group border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 bg-white">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-emerald-100 transition-colors">
                          <IconComponent className="h-5 w-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <div>
                          <CardTitle className="text-base group-hover:text-emerald-600 transition-colors">
                            {project.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {project.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 4 && (
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-500">
                            +{project.tech.length - 4}
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full text-slate-600 hover:text-emerald-600 hover:bg-emerald-50" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          View Project
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700">
              Career Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Professional{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
              
              <div className="relative pl-20">
                <div className="absolute left-0 w-16 h-16 bg-white rounded-2xl shadow-lg border-2 border-emerald-500 flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-emerald-600" />
                </div>
                
                <Card className="border-0 shadow-xl bg-white">
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
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-600">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700">
              Credentials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Professional{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-slate-600">7 industry-recognized certifications in AI and Data Science</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => {
              const IconComponent = cert.icon
              return (
                <Card key={idx} className="group border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 bg-white">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                        <IconComponent className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {cert.title}
                        </h3>
                        <p className="text-sm text-emerald-600 font-medium">{cert.issuer}</p>
                        <p className="text-xs text-slate-500 mt-1">{cert.period}</p>
                        <p className="text-sm text-slate-600 mt-2">{cert.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Get in Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Let&apos;s Work{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Together
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              I&apos;m always open to discussing new opportunities, collaborations, or just having a chat about AI and technology.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-emerald-500/20 rounded-xl w-fit mx-auto mb-3">
                  <Mail className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm mb-1">Email</p>
                <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-emerald-400 transition-colors text-sm break-all">
                  {personalInfo.email}
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-emerald-500/20 rounded-xl w-fit mx-auto mb-3">
                  <Phone className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm mb-1">Phone</p>
                <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-emerald-400 transition-colors text-sm">
                  {personalInfo.phone}
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-emerald-500/20 rounded-xl w-fit mx-auto mb-3">
                  <MapPin className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm mb-1">Location</p>
                <p className="text-white text-sm">{personalInfo.location}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <div className="p-3 bg-emerald-500/20 rounded-xl w-fit mx-auto mb-3">
                  <Linkedin className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm mb-1">LinkedIn</p>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors text-sm">
                  Connect
                </a>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg" asChild>
              <a href={`mailto:${personalInfo.email}`}>
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub Profile
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.png" alt={personalInfo.name} />
                <AvatarFallback>MM</AvatarFallback>
              </Avatar>
              <span className="text-slate-400 text-sm">
                © 2025 {personalInfo.name}. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:bg-slate-800" asChild>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 text-slate-400" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-slate-800" asChild>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-slate-400" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-slate-800" asChild>
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail className="h-5 w-5 text-slate-400" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
