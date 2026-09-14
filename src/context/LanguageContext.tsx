'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'ar' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    nav_home: 'الرئيسية',
    nav_services: 'خدماتنا',
    nav_work: 'أعمالنا',
    nav_calculator: 'حاسبة العائد',
    nav_pricing: 'الباقات',
    nav_process: 'كيف نعمل',
    nav_about: 'من نحن',
    nav_contact: 'تواصل معنا',
    nav_cta: 'احجز استشارة مجانية',

    // Hero
    hero_badge: '🚀 وكالة التسويق والنمو الرقمي رقم #1',
    hero_title_1: 'نضاعف مبيعاتك ونبني',
    hero_title_gradient: 'علامات تجارية لا تُنسى',
    hero_desc: 'نحن لا نصنع مجرد إعلانات؛ نحن نبني أنظمة نمو تسويقية متكاملة تحقق أرقام مبيعات قياسية وعائد استثمار حقيقي لعلامتك التجارية.',
    hero_cta_primary: 'ابدأ حملتك الآن',
    hero_cta_secondary: 'استكشف دراسات الحالة',
    hero_stat_sales: '+150M ج.م',
    hero_stat_sales_sub: 'مبيعات محققة للعملاء',
    hero_stat_roas: '4.8x',
    hero_stat_roas_sub: 'متوسط العائد الإعلاني ROAS',
    hero_stat_clients: '+250',
    hero_stat_clients_sub: 'علامة تجارية واثقة بنا',

    // Ginkgo Product Hero
    hero_ginkgo_brand: 'بيولايف',
    hero_ginkgo_title_line1: 'جنكو',
    hero_ginkgo_title_line2: 'فائق القوة',
    hero_ginkgo_title_line3: 'والتركيز الذهني',
    hero_ginkgo_desc: 'يحافظ فيتامين B8 أو البيوتين على التوازن الدهني لفروة الرأس ويمنع القشرة وتقصف الأطراف، مع دعم التركيز ووظائف الذاكرة.',
    hero_ginkgo_cta: 'اختر منتجك الآن',
    hero_ginkgo_badge_b8: 'فيتامين B8',
    hero_ginkgo_badge_memory: 'يعزز الذاكرة والتركيز',
    hero_ginkgo_badge_supplement: 'مكمل غذائي معتمد',
    hero_ginkgo_consult: 'استشارة الآن',

    // Trusted By
    trusted_title: 'شريك النمو الموثوق لأكثر من 250+ علامة تجارية رائدة في الشرق الأوسط',

    // Services
    services_tag: 'خبراتنا المتخصصة',
    services_title: 'حلول تسويقية متكاملة تقودك للهيمنة على السوق',
    services_desc: 'نجمع بين الإبداع الفني والتحليل الرقمي العميق لتقديم نتائج استثنائية قابلة للقياس.',
    service_1_title: 'الحملات الإعلانية الممولة (Media Buying)',
    service_1_desc: 'إدارة متقدمة لإعلانات ميتا (فيسبوك، إنستغرام)، تيك توك، جوجل، وسناب شات مع استراتيجيات تحويل ترفع الـ ROAS.',
    service_2_title: 'تحسين محركات البحث (SEO & Performance)',
    service_2_desc: 'تصدر النتائج الأولى في جوجل وجلب عملاء مهتمين ومستهدفين بأقل تكلفة ودون دفع مبالغ مستمرة.',
    service_3_title: 'إدارة وتنمية السوشيال ميديا',
    service_3_desc: 'صناعة محتوى إبداعي جذاب، ريلز وتيك توك فيروسية، وبناء مجتمع وفي متفاعل مع علامتك التجارية.',
    service_4_title: 'الهوية البصرية وتصميم البراندينج',
    service_4_desc: 'تصميم هويات بصرية فاخرة وأدلة علامة تجارية متكاملة تعبر عن تميز شركتك وتجذب شريحتك المستهدفة.',
    service_5_title: 'إنتاج الفيديو والموشن جرافيكس',
    service_5_desc: 'تصوير احترافي، فيديوهات إعلانية سينمائية، وموشن جرافيك 2D/3D يحكي قصة منتجك بأسلوب خاطف للأنظار.',
    service_6_title: 'تطوير المواقع والمتاجر الإلكترونية',
    service_6_desc: 'مواقع فائقة السرعة ومتاجر مهيأة لرفع معدل التحويل (CRO) باستخدام أحدث تقنيات الويب والذكاء الاصطناعي.',

    // Portfolio
    portfolio_tag: 'قصص نجاحنا',
    portfolio_title: 'أعمال استثنائية ونتائج تتحدث عن نفسها',
    portfolio_desc: 'شاهد كيف ساعدنا شركاءنا في تحقيق قفزات تاريخية في الإيرادات والوصول.',
    filter_all: 'الكل',
    filter_ads: 'إعلانات ممولة',
    filter_branding: 'براندينج وهويات',
    filter_ecommerce: 'متاجر ومواقع',
    filter_video: 'إنتاج إبداعي',

    // ROI Calculator
    calc_tag: 'احسب أرباحك التقديرية',
    calc_title: 'حاسبة العائد الاستثماري على التسويق (ROI Estimator)',
    calc_desc: 'حدد ميزانيتك الإعلانية الشهرية وشاهد التقديرات الواقعية للعائد والمبيعات المتوقعة.',
    calc_budget_label: 'الميزانية الإعلانية الشهرية المقترحة:',
    calc_currency: 'جنيه مصري',
    calc_goal_label: 'الهدف الرئيسي للحملة:',
    calc_goal_sales: 'مبيعات وتجارة إلكترونية (E-Commerce Sales)',
    calc_goal_leads: 'جلب عملاء محتملين للشركات (B2B / Real Estate Leads)',
    calc_goal_brand: 'انتشار وبناء براند (Brand Awareness & Reach)',
    calc_result_spend: 'الميزانية الشهرية',
    calc_result_expected_sales: 'المبيعات المتوقعة',
    calc_result_roas: 'عائد الـ ROAS المقدر',
    calc_result_leads: 'العملاء المستهدفين',
    calc_result_cta: 'احصل على الخطة الكاملة لهذه الميزانية',

    // Process
    process_tag: 'منهجية العمل',
    process_title: '4 خطوات دقيقة تقود علامتك نحو القمة',
    process_1_num: '01',
    process_1_title: 'تحليل شامل ومراجعة المنافسين',
    process_1_desc: 'دراسة السوق، سلوك جمهورك المستهدف، وفحص نقاط القوة والضعف لدى منافسيك لبناء استراتيجية لا تُقهر.',
    process_2_num: '02',
    process_2_title: 'رسم خارطة الطريق والاستراتيجية',
    process_2_desc: 'تحديد القنوات الإعلانية الأنسب، رسائل التسويق المقنعة، ومؤشرات الأداء الرئيسية (KPIs) الصارمة.',
    process_3_num: '03',
    process_3_title: 'الإطلاق والتنفيذ الإبداعي',
    process_3_desc: 'إطلاق الإعلانات والمحتوى بتصميمات مبهرة وفيديوهات معدة خصيصاً لزيادة التحويل والشراء.',
    process_4_num: '04',
    process_4_title: 'التحسين المستمر ومضاعفة النتائج',
    process_4_desc: 'مراقبة حية لحظة بلحظة، اختبار أفكار جديدة (A/B Testing)، وتوسيع نطاق الميزانية بأعلى ربحية.',

    // Pricing
    pricing_tag: 'باقات الاستثمار',
    pricing_title: 'خطط شفافة ومصممة لمختلف مراحل نمو مشروعك',
    pricing_desc: 'اختر الباقة الأنسب لأهدافك واستمتع بإدارة تسويقية كاملة كأننا فريقك الداخلي.',
    pricing_monthly: 'شهرياً',
    pricing_popular: 'الأكثر طلباً للنمو',
    pricing_cta: 'اشترك في هذه الباقة',

    // Testimonials
    testimonials_tag: 'آراء عملائنا',
    testimonials_title: 'ماذا يقول قادة الأعمال عن تجربتهم معنا؟',

    // Contact
    contact_tag: 'جاهز لمضاعفة أرقامك؟',
    contact_title: 'احجز جلستك الاستشارية الاستراتيجية مجاناً',
    contact_desc: 'فريقنا جاهز لدراسة مشروعك، وتحليل إعلاناتك السابقة، وتقديم خطة نمو مجانية خلال 48 ساعة.',
    form_name: 'الاسم بالكامل',
    form_name_ph: 'مثال: أحمد محمد',
    form_email: 'البريد الإلكتروني',
    form_email_ph: 'name@company.com',
    form_phone: 'رقم الهاتف / واتساب',
    form_phone_ph: '+20 100 000 0000',
    form_company: 'اسم الشركة أو البراند',
    form_company_ph: 'شركتك أو رابط موقعك',
    form_service: 'الخدمة المطلوبة',
    form_budget: 'الميزانية الشهرية المقدرة للتسويق',
    form_notes: 'تفاصيل إضافية أو أهدافك من الحملة',
    form_notes_ph: 'أخبرنا عن أهدافك، التحديات الحالية، وما تطمح للوصول إليه...',
    form_submit: 'إرسال طلب الاستشارة المجانية',
    form_success_title: 'تم استلام طلبك بنجاح! 🎉',
    form_success_desc: 'سيتواصل معك خبير استراتيجي من فريقنا خلال أقل من 24 ساعة لمناقشة خطة العمل.',

    // Footer
    footer_desc: 'وكالة تسويق رقمي متكاملة تساعد الشركات الطموحة والمتاجر على الهيمنة، مضاعفة المبيعات، وبناء حضور رقمي مستدام.',
    footer_quick_links: 'روابط سريعة',
    footer_services: 'خدماتنا',
    footer_contact_info: 'معلومات التواصل',
    footer_rights: 'جميع الحقوق محفوظة © 2026 وكالة GRX.',
    footer_newsletter_title: 'اشترك في نشرتنا التسويقية',
    footer_newsletter_desc: 'أحدث أسرار وتكتيكات التجارة الإلكترونية والتسويق الرقمي أسبوعياً في بريدك.',
    footer_newsletter_btn: 'اشترك الآن',
  },
  en: {
    // Navigation
    nav_home: 'Home',
    nav_services: 'Services',
    nav_work: 'Case Studies',
    nav_calculator: 'ROI Calculator',
    nav_pricing: 'Pricing',
    nav_process: 'Process',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_cta: 'Book Free Call',

    // Hero
    hero_badge: '🚀 #1 Digital Marketing & Growth Agency',
    hero_title_1: 'We Scale Revenue & Build',
    hero_title_gradient: 'Unforgettable Brands',
    hero_desc: 'We don’t just run ads; we engineer high-converting growth systems that generate record-breaking sales and unmatched ROI for your business.',
    hero_cta_primary: 'Launch Your Campaign',
    hero_cta_secondary: 'Explore Case Studies',
    hero_stat_sales: '$15M+',
    hero_stat_sales_sub: 'Client Revenue Generated',
    hero_stat_roas: '4.8x',
    hero_stat_roas_sub: 'Average Campaign ROAS',
    hero_stat_clients: '250+',
    hero_stat_clients_sub: 'Brands Scaled Globally',

    // Ginkgo Product Hero
    hero_ginkgo_brand: 'Biolife',
    hero_ginkgo_title_line1: 'EXTRA',
    hero_ginkgo_title_line2: 'STRENGTH',
    hero_ginkgo_title_line3: 'GINKGO',
    hero_ginkgo_desc: 'Vitamin B8 or biotin maintains the lipid balance of the scalp and prevents dandruff and split ends.',
    hero_ginkgo_cta: 'Choose a product',
    hero_ginkgo_badge_b8: 'Vitamin B8',
    hero_ginkgo_badge_memory: 'Improves memory',
    hero_ginkgo_badge_supplement: 'Dietary Supplement',
    hero_ginkgo_consult: 'Consult now',

    // Trusted By
    trusted_title: 'Trusted Growth Partner for 250+ High-Growth Brands & Industry Leaders',

    // Services
    services_tag: 'Our Expertise',
    services_title: 'Comprehensive Marketing Solutions Built for Dominance',
    services_desc: 'Merging data-driven performance with cutting-edge creative storytelling to drive measurable, scalable impact.',
    service_1_title: 'Paid Advertising & Media Buying',
    service_1_desc: 'Mastery across Meta, TikTok, Google, and Snapchat with funnel strategies engineered to maximize ROAS and conversions.',
    service_2_title: 'SEO & Organic Growth',
    service_2_desc: 'Dominate Google search rankings and attract qualified high-intent customers without perpetual ad spending.',
    service_3_title: 'Social Media & Community Building',
    service_3_desc: 'High-converting video content, viral Reels/TikToks, and loyal community management that turns followers into repeat buyers.',
    service_4_title: 'Branding & Visual Identity',
    service_4_desc: 'Luxurious branding, brand guidelines, and unique design assets that command authority and premium pricing.',
    service_5_title: 'Video Production & 3D Motion',
    service_5_desc: 'High-end commercial videography, cinematic ad creatives, and 2D/3D motion graphics that stop the scroll.',
    service_6_title: 'Web & E-Commerce Engineering',
    service_6_desc: 'Lightning-fast Next.js websites and Shopify stores designed with deep CRO principles to turn clicks into customers.',

    // Portfolio
    portfolio_tag: 'Success Stories',
    portfolio_title: 'Exceptional Work Backed by Exponential Numbers',
    portfolio_desc: 'Discover how we helped ambitious founders break industry records and scale multi-million revenue.',
    filter_all: 'All',
    filter_ads: 'Paid Ads',
    filter_branding: 'Branding',
    filter_ecommerce: 'Web & E-Com',
    filter_video: 'Creative Production',

    // ROI Calculator
    calc_tag: 'Forecast Your Growth',
    calc_title: 'Marketing Budget & ROI Estimator',
    calc_desc: 'Adjust your proposed monthly ad budget and see data-backed revenue projections.',
    calc_budget_label: 'Proposed Monthly Ad Spend:',
    calc_currency: 'USD',
    calc_goal_label: 'Primary Campaign Objective:',
    calc_goal_sales: 'E-Commerce Direct Sales',
    calc_goal_leads: 'B2B / Real Estate Qualified Leads',
    calc_goal_brand: 'Brand Awareness & Market Reach',
    calc_result_spend: 'Monthly Spend',
    calc_result_expected_sales: 'Projected Revenue',
    calc_result_roas: 'Estimated ROAS',
    calc_result_leads: 'Target Conversions',
    calc_result_cta: 'Claim Your Custom Growth Plan',

    // Process
    process_tag: 'Our Framework',
    process_title: 'A 4-Step Scientific Engine to Scale Your Brand',
    process_1_num: '01',
    process_1_title: 'Deep Audit & Competitive Intelligence',
    process_1_desc: 'We dissect your market, audit past ad accounts, and reverse-engineer what competitors are doing wrong.',
    process_2_num: '02',
    process_2_title: 'Growth Roadmap & Funnel Architecture',
    process_2_desc: 'Defining high-converting ad angles, channel selection, unit economics, and aggressive milestone KPIs.',
    process_3_num: '03',
    process_3_title: 'Creative Production & High-Impact Launch',
    process_3_desc: 'Deploying thumb-stopping creative assets, landing pages, and automated retargeting matrices.',
    process_4_num: '04',
    process_4_title: 'Scale, Optimize & Compound Profits',
    process_4_desc: 'Constant multivariate A/B testing, budget scaling, and audience expansion while maintaining strong margins.',

    // Pricing
    pricing_tag: 'Investment Plans',
    pricing_title: 'Transparent Pricing Tailored to Your Growth Stage',
    pricing_desc: 'Full-stack marketing firepower without the overhead of hiring an in-house department.',
    pricing_monthly: 'per month',
    pricing_popular: 'Most Popular',
    pricing_cta: 'Select This Plan',

    // Testimonials
    testimonials_tag: 'Client Reviews',
    testimonials_title: 'What Founders & CMOs Say About Partnering With Us',

    // Contact
    contact_tag: 'Ready to Scale?',
    contact_title: 'Claim Your 1-on-1 Growth Consultation',
    contact_desc: 'Our senior strategists will analyze your brand, audit your ad account, and deliver a tailored 90-day roadmap free of charge.',
    form_name: 'Full Name',
    form_name_ph: 'e.g. John Doe',
    form_email: 'Business Email',
    form_email_ph: 'john@company.com',
    form_phone: 'Phone / WhatsApp',
    form_phone_ph: '+1 (555) 000-0000',
    form_company: 'Company / Brand Website',
    form_company_ph: 'yourbrand.com',
    form_service: 'Desired Service',
    form_budget: 'Estimated Monthly Marketing Budget',
    form_notes: 'Project Details & Target Goals',
    form_notes_ph: 'Tell us about your current revenue, main bottleneck, and targets...',
    form_submit: 'Submit Consultation Request',
    form_success_title: 'Application Received! 🎉',
    form_success_desc: 'A dedicated growth strategist will review your brand and reach out within 24 hours.',

    // Footer
    footer_desc: 'Full-service digital growth agency empowering brands to dominate markets, scale revenue, and build lasting legacy.',
    footer_quick_links: 'Quick Links',
    footer_services: 'Services',
    footer_contact_info: 'Get in Touch',
    footer_rights: 'All Rights Reserved © 2026 GRX Agency.',
    footer_newsletter_title: 'Join Our Growth Newsletter',
    footer_newsletter_desc: 'Weekly breakdown of high-converting marketing strategies and consumer trends.',
    footer_newsletter_btn: 'Subscribe Now',
  }
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  setLang: () => {},
  t: (key: string) => key,
  isRTL: true,
})

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('ar')

  useEffect(() => {
    const saved = localStorage.getItem('grx_agency_lang') as Language
    if (saved && (saved === 'ar' || saved === 'en')) {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('grx_agency_lang', newLang)
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
  }

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['ar']?.[key] || key
  }

  const isRTL = lang === 'ar'

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
