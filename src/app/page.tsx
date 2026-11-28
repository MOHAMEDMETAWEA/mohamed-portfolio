'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, MotionConfig, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
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
  ArrowUp, Utensils, Sun, Moon
} from 'lucide-react'

import { useMagnetic } from "@/hooks/use-magnetic"
import { TiltCard } from "@/components/animations/tilt-card"
import { CustomCursor } from "@/components/animations/custom-cursor"
import { Buddy } from "@/components/buddy/Buddy"
import { KineticHeading } from "@/components/buddy/KineticHeading"
import dynamic from 'next/dynamic'
import { loadMedia, MagneticButton, fadeInUp, staggerContainer, heroFloat, personalInfo, experience, skills, projects, certifications, ThemeToggle, getAIResponse, ScrollProgressBar, BackToTop, ParticleField, FxEnhancer } from './shared'
const BelowFold = dynamic(() => import('./BelowFold'))

export default function Portfolio() {
  const [, setMediaReady] = useState(false)
  useEffect(() => {
    const go = () => { void loadMedia().then(() => setMediaReady(true)) }
    const w = window as unknown as { requestIdleCallback?: (f: () => void) => void }
    if (w.requestIdleCallback) w.requestIdleCallback(go); else setTimeout(go, 800)
  }, [])
  const [activeSection, setActiveSection] = useState('hero')
  const [showAllCerts, setShowAllCerts] = useState(false)
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
    <MotionConfig reducedMotion="user">
    <FxEnhancer />
    <div className="min-h-screen bg-[#090d14] overflow-x-hidden">
      {/* Advanced Animation Layer */}
      
      {/* Scroll Progress */}
      <ScrollProgressBar />
      <Buddy answer={getAIResponse} />
      
      {/* Back to Top */}
      <BackToTop />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40" />
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

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-emerald-400 focus:px-4 focus:py-2 focus:text-slate-950">
        Skip to content
      </a>

      {/* Navigation Header */}
      <header>
        <motion.nav 
          role="navigation"
          aria-label="Main navigation"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-slate-950/90 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-slate-950/30 backdrop-blur-sm'
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
                    transition={{ delay: 0.3 + idx * 0.08, ease: [0.22, 1, 0.36, 1] as const }}
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
                <span className="ml-2"><ThemeToggle /></span>
                <Button size="sm" className="ml-3 bg-emerald-400 text-slate-950 hover:bg-emerald-300" onClick={() => scrollToSection('contact')}>
                  Contact
                </Button>
              </div>

              <span className="md:hidden ml-auto mr-2"><ThemeToggle /></span>
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              >
                  {isMenuOpen ? <X className="h-6 w-6 text-slate-100" /> : <Menu className="h-6 w-6 text-slate-100" />}
              </motion.button>
            </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
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
              initial={false}
              animate="visible"
              variants={staggerContainer}
              className="hero-copy order-2 lg:order-1 text-center lg:text-left"
            >
              <motion.div variants={fadeInUp}>
                <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                  <Badge className="mb-4 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 hover:from-emerald-200 hover:to-teal-200 px-4 py-1.5 border-0 cursor-default">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    AI Engineer · Egypt
                  </Badge>
                </motion.div>
              </motion.div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-4xl xl:text-[2.75rem] font-bold text-slate-900 mb-4 leading-tight">
                <span className="hero-mask mr-3"><span className="hero-line">Mohamed Mostafa</span></span>
                <span className="hero-mask">
                  <span
                    className="hero-line fx-grad bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent bg-[length:200%_200%]"
                    style={{ animationDelay: "0.12s" }}
                  >
                    Metawea
                  </span>
                </span>
              </h1>
              
              <motion.div variants={fadeInUp} className="text-xl sm:text-2xl text-slate-600 mb-4 font-medium min-h-8">
                {personalInfo.role}
              </motion.div>
              
              <motion.p variants={fadeInUp} className="accent-text text-emerald-600 font-semibold mb-6 text-lg">
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
                    className="resume-btn border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-white/50 backdrop-blur-sm"
                    asChild
                  >
                    <a href="/Mohamed_Mostafa_Metawea_Resume.pdf" download>
                      <Download className="mr-2 h-5 w-5" />
                      Download Resume
                    </a>
                  </Button>
                </MagneticButton>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-4 justify-center lg:justify-start">
                {[
                  { href: personalInfo.github, icon: Github, label: "GitHub Profile" },
                  { href: personalInfo.linkedin, icon: Linkedin, label: "LinkedIn Profile" },
                  { href: personalInfo.whatsapp, icon: MessageSquare, label: "WhatsApp" },
                  { href: `mailto:${personalInfo.email}`, icon: Mail, label: "Email Mohamed" }
                ].map(({ href, icon: Icon, label }, idx) => (
                  <MagneticButton key={idx}>
                    <Button variant="ghost" size="icon" aria-label={label} className="hover:bg-emerald-50 hover:text-emerald-600 rounded-xl" asChild>
                      <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-5 w-5" />
                      </a>
                    </Button>
                  </MagneticButton>
                ))}
              </motion.div>
            </motion.div>

            <motion.div 
              initial={false}
              className="hero-photo-wrap order-1 lg:order-2 flex justify-center"
            >
              <motion.div 
                className="relative"
                variants={heroFloat}
                initial="initial"
                animate="animate"
              >
                {/* Decorative elements */}
                <motion.div 
                  className="fx-spin absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-full blur-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl transform rotate-6 opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-3xl transform -rotate-3 opacity-20" />
                
                <motion.img
                  src="/my-photo.jpg"
                  alt={personalInfo.name}
                  className="hero-photo-dark relative w-36 h-36 sm:w-80 sm:h-80 object-cover rounded-3xl shadow-2xl border-4 border-white z-10"
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Floating Tech Icons */}
                <motion.div 
                  className="fx-fa absolute -top-6 -right-6 p-3 bg-white rounded-2xl shadow-lg border border-emerald-100 z-20"
                >
                  <Brain className="h-6 w-6 text-emerald-500" />
                </motion.div>
                <motion.div 
                  className="fx-fb absolute top-1/2 -left-10 p-2.5 bg-white rounded-2xl shadow-lg border border-teal-100 z-20"
                >
                  <Code className="h-5 w-5 text-teal-500" />
                </motion.div>
                <motion.div 
                  className="fx-fc absolute bottom-10 -right-8 p-2 bg-white rounded-2xl shadow-lg border border-cyan-100 z-20"
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
                    <span className="text-sm font-medium text-slate-700">AI · ML · GenAI</span>
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
                    <span className="text-sm font-medium text-slate-700">Data → Models → Software</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.button 
          aria-label="Scroll to About section" onClick={() => scrollToSection('about')}
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.button>
      </section>

      <BelowFold showAllCerts={showAllCerts} setShowAllCerts={setShowAllCerts} />

    </main>

      {/* Footer */}
      <footer className="lt-panel lt-footer py-8 px-4 bg-slate-900 border-t border-slate-800 relative z-10">
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
                { href: personalInfo.whatsapp, icon: MessageSquare, label: "WhatsApp" },
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
    </MotionConfig>
  )
}
