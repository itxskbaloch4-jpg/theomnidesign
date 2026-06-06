"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// ── TYPES ──────────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; children?: { label: string; href: string }[] }[];
}

// ── NAV DATA ───────────────────────────────────────────────────────────────────
const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/web-marketing-agency/",
    children: [
      { label: "Why Choose Us", href: "/web-marketing-agency/#why-choose-us" },
      { label: "Team", href: "/team/" },
      { label: "Clients", href: "/clients/" },
      { label: "Testimonials", href: "/testimonials/" },
      { label: "FAQ", href: "/faq/" },
      { label: "Internship", href: "/internship/" },
    ],
  },
  {
    label: "Services",
    href: "/services/",
    children: [
      {
        label: "Web Design",
        href: "/web-design/",
        children: [
          { label: "Web Design Packages", href: "/web-design/web-design-packages/" },
          { label: "Website Maintenance", href: "/web-design/website-maintenance-services/" },
          { label: "Website Security & CDN", href: "/web-design/website-security-cdn/" },
          { label: "Montreal Web Hosting", href: "/web-design/web-hosting/" },
          { label: "Graphic Design", href: "/web-design/graphic-design/" },
          { label: "Logo Design", href: "/web-design/logo-design/" },
          { label: "Web Designer", href: "/web-design/web-designer/" },
        ],
      },
      {
        label: "SEO / GEO",
        href: "/seo/",
        children: [
          { label: "SEO Packages", href: "/seo/seo-packages/" },
          { label: "GEO Optimization Package", href: "/geo-optimization-packages/" },
          { label: "Link Building", href: "/seo/link-building/" },
          { label: "Local SEO", href: "/seo/local-seo/" },
          { label: "Advanced Conversion Tracking", href: "/seo/advanced-conversion-tracking-services/" },
          { label: "Heat Mapping Services", href: "/seo/heat-mapping-services/" },
        ],
      },
      {
        label: "Google Ads",
        href: "/google-ads/",
        children: [
          { label: "Google Ads Packages", href: "/google-ads/google-ads-packages/" },
          { label: "Pay Per Click", href: "/google-ads/pay-per-click/" },
          { label: "Remarketing / Retargeting", href: "/google-ads/remarketing-retargeting/" },
          { label: "SEM Services", href: "/google-ads/sem-services/" },
          { label: "SEM Consultant", href: "/google-ads/sem-consultant/" },
          { label: "Local Search Marketing", href: "/google-ads/local-search-marketing/" },
        ],
      },
      {
        label: "Social Media",
        href: "/social-media/",
        children: [
          { label: "Social Media Packages", href: "/social-media/social-media-packages/" },
          { label: "LinkedIn B2B Packages", href: "/b2b-linkedin-marketing/" },
          { label: "LinkedIn CVs", href: "/linkedin-cvs/" },
          { label: "Social Media Management", href: "/social-media/social-media-management/" },
          { label: "Social Media Advertising", href: "/social-media/social-media-advertising/" },
          { label: "Social Media Marketing Agency", href: "/social-media/social-media-marketing-agency/" },
        ],
      },
      {
        label: "Digital Marketing",
        href: "/internet-marketing/",
        children: [
          { label: "Email Marketing Packages", href: "/internet-marketing/email-marketing/" },
          { label: "Call Management", href: "/call-management-services/" },
          { label: "Reviews Cards", href: "/internet-marketing/reviews-cards/" },
          { label: "Negative Google Review Removal", href: "/negative-google-review-removal/" },
          { label: "Video", href: "/web-design/video/" },
          { label: "Digital Marketing Services", href: "/internet-marketing/services-for-online-business/" },
          { label: "Digital Marketing Consultant", href: "/internet-marketing/digital-marketing-consultant/" },
          { label: "Affiliate Marketing", href: "/internet-marketing/affiliate-marketing/" },
          { label: "HTML Email Signature Design", href: "/internet-marketing/html-email-signature-design-service/" },
        ],
      },
      {
        label: "AI",
        href: "#",
        children: [
          { label: "AI-Photo Packages", href: "/ai-photo-packages/" },
          { label: "AI-Video Packages", href: "/ai-video-packages/" },
        ],
      },
      { label: "Livechat", href: "/livechat-packages/" },
      { label: "Mini Packages", href: "/mini-packages/" },
    ],
  },
  { label: "Our Work", href: "/our-work/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

const testimonials = [
  {
    name: "Steven Berke",
    company: "Steven Berke Clothes",
    text: "Andreas did an excellent job on getting my website organically well rated on Google. His ideas and knowledge of SEO is top notch. I would recommend Andreas and his team to any company looking to get their site well placed on Google.",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/steven-berke-150x150.jpg",
  },
  {
    name: "Normand Champigny",
    company: "President, CEO and Director, Sphinx Resources Ltd.",
    text: "Andreas has provided an excellent and timely service for the design and maintenance of a web site in the natural resources sector. His input with regards to use of social media has also been invaluable.",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/normand-champigny-150x150.jpg",
  },
  {
    name: "John Glasspoole",
    company: "INterFace MEdia Studios",
    text: "Omnivision has been doing our SEO and website design for a few years now. I have nothing but great things to say about this company, and Andreas in particular. They're very professional and really know how to treat a client. Our online presence has improved dramatically.",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/John-Glasspoole-150x150.jpg",
  },
  {
    name: "Elizabeth Urbanowicz",
    company: "Urban Photography MTL",
    text: "Andreas has been an absolute pleasure to work with! In just 4 months he got my website ranking very well and I went from zero web inquiries to almost one every day. I highly recommend his services!",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Elizabeth-Urbanowicz-150x150.jpg",
  },
  {
    name: "Centre du Sommeil de Montréal",
    company: "",
    text: "Terrific and friendly service. We needed an update on our website. Sent the request after 4 PM and all the work was done before 9 AM the next day. Thanks Omnivision!",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Centre-du-Sommeil-150x150.jpg",
  },
  {
    name: "Alexandre Desjardins",
    company: "Senior Associate at Borden Ladner Gervais",
    text: "Andreas did a great job in redesigning our website with a very tight budget and deadline. He was professional and very available, during and after the mandate.",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Alexandre-Desjardins-150x150.jpg",
  },
  {
    name: "Francis Ventura",
    company: "Policy and Engagement Coordinator at The McKell Institute",
    text: "The McKell Institute recently commissioned Omnivision Design to redevelop our website. The transformation has been cost-effective, timely, efficient and the results are absolutely remarkable.",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Laurie-Gordon-150x150.jpg",
  },
  {
    name: "Carmine Maurizio",
    company: "Manager, Mobility Collection Strategy at Telus",
    text: "Omnivision Design produced a fantastic new website for our soccer club and evolved our digital footprint to the top of our industry. Andreas is a professional single point of contact who constantly works with our organizational constraints to find the best solutions.",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/carmine-maurizio-150x150.jpg",
  },
  {
    name: "John Marrett",
    company: "Maximizer CRM Certified Expert",
    text: "A couple of years ago, I needed a quick website for an event we had bought a table at where we were going to showcase a new product. Andreas and the team at OmniVision got a bilingual website up and running in a couple of weeks, several days before the show!",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/testimonial-1a-150x150.jpg",
  },
  {
    name: "Elie Grinberger",
    company: "HairstyleCITY.com",
    text: "Omnivision is an internet marketing company that brings a lot of experience to the table, and sound advice that precipitously translates to improvements in the bottom line!",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/testimonial-2a-150x150.jpg",
  },
];

const portfolioItems = [
  { title: "Copicom Responsive Web Design", img: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/copicom-responsive-web-design-thumb.jpg", full: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/copicom-responsive-web-design.jpg" },
  { title: "Copicom Web Development", img: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Copicom-web-development-thumb.jpg", full: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Copicom-web-development.jpg" },
  { title: "Darlene Wong Graphic Design", img: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/darleenwong-graphic-design-thumb.jpg", full: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/darleenwong-graphic-design.jpg" },
  { title: "Hypotheque Web Site Creation", img: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Hypotheque-web-site-creation-thumb.jpg", full: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Hypotheque-web-site-creation.jpg" },
  { title: "Omnivision Design Montreal", img: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-montreal-thumb.jpg", full: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-montreal.jpg" },
  { title: "Omnivision Web Portfolio", img: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-web-portfolio-thumb.jpg", full: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-web-portfolio.jpg" },
  { title: "Responsive Website Montreal", img: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/responsive-website-montreal-thumb.jpg", full: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/responsive-website-montreal.jpg" },
  { title: "Uni-Signal Web Development", img: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Uni-signal-web-development-thumb.jpg", full: "https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Uni-signal-web-development.jpg" },
];

const clientLogos = [
  { name: "Syneos Health", img: "https://www.omnivisiondesign.com/wp-content/uploads/2021/07/syneos-health-logo.png" },
  { name: "Mobi724", img: "https://www.omnivisiondesign.com/wp-content/uploads/2021/07/mobi724_logo.png" },
  { name: "Alarme Signal", img: "https://www.omnivisiondesign.com/wp-content/uploads/2021/07/alarme-signal_logo.png" },
  { name: "Kyocera", img: "https://www.omnivisiondesign.com/wp-content/uploads/2021/07/kyocera_logo.png" },
  { name: "Aeroplan", img: "https://www.omnivisiondesign.com/wp-content/uploads/2021/07/aeroplan_logo-1.png" },
  { name: "Airbnb", img: "https://www.omnivisiondesign.com/wp-content/uploads/2021/07/airbnb_logo.png" },
  { name: "Luxury Retreats", img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/graphic-design-luxury-retreats.jpg" },
  { name: "Air Canada", img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/graphics-air-canada.png" },
  { name: "Telus", img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/telus-logo.png" },
  { name: "Terrasses Bonsecours", img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/livechat-service-terrasses-bonsecours.png" },
  { name: "HGregoire", img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/seo-marketing-hgregoire.jpg" },
  { name: "Sphinx Resources", img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-seo-sphinx-resources-1.png" },
  { name: "Multi Prets", img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-multi-prets.png" },
  { name: "Rosdev", img: "https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-rosdev.png" },
];

const packages = [
  { title: "Web Design", price: "$3,300", unit: "", desc: "Elevate your online presence with our Web Design Packages", href: "/web-design/web-design-packages/" },
  { title: "SEO", price: "$595", unit: "/mo", desc: "Unlock visibility and dominate searches with our SEO Packages", href: "/seo/seo-packages/" },
  { title: "Google Ads", price: "$385", unit: "/mo", desc: "Unleash success with our Google Ads Packages", href: "/google-ads/google-ads-packages/" },
  { title: "Social", price: "$385", unit: "/mo", desc: "Ignite your brand's social buzz with our Social Media Packages", href: "/social-media/social-media-packages/" },
  { title: "Email", price: "$385", unit: "/mo", desc: "Elevate your outreach with our Email Marketing Packages", href: "/internet-marketing/email-marketing/" },
  { title: "Mini", price: "$220", unit: "/mo", desc: "Maximize impact and minimize cost with our Mini Packages", href: "/mini-packages/" },
];

const blogPosts = [
  {
    date: "June 5, 2026",
    title: "Why Your Rankings Improved but Leads Did Not: How to Diagnose SEO Traffic Quality",
    href: "/why-your-rankings-improved-but-leads-did-not-how-to-diagnose-seo-traffic-quality/",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2026/06/Diagnose-SEO-Traffic-Quality-450x300.webp",
  },
  {
    date: "May 26, 2026",
    title: "How to Build AEO Authority With Content",
    href: "/how-to-build-aeo-authority-with-content/",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2026/05/Build-AEO-Authority-450x300.webp",
  },
  {
    date: "May 15, 2026",
    title: "How to Design a Website That Converts Visitors Into Leads",
    href: "/how-to-design-a-website-that-converts-visitors-into-leads/",
    img: "https://www.omnivisiondesign.com/wp-content/uploads/2026/05/Design-a-Website-450x300.webp",
  },
];

const platformLogos = [
  { name: "LinkedIn", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/linkedin1a.png" },
  { name: "Instagram", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/instagram1a.png" },
  { name: "Google Ads", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/google-ads.png" },
  { name: "Facebook", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/facebook1a.png" },
  { name: "Shopify", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/shopify-logo.png" },
  { name: "Pinterest", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/pinterest1a.png" },
  { name: "WooCommerce", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/woocommerce-logo.png" },
  { name: "X", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/X-Logo.png" },
  { name: "WordPress", img: "https://www.omnivisiondesign.com/wp-content/uploads/2019/12/wordpress-logo.png" },
];

// ── ANIMATION VARIANTS ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};
const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── COMPONENTS ─────────────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#00555a]/95 backdrop-blur-xl shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#ffc94b] rounded-xl flex items-center justify-center font-['Syne'] font-black text-[#00555a] text-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
            OV
          </div>
          <span className="font-['Syne'] font-bold text-[#ffc94b] text-xl tracking-tight hidden sm:block">
            Omnivision<span className="text-white">Design</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, 6).map((item) => (
            <li key={item.label} className="relative group"
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              
                href={item.href}
                className="px-3 py-2 text-sm font-['DM_Sans'] font-medium text-white/90 hover:text-[#ffc94b] transition-colors duration-200 flex items-center gap-1"
              >
                {item.label}
                {item.children && (
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180 duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </a>
              {item.children && activeDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 bg-[#003a3e] border border-[#ffc94b]/20 rounded-2xl shadow-2xl py-2 min-w-[200px] z-50"
                >
                  {item.children.map((child) => (
                    <a key={child.label} href={child.href}
                      className="block px-4 py-2 text-sm text-white/80 hover:text-[#ffc94b] hover:bg-white/5 transition-colors duration-150 font-['DM_Sans']">
                      {child.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA + Phone */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:514-655-6276" className="text-[#ffc94b] font-['Syne'] font-semibold text-sm hover:text-white transition-colors duration-200">
            (514)-655-6276
          </a>
          
            href="/contact/"
            className="bg-[#ffc94b] text-[#00555a] px-5 py-2.5 rounded-full font-['Syne'] font-bold text-sm hover:bg-white hover:text-[#00555a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Request a Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[#ffc94b]"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              className="block w-6 h-0.5 bg-current origin-center" />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block w-6 h-0.5 bg-current" />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              className="block w-6 h-0.5 bg-current origin-center" />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-[#003a3e] border-t border-[#ffc94b]/20 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <a key={item.label} href={item.href}
                  className="block py-2 text-white/90 hover:text-[#ffc94b] font-['DM_Sans'] font-medium transition-colors border-b border-white/10">
                  {item.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <a href="tel:514-655-6276" className="block text-[#ffc94b] font-['Syne'] font-semibold">(514)-655-6276</a>
                <a href="/contact/" className="block bg-[#ffc94b] text-[#00555a] px-6 py-3 rounded-full font-['Syne'] font-bold text-center">
                  Request a Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────────
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden animated-gradient noise-overlay">
      {/* 3D Grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#ffc94b]/20"
          style={{
            width: `${80 + i * 60}px`,
            height: `${80 + i * 60}px`,
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Big 3D teal circle */}
      <motion.div
        className="absolute right-[-10%] top-[10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,201,75,0.15), rgba(0,85,90,0.05))",
          border: "1px solid rgba(255,201,75,0.1)",
        }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#ffc94b]/20 border border-[#ffc94b]/40 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-[#ffc94b] rounded-full pulse-ring inline-block" />
            <span className="text-[#ffc94b] font-['DM_Sans'] text-sm font-medium">Meet Your New Digital Marketing Team</span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="font-['Syne'] font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight"
            >
              Digital{" "}
              <span className="relative inline-block">
                <span className="text-[#ffc94b]">Marketing</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-[#ffc94b] origin-left rounded-full"
                />
              </span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
              className="font-['Syne'] font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white/30 leading-[0.95] tracking-tight"
            >
              Agency Montreal
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/70 text-lg sm:text-xl font-['DM_Sans'] max-w-2xl leading-relaxed mb-10"
          >
            Everything You Need to Succeed Online. Web Design, SEO, SEM and Social Media Marketing — all under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            
              href="/contact/"
              className="group relative bg-[#ffc94b] text-[#00555a] px-8 py-4 rounded-full font-['Syne'] font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Success is a Click Away</span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
            </a>
            
              href="/web-marketing-agency/"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-['Syne'] font-semibold text-lg hover:border-[#ffc94b] hover:text-[#ffc94b] transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Service pills floating */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4"
        >
          {["Web Design", "SEO", "SEM", "Social Media"].map((svc, i) => (
            <motion.div
              key={svc}
              whileHover={{ x: -8, scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white font-['Syne'] font-semibold text-sm cursor-pointer hover:bg-[#ffc94b]/20 hover:border-[#ffc94b]/40 transition-all duration-300"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {svc}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs font-['DM_Sans'] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#ffc94b]/60 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}

// ── SERVICES INTRO ─────────────────────────────────────────────────────────────
function ServicesIntroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: "🎨",
      title: "Web Design",
      desc: "Creation and development of a website, including programming and content integration.",
    },
    {
      icon: "📈",
      title: "SEM",
      desc: "Pay-per-click advertising, our pay-as-you-go system allows you to pay per lead that visits your website.",
    },
    {
      icon: "🔍",
      title: "SEO",
      desc: "Allow your website to rank higher in organic search results and attract more visitors.",
    },
    {
      icon: "📱",
      title: "Social Media",
      desc: "Put you in touch with your prospective customers, allowing you to build relationships and exercise brand control.",
    },
  ];

  return (
    <section className="relative bg-[#ffc94b] py-24 lg:py-32 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00555a]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00555a]/8 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.p variants={fadeUp} className="text-[#00555a]/60 font-['DM_Sans'] text-sm tracking-widest uppercase mb-4">
            Your Montreal Digital Marketing, SEO & Web Design Agency
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-['Syne'] font-black text-4xl sm:text-5xl lg:text-6xl text-[#00555a] leading-tight max-w-4xl mx-auto">
            ROI-Driven Digital Marketing Services
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={fadeUp}
              whileHover={{ y: -12, rotateX: -3, rotateY: 3 }}
              className="card-3d bg-[#00555a] rounded-3xl p-8 group cursor-pointer teal-glow relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#007a82] to-[#003a3e] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-4xl mb-6">{svc.icon}</div>
                <h3 className="font-['Syne'] font-bold text-[#ffc94b] text-xl mb-3">{svc.title}</h3>
                <p className="text-white/70 font-['DM_Sans'] text-sm leading-relaxed">{svc.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── ABOUT SECTION ──────────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[#00555a] py-24 lg:py-36 overflow-hidden diagonal-top diagonal-bottom">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[#ffc94b]/70 font-['DM_Sans'] text-sm tracking-widest uppercase mb-4">
              Website Design, SEO and Social Media
            </p>
            <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-8">
              We Help You{" "}
              <span className="text-[#ffc94b]">Dominate</span>{" "}
              Google
            </h2>
            <div className="space-y-5 text-white/70 font-['DM_Sans'] leading-relaxed">
              <p>
                If you run a local business, you need SEO, digital marketing, and web consulting services. We offer such services to businesses located in major cities in Canada, including Montreal, Toronto, and Vancouver, and the USA.
              </p>
              <p>
                Our online marketing strategies, tactics, techniques, and methods are client-centric. We take advantage of a unique combination of digital marketing knowledge, drawn from our experienced team members during the website analysis and keyword research stage, in order to target the most profitable keywords on Google.ca and Google.com.
              </p>
              <p>
                Our objective is to offer clients a significant return on investment via effective, long-lasting SEO results. Feel free to request a quote regarding pricing, plans, custom SEO packages or web design packages.
              </p>
            </div>
            <motion.a
              href="/web-marketing-agency/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block mt-10 bg-[#ffc94b] text-[#00555a] px-8 py-4 rounded-full font-['Syne'] font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Read More About Us
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="space-y-6"
          >
            {/* How it works */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="font-['Syne'] font-bold text-[#ffc94b] text-2xl mb-8">How It Works</h3>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Get In Touch", href: "/contact/", desc: "Tell us about your project and goals" },
                  { step: "02", title: "Develop Website", href: "/web-design/", desc: "We design and build your perfect website" },
                  { step: "03", title: "Market Website", href: "/internet-marketing/", desc: "Drive traffic and convert visitors into customers" },
                ].map((item) => (
                  <a key={item.step} href={item.href}
                    className="flex items-center gap-5 group hover:translate-x-2 transition-transform duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-[#ffc94b]/10 border border-[#ffc94b]/30 flex items-center justify-center font-['Syne'] font-black text-[#ffc94b] text-lg group-hover:bg-[#ffc94b]/20 transition-colors shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-['Syne'] font-bold text-white group-hover:text-[#ffc94b] transition-colors">{item.title}</div>
                      <div className="text-white/50 text-sm font-['DM_Sans']">{item.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Calculator CTA */}
            <motion.a
              href="/website-calculator/"
              whileHover={{ scale: 1.02 }}
              className="block bg-gradient-to-r from-[#ffc94b] to-[#e6b000] rounded-3xl p-8 text-[#00555a] group"
            >
              <div className="text-4xl mb-3">🧮</div>
              <h4 className="font-['Syne'] font-black text-2xl mb-2">Get Your Price Estimate!</h4>
              <p className="font-['DM_Sans'] text-[#00555a]/80 mb-4">Calculate the price of your dream website. We&apos;re excited to bring your vision to life!</p>
              <span className="font-['Syne'] font-bold underline group-hover:no-underline">Calculate My Price →</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── STATS ──────────────────────────────────────────────────────────────────────
function StatsSection() {
  const stats = [
    { value: 15, suffix: "+", label: "Years of Experience" },
    { value: 500, suffix: "+", label: "Happy Clients" },
    { value: 40, suffix: "+", label: "Industries Served" },
    { value: 50, suffix: "M+", label: "Client Revenue" },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#ffc94b] py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#00555a]/5" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="text-center">
              <div className="font-['Syne'] font-black text-5xl sm:text-6xl text-[#00555a] mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#00555a]/70 font-['DM_Sans'] font-medium text-sm tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── PACKAGES ───────────────────────────────────────────────────────────────────
function PackagesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#003a3e] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div variants={staggerChildren} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[#ffc94b]/60 font-['DM_Sans'] text-sm tracking-widest uppercase mb-4">Transparent Pricing</p>
            <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Our <span className="text-[#ffc94b]">Packages</span>
            </h2>
          </motion.div>

          <motion.div variants={staggerChildren} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                variants={fadeUp}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative rounded-3xl p-8 overflow-hidden group cursor-pointer ${
                  i === 1
                    ? "bg-[#ffc94b] text-[#00555a]"
                    : "bg-white/5 border border-white/10 text-white hover:border-[#ffc94b]/40"
                }`}
              >
                {i === 1 && (
                  <div className="absolute top-4 right-4 bg-[#00555a] text-[#ffc94b] text-xs font-['Syne'] font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`font-['Syne'] font-bold text-xl mb-4 ${i === 1 ? "text-[#003a3e]" : "text-[#ffc94b]"}`}>
                  {pkg.title}
                </div>
                <div className="mb-2">
                  <span className={`font-['Syne'] font-black text-5xl ${i === 1 ? "text-[#00555a]" : "text-white"}`}>
                    {pkg.price}
                  </span>
                  <span className={`font-['DM_Sans'] text-lg ${i === 1 ? "text-[#00555a]/70" : "text-white/50"}`}>
                    {pkg.unit ? `${pkg.unit}` : ""}
                  </span>
                  {!pkg.unit && <span className={`font-['DM_Sans'] text-sm ml-1 ${i === 1 ? "text-[#00555a]/60" : "text-white/40"}`}>starting at</span>}
                </div>
                <p className={`font-['DM_Sans'] text-sm mb-6 leading-relaxed ${i === 1 ? "text-[#003a3e]/80" : "text-white/60"}`}>
                  {pkg.desc}
                </p>
                
                  href={pkg.href}
                  className={`inline-flex items-center gap-2 font-['Syne'] font-bold text-sm ${
                    i === 1
                      ? "text-[#00555a] group-hover:gap-4"
                      : "text-[#ffc94b] group-hover:gap-4"
                  } transition-all duration-300`}
                >
                  Learn More <span>→</span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── PORTFOLIO ──────────────────────────────────────────────────────────────────
function PortfolioSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="bg-[#ffc94b] py-24 lg:py-32 relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={staggerChildren} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-[#00555a]/60 font-['DM_Sans'] text-sm tracking-widest uppercase mb-4">Creative Work</p>
            <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl lg:text-6xl text-[#00555a] leading-tight max-w-2xl">
              Some Creative <span className="text-stroke">Work</span>
            </h2>
            <p className="text-[#00555a]/70 font-['DM_Sans'] mt-4 max-w-xl">
              Omnivision offers Montreal internet marketing services to small, medium &amp; large businesses, primarily located in Montreal.
            </p>
          </motion.div>

          <motion.div variants={staggerChildren} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioItems.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ scale: 1.04, zIndex: 10 }}
                onClick={() => setLightbox(item.full)}
                className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-xl"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#00555a]/0 group-hover:bg-[#00555a]/70 transition-all duration-400 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                    <div className="text-[#ffc94b] font-['Syne'] font-bold text-sm">{item.title}</div>
                    <div className="text-white/80 font-['DM_Sans'] text-xs mt-1">Click to preview</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightbox}
              alt="Portfolio preview"
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
            />
            <button className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl font-light">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#00555a] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div variants={staggerChildren} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="text-[#ffc94b]/60 font-['DM_Sans'] text-sm tracking-widest uppercase mb-4">What Clients Say</p>
            <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Client <span className="text-[#ffc94b]">Testimonials</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Swiper
              modules={[Autoplay, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView={1}
              coverflowEffect={{ rotate: 30, stretch: 0, depth: 150, modifier: 1, slideShadows: false }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2.5 },
              }}
              className="pb-12"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.name}>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full mx-2 hover:border-[#ffc94b]/30 transition-colors duration-300">
                    <div className="text-[#ffc94b] text-5xl font-serif leading-none mb-4">&ldquo;</div>
                    <p className="text-white/80 font-['DM_Sans'] leading-relaxed text-sm mb-8">{t.text}</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={t.img}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#ffc94b]/50"
                      />
                      <div>
                        <div className="font-['Syne'] font-bold text-white text-sm">{t.name}</div>
                        {t.company && <div className="text-white/50 font-['DM_Sans'] text-xs">{t.company}</div>}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── CLIENTS MARQUEE ────────────────────────────────────────────────────────────
function ClientsSection() {
  return (
    <section className="bg-[#ffc94b] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <p className="text-center text-[#00555a]/60 font-['DM_Sans'] text-sm tracking-widest uppercase">
          Trusted by Leading Brands
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-inner items-center gap-12 py-4">
          {[...clientLogos, ...clientLogos].map((logo, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center w-32 h-16 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
              <img src={logo.img} alt={logo.name} className="max-w-full max-h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SERVICES DETAILED ──────────────────────────────────────────────────────────
function ServicesDetailSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Web Design",
      content: `It is crucial to choose top internet marketing services. With the right amount of advertising, engagement, training, and strategies provided by a capable web design company, measurable results can be achieved. Our digital marketing agency specializes in WordPress web design (including WooCommerce) and Shopify web design for transactional e-commerce sites.\n\nOur process starts with understanding how your brand is perceived by your target market (brand positioning). Once we reach the website design phase, our focus shifts to optimizing the user experience, ensuring sufficient calls to action on your website. Our lead web designer has over ten years of experience optimizing usability and conversion rate, resulting in more inbound phone calls and emails.`,
      list: [],
    },
    {
      label: "SEO",
      content: `Omnivision Design currently offers blogging and SEO content writing services, including WordPress SEO, Shopify SEO, video blogs, and guest posting services. If you want to meet the latest demands of search engines based on Google's most recent algorithm updates, we are your go-to SEO consultants.`,
      list: ["Wordpress SEO", "WooCommerce SEO", "Shopify SEO", "Social Media Optimization (SMO)", "Google Penguin 2.0-friendly On Page & Off Page SEO", "Link Earning", "Link Baiting", "Content Strategy", "Content Writing", "Content Curation", "Content Spinning", "Article & Video Syndication", "Profile Creation", "Community Engagement", "Disavow Links", "Google Remarketing", "Freshness Management"],
    },
    {
      label: "Web Marketing",
      content: `Our online marketing services are available in both English and French. We can create a fully bilingual or other multilingual web site, and we pride ourselves on our ability to serve our clients in the language of their choice.`,
      list: ["Keyword Research and Website Analytics, SEO SILO Architecture", "Content Writing", "On page SEO – Search Engine Optimization", "Off page SEO – Link Building", "HTML, WordPress and Shopify Website Design and Development", "Magento Ecommerce Web Design", "Mobile and Tablet Web Design – Responsive Web Design", "Social Media Marketing, Management, Training", "SEM – Search Engine Marketing", "Fast, Reliable and Cheap Web Hosting"],
    },
    {
      label: "Advertising",
      content: `Here is a list of other top advertising services we can offer. Let our top internet marketing company from Montreal improve your site's web design and SEO, your social media marketing and social media management strategy.`,
      list: ["Branding Services", "Logo Design", "Business Cards", "3D Modeling, Rendering", "2D / 3D Animation and Motion Graphics", "Video Production, Video Editing", "Affordable Printing – Other Print Solutions"],
    },
  ];

  return (
    <section className="bg-[#003a3e] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={staggerChildren}>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Full-Service <span className="text-[#ffc94b]">Digital Solutions</span>
            </h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {tabs.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className={`px-6 py-3 rounded-full font-['Syne'] font-semibold text-sm transition-all duration-300 ${
                    activeTab === i
                      ? "bg-[#ffc94b] text-[#00555a] shadow-xl"
                      : "bg-white/5 border border-white/20 text-white/70 hover:border-[#ffc94b]/40 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12"
              >
                <div className="grid lg:grid-cols-2 gap-10">
                  <div>
                    <p className="text-white/70 font-['DM_Sans'] leading-relaxed whitespace-pre-line">
                      {tabs[activeTab].content}
                    </p>
                    {tabs[activeTab].list.length === 0 && (
                      <a href="/services/" className="inline-block mt-6 bg-[#ffc94b] text-[#00555a] px-6 py-3 rounded-full font-['Syne'] font-bold text-sm hover:bg-white transition-colors duration-300">
                        Our Services →
                      </a>
                    )}
                  </div>
                  {tabs[activeTab].list.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tabs[activeTab].list.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-white/70 font-['DM_Sans'] text-sm">
                          <span className="text-[#ffc94b] mt-0.5 shrink-0">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── PLATFORMS ──────────────────────────────────────────────────────────────────
function PlatformsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#ffc94b] py-16">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-center text-[#00555a]/60 font-['DM_Sans'] text-sm tracking-widest uppercase mb-10"
        >
          Platforms We Work With
        </motion.p>
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6 items-center justify-items-center"
        >
          {platformLogos.map((logo) => (
            <motion.div
              key={logo.name}
              variants={fadeUp}
              whileHover={{ scale: 1.15, y: -4 }}
              className="flex items-center justify-center h-10 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <img src={logo.img} alt={logo.name} className="max-h-10 max-w-[100px] object-contain" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── BLOG ───────────────────────────────────────────────────────────────────────
function BlogSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#00555a] py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div variants={staggerChildren} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-[#ffc94b]/60 font-['DM_Sans'] text-sm tracking-widest uppercase mb-4">Exclusive Insights</p>
              <h2 className="font-['Syne'] font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Latest from{" "}
                <span className="text-[#ffc94b]">Our Blog</span>
              </h2>
            </div>
            <a href="/blog/" className="shrink-0 border-2 border-[#ffc94b]/40 text-[#ffc94b] px-6 py-3 rounded-full font-['Syne'] font-semibold text-sm hover:bg-[#ffc94b] hover:text-[#00555a] transition-all duration-300">
              All Posts →
            </a>
          </motion.div>

          <motion.div variants={staggerChildren} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-[#ffc94b]/30 transition-all duration-300 cursor-pointer"
              >
                <a href={post.href}>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00555a]/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="text-[#ffc94b]/70 font-['DM_Sans'] text-xs tracking-widest uppercase mb-3">{post.date}</p>
                    <h3 className="font-['Syne'] font-bold text-white text-lg leading-snug group-hover:text-[#ffc94b] transition-colors duration-300 mb-4">
                      {post.title}
                    </h3>
                    <span className="text-[#ffc94b] font-['DM_Sans'] text-sm font-medium group-hover:gap-3 inline-flex items-center gap-2 transition-all duration-300">
                      Learn More <span>→</span>
                    </span>
                  </div>
                </a>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── CTA SECTION ────────────────────────────────────────────────────────────────
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-[#ffc94b] py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00555a]/10 rounded-full -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#00555a]/10 rounded-full translate-y-1/2 blur-3xl" />
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div variants={staggerChildren} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <motion.h2 variants={fadeUp} className="font-['Syne'] font-black text-4xl sm:text-5xl lg:text-6xl text-[#00555a] leading-tight mb-6">
            Get Started Today
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#00555a]/70 font-['DM_Sans'] text-lg mb-4 space-x-2">
            <span>Get more visitors</span>
            <span className="text-[#00555a]/40">•</span>
            <span>Turn visitors into customers</span>
            <span className="text-[#00555a]/40">•</span>
            <span>Monitor website performance</span>
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            
              href="tel:+15146556276"
              className="bg-[#00555a] text-[#ffc94b] px-10 py-5 rounded-full font-['Syne'] font-bold text-xl hover:bg-[#003a3e] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              (514)-655-6276
            </a>
            
              href="/contact/"
              className="border-3 border-[#00555a] text-[#00555a] px-10 py-5 rounded-full font-['Syne'] font-bold text-xl hover:bg-[#00555a] hover:text-[#ffc94b] transition-all duration-300 border-2"
            >
              Free Quote
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────────
function Footer() {
  const footerLinks = ["About", "Clients", "Services", "Testimonials", "FAQ", "Blog", "Sitemap", "Privacy Policy"];
  const footerHrefs = ["/web-marketing-agency/", "/clients/", "/services/", "/testimonials/", "/faq/", "/blog/", "/sitemap/", "/privacy-policy/"];
  const latestPosts = [
    { title: "Why Your Rankings Improved but Leads Did Not: How to Diagnose SEO Traffic Quality", date: "June 5, 2026", href: "/why-your-rankings-improved-but-leads-did-not-how-to-diagnose-seo-traffic-quality/" },
    { title: "How to Build AEO Authority With Content", date: "May 26, 2026", href: "/how-to-build-aeo-authority-with-content/" },
    { title: "How to Design a Website That Converts Visitors Into Leads", date: "May 15, 2026", href: "/how-to-design-a-website-that-converts-visitors-into-leads/" },
  ];

  return (
    <footer className="bg-[#003a3e] border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#ffc94b] rounded-xl flex items-center justify-center font-['Syne'] font-black text-[#00555a] text-lg">
                OV
              </div>
              <span className="font-['Syne'] font-bold text-[#ffc94b] text-xl">OmnivisionDesign</span>
            </div>
            <p className="text-white/60 font-['DM_Sans'] text-sm leading-relaxed mb-6">
              Omnivision Design is a Montreal Web Marketing Company, offering internet marketing services to small, medium and large businesses including public companies, and has the best quality web marketing strategy for companies in any industry.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              {[
                { href: "https://www.facebook.com/omnivision.design", label: "Facebook", icon: "f" },
                { href: "https://twitter.com/omnivisiondes", label: "Twitter/X", icon: "𝕏" },
                { href: "http://ca.linkedin.com/in/omnivisiondesign", label: "LinkedIn", icon: "in" },
                { href: "https://www.pinterest.com/omnivisiondesign/", label: "Pinterest", icon: "P" },
                { href: "https://www.instagram.com/omnivisiondesign/", label: "Instagram", icon: "ig" },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:bg-[#ffc94b]/20 hover:border-[#ffc94b]/40 hover:text-[#ffc94b] transition-all duration-300 text-xs font-bold font-['Syne']">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Syne'] font-bold text-[#ffc94b] text-lg mb-6">Contact Us</h4>
            <div className="space-y-3 text-white/60 font-['DM_Sans'] text-sm">
              <p>106-7470 Sherbrooke St W.<br />Montreal, Quebec Canada H4B 1S5</p>
              <p>6860 Chester Ave<br />Montreal, Quebec<br />Canada H4V 1K6</p>
              <a href="tel:514-655-6276" className="block text-[#ffc94b] font-['Syne'] font-semibold text-lg hover:text-white transition-colors">
                (514) 655-6276
              </a>
            </div>
          </div>

          {/* Latest Posts */}
          <div>
            <h4 className="font-['Syne'] font-bold text-[#ffc94b] text-lg mb-6">Latest Posts</h4>
            <div className="space-y-4">
              {latestPosts.map((post) => (
                <a key={post.title} href={post.href}
                  className="block group hover:translate-x-1 transition-transform duration-200">
                  <div className="text-white/80 font-['DM_Sans'] text-sm group-hover:text-[#ffc94b] transition-colors leading-snug mb-1">
                    {post.title}
                  </div>
                  <div className="text-white/40 font-['DM_Sans'] text-xs">{post.date}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              {footerLinks.map((link, i) => (
                <a key={link} href={footerHrefs[i]}
                  className="text-white/50 font-['DM_Sans'] text-xs hover:text-[#ffc94b] transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <p className="text-white/30 font-['DM_Sans'] text-xs">
              © {new Date().getFullYear()} OmnivisionDesign.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── LENIS INIT ─────────────────────────────────────────────────────────────────
function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    const initLenis = async () => {
      try {
        const LenisModule = await import("lenis");
        const LenisClass = LenisModule.default;
        lenis = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          smoothWheel: true,
        });

        function raf(time: number) {
          lenis!.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch {
        // Lenis not installed, smooth scroll fallback
      }
    };
    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

// ── PAGE ───────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <LenisProvider>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesIntroSection />
        <AboutSection />
        <StatsSection />
        <PackagesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ClientsSection />
        <ServicesDetailSection />
        <PlatformsSection />
        <BlogSection />
        <CTASection />
      </main>
      <Footer />
    </LenisProvider>
  );
}
