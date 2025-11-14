// Mobile Menu Toggle - Enhanced
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
let isMobileMenuOpen = false;

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
        navMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // بهبود: استفاده از querySelector صریح
        const icon = mobileMenuToggle?.querySelector('i.fas');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    } else {
        navMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        const icon = mobileMenuToggle?.querySelector('i.fas');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const offsetTop = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Support Button & Widget - Enhanced Chat Functionality
const supportButton = document.getElementById('supportButton');
const supportWidget = document.getElementById('supportWidget');
const widgetClose = document.getElementById('widgetClose');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.querySelector('.chat-messages');
let isWidgetOpen = false;

function toggleSupportWidget() {
    isWidgetOpen = !isWidgetOpen;
    
    if (isWidgetOpen) {
        // باز کردن ویجت
        supportWidget.classList.add('active');
        supportWidget.setAttribute('aria-hidden', 'false');
        supportButton.classList.add('widget-open', 'disable-hover');
        
        // متوقف کردن انیمیشن float
        supportButton.style.animation = 'none';
        
        // فوکوس روی input
        setTimeout(() => {
            messageInput?.focus();
        }, 100);
        
    } else {
        // بستن ویجت
        supportWidget.classList.remove('active');
        supportWidget.setAttribute('aria-hidden', 'true');
        
        // با تاخیر حذف کلاس widget-open برای smooth transition
        setTimeout(() => {
            supportButton.classList.remove('widget-open', 'disable-hover');
            // بازگرداندن انیمیشن float
            supportButton.style.animation = 'float 3s ease-in-out infinite';
        }, 300);
    }
}

if (supportButton) {
    supportButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSupportWidget();
    });
}

if (widgetClose) {
    widgetClose.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isWidgetOpen) {
            toggleSupportWidget();
        }
    });
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user-msg' : 'message support-msg';
    
    const avatar = document.createElement('img');
    const userName = isUser ? 'User' : 'Support';
    const bgColor = isUser ? '1e3a5f' : '7c3aed';
    
    avatar.src = `https://ui-avatars.com/api/?name=${userName}&background=${bgColor}&color=fff&size=24`;
    avatar.alt = isUser ? 'کاربر' : 'پشتیبان';
    avatar.className = 'msg-avatar';
    avatar.loading = 'lazy';
    
    const msgContent = document.createElement('div');
    msgContent.className = 'msg-content';
    
    text.split('\n').forEach(line => {
        const p = document.createElement('p');
        p.textContent = line;
        msgContent.appendChild(p);
    });
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'msg-time';
    timeSpan.textContent = getCurrentTime();
    msgContent.appendChild(timeSpan);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(msgContent);
    chatMessages.appendChild(messageDiv);
    
    // رفع: اسکرول به عنصر صحیح
    const widgetBody = document.querySelector('.widget-body');
    if (widgetBody) {
        widgetBody.scrollTop = widgetBody.scrollHeight;
    }
}

function getAutoResponse(userMessage) {
    const message = userMessage.toLowerCase();
    const responses = {
        'سلام': 'سلام عزیز! چطور می‌تونم کمکتون کنم؟',
        'قیمت': 'برای دریافت لیست قیمت‌ها می‌تونید با شماره 021-12345678 تماس بگیرید یا فرم تماس رو پر کنید.',
        'خدمات': 'ما خدمات طراحی سایت، سئو، دیجیتال مارکتینگ و اپلیکیشن موبایل ارائه می‌دیم.\nکدوم خدمت مد نظرتونه؟',
        'سایت': 'عالیه! ما انواع سایت‌های فروشگاهی، شرکتی، شخصی و سفارشی طراحی می‌کنیم.\nبرای مشاوره رایگان می‌تونید فرم تماس رو پر کنید.',
        'سئو': 'خدمات سئو ما شامل:\n- بهینه‌سازی محتوا\n- لینک‌سازی\n- بهبود سرعت سایت\n- آنالیز رقبا\nمیشه تا 3 ماه نتایج عالی ببینید!',
        'زمان': 'زمان تحویل پروژه بسته به نوع و حجم کار متفاوته.\nمعمولا سایت‌های شرکتی 2-4 هفته و فروشگاهی 3-6 هفته زمان میبره.',
        'پشتیبانی': 'ما پشتیبانی 24/7 داریم و همیشه در خدمت شما هستیم.\nهر مشکلی داشتید کافیه پیام بدید.',
        'تشکر': 'خواهش می‌کنم! خوشحال میشم بتونم کمکتون کنم.\nسوال دیگه‌ای دارید؟',
        'خداحافظ': 'خداحافظ! روز خوبی داشته باشید.\nهر وقت نیاز داشتید در خدمتم 😊'
    };
    
    for (const [keyword, response] of Object.entries(responses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }
    
    return 'ممنون از پیامتون!\nهمکاران ما به زودی با شما تماس خواهند گرفت.\nبرای تماس فوری: 021-12345678';
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    messageInput.value = '';
    
    // غیرفعال کردن دکمه ارسال موقت
    sendBtn.disabled = true;
    
    setTimeout(() => {
        const response = getAutoResponse(message);
        addMessage(response, false);
        sendBtn.disabled = false;
    }, 1500 + Math.random() * 1000);
}

if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}

if (messageInput) {
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (isWidgetOpen) {
            toggleSupportWidget();
        }
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }
});

// Close when clicking outside
document.addEventListener('click', (e) => {
    if (isWidgetOpen && !e.target.closest('.support-widget') && !e.target.closest('.support-button')) {
        toggleSupportWidget();
    }
    
    if (isMobileMenuOpen && !e.target.closest('.navbar')) {
        toggleMobileMenu();
    }
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach((item, index) => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                }, index * 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal Popup
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBtn = document.getElementById('modalBtn');
const contactForm = document.querySelector('.contact-form');

function showModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('show');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('show');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // بررسی اعتبار فرم
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
        
        showModal();
        contactForm.reset();
    });
}

if (modalClose) {
    modalClose.addEventListener('click', hideModal);
}

if (modalBtn) {
    modalBtn.addEventListener('click', hideModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            hideModal();
        }
    });
}

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .contact-form, .contact-info, .footer-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Show button after scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (supportButton) {
            if (scrollTop > 200) {
                supportButton.style.opacity = '1';
                supportButton.style.pointerEvents = 'all';
            } else {
                supportButton.style.opacity = '0.7';
            }
        }
    }, 10);
});

// Performance: Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Disable animations on mobile for better performance
function handleAnimations() {
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) {
        document.querySelectorAll('.service-card, .portfolio-item, .stat-item').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.style.transition = 'none';
        });
    }
}

window.addEventListener('load', handleAnimations);
window.addEventListener('resize', handleAnimations);

// NEW: Counter Animation for Stats Numbers
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    let shouldAddPlus = element.parentElement.querySelector('p').textContent.includes('مشتری');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        let display = Math.floor(current);
        if (shouldAddPlus) display += '+';
        element.textContent = display;
    }, 16);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.stat-number');
            if (counter && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCounter(counter);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    counterObserver.observe(item);
});

// Console message
console.log('%c🌟 وب مانیا | طراحی شده با ❤️', 'color: #7c3aed; font-size: 16px; font-weight: bold;');
console.log('%cWebsite designed and developed by WebMania Team', 'color: #a855f7; font-size: 12px;');

// Aurora Background Integration - Small Waves & Blue/Purple Colors
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uWaveScale;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 adjustedUV = uv;
  
  if (aspectRatio < 1.0) {
    adjustedUV.x *= aspectRatio * 1.5;
  }
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, adjustedUV.x, rampColor);
  
  float height = snoise(vec2(adjustedUV.x * uWaveScale + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

// Device detection
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth < 768;
}

function isLowEndDevice() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) return true;
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (/Mali-4|Adreno \(TM\) 3|PowerVR SGX/i.test(renderer)) {
            return true;
        }
    }
    
    return false;
}

// ENHANCED CONFIGURATION - Small Waves & Blue/Purple Colors
const CONFIG = {
    colorStops: ['#1e3a8a', '#6366f1', '#7c3aed'],
    amplitude: 1.0,
    blend: 0.5,
    speed: 7,
    waveScale: 3.0,
    mobile: {
        colorStops: ['#1e3a8a', '#6366f1', '#7c3aed'],
        amplitude: 0.8,
        blend: 0.6,
        speed: 7,
        waveScale: 5.0,
        dpr: 1,
        targetFPS: 60
    }
};

function getConfig() {
    if (isMobile()) {
        return { ...CONFIG, ...CONFIG.mobile };
    }
    return CONFIG;
}

function useCSSFallback(container) {
    console.log('Using CSS gradient fallback for low-end device');
    
    container.style.background = `
        radial-gradient(ellipse at 30% 40%, rgba(30, 58, 138, 0.4) 0%, transparent 40%),
        radial-gradient(ellipse at 70% 60%, rgba(99, 102, 241, 0.3) 0%, transparent 40%),
        radial-gradient(ellipse at 50% 80%, rgba(124, 58, 237, 0.2) 0%, transparent 60%)
    `;
    container.style.animation = 'aurora-pulse 8s ease-in-out infinite';
    
    if (!document.getElementById('aurora-fallback-style')) {
        const style = document.createElement('style');
        style.id = 'aurora-fallback-style';
        style.textContent = `
            @keyframes aurora-pulse {
                0%, 100% { opacity: 0.6; filter: hue-rotate(0deg); }
                50% { opacity: 0.8; filter: hue-rotate(15deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function waitForOGL(callback, maxAttempts = 50) {
    let attempts = 0;
    const checkOGL = setInterval(() => {
        attempts++;
        if (window.OGL) {
            clearInterval(checkOGL);
            callback();
        } else if (attempts >= maxAttempts) {
            clearInterval(checkOGL);
            console.error('OGL failed to load');
            const container = document.getElementById('aurora-background');
            if (container) useCSSFallback(container);
        }
    }, 100);
}

function initAurora() {
    const container = document.getElementById('aurora-background');
    
    if (!container) {
        console.warn('Aurora container not found');
        return;
    }

    if (isLowEndDevice()) {
        useCSSFallback(container);
        return;
    }

    if (!window.OGL) {
        console.error('OGL not loaded, using fallback');
        useCSSFallback(container);
        return;
    }

    const { Renderer, Program, Mesh, Color, Triangle } = window.OGL;
    const config = getConfig();
    const mobile = isMobile();

    try {
        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: true,
            antialias: !mobile,
            dpr: mobile ? config.dpr : Math.min(window.devicePixelRatio, 2),
            powerPreference: mobile ? 'low-power' : 'high-performance'
        });

        const gl = renderer.gl;
        
        if (!gl || !(gl instanceof WebGL2RenderingContext)) {
            console.warn('WebGL2 not supported, using fallback');
            useCSSFallback(container);
            return;
        }
        
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.backgroundColor = 'transparent';

        const canvas = gl.canvas;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.willChange = 'transform'; // بهبود پرفورمنس

        let program;

        let resizeTimeout;
        function resize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (!container) return;
                const width = container.offsetWidth;
                const height = container.offsetHeight;
                renderer.setSize(width, height);
                if (program) {
                    program.uniforms.uResolution.value = [width, height];
                }
            }, 100);
        }

        window.addEventListener('resize', resize);

        const geometry = new Triangle(gl);
        
        if (geometry.attributes.uv) {
            delete geometry.attributes.uv;
        }

        const colorStopsArray = config.colorStops.map(hex => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
        });

        program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uAmplitude: { value: config.amplitude },
                uColorStops: { value: colorStopsArray },
                uResolution: { value: [container.offsetWidth, container.offsetHeight] },
                uBlend: { value: config.blend },
                uWaveScale: { value: config.waveScale }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });
        container.appendChild(canvas);

        let animationId = 0;
        let lastTime = 0;
        const targetFPS = mobile && config.targetFPS ? config.targetFPS : 60;
        const frameInterval = 1000 / targetFPS;
        
        function update(currentTime) {
            animationId = requestAnimationFrame(update);
            
            if (mobile) {
                const deltaTime = currentTime - lastTime;
                if (deltaTime < frameInterval) {
                    return;
                }
                lastTime = currentTime - (deltaTime % frameInterval);
            }
            
            const time = currentTime * 0.001;
            program.uniforms.uTime.value = time * config.speed * 0.1;
            
            renderer.render({ scene: mesh });
        }

        animationId = requestAnimationFrame(update);
        resize();

        console.log(`🌌 Aurora initialized! (${mobile ? 'Mobile' : 'Desktop'} - Wave Scale: ${config.waveScale}, Amplitude: ${config.amplitude}, Blend: ${config.blend})`);

        let isPaused = false;
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isPaused = true;
                if (animationId) {
                    cancelAnimationFrame(animationId);
                    animationId = 0;
                }
            } else {
                isPaused = false;
                if (!animationId) {
                    animationId = requestAnimationFrame(update);
                }
            }
        });

        if (mobile) {
            window.addEventListener('orientationchange', () => {
                setTimeout(resize, 100);
            });
        }

        window.addEventListener('beforeunload', () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            window.removeEventListener('resize', resize);
            clearTimeout(resizeTimeout);
            if (container && gl.canvas.parentNode === container) {
                container.removeChild(gl.canvas);
            }
            const ext = gl.getExtension('WEBGL_lose_context');
            if (ext) ext.loseContext();
        });

    } catch (error) {
        console.error('Error initializing Aurora:', error);
        useCSSFallback(container);
    }
}

waitForOGL(() => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAurora);
    } else {
        initAurora();
    }
});

// Modern Form Functionality
class ModernForm {
    constructor() {
        this.form = document.getElementById('projectForm');
        this.budgetSlider = document.getElementById('budget');
        this.budgetValue = document.getElementById('budgetValue');
        this.submitBtn = document.querySelector('.submit-btn');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.handleBudgetSlider();
        this.handleFormValidation();
        this.handleFormSubmission();
        this.handleInputAnimations();
    }
    
    handleBudgetSlider() {
        if (!this.budgetSlider || !this.budgetValue) return;
        
        const updateBudget = () => {
            const value = parseInt(this.budgetSlider.value);
            const formatted = this.formatNumber(value);
            this.budgetValue.textContent = `${formatted} میلیون تومان`;
        };
        
        this.budgetSlider.addEventListener('input', updateBudget);
        updateBudget();
    }
    
    formatNumber(num) {
        return new Intl.NumberFormat('fa-IR').format(num);
    }
    
    handleInputAnimations() {
        const inputs = this.form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    handleFormValidation() {
        const inputs = this.form.querySelectorAll('[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }
    
    validateField(field) {
        const formGroup = field.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        
        let isValid = true;
        let message = '';
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'این فیلد اجباری است';
        } else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'ایمیل معتبر وارد کنید';
            }
        }
        
        if (!isValid) {
            field.classList.add('error');
            error.textContent = message;
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(error);
            }
            formGroup.classList.add('has-error');
        } else {
            field.classList.remove('error');
            if (formGroup.querySelector('.error-message')) {
                formGroup.removeChild(error);
            }
            formGroup.classList.remove('has-error');
        }
        
        return isValid;
    }
    
    async handleFormSubmission() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const requiredFields = this.form.querySelectorAll('[required]');
            let isFormValid = true;
            
            requiredFields.forEach(field => {
                if (!this.validateField(field)) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                this.showNotification('لطفاً فیلدهای اجباری را پر کنید', 'error');
                return;
            }
            
            this.setLoading(true);
            
            try {
                // Simulate API call
                await this.simulateFormSubmission();
                
                // Success
                this.showModal();
                this.form.reset();
                
                // Reset all input states
                this.form.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('focused');
                });
                
            } catch (error) {
                this.showNotification('خطا در ارسال فرم. لطفاً دوباره تلاش کنید.', 'error');
            } finally {
                this.setLoading(false);
            }
        });
    }
    
    simulateFormSubmission() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000 + Math.random() * 1000);
        });
    }
    
    setLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }
    
    showModal() {
        const modal = document.getElementById('modalOverlay');
        if (modal) {
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            background: type === 'error' ? '#ef4444' : '#7c3aed',
            color: 'white',
            borderRadius: '10px',
            zIndex: '9999',
            fontFamily: 'Estedad, sans-serif',
            fontSize: '0.9rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
}

// Initialize modern form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernForm();
});

// Enhanced Modal
function hideModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Close modal on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideModal();
    }
});
