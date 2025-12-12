// 响应式导航栏
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 平滑滚动
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // 关闭移动端导航菜单
        navLinks.classList.remove('active');
    });
});



// 滚动监听效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(22, 33, 62, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(22, 33, 62, 1)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 语言切换功能
let currentLang = 'zh'; // 默认语言为中文

// 获取所有带有data-lang属性的元素
function getAllTranslatableElements() {
    return document.querySelectorAll('[data-lang]');
}

// 切换语言
function switchLanguage(lang) {
    currentLang = lang;
    
    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // 更新页面内容
    const translatableElements = getAllTranslatableElements();
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (languages[lang][key]) {
            // 处理不同类型的元素
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // 对于表单元素，更新placeholder属性
                element.placeholder = languages[lang][key];
            } else {
                // 对于其他元素，更新文本内容
                element.textContent = languages[lang][key];
            }
        }
    });
    
    // 更新页面标题
    document.title = `Tropical Penguin - ${lang === 'zh' ? '数字化AI解决方案' : 'Digital AI Solutions'}`;
    
    // 保存用户语言偏好到本地存储
    localStorage.setItem('preferredLanguage', lang);
}

// 为语言切换按钮添加事件监听器
document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.id.split('-')[1];
            switchLanguage(lang);
        });
    });
    
    // 检查用户是否有保存的语言偏好
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        switchLanguage(savedLang);
    }
    
    // 页面加载动画
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // 更新表单验证消息
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // 简单的表单验证
            if (!data.name || !data.email || !data.subject || !data.message) {
                alert(languages[currentLang]['form_error']);
                return;
            }
            
            // 模拟表单提交
            alert(languages[currentLang]['form_success']);
            contactForm.reset();
        });
    }
});