/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { 
  Shield, Lock, Fingerprint, ChevronDown, ChevronUp, Check, X, 
  ArrowRight, Activity, PieChart as PieChartIcon, Clock, Menu, Globe,
  LogOut, Settings, User, Bell, Star, ToggleLeft, ToggleRight, Sliders, Calendar, Mail, Smartphone, Key, CheckCircle2
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TRANSLATIONS ---
const translations = {
  en: {
    nav: { tech: 'Technology', security: 'Security', company: 'Company', pricing: 'Pricing', launch: 'Launch App' },
    hero: {
      title: 'Market Chaos is Just Data Waiting for an Algorithm.',
      subtitle: 'TaliLow AI transforms market volatility into predictable alpha using proprietary neural networks. Welcome to the new era of autonomous investing.',
      ctaPrimary: 'Launch App',
      ctaSecondary: 'Discover Technology'
    },
    social: { title: 'As Featured In' },
    tech: {
      title: 'The Neural Engine',
      steps: [
        { title: 'Data Ingestion', desc: 'Processing millions of data points per second across global markets.' },
        { title: 'Quantum Analysis', desc: 'Identifying hidden patterns using advanced topological data analysis.' },
        { title: 'Risk Mitigation', desc: 'Dynamic hedging and portfolio rebalancing in real-time.' },
        { title: 'Autonomous Execution', desc: 'Slippage-free execution via proprietary dark pool routing.' }
      ]
    },
    security: {
      title: 'Your Assets, Our Fortress.',
      features: [
        { title: 'End-to-End Encryption', desc: 'Military-grade AES-256 encryption for all data at rest and in transit.' },
        { title: 'Cold Storage Wallets', desc: '99% of assets are held in multi-sig, geographically distributed cold storage.' },
        { title: 'Biometric 2FA', desc: 'Hardware-backed biometric authentication for all critical operations.' }
      ]
    },
    pricing: {
      title: 'Institutional Power, Accessible to You.',
      plans: [
        { name: 'Starter', price: 'Free', features: ['Basic Market Data', 'Standard Execution', 'Email Support'] },
        { name: 'Pro', price: '$99/mo', features: ['Real-time Neural Signals', 'Priority Execution', '24/7 Dedicated Support', 'Advanced Analytics'] },
        { name: 'Institutional', price: 'Custom', features: ['API Access', 'Custom Algorithms', 'White-glove Onboarding', 'SLA Guarantee'] }
      ]
    },
    company: {
      title: 'About Us',
      mission: 'We are a team of quantitative researchers, engineers, and designers building the future of autonomous finance. Our mission is to democratize access to institutional-grade trading algorithms.',
      team: [
        { name: 'Elena Rostova', role: 'Chief Executive Officer' },
        { name: 'Marcus Chen', role: 'Head of Quant Research' },
        { name: 'David Kim', role: 'Lead Architect' }
      ]
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'How does TaliLow AI work?', a: 'Our proprietary neural networks analyze market data to identify profitable trading opportunities and execute them autonomously.' },
        { q: 'Is my money safe?', a: 'Yes. We use industry-leading security measures, including cold storage and biometric 2FA, to protect your assets.' },
        { q: 'Can I withdraw my funds at any time?', a: 'Absolutely. You have full control over your assets and can withdraw them instantly.' }
      ]
    },
    footer: {
      desc: 'The new era of autonomous investing.',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      disclaimer: 'Disclaimer: Cryptocurrency trading involves high risk and is not suitable for all investors. Past performance is not indicative of future results.',
      rights: '© 2026 TaliLow AI. All Rights Reserved.'
    },
    auth: {
      login: 'Log In',
      signup: 'Sign Up',
      email: 'Email Address',
      password: 'Password',
      forgot: 'Forgot Password?',
      submitLogin: 'Enter the Vault',
      submitSignup: 'Create Account',
      switchLogin: 'Already have an account? Log in',
      switchSignup: 'New to TaliLow? Sign up',
      welcomeBack: 'Welcome Back',
      joinUs: 'Join the Revolution',
      motto: 'Precision. Security. Alpha.',
      terms: 'I agree to the Terms of Service and Privacy Policy',
      invalidCreds: 'Invalid credentials. Please try again.',
      userExists: 'User already exists. Please log in.',
      signupSuccess: 'Account created successfully! Please log in.'
    },
    dashboard: {
      balance: 'Total Balance',
      profit: '24h Profit',
      activeTrades: 'Active Trades',
      allocation: 'Asset Allocation',
      feed: 'Live Trade Feed',
      timeframes: ['1D', '7D', '1M', '1Y'],
      demoTitle: 'Live Trading Access is Currently Limited',
      demoDesc: 'Due to overwhelming demand and our commitment to performance, we are currently onboarding new live trading clients from a waitlist. Your account is in a fully featured simulation mode. You can explore all analytics and strategies.',
      upgradeBtn: 'Join Waitlist',
      closeBtn: 'Continue Exploring',
      welcome: 'Welcome back',
      status: 'Current AI Status: Active',
      aiStrategies: 'AI Trading Strategies',
      riskLevel: 'Risk Level',
      statusLabel: 'Status',
      configure: 'Configure',
      performanceAnalytics: 'Performance Analytics',
      portfolioGrowth: 'Portfolio Growth vs. S&P 500',
      winRate: 'Win Rate by Asset',
      avgHoldTime: 'Average Hold Time',
      tradeHistory: 'Detailed Trade History',
      loadHistory: 'Load History',
      accountSettings: 'Account Settings',
      profile: 'Profile',
      security: 'Security',
      notifications: 'Notifications',
      firstName: 'First Name',
      lastName: 'Last Name',
      emailAddress: 'Email Address',
      saveChanges: 'Save Changes',
      password: 'Password',
      updatePasswordDesc: 'Update your password to keep your account secure.',
      changePassword: 'Change Password',
      twoFactor: 'Two-Factor Authentication (2FA)',
      twoFactorDesc: 'Add an extra layer of security to your account.',
      enable2FA: 'Enable 2FA',
      tradeExecutions: 'Trade Executions',
      tradeExecutionsDesc: 'Get notified when a trade is executed.',
      dailySummary: 'Daily Summary',
      dailySummaryDesc: 'Receive a daily summary of your portfolio performance.',
      securityAlerts: 'Security Alerts',
      securityAlertsDesc: 'Get notified about important security updates.',
      overview: 'Overview',
      logout: 'Logout',
      loggedInAs: 'Logged in as',
      waitlistJoined: "You're on the list!"
    }
  },
  ru: {
    nav: { tech: 'Технологии', security: 'Безопасность', company: 'О нас', pricing: 'Тарифы', launch: 'Запустить App' },
    hero: {
      title: 'Рыночный хаос — это просто данные, ожидающие алгоритма.',
      subtitle: 'TaliLow AI превращает волатильность рынка в предсказуемую альфу с помощью проприетарных нейросетей. Добро пожаловать в новую эру автономного инвестирования.',
      ctaPrimary: 'Запустить App',
      ctaSecondary: 'Изучить технологии'
    },
    social: { title: 'О нас пишут' },
    tech: {
      title: 'Нейронный двигатель',
      steps: [
        { title: 'Сбор данных', desc: 'Обработка миллионов точек данных в секунду на мировых рынках.' },
        { title: 'Квантовый анализ', desc: 'Выявление скрытых паттернов с использованием передового топологического анализа данных.' },
        { title: 'Снижение рисков', desc: 'Динамическое хеджирование и ребалансировка портфеля в реальном времени.' },
        { title: 'Автономное исполнение', desc: 'Исполнение без проскальзывания через проприетарную маршрутизацию в даркпулах.' }
      ]
    },
    security: {
      title: 'Ваши активы, наша крепость.',
      features: [
        { title: 'Сквозное шифрование', desc: 'Шифрование военного уровня AES-256 для всех данных в покое и при передаче.' },
        { title: 'Холодные кошельки', desc: '99% активов хранятся в мультиподписных, географически распределенных холодных хранилищах.' },
        { title: 'Биометрическая 2FA', desc: 'Аппаратная биометрическая аутентификация для всех критических операций.' }
      ]
    },
    pricing: {
      title: 'Институциональная мощь, доступная вам.',
      plans: [
        { name: 'Стартовый', price: 'Бесплатно', features: ['Базовые рыночные данные', 'Стандартное исполнение', 'Поддержка по email'] },
        { name: 'Про', price: '$99/мес', features: ['Нейронные сигналы в реальном времени', 'Приоритетное исполнение', 'Выделенная поддержка 24/7', 'Продвинутая аналитика'] },
        { name: 'Институциональный', price: 'Индивидуально', features: ['Доступ к API', 'Пользовательские алгоритмы', 'Премиальный онбординг', 'Гарантия SLA'] }
      ]
    },
    company: {
      title: 'О компании',
      mission: 'Мы — команда количественных исследователей, инженеров и дизайнеров, создающих будущее автономных финансов. Наша миссия — демократизировать доступ к торговым алгоритмам институционального уровня.',
      team: [
        { name: 'Елена Ростова', role: 'Генеральный директор' },
        { name: 'Маркус Чен', role: 'Глава количественных исследований' },
        { name: 'Дэвид Ким', role: 'Ведущий архитектор' }
      ]
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        { q: 'Как работает TaliLow AI?', a: 'Наши проприетарные нейросети анализируют рыночные данные для выявления прибыльных торговых возможностей и автономно их исполняют.' },
        { q: 'В безопасности ли мои деньги?', a: 'Да. Мы используем передовые меры безопасности, включая холодное хранение и биометрическую 2FA, для защиты ваших активов.' },
        { q: 'Могу ли я вывести свои средства в любое время?', a: 'Абсолютно. Вы имеете полный контроль над своими активами и можете вывести их мгновенно.' }
      ]
    },
    footer: {
      desc: 'Новая эра автономного инвестирования.',
      product: 'Продукт',
      company: 'Компания',
      legal: 'Юридическая информация',
      disclaimer: 'Отказ от ответственности: Торговля криптовалютой сопряжена с высоким риском и подходит не всем инвесторам. Прошлые результаты не являются показателем будущих результатов.',
      rights: '© 2024 TaliLow AI. Все права защищены.'
    },
    auth: {
      login: 'Войти',
      signup: 'Регистрация',
      email: 'Email адрес',
      password: 'Пароль',
      forgot: 'Забыли пароль?',
      submitLogin: 'Войти в Хранилище',
      submitSignup: 'Создать аккаунт',
      switchLogin: 'Уже есть аккаунт? Войти',
      switchSignup: 'Впервые в TaliLow? Зарегистрироваться',
      welcomeBack: 'С возвращением',
      joinUs: 'Присоединяйтесь к революции',
      motto: 'Точность. Безопасность. Альфа.',
      terms: 'Я согласен с Условиями обслуживания и Политикой конфиденциальности',
      invalidCreds: 'Неверные учетные данные. Пожалуйста, попробуйте снова.',
      userExists: 'Пользователь уже существует. Пожалуйста, войдите.',
      signupSuccess: 'Аккаунт успешно создан! Пожалуйста, войдите.'
    },
    dashboard: {
      balance: 'Общий баланс',
      profit: 'Прибыль (24ч)',
      activeTrades: 'Активные сделки',
      allocation: 'Распределение активов',
      feed: 'Лента сделок',
      timeframes: ['1Д', '7Д', '1М', '1Г'],
      demoTitle: 'Доступ к реальной торговле в настоящее время ограничен',
      demoDesc: 'Из-за огромного спроса и нашей приверженности производительности, мы в настоящее время принимаем новых клиентов для реальной торговли из списка ожидания. Ваш аккаунт находится в полнофункциональном режиме симуляции. Вы можете изучить всю аналитику и стратегии.',
      upgradeBtn: 'В список ожидания',
      closeBtn: 'Продолжить',
      welcome: 'С возвращением',
      status: 'Текущий статус ИИ: Активен',
      aiStrategies: 'ИИ Стратегии',
      riskLevel: 'Уровень риска',
      statusLabel: 'Статус',
      configure: 'Настроить',
      performanceAnalytics: 'Аналитика',
      portfolioGrowth: 'Рост портфеля vs. S&P 500',
      winRate: 'Винрейт по активам',
      avgHoldTime: 'Среднее время удержания',
      tradeHistory: 'Детальная история сделок',
      loadHistory: 'Загрузить историю',
      accountSettings: 'Настройки аккаунта',
      profile: 'Профиль',
      security: 'Безопасность',
      notifications: 'Уведомления',
      firstName: 'Имя',
      lastName: 'Фамилия',
      emailAddress: 'Email адрес',
      saveChanges: 'Сохранить изменения',
      password: 'Пароль',
      updatePasswordDesc: 'Обновите пароль для безопасности вашего аккаунта.',
      changePassword: 'Изменить пароль',
      twoFactor: 'Двухфакторная аутентификация (2FA)',
      twoFactorDesc: 'Добавьте дополнительный уровень безопасности вашему аккаунту.',
      enable2FA: 'Включить 2FA',
      tradeExecutions: 'Исполнение сделок',
      tradeExecutionsDesc: 'Получайте уведомления об исполнении сделок.',
      dailySummary: 'Ежедневная сводка',
      dailySummaryDesc: 'Получайте ежедневную сводку о производительности портфеля.',
      securityAlerts: 'Оповещения безопасности',
      securityAlertsDesc: 'Получайте уведомления о важных обновлениях безопасности.',
      overview: 'Обзор',
      logout: 'Выйти',
      loggedInAs: 'Вы вошли как',
      waitlistJoined: "Вы в списке!"
    }
  }
};

// --- COMPONENTS ---

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, vx: number, vy: number, size: number }[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect to mouse
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(216, 255, 75, ${1 - distMouse / 150})`; // Cyber Lime
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />;
};

const Navbar = ({ lang, setLang, onLaunch }: { lang: 'en'|'ru', setLang: (l: 'en'|'ru')=>void, onLaunch: ()=>void }) => {
  const t = translations[lang].nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
      scrolled ? "bg-[#05070D]/80 backdrop-blur-md border-white/5 py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#D8FF4B] flex items-center justify-center">
            <Activity className="w-5 h-5 text-[#05070D]" />
          </div>
          <span className="text-xl font-medium tracking-tight">TaliLow AI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          {['tech', 'security', 'company', 'pricing'].map((item) => (
            <a key={item} href={`#${item}`} className="hover:text-white transition-colors">
              {t[item as keyof typeof t]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
            className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang.toUpperCase()}
          </button>
          <button 
            onClick={onLaunch}
            className="bg-[#D8FF4B] text-[#05070D] px-5 py-2 rounded-sm text-sm font-medium hover:bg-[#c4eb3b] transition-colors"
          >
            {t.launch}
          </button>
        </div>
      </div>
    </nav>
  );
};

const HeroChart = () => {
  const data = useMemo(() => {
    let base = 10000;
    return Array.from({ length: 50 }).map((_, i) => {
      base += (Math.random() - 0.45) * 500;
      return { time: i, value: base };
    });
  }, []);

  return (
    <div className="h-[400px] w-full relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-transparent to-transparent z-10 pointer-events-none" />
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A9FF" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00A9FF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="time" hide />
          <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} hide />
          <RechartsTooltip 
            contentStyle={{ backgroundColor: '#05070D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
            itemStyle={{ color: '#D8FF4B' }}
            labelStyle={{ display: 'none' }}
            cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area type="monotone" dataKey="value" stroke="#00A9FF" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const LandingPage = ({ lang, setLang, onLaunch }: { lang: 'en'|'ru', setLang: (l: 'en'|'ru')=>void, onLaunch: ()=>void }) => {
  const t = translations[lang];

  return (
    <div className="relative z-10">
      <Navbar lang={lang} setLang={setLang} onLaunch={onLaunch} />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-medium leading-[1.1] tracking-tight mb-6">
              {t.hero.title}
            </h1>
            <p className="text-lg text-white/60 mb-10 max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onLaunch}
                className="bg-[#D8FF4B] text-[#05070D] px-8 py-4 rounded-sm font-medium hover:bg-[#c4eb3b] transition-colors flex items-center gap-2"
              >
                {t.hero.ctaPrimary} <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-white/20 text-white px-8 py-4 rounded-sm font-medium hover:bg-white/5 transition-colors">
                {t.hero.ctaSecondary}
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
              <div className="w-2 h-2 rounded-full bg-[#D8FF4B] animate-pulse" />
              <span className="text-xs font-mono text-white/50">LIVE ALPHA STREAM</span>
            </div>
            <HeroChart />
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-white/5 bg-white/[0.02] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <span className="text-sm text-white/40 uppercase tracking-widest">{t.social.title}</span>
          <div className="flex gap-12 opacity-50 grayscale">
            {/* Mock Logos */}
            <div className="font-serif text-xl font-bold">Forbes</div>
            <div className="font-sans text-xl font-bold tracking-tighter">Bloomberg</div>
            <div className="font-mono text-xl font-bold">TechCrunch</div>
          </div>
        </div>
      </section>

      {/* Technology Deep-Dive (Scrollytelling Simplified) */}
      <section id="tech" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-medium mb-4">{t.tech.title}</h2>
          <div className="w-12 h-1 bg-[#00A9FF] mx-auto" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            {t.tech.steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-8 border-l border-white/10"
              >
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#00A9FF]" />
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-white/60 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="relative flex items-center justify-center">
            {/* Abstract Brain Visualization */}
            <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-[#00A9FF]/30 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-[#D8FF4B]/20 animate-[spin_15s_linear_infinite_reverse]" />
              <Activity className="w-16 h-16 text-[#00A9FF] opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-medium mb-4">{t.security.title}</h2>
            <div className="w-12 h-1 bg-[#D8FF4B] mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, ...t.security.features[0] },
              { icon: Lock, ...t.security.features[1] },
              { icon: Fingerprint, ...t.security.features[2] }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-xl border border-white/5 bg-[#05070D] hover:border-white/10 transition-colors">
                <feature.icon className="w-8 h-8 text-[#D8FF4B] mb-6" />
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-medium mb-4">{t.pricing.title}</h2>
          <div className="w-12 h-1 bg-white/20 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {t.pricing.plans.map((plan, i) => (
            <div 
              key={i} 
              className={cn(
                "p-8 rounded-xl border transition-all",
                i === 1 
                  ? "border-[#D8FF4B]/50 bg-[#D8FF4B]/5 transform md:-translate-y-4" 
                  : "border-white/10 bg-white/[0.02]"
              )}
            >
              {i === 1 && <div className="text-[#D8FF4B] text-xs font-bold tracking-wider uppercase mb-4">Most Popular</div>}
              <h3 className="text-2xl font-medium mb-2">{plan.name}</h3>
              <div className="text-4xl font-light mb-8">{plan.price}</div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-[#00A9FF] mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={onLaunch}
                className={cn(
                  "w-full py-3 rounded-sm font-medium transition-colors",
                  i === 1 ? "bg-[#D8FF4B] text-[#05070D] hover:bg-[#c4eb3b]" : "border border-white/20 hover:bg-white/5"
                )}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Company */}
      <section id="company" className="py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-medium mb-6">{t.company.title}</h2>
            <p className="text-lg text-white/60 leading-relaxed">{t.company.mission}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.company.team.map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-white/10 mb-4 overflow-hidden">
                  <img src={`https://picsum.photos/seed/${member.name.replace(' ', '')}/200/200`} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-lg font-medium">{member.name}</h4>
                <p className="text-sm text-white/50">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-medium mb-12 text-center">{t.faq.title}</h2>
        <div className="space-y-4">
          {t.faq.items.map((item, i) => {
            const [isOpen, setIsOpen] = useState(false);
            return (
              <div key={i} className="border border-white/10 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium">{item.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="w-4 h-4 text-white/50" />}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-4 text-white/60 text-sm leading-relaxed"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#05070D] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded bg-[#D8FF4B] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#05070D]" />
                </div>
                <span className="text-lg font-medium">TaliLow AI</span>
              </div>
              <p className="text-sm text-white/50">{t.footer.desc}</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">{t.footer.product}</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#tech" className="hover:text-white transition-colors">{t.nav.tech}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">{t.nav.security}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">{t.footer.company}</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#company" className="hover:text-white transition-colors">{t.nav.company}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p className="max-w-2xl">{t.footer.disclaimer}</p>
            <div className="flex items-center gap-4">
              <span>{t.footer.rights}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AuthPage = ({ lang, onLogin, onBack }: { lang: 'en'|'ru', onLogin: (email: string)=>void, onBack: ()=>void }) => {
  const t = translations[lang].auth;
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isValidEmail = email.includes('@') && email.includes('.');
  const isValidPassword = password.length >= 8;
  const canSubmit = isLogin ? (isValidEmail && isValidPassword) : (isValidEmail && isValidPassword && termsAccepted);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!canSubmit) return;

    const users = JSON.parse(localStorage.getItem('taliLowUsers') || '[]');

    if (isLogin) {
      const user = users.find((u: any) => u.email === email && u.password === password);
      if (user) {
        onLogin(email);
      } else {
        setError(t.invalidCreds);
      }
    } else {
      const userExists = users.some((u: any) => u.email === email);
      if (userExists) {
        setError(t.userExists);
      } else {
        localStorage.setItem('taliLowUsers', JSON.stringify([...users, { email, password }]));
        setSuccess(t.signupSuccess);
        setTimeout(() => {
          setIsLogin(true);
          setPassword('');
          setSuccess('');
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen flex relative z-10 bg-[#05070D]">
      <button onClick={onBack} className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 text-sm transition-colors z-20">
        <ArrowRight className="w-4 h-4 rotate-180" /> Back
      </button>

      <div className="hidden lg:flex flex-1 flex-col justify-center px-20 border-r border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00A9FF]/10 to-transparent pointer-events-none" />
        <motion.div
          key={isLogin ? 'login' : 'signup'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-medium mb-6">{isLogin ? t.welcomeBack : t.joinUs}</h1>
          <p className="text-xl text-white/50 font-light">{t.motto}</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-12 lg:hidden">
            <div className="w-8 h-8 rounded bg-[#D8FF4B] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#05070D]" />
            </div>
            <span className="text-xl font-medium">TaliLow AI</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-white/60 mb-2">{t.email}</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00A9FF] transition-colors"
                  placeholder="name@example.com"
                />
                {email.length > 0 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isValidEmail ? <Check className="w-4 h-4 text-[#D8FF4B]" /> : <X className="w-4 h-4 text-red-500" />}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm text-white/60">{t.password}</label>
                {isLogin && <a href="#" className="text-xs text-[#00A9FF] hover:underline">{t.forgot}</a>}
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#00A9FF] transition-colors"
                  placeholder="••••••••"
                />
                {password.length > 0 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {isValidPassword ? <Check className="w-4 h-4 text-[#D8FF4B]" /> : <X className="w-4 h-4 text-red-500" />}
                  </div>
                )}
              </div>
            </div>

            {!isLogin && (
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    "w-4 h-4 rounded border transition-colors flex items-center justify-center",
                    termsAccepted ? "bg-[#D8FF4B] border-[#D8FF4B]" : "border-white/20 group-hover:border-white/40"
                  )}>
                    {termsAccepted && <Check className="w-3 h-3 text-[#05070D]" />}
                  </div>
                </div>
                <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                  {t.terms}
                </span>
              </label>
            )}

            {error && <div className="text-red-400 text-sm">{error}</div>}
            {success && <div className="text-[#D8FF4B] text-sm">{success}</div>}

            <button 
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-[#D8FF4B] text-[#05070D] py-3 rounded-sm font-medium hover:bg-[#c4eb3b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLogin ? t.submitLogin : t.submitSignup}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {isLogin ? t.switchSignup : t.switchLogin}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIStrategies = ({ lang, onAction }: { lang: 'en'|'ru', onAction: () => void }) => {
  const t = translations[lang].dashboard;
  const strategies = [
    { name: 'Quantum Momentum', risk: 'Moderate', status: 'Active', color: '#D8FF4B' },
    { name: 'Volatility Harvest', risk: 'High', status: 'Inactive', color: '#00A9FF' },
    { name: 'Stable Growth', risk: 'Low', status: 'Inactive', color: 'rgba(255,255,255,0.5)' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium mb-6">{t.aiStrategies}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {strategies.map((s, i) => (
          <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-lg">{s.name}</h3>
              <div 
                onClick={onAction}
                className={cn(
                  "w-12 h-6 rounded-full p-1 cursor-pointer transition-colors",
                  s.status === 'Active' ? "bg-[#D8FF4B]" : "bg-white/10"
                )}
              >
                <div className={cn(
                  "w-4 h-4 rounded-full bg-black transition-transform",
                  s.status === 'Active' ? "translate-x-6" : "translate-x-0 bg-white/50"
                )} />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">{t.riskLevel}</span>
                <span className="text-white/80">{s.risk}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">{t.statusLabel}</span>
                <span style={{ color: s.color }}>{s.status}</span>
              </div>
            </div>
            <button 
              onClick={onAction}
              className="mt-6 w-full py-2 border border-white/10 rounded hover:bg-white/5 transition-colors text-sm"
            >
              {t.configure}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Analytics = ({ lang, onAction }: { lang: 'en'|'ru', onAction: () => void }) => {
  const t = translations[lang].dashboard;
  const [filter, setFilter] = useState('Last 30 days');
  const data = Array.from({ length: 30 }).map((_, i) => ({
    day: i,
    portfolio: 10000 + Math.random() * 2000 + i * 100,
    sp500: 10000 + Math.random() * 1000 + i * 50
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">{t.performanceAnalytics}</h2>
        <div className="flex gap-2 bg-white/5 p-1 rounded border border-white/5">
          {['Last 30 days', 'Last 90 days'].map((f) => (
            <button 
              key={f} 
              onClick={() => { setFilter(f); onAction(); }}
              className={cn(
                "px-3 py-1 text-xs rounded transition-all",
                filter === f ? "bg-white/10 text-white shadow-sm" : "text-white/50 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <h3 className="font-medium mb-6">{t.portfolioGrowth}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" hide />
                <YAxis domain={['auto', 'auto']} hide />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#05070D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                  itemStyle={{ color: '#D8FF4B' }}
                  labelStyle={{ display: 'none' }}
                />
                <Line type="monotone" dataKey="portfolio" stroke="#D8FF4B" strokeWidth={2} dot={false} name="Portfolio" />
                <Line type="monotone" dataKey="sp500" stroke="#00A9FF" strokeWidth={2} dot={false} name="S&P 500" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-medium mb-2">{t.winRate}</h3>
            <div className="text-3xl font-medium text-[#D8FF4B]">78.4%</div>
            <div className="text-xs text-white/50 mt-1">BTC, ETH, SOL</div>
          </div>
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-medium mb-2">{t.avgHoldTime}</h3>
            <div className="text-3xl font-medium text-[#00A9FF]">4h 12m</div>
            <div className="text-xs text-white/50 mt-1">Across all active strategies</div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <h3 className="font-medium mb-6">{t.tradeHistory}</h3>
        <div className="text-center py-8 text-white/50">
          <button onClick={onAction} className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded transition-colors">
            {t.loadHistory}
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsView = ({ lang, email, onAction }: { lang: 'en'|'ru', email: string, onAction: () => void }) => {
  const t = translations[lang].dashboard;
  const [tab, setTab] = useState('Profile');

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-2xl font-medium mb-6">{t.accountSettings}</h2>
      
      <div className="flex gap-6 border-b border-white/10 mb-6">
        {[
          { id: 'Profile', label: t.profile },
          { id: 'Security', label: t.security },
          { id: 'Notifications', label: t.notifications }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "pb-3 text-sm transition-colors relative",
              tab === item.id ? "text-white" : "text-white/50 hover:text-white"
            )}
          >
            {item.label}
            {tab === item.id && (
              <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D8FF4B]" />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        {tab === 'Profile' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/50 mb-2">{t.firstName}</label>
                <input type="text" placeholder="John" disabled className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white/50 cursor-not-allowed" onClick={onAction} />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">{t.lastName}</label>
                <input type="text" placeholder="Doe" disabled className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white/50 cursor-not-allowed" onClick={onAction} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/50 mb-2">{t.emailAddress}</label>
              <input type="email" value={email} disabled className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white/50 cursor-not-allowed" onClick={onAction} />
            </div>
            <button onClick={onAction} className="px-6 py-2 bg-[#D8FF4B] text-black rounded font-medium">{t.saveChanges}</button>
          </div>
        )}

        {tab === 'Security' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">{t.password}</h3>
              <p className="text-sm text-white/50 mb-4">{t.updatePasswordDesc}</p>
              <button onClick={onAction} className="px-4 py-2 border border-white/20 rounded hover:bg-white/5 transition-colors text-sm">{t.changePassword}</button>
            </div>
            <div className="pt-6 border-t border-white/10">
              <h3 className="font-medium mb-2">{t.twoFactor}</h3>
              <p className="text-sm text-white/50 mb-4">{t.twoFactorDesc}</p>
              <button onClick={onAction} className="px-4 py-2 border border-[#D8FF4B]/50 text-[#D8FF4B] rounded hover:bg-[#D8FF4B]/10 transition-colors text-sm">{t.enable2FA}</button>
            </div>
          </div>
        )}

        {tab === 'Notifications' && (
          <div className="space-y-4">
            {[
              { title: t.tradeExecutions, desc: t.tradeExecutionsDesc },
              { title: t.dailySummary, desc: t.dailySummaryDesc },
              { title: t.securityAlerts, desc: t.securityAlertsDesc }
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <div className="font-medium">{n.title}</div>
                  <div className="text-sm text-white/50">{n.desc}</div>
                </div>
                <div onClick={onAction} className="w-10 h-5 rounded-full bg-white/10 p-1 cursor-pointer">
                  <div className="w-3 h-3 rounded-full bg-white/50" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard = ({ lang, setLang, userEmail, onLogout, onUpgrade }: { lang: 'en'|'ru', setLang: (l: 'en'|'ru')=>void, userEmail: string, onLogout: ()=>void, onUpgrade: ()=>void }) => {
  const t = translations[lang].dashboard;
  const [loading, setLoading] = useState(true);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeframe, setTimeframe] = useState(() => {
    return localStorage.getItem('talilow_timeframe') || '1M';
  });
  const [activeTab, setActiveTab] = useState('Overview');
  const [balance, setBalance] = useState(128450.00);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      // Slightly randomize balance on load to simulate live data
      setBalance(prev => prev + (Math.random() * 100 - 50));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('talilow_timeframe', timeframe);
  }, [timeframe]);

  const handleAction = () => {
    setShowDemoModal(true);
  };

  const handleJoinWaitlist = () => {
    setWaitlistJoined(true);
    setTimeout(() => {
      setShowDemoModal(false);
      setWaitlistJoined(false);
    }, 2000);
  };

  const chartData = useMemo(() => {
    let base = balance;
    const points = timeframe === '1D' ? 24 : timeframe === '7D' ? 7 : timeframe === '1M' ? 30 : 12;
    const volatility = timeframe === '1D' ? 500 : 2000;
    
    return Array.from({ length: points }).map((_, i) => {
      base += (Math.random() - 0.4) * volatility;
      return { day: i, value: base };
    });
  }, [timeframe, balance]);

  const pieData = [
    { name: 'BTC', value: 60, color: '#D8FF4B' },
    { name: 'ETH', value: 30, color: '#00A9FF' },
    { name: 'USDC', value: 10, color: 'rgba(255,255,255,0.2)' },
  ];

  const trades = [
    { pair: 'BTC/USD', type: 'LONG', amount: '0.5', pnl: '+1.2%', time: '2m ago' },
    { pair: 'ETH/USD', type: 'SHORT', amount: '12.0', pnl: '+0.8%', time: '15m ago' },
    { pair: 'SOL/USD', type: 'LONG', amount: '150', pnl: '-0.3%', time: '1h ago' },
    { pair: 'AVAX/USD', type: 'LONG', amount: '400', pnl: '+2.1%', time: '3h ago' },
    { pair: 'LINK/USD', type: 'SHORT', amount: '1000', pnl: '-1.5%', time: '4h ago' },
  ];

  return (
    <div className="min-h-screen bg-[#05070D] flex relative z-10">
      {/* Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDemoModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#05070D] border border-white/10 p-8 rounded-xl max-w-md w-full shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-[#D8FF4B]" />
              </div>
              <h3 className="text-2xl font-medium mb-3">{t.demoTitle}</h3>
              <p className="text-white/60 leading-relaxed mb-8">{t.demoDesc}</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button 
                  onClick={handleJoinWaitlist}
                  className="w-full sm:flex-1 bg-[#D8FF4B] text-[#05070D] py-3 px-4 rounded-sm font-medium hover:bg-[#c4eb3b] transition-colors flex items-center justify-center gap-2 text-center"
                >
                  {waitlistJoined ? (
                    <>
                      {t.waitlistJoined} <Check className="w-4 h-4 shrink-0" />
                    </>
                  ) : (
                    t.upgradeBtn
                  )}
                </button>
                <button 
                  onClick={() => setShowDemoModal(false)}
                  className="w-full sm:flex-1 border border-white/20 py-3 px-4 rounded-sm font-medium hover:bg-white/5 transition-colors text-center"
                >
                  {t.closeBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#05070D] border-r border-white/10 z-50 flex flex-col md:hidden"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#D8FF4B] flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#05070D]" />
                  </div>
                  <span className="font-medium">TaliLow AI</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/50 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                {[
                  { icon: PieChartIcon, label: t.overview, id: 'Overview' },
                  { icon: Activity, label: t.aiStrategies, id: 'AI Strategies' },
                  { icon: Clock, label: t.performanceAnalytics, id: 'Analytics' },
                  { icon: Settings, label: t.accountSettings, id: 'Settings' }
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors",
                      activeTab === item.id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-white/10">
                <div className="mb-4 px-4 py-3 rounded bg-white/5 border border-white/5">
                  <div className="text-xs text-white/50 mb-1">{t.loggedInAs}</div>
                  <div className="text-sm font-medium truncate">{userEmail}</div>
                </div>
                <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-white/50 hover:bg-white/5 hover:text-white transition-colors">
                  <LogOut className="w-4 h-4" />
                  {t.logout}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-white/10">
          <div className="w-6 h-6 rounded bg-[#D8FF4B] flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#05070D]" />
          </div>
          <span className="font-medium">TaliLow AI</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: PieChartIcon, label: t.overview, id: 'Overview' },
            { icon: Activity, label: t.aiStrategies, id: 'AI Strategies' },
            { icon: Clock, label: t.performanceAnalytics, id: 'Analytics' },
            { icon: Settings, label: t.accountSettings, id: 'Settings' }
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors",
                activeTab === item.id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="mb-4 px-4 py-3 rounded bg-white/5 border border-white/5">
            <div className="text-xs text-white/50 mb-1">{t.loggedInAs}</div>
            <div className="text-sm font-medium truncate">{userEmail}</div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-white/50 hover:bg-white/5 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            {t.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
            </button>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-sm font-medium">{t.welcome}</div>
            <div className="flex items-center gap-2 text-sm text-white/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-[#D8FF4B] animate-pulse" />
              {t.status}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10 mr-2">
              <button onClick={() => setLang('en')} className={cn("px-2 py-1 rounded-full text-xs font-medium transition-colors", lang === 'en' ? "bg-white/10 text-white" : "text-white/50 hover:text-white")}>EN</button>
              <button onClick={() => setLang('ru')} className={cn("px-2 py-1 rounded-full text-xs font-medium transition-colors", lang === 'ru' ? "bg-white/10 text-white" : "text-white/50 hover:text-white")}>RU</button>
            </div>

            <button onClick={handleAction} className="relative text-white/70 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#D8FF4B]" />
            </button>
            <button onClick={handleAction} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
              <User className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Top Widgets */}
            {activeTab === 'Overview' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: t.balance, value: `$${balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, sub: '+2.4% today', color: 'text-[#D8FF4B]' },
                    { label: t.profit, value: '+$3,082.80', sub: 'Win rate: 78%', color: 'text-[#00A9FF]' },
                    { label: t.activeTrades, value: '12', sub: '4 Long, 8 Short', color: 'text-white' }
                  ].map((widget, i) => (
                    <div key={i} className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer" onClick={handleAction}>
                      <div className="text-sm text-white/50 mb-2">{widget.label}</div>
                      {loading ? (
                        <div className="h-8 w-32 bg-white/10 animate-pulse rounded mb-1" />
                      ) : (
                        <div className="text-3xl font-medium mb-1">{widget.value}</div>
                      )}
                      <div className={cn("text-xs", widget.color)}>{widget.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Main Chart & Side Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Chart */}
                  <div className="lg:col-span-2 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-medium">Portfolio Performance</h3>
                      <div className="flex gap-2 bg-white/5 p-1 rounded border border-white/5">
                        {t.timeframes.map((tf, i) => (
                          <button 
                            key={i} 
                            onClick={() => setTimeframe(tf)}
                            className={cn(
                              "px-3 py-1 text-xs rounded transition-all",
                              timeframe === tf ? "bg-white/10 text-white shadow-sm" : "text-white/50 hover:text-white"
                            )}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="h-[300px]">
                      {loading ? (
                        <div className="w-full h-full bg-white/5 animate-pulse rounded" />
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis dataKey="day" hide />
                            <YAxis domain={['auto', 'auto']} hide />
                            <RechartsTooltip 
                              contentStyle={{ backgroundColor: '#05070D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                              itemStyle={{ color: '#D8FF4B' }}
                              labelStyle={{ display: 'none' }}
                              cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#D8FF4B" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#D8FF4B', stroke: '#05070D', strokeWidth: 2 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>

                  {/* Allocation */}
                  <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col cursor-pointer hover:bg-white/[0.04] transition-colors" onClick={handleAction}>
                    <h3 className="font-medium mb-6">{t.allocation}</h3>
                    <div className="flex-1 flex items-center justify-center relative">
                      {loading ? (
                        <div className="w-40 h-40 rounded-full border-8 border-white/5 animate-pulse" />
                      ) : (
                        <>
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={pieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <RechartsTooltip 
                                contentStyle={{ backgroundColor: '#05070D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                                itemStyle={{ color: '#fff' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-2xl font-medium">3</span>
                            <span className="text-xs text-white/50">Assets</span>
                          </div>
                        </>
                      )}
                    </div>
                    {!loading && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {pieData.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-white/70">{item.name}</span>
                            <span className="ml-auto font-mono">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Trade Feed */}
                <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium">{t.feed}</h3>
                    <button onClick={handleAction} className="text-xs text-[#00A9FF] hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-12 bg-white/5 animate-pulse rounded" />
                      ))
                    ) : (
                      trades.map((trade, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={handleAction}
                          className="flex flex-wrap sm:flex-nowrap items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-pointer group gap-y-2 sm:gap-0"
                        >
                          <div className="flex items-center gap-3 w-1/2 sm:w-1/4">
                            <div className={cn(
                              "w-2 h-2 rounded-full shrink-0",
                              trade.type === 'LONG' ? "bg-[#D8FF4B]" : "bg-[#00A9FF]"
                            )} />
                            <span className="font-medium group-hover:text-white transition-colors truncate">{trade.pair}</span>
                          </div>
                          <div className="w-1/2 sm:w-1/4 text-right sm:text-left text-sm text-white/50">{trade.type}</div>
                          <div className="w-1/2 sm:w-1/4 text-sm font-mono text-white/70">{trade.amount}</div>
                          <div className={cn(
                            "w-1/2 sm:w-1/4 text-right text-sm font-mono",
                            trade.pnl.startsWith('+') ? "text-[#D8FF4B]" : "text-red-400"
                          )}>
                            {trade.pnl}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'AI Strategies' && <AIStrategies lang={lang} onAction={handleAction} />}
            {activeTab === 'Analytics' && <Analytics lang={lang} onAction={handleAction} />}
            {activeTab === 'Settings' && <SettingsView lang={lang} email={userEmail} onAction={handleAction} />}

          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'auth' | 'dashboard'>('landing');
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const [userEmail, setUserEmail] = useState('guest@talilow.ai');

  return (
    <div className="min-h-screen bg-[#05070D] text-white font-sans selection:bg-[#D8FF4B] selection:text-[#05070D]">
      {currentPage !== 'dashboard' && <ParticleBackground />}
      
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage 
              lang={lang} 
              setLang={setLang} 
              onLaunch={() => setCurrentPage('auth')} 
            />
          </motion.div>
        )}

        {currentPage === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AuthPage 
              lang={lang} 
              onLogin={(email) => {
                setUserEmail(email);
                setCurrentPage('dashboard');
              }} 
              onBack={() => setCurrentPage('landing')} 
            />
          </motion.div>
        )}

        {currentPage === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dashboard 
              lang={lang} 
              setLang={setLang}
              userEmail={userEmail}
              onLogout={() => setCurrentPage('landing')} 
              onUpgrade={() => {
                setCurrentPage('landing');
                setTimeout(() => {
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
