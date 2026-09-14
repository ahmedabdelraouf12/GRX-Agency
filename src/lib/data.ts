export interface ServiceItem {
  id: string
  titleKey: string
  descKey: string
  icon: string
  badge: string
  roiMetric: string
  deliverablesAr: string[]
  deliverablesEn: string[]
  color: string
}

export const servicesData: ServiceItem[] = [
  {
    id: 'media-buying',
    titleKey: 'service_1_title',
    descKey: 'service_1_desc',
    icon: 'TrendingUp',
    badge: 'High Impact',
    roiMetric: '4.8x Avg ROAS',
    deliverablesAr: ['إعلانات Meta & TikTok', 'حملات Google Search & YouTube', 'إعادة استهداف ذكية Retargeting', 'لوحة تحكم إحصائيات حية'],
    deliverablesEn: ['Meta & TikTok Ads', 'Google Search & YouTube', 'Dynamic Retargeting', 'Live Analytics Dashboard'],
    color: 'from-violet-500 to-indigo-600',
  },
  {
    id: 'seo-growth',
    titleKey: 'service_2_title',
    descKey: 'service_2_desc',
    icon: 'Search',
    badge: 'Organic Scale',
    roiMetric: '+320% Traffic',
    deliverablesAr: ['تدقيق تقني شامل للموقع', 'تحليل وبحث الكلمات المفتاحية', 'بناء روابط خلفية قوية Backlinks', 'تحسين محركات البحث المحلي Local SEO'],
    deliverablesEn: ['Full Technical SEO Audit', 'Competitor Keyword Gap', 'Authority Backlink Building', 'Local & Global Search Optimization'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'social-media',
    titleKey: 'service_3_title',
    descKey: 'service_3_desc',
    icon: 'Share2',
    badge: 'Community',
    roiMetric: '1.2M+ Reach/mo',
    deliverablesAr: ['خطة محتوى شهرية استراتيجية', 'إنتاج ريلز وتيك توك فيروسية', 'إدارة وتفاعل على مدار 24/7', 'تعاون مع المؤثرين Influencers'],
    deliverablesEn: ['Strategic Content Calendar', 'Viral Short-Form Reels/TikToks', '24/7 Community Engagement', 'Influencer Partnership Management'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'branding',
    titleKey: 'service_4_title',
    descKey: 'service_4_desc',
    icon: 'Palette',
    badge: 'Premium Identity',
    roiMetric: '100% Unique',
    deliverablesAr: ['تصميم الشعار والهوية الكاملة', 'كتيب إرشادات العلامة (Brand Guidelines)', 'تصميم التغليف والعبوات Packaging', 'مواد تسويقية ومطبوعات فاخرة'],
    deliverablesEn: ['Full Logo & Visual Identity', 'Comprehensive Brand Guidelines', 'Packaging & Unboxing Design', 'Corporate Collateral & Print'],
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'video-production',
    titleKey: 'service_5_title',
    descKey: 'service_5_desc',
    icon: 'Video',
    badge: 'Creative Power',
    roiMetric: '3x CTR Boost',
    deliverablesAr: ['إعلانات فيديو سينمائية', 'موشن جرافيكس 2D و 3D مذهل', 'سيناريو وكتابة إعلانية مقنعة', 'تعديل وتلوين ومؤثرات صوتية هوليوودية'],
    deliverablesEn: ['Cinematic Brand Commercials', '2D/3D Motion Animation', 'Direct-Response Scriptwriting', 'Color Grading & Sound Design'],
    color: 'from-purple-600 to-brand-500',
  },
  {
    id: 'web-development',
    titleKey: 'service_6_title',
    descKey: 'service_6_desc',
    icon: 'Code2',
    badge: 'Next.js & Speed',
    roiMetric: '99% Speed Score',
    deliverablesAr: ['مواقع ومتاجر إلكترونية Next.js فائقة السرعة', 'تصميم واجهات UI/UX ترفع معدل التحويل', 'ربط بوابات الدفع والشحن', 'لوحة تحكم إدارة مخصصة وسهلة'],
    deliverablesEn: ['Next.js High-Speed Stores', 'CRO Optimized UI/UX Design', 'Global Payment & Logistics Setup', 'Custom Scalable Admin Dashboard'],
    color: 'from-emerald-500 to-teal-500',
  },
]

export interface CaseStudy {
  id: string
  titleAr: string
  titleEn: string
  category: 'ads' | 'branding' | 'ecommerce' | 'video'
  categoryLabelAr: string
  categoryLabelEn: string
  client: string
  image: string
  stat1: string
  stat1LabelAr: string
  stat1LabelEn: string
  stat2: string
  stat2LabelAr: string
  stat2LabelEn: string
  summaryAr: string
  summaryEn: string
}

export const portfolioData: CaseStudy[] = [
  {
    id: 'lumina-fashion',
    titleAr: 'مضاعفة مبيعات متجر الأزياء الفاخرة بنسبة 420%',
    titleEn: 'Scaling Luxury Fashion Brand to +420% Online Sales',
    category: 'ads',
    categoryLabelAr: 'إعلانات ممولة',
    categoryLabelEn: 'Paid Media',
    client: 'Lumina Couture',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    stat1: '+420%',
    stat1LabelAr: 'نمو المبيعات',
    stat1LabelEn: 'Revenue Growth',
    stat2: '6.2x',
    stat2LabelAr: 'عائد الـ ROAS',
    stat2LabelEn: 'Average ROAS',
    summaryAr: 'إعادة هيكلة مسار الشراء، إطلاق إعلانات كتالوج ديناميكية على تيك توك وميتا، وتخفيض تكلفة الاستحواذ بنسبة 45%.',
    summaryEn: 'Restructured funnel, deployed dynamic catalog ads on TikTok & Meta, cutting customer acquisition cost by 45%.',
  },
  {
    id: 'velox-fintech',
    titleAr: 'إطلاق الهوية البصرية وتطبيق منصة فينتك العالمية',
    titleEn: 'Full Rebranding & UI/UX for Fintech Unicorn Velox',
    category: 'branding',
    categoryLabelAr: 'هوية بصرية',
    categoryLabelEn: 'Branding & Identity',
    client: 'Velox Pay',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    stat1: '1.8M',
    stat1LabelAr: 'مستخدم نشط',
    stat1LabelEn: 'Active Users',
    stat2: '$12M',
    stat2LabelAr: 'تمويل تم جمعه',
    stat2LabelEn: 'Series A Raised',
    summaryAr: 'بناء هوية بصرية كاملة وتصميم تجربة مستخدم عصرية ساهمت في إغلاق جولة استثمارية بنجاح.',
    summaryEn: 'Constructed an authoritative modern brand system and product design that helped secure Series A funding.',
  },
  {
    id: 'aura-cosmetics',
    titleAr: 'متجر إلكتروني Next.js فائق السرعة بعائد 5x',
    titleEn: 'Next-Gen Headless E-Commerce for Aura Cosmetics',
    category: 'ecommerce',
    categoryLabelAr: 'متاجر ومواقع',
    categoryLabelEn: 'E-Commerce',
    client: 'Aura Skin',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    stat1: '0.8s',
    stat1LabelAr: 'سرعة التحميل',
    stat1LabelEn: 'Load Time',
    stat2: '+185%',
    stat2LabelAr: 'معدل التحويل CRO',
    stat2LabelEn: 'Conversion Rate',
    summaryAr: 'بناء متجر متطور باستخدام Next.js و Tailwind رفع معدل الشراء الفوري وقلل السلات المتروكة بنسبة 38%.',
    summaryEn: 'Built high-speed Next.js storefront boosting instantaneous checkouts and reducing cart abandonment by 38%.',
  },
  {
    id: 'zenith-property',
    titleAr: 'حملة إعلانية لعقارات فاخرة بمبيعات تجاوزت 85M ج.م',
    titleEn: 'Luxury Real Estate Campaign Yielding $18M in Sales',
    category: 'video',
    categoryLabelAr: 'إنتاج إبداعي وفيديو',
    categoryLabelEn: 'Creative & Video',
    client: 'Zenith Developments',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    stat1: '3,200+',
    stat1LabelAr: 'عميل محتمل مؤهل',
    stat1LabelEn: 'Qualified Leads',
    stat2: '85M ج.م',
    stat2LabelAr: 'قيمة الحجوزات',
    stat2LabelEn: 'Sales Closed',
    summaryAr: 'إنتاج فيديوهات ثلاثية الأبعاد ودرون مع إعلانات ليدز محكمة الاستهداف لكبار المستثمرين.',
    summaryEn: 'Produced 4K drone cinematography and 3D architectural renders paired with laser-targeted lead forms.',
  },
]

export const clientLogos = [
  'NOVA TECH',
  'LUMINA',
  'ZENITH GROUP',
  'NEXUS GLOBAL',
  'AURA BEAUTY',
  'VELOX FINTECH',
  'ORION RETAIL',
  'KINETIC LABS',
]

export interface PricingPlan {
  id: string
  nameAr: string
  nameEn: string
  badge?: string
  priceAr: string
  priceEn: string
  periodAr: string
  periodEn: string
  descAr: string
  descEn: string
  popular?: boolean
  featuresAr: string[]
  featuresEn: string[]
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    nameAr: 'باقة الانطلاق (Starter)',
    nameEn: 'Starter Growth',
    priceAr: '15,000 ج.م',
    priceEn: '$750',
    periodAr: '/ شهرياً',
    periodEn: '/ month',
    descAr: 'مثالية للشركات الناشئة والمتاجر في بداياتها لبناء قاعدة مبيعات مستقرة.',
    descEn: 'Ideal for startups and early e-commerce brands establishing a steady revenue pipeline.',
    featuresAr: [
      'إدارة إعلانات منصتين (Meta + TikTok)',
      '12 منشور وريلز إبداعي شهرياً',
      'تجهيز وتتبع البيكسل Google Analytics & CAPI',
      'تقرير أداء أسبوعي مفصل',
      'دعم عبر واتساب مخصص',
    ],
    featuresEn: [
      '2 Ad Platforms Managed (Meta + TikTok)',
      '12 High-Converting Reels/Posts per month',
      'Pixel & Conversion API (CAPI) Integration',
      'Weekly Comprehensive Performance Reports',
      'Dedicated WhatsApp Slack Channel',
    ],
  },
  {
    id: 'scale',
    nameAr: 'باقة التوسع ومضاعفة المبيعات (Scale)',
    nameEn: 'Scale & Dominate',
    badge: 'الأكثر اختياراً',
    popular: true,
    priceAr: '32,000 ج.م',
    priceEn: '$1,600',
    periodAr: '/ شهرياً',
    periodEn: '/ month',
    descAr: 'الخيار الأقوى للشركات التي ترغب في الهيمنة السريعة ومضاعفة أرباحها.',
    descEn: 'Our flagship engine for brands determined to aggressive scale and market dominance.',
    featuresAr: [
      'إدارة كاملة لجميع المنصات (Meta, TikTok, Google, Snapchat)',
      '24 منشور وريلز وسيناريوهات إعلانية احترافية',
      'تحسين متواصل لمعدل التحويل داخل الموقع (CRO)',
      'جلسة استراتيجية أسبوعية مع كبير مديري النمو',
      'A/B Testing مستمر للإعلانات والجمهور',
      'تصميم صفحات هبوط (Landing Pages) مجاناً',
    ],
    featuresEn: [
      'Full Multi-Platform Ad Management (Meta, TikTok, Google, Snap)',
      '24 High-Performance Ad Creatives & Video Scripts',
      'Continuous Conversion Rate Optimization (CRO)',
      'Weekly 1-on-1 Growth Strategy Session',
      'Endless Multivariate A/B Creative Testing',
      'Custom High-Converting Landing Page Included',
    ],
  },
  {
    id: 'enterprise',
    nameAr: 'باقة الشركات الكبرى (Enterprise)',
    nameEn: 'Enterprise Partner',
    priceAr: 'مخصص',
    priceEn: 'Custom',
    periodAr: '',
    periodEn: '',
    descAr: 'شريك استراتيجي مخصص وحلول تسويقية غير محدودة للمؤسسات الكبرى.',
    descEn: 'A dedicated growth team embedded directly into your enterprise ecosystem.',
    featuresAr: [
      'فريق تسويق متكامل مخصص (Media Buyer + Designer + Copywriter)',
      'إنتاج فيديوهات سينمائية وإعلانية كاملة في استوديوهاتنا',
      'تطوير وربط الأنظمة المخصصة والذكاء الاصطناعي',
      'استشارات استراتيجية لمجالس الإدارة',
      'اتفاقية مستوى الخدمة SLA مع دعم مباشر على مدار الساعة',
    ],
    featuresEn: [
      'Full Dedicated Pod (Media Buyer + Lead Designer + Copywriter)',
      'In-House Commercial Studio Videography & 3D Motion',
      'Custom Web & AI CRM Integrations',
      'Executive-Level Strategic Consulting',
      'Guaranteed SLA & 24/7 VIP Priority Support',
    ],
  },
]

export const testimonialsData = [
  {
    nameAr: 'م. عمر الشريف',
    nameEn: 'Omar El-Sherif',
    roleAr: 'المؤسس والرئيس التنفيذي - Aura Skin',
    roleEn: 'Founder & CEO - Aura Skin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    commentAr: 'العمل مع هذا الفريق غير مسار تجارتنا بالكامل. قفزنا من 200 طلب شهرياً إلى أكثر من 3,500 طلب خلال 4 أشهر فقط، مع الحفاظ على عائد إعلاني يفوق 5.5x!',
    commentEn: 'Partnering with this agency completely transformed our business trajectory. We scaled from 200 orders to over 3,500 monthly orders in 4 months with a 5.5x ROAS!',
    rating: 5,
    metric: '+1,650% Orders',
  },
  {
    nameAr: 'سارة عبد الله',
    nameEn: 'Sarah Abdallah',
    roleAr: 'مديرة التسويق - Nova Living',
    roleEn: 'CMO - Nova Living',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    commentAr: 'إبداعهم في إنتاج الفيديوهات وتحليل أرقام الحملات لا مثيل له. لم نعد نقلق بشأن تدفق العملاء المهتمين، فهم يديرون كل شيء بدقة واحترافية فائقة.',
    commentEn: 'Their creative video production paired with mathematical media buying is unmatched. We never worry about our pipeline anymore—they execute flawlessly.',
    rating: 5,
    metric: '4.8x ROAS',
  },
  {
    nameAr: 'خالد المنصوري',
    nameEn: 'Khaled Al-Mansouri',
    roleAr: 'الشريك المؤسس - Nexus Logistics',
    roleEn: 'Co-Founder - Nexus Logistics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    commentAr: 'الهوية البصرية والموقع الجديد عززا من مكانتنا في السوق وجعلانا نغلق صفقات مع كبرى الشركات الإقليمية. استثمارنا معهم حقق أضعاف قيمته في أول شهرين.',
    commentEn: 'The new branding and web platform positioned us as an industry titan, closing contracts with regional giants. The ROI was realized in under 60 days.',
    rating: 5,
    metric: '$1.4M Deals Closed',
  },
]
