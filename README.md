# 🚀 GRX Agency Website (Next.js & React)

موقع ويب عصري واحترافي لوكالة تسويق رقمية (Digital Growth & Marketing Agency) مصمم بأحدث التقنيات وأعلى معايير تجربة المستخدم والتحويل (CRO).

---

## 🌟 الميزات الرئيسية (Key Features)

- **Next.js 14 (App Router) & React 18**: أداء فائق وسرعة تحميل فورية.
- **دعم كامل للغتين (العربية والإنجليزية)**: دعم فوري لاتجاه النص (RTL / LTR) مع إمكانية التبديل بنقرة واحدة من القائمة العلوية.
- **طابع بصري فاخر (Modern Dark Luxury)**: بطاقات زجاجية Glassmorphism، وتأثيرات إضاءة ديناميكية وتدرجات لونية عصرية.
- **حاسبة ميزانية وعائد التسويق (Interactive ROI Estimator)**: تمكّن العميل من اختيار ميزانيته وأهدافه ومشاهدة المبيعات والـ ROAS المتوقع، وربطها مباشرة بنموذج الطلب.
- **معرض أعمال ودراسات حالة (Case Studies)**: فلترة حسب التخصص (إعلانات ممولة، براندينج، متاجر، إنتاج إبداعي) مع نافذة تفاصيل منبثقة (Modal) لإبراز مؤشرات الأداء.
- **نموذج استشارة وحجز فوري**: نموذج تفاعلي ذكي مع تأثير احتفالي (Confetti) عند الإرسال وربط مباشر مع واتساب.
- **باقات أسعار شفافة (Pricing Tiers)**: باقات Starter و Scale و Enterprise مع مقارنة الميزات.
- **شريط شعارات متحرك (Infinite Marquee)**: لعرض شركاء النجاح وأبرز العملاء.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Language Management**: React Context (Bilingual Dictionary)

---

## 🚀 كيفية تشغيل المشروع محلياً (How to Run)

1. **تثبيت الحزم (Install Dependencies)**:
   ```bash
   npm install
   ```

2. **تشغيل سيرفر التطوير (Run Development Server)**:
   ```bash
   npm run dev
   ```

3. افتح المتصفح على:
   ```
   http://localhost:3000
   ```

4. **بناء النسخة الإنتاجية (Production Build)**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 هيكل المجلدات (Project Structure)

```
Marketing_agency/
├── src/
│   ├── app/
│   │   ├── globals.css        # التنسيقات العامة والتأثيرات الزجاجية
│   │   ├── layout.tsx         # الهيكل العام وخطوط Cairo & Inter
│   │   └── page.tsx           # تجميع كافة أقسام الصفحة الرئيسية
│   ├── components/
│   │   ├── Navbar.tsx         # الترويسة ومبدل اللغات والزر التفاعلي
│   │   ├── Hero.tsx           # القسم الرئيسي والإحصائيات الحية
│   │   ├── LogoTicker.tsx     # شريط شعارات العملاء المتحرك
│   │   ├── Services.tsx       # بطاقات الخدمات التفاعلية
│   │   ├── Portfolio.tsx      # معرض الأعمال ودراسات الحالة مع المودال
│   │   ├── RoiCalculator.tsx  # حاسبة العائد الاستثماري على الميزانية
│   │   ├── Process.tsx        # خطوات ومنهجية العمل الـ 4
│   │   ├── Pricing.tsx        # باقات الأسعار والميزات
│   │   ├── Testimonials.tsx   # آراء العملاء والتقييمات الموثقة
│   │   ├── ContactSection.tsx # نموذج التواصل المتكامل وواتساب
│   │   ├── ContactModal.tsx   # النافذة المنبثقة للاستشارة السريعة
│   │   └── Footer.tsx         # تذييل الصفحة والنشرة البريدية
│   ├── context/
│   │   └── LanguageContext.tsx # إدارة اللغتين والترجمة (AR / EN)
│   └── lib/
│       ├── data.ts            # بيانات الخدمات والمشاريع والأسعار
│       └── utils.ts           # دوال دمج الكلاسات المساعدة
├── tailwind.config.js         # تكوين وتخصيص Tailwind CSS
├── tsconfig.json              # تكوين TypeScript
└── package.json               # حزم ومكتبات المشروع
```
