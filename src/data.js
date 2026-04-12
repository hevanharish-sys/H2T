import {
  Globe,
  Palette,
  Rocket,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Briefcase,
  Target,
  Lightbulb,
  TrendingUp,
  Smartphone,
  Search,
  Video,
  Presentation,
  Image as ImageIcon,
  PenTool
} from 'lucide-react'
import { SiTelegram, SiInstagram, SiGmail } from 'react-icons/si'

export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Digital Solutions', href: '/digital-solutions' },
  { name: 'Pricing', href: '/digital-solutions#pricing' },
  { name: 'Contact', href: '/#contact' },
]

export const stats = [
  {
    label: 'Projects Delivered',
    value: 50,
    suffix: '+',
    icon: Briefcase
  },
  {
    label: 'Client Satisfaction',
    value: 98,
    suffix: '%',
    icon: CheckCircle2
  },
  {
    label: 'Fast Turnaround',
    value: 48,
    suffix: 'h',
    icon: Clock
  },
]

export const digitalServices = [
  {
    slug: 'website-development',
    title: 'Website Development',
    description: 'Custom-built websites with modern technologies and optimized performance.',
    icon: Globe,
    features: ['React & Next.js', 'Responsive Design', 'Performance Optimization', 'SEO structure']
  },
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Intuitive designs that enhance user experience and elevate brand identity.',
    icon: Palette,
    features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Identity']
  },
  {
    slug: 'app-development',
    title: 'App Development',
    description: 'Bespoke mobile applications for iOS and Android with focus on performance.',
    icon: Smartphone,
    features: ['Native Apps', 'Cross-platform', 'Cloud Sync', 'Push Notifications']
  },
  {
    slug: 'landing-pages',
    title: 'Landing Pages',
    description: 'High-converting pages designed to maximize engagement and leads.',
    icon: Rocket,
    features: ['Conversion Focus', 'A/B Testing', 'Copywriting', 'Fast Loading']
  },
  {
    slug: 'ecommerce',
    title: 'eCommerce',
    description: 'Scalable online stores built for seamless customer experience.',
    icon: ShoppingCart,
    features: ['Payment Gateways', 'Inventory Mgmt', 'Order Tracking', 'Security']
  },
  {
    slug: 'portfolio-design',
    title: 'Portfolio Design',
    description: 'Premium personal brands and digital showcases for professionals.',
    icon: Briefcase,
    features: ['Brand Storytelling', 'Visual Portfolio', 'Social Proof', 'Lead Gen']
  },
]

// Legacy services array for compatibility during transition
export const services = [...digitalServices];

export const projects = [
  {
    number: '01',
    title: 'Xtrme',
    highlight: 'Crafted by H2T',
    description: 'A full-scale AI marketing & automation platform — from brand identity to intelligent campaign flows. Designed, developed, and delivered by our team from zero to live.',
    tag: 'SaaS · AI · Marketing',
    features: ['Brand Identity', 'Custom AI Flows', 'Dashboard UI', 'Full-Stack Dev'],
    embedUrl: 'https://heroic-entry.vercel.app/',
  },
  {
    number: '02',
    title: 'Pixel Craft',
    highlight: 'Crafted by H2T',
    description: 'A high-end creative portfolio featuring experimental typography, smooth page transitions, and a minimalist aesthetic. Built to showcase digital craftsmanship at the highest level.',
    tag: 'Portfolio · UI/UX · Interaction',
    features: ['Experimental Type', 'Fluid Transitions', 'Minimalist UI', 'Framer Motion'],
    embedUrl: 'https://pixel-craft-studio-one.vercel.app/',
  },
  {
    number: '03',
    title: 'Elite Trader',
    highlight: 'Crafted by H2T',
    description: 'A professional-grade financial trading ecosystem. Featuring real-time precision data, advanced charting, and a secure infrastructure designed for the elite trading community.',
    tag: 'FinTech · Trading · Real-time',
    features: ['Real-time Data', 'Advanced Charting', 'Secure Infra', 'High-Perf UI'],
    embedUrl: 'https://theelitetrader.in/',
  },
  {
    number: '04',
    title: 'Xtrme Logistics',
    highlight: 'Crafted by H2T',
    description: 'A high-octane logistics and transport platform built for speed and simplicity. Featuring a streamlined consultation system and a performance-driven user experience designed to handle complex global shipments.',
    tag: 'Logistics · SaaS · Performance',
    features: ['Shipment Planning', 'Scheduling System', 'Brand Identity', 'High-Perf UI'],
    embedUrl: 'https://car-site-psi.vercel.app/',
  },
]

export const aboutFeatures = [
  {
    title: 'Design',
    description: 'Clean, purposeful aesthetics',
    icon: Target,
  },
  {
    title: 'Technology',
    description: 'Modern, scalable stack',
    icon: Lightbulb,
  },
  {
    title: 'Strategy',
    description: 'Results-driven approach',
    icon: TrendingUp,
  },
]

export const pricingPlans = [
  {
    id: 'starter',
    name: 'Starter',
    prices: {
      INR: { 
        current: '₹14,999', 
        original: '₹19,999', 
        period: 'One-time' 
      },
      USD: { 
        current: '$179', 
        original: '$249', 
        period: 'One-time' 
      }
    },
    description: 'Essential nodes for individuals and emerging brands starting their digital journey.',
    features: [
      'Logo Design',
      'Social Media Kit',
      'Basic Website (up to 5 pages)',
      'Responsive Design',
      'Contact Integration',
      '1 week delivery',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    prices: {
      INR: { 
        current: '₹39,999', 
        original: '₹59,999', 
        period: 'One-time' 
      },
      USD: { 
        current: '$479', 
        original: '$749', 
        period: 'One-time' 
      }
    },
    description: 'Enhanced architecture for businesses ready to scale their digital presence.',
    features: [
      'Advanced Logo Design',
      'Responsive Website (up to 10 pages)',
      'Social Media Kit + Banner Designs',
      'Basic SEO Setup',
      'Premium Interaction Design',
      '3 weeks delivery',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    prices: {
      INR: { 
        current: 'Custom', 
        original: null, 
        period: 'Quote based' 
      },
      USD: { 
        current: 'Custom', 
        original: null, 
        period: 'Quote based' 
      }
    },
    description: 'Bespoke identity & experience for established brands and startups.',
    features: [
      'Complete Branding Package',
      'Custom Website (Unlimited pages)',
      'Comprehensive Social Media Kit',
      'Ongoing Support for 1 Month',
      'Full Stack Development',
      'Dedicated Strategy Lead',
    ],
    cta: 'Get a Quote',
    highlighted: false,
  }
];

export const digitalPricing = [
  {
    id: 'digi-starter',
    name: 'Starter',
    prices: {
      INR: { current: '₹14,999', period: 'Project' },
      USD: { current: '$179', period: 'Project' }
    },
    features: ['Logo Design', 'Social Media Kit', 'Basic Website Design (up to 5 pages)']
  },
  {
    id: 'digi-growth',
    name: 'Growth',
    prices: {
      INR: { current: '₹39,999', period: 'Project' },
      USD: { current: '$479', period: 'Project' }
    },
    features: ['Advanced Logo Design', 'Responsive Website (up to 10 pages)', 'Banner Designs', 'Basic SEO Setup'],
    highlighted: true
  },
  {
    id: 'digi-elite',
    name: 'Elite',
    prices: {
      INR: { current: 'Custom', period: 'Quote' },
      USD: { current: 'Custom', period: 'Quote' }
    },
    features: ['Complete Branding', 'Custom Website (Unlimited)', 'Comprehensive Social Media Kit', '1 Month Support']
  }
];



export const socialLinks = [
  {
    name: 'Chat on Telegram',
    value: '@H2TTechnologies',
    href: 'https://t.me/H2TTechnologies',
    icon: SiTelegram,
    color: '#ffffff'
  },
  {
    name: 'View Instagram',
    value: 'h2t_technologies',
    href: 'https://www.instagram.com/h2t_technologies/',
    icon: SiInstagram,
    color: '#ffffff'
  },
  {
    name: 'Send Email',
    value: 'h2t.technologies@gmail.com',
    href: 'mailto:h2t.technologies@gmail.com',
    icon: SiGmail,
    color: '#ffffff'
  }
]
