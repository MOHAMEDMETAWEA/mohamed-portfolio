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
import { fadeInUp, scaleIn, staggerContainer, personalInfo, education, experience, skills, projects, certifications, AnimatedSection, GitHubStats, SkillBar, ProjectCard, GitHubRepos } from './shared'

export default function BelowFold({ showAllCerts, setShowAllCerts }: { showAllCerts: boolean; setShowAllCerts: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <>
      {/* ═══════════════════════════ ABOUT SECTION ═══════════════════════════ */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-emerald-200 text-emerald-700 bg-emerald-50/50">
              About Me
            </Badge>
            <KineticHeading className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" lead="Engineering the Future of" accent="Intelligent Systems" accentClassName="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto mb-12">
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

          </div>

          {/* GitHub Stats */}
          <AnimatedSection delay={0.3}>
            <motion.div 
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="lt-panel bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl"
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
      <section className="lt-panel py-16 px-4 relative bg-slate-900 text-white my-8 rounded-3xl mx-4 lg:mx-auto max-w-7xl overflow-hidden shadow-2xl border border-slate-800">
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
              Building multi-agent orchestrations, RAG systems, computer vision pipelines, and deployment tooling.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Bot,
                title: "Agentic Systems",
                subtitle: "Multi-Agent Orchestrations",
                desc: "LangChain, LangGraph, n8n workflows, Model Context Protocol (MCP), and autonomous tool execution.",
                gradient: "from-emerald-500/20 to-teal-500/20",
                badge: "LangGraph · MCP"
              },
              {
                icon: Sparkles,
                title: "Generative AI & RAG",
                subtitle: "Vector Search",
                desc: "FAISS vector indexing, hybrid search, reranking, prompt engineering, and fine-tuning (LoRA, PEFT) and RLHF.",
                gradient: "from-teal-500/20 to-cyan-500/20",
                badge: "FAISS · LoRA"
              },
              {
                icon: Eye,
                title: "Computer Vision",
                subtitle: "Deep Perception & Biometrics",
                desc: "CNN emotion recognition, YOLO object detection, face recognition with an anti-spoofing liveness check, and image classification.",
                gradient: "from-cyan-500/20 to-blue-500/20",
                badge: "OpenCV · YOLO"
              },
              {
                icon: Server,
                title: "MLOps & Deployment",
                subtitle: "Deployment Tooling",
                desc: "Docker containerization, FastAPI RESTful services, CI/CD, MLflow experiment tracking, and Prometheus monitoring.",
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
            <KineticHeading className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" lead="Technologies &" accent="Expertise" accentClassName="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" />
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
            <KineticHeading className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" lead="My" accent="Projects" accentClassName="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" />
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
              className="grid md:grid-cols-2 gap-6"
            >
              {[1, 18, 2, 3].map((id) => projects.find(p => p.id === id)!).map((project) => (
                <ProjectCard key={project.id} project={project} isFeatured />
              ))}
            </motion.div>
          </AnimatedSection>

          {/* All Projects Grid */}
          <AnimatedSection delay={0.2}>
            <div className="flex items-center gap-2 mb-6">
              <GitBranch className="h-5 w-5 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-900">More Projects</h3>
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
                <motion.div className="fx-spin3">
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
            <KineticHeading className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" lead="Professional" accent="Experience" accentClassName="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" />
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
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
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
            <KineticHeading className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4" lead="Professional" accent="Certifications" accentClassName="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent" />
            <p className="text-slate-600">{certifications.length} industry-recognized certifications in AI and Data Science</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(showAllCerts ? certifications : certifications.slice(0, 12)).map((cert, idx) => {
              const Icon = cert.icon
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={(idx % 3) * 0.06}
                >
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
          </div>
          {certifications.length > 12 && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => setShowAllCerts(v => !v)}
                aria-expanded={showAllCerts}
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                {showAllCerts ? 'Show fewer certifications' : `Show all ${certifications.length} certifications`}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════ CONTACT SECTION ═══════════════════════════ */}
      <section id="contact" className="lt-panel lt-contact py-20 px-4 relative">
        <div className="lt-contact-bg absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection className="text-center mb-12">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Get in Touch
            </Badge>
            <KineticHeading className="text-3xl sm:text-4xl font-bold text-white mb-4" lead="Let's Build Something" accent="Amazing" accentClassName="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent" />
            <p className="text-slate-400 max-w-2xl mx-auto">
              Ready to bring AI-powered solutions to your next project? Let&apos;s discuss how we can work together.
            </p>
          </AnimatedSection>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto mb-12"
          >
            {[
              { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: Phone, label: 'Phone', value: personalInfo.phone, href: 'tel:+201055485561' },
              { icon: MessageSquare, label: 'WhatsApp', value: 'Message me', href: personalInfo.whatsapp },
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
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="break-words text-white hover:text-emerald-400 transition-colors text-sm break-all">
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
    </>
  )
}
