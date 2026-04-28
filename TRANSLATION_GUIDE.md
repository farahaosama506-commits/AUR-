# نظام الترجمة (Translation System)

## نظرة عامة

تم تطبيق نظام ترجمة بسيط وآمن (عربي/إنجليزي) على المشروع بدون التسبب بأخطاء Hydration.

## الملفات المضافة

### 1. ملفات الترجمات
- `public/locales/en.json` - الترجمات الإنجليزية
- `public/locales/ar.json` - الترجمات العربية

### 2. مكتبات التعامل مع اللغة
- `lib/LanguageContext.js` - Context ل إدارة حالة اللغة
- `lib/useTranslation.js` - Hook custom للوصول إلى الترجمات

## المميزات الرئيسية

✅ **آمن من أخطاء Hydration**: يستخدم `useEffect` لتحميل الترجمات على الـ client side فقط
✅ **بدون middleware**: لا يستخدم `middleware.js` - نظام مبسط وسهل الصيانة
✅ **المسارات ثابتة**: عدم استخدام `[locale]` في المسارات
✅ **RTL support**: يدعم اتجاه النصوص من اليمين إلى اليسار للعربية
✅ **تخزين التفضيل**: يحفظ اختيار اللغة في localStorage

## كيفية الاستخدام

### في Component جديد

```jsx
'use client';

import { useTranslation } from '@/lib/useTranslation';

export default function MyComponent() {
  const { t, language, isLoaded } = useTranslation();

  // الانتظار حتى تاصل الترجمات
  if (!isLoaded) {
    return null;
  }

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>اللغة الحالية: {language}</p>
    </div>
  );
}
```

### تبديل اللغة

```jsx
'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage}>
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
}
```

## إضافة ترجمات جديدة

1. أضف المفتاح والقيمة في كلا ملفي الترجمة:

**public/locales/en.json**:
```json
{
  "mySection": {
    "heading": "My Heading",
    "description": "My Description"
  }
}
```

**public/locales/ar.json**:
```json
{
  "mySection": {
    "heading": "عنواني",
    "description": "وصفي"
  }
}
```

2. استخدم الترجمة في Component:
```jsx
const { t } = useTranslation();

<h1>{t('mySection.heading')}</h1>
<p>{t('mySection.description')}</p>
```

## المكونات المحدثة

- `Header.js` - تم تحديثه لعرض الترجمات وزر تبديل اللغة
- `Hero.js` - تم تحديثه ليعرض العناوين المترجمة
- `Footer.js` - تم تحديثه ليعرض النصوص المترجمة
- `layout.js` - تم تحديثه ليشمل LanguageProvider

## ملاحظات مهمة

⚠️ **استخدم `useEffect` دائماً**: إذا كان هناك كود يعتمد على عميل المتصفح (localStorage, window, إلخ)
⚠️ **فحص `isLoaded`**: تحقق من أن `isLoaded === true` قبل عرض المحتوى فقط

## الهيكل الأساسي لملفات الترجمة

```
public/
├── locales/
│   ├── en.json
│   └── ar.json
```

## الدعم

- للأسئلة أو المشاكل، تأكد من أن ملفات الترجمة موجودة في المسار الصحيح
- تحقق من console للأخطاء في حالة عدم تحميل الترجمات
