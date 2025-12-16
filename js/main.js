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

// 汇率与金额工具
const defaultRates = { MYR: 1, USD: 0.21, SGD: 0.28 };
let liveRates = { ...defaultRates };
let currentCurrency = 'MYR';

function getRate() {
    return liveRates[currentCurrency] || 1;
}

function formatAmountFromMYR(myrAmount) {
    const converted = myrAmount * getRate();
    return `${currentCurrency} ${converted.toFixed(2)}`;
}

function updatePricingCards() {
    document.querySelectorAll('.dynamic-price').forEach(priceEl => {
        const base = Number(priceEl.dataset.basePrice || 0);
        priceEl.textContent = formatAmountFromMYR(base);
    });
}

function updateCartDisplay() {
    const rows = document.querySelectorAll('#cartBody tr');
    let subtotalMYR = 0;

    rows.forEach(row => {
        const base = Number(row.dataset.basePrice || 0);
        const qtyInput = row.querySelector('.qty-input');
        const qty = Math.max(0, Number(qtyInput.value) || 0);
        const line = base * qty;
        subtotalMYR += line;
        row.querySelector('.unit-price').textContent = formatAmountFromMYR(base);
        row.querySelector('.line-subtotal').textContent = formatAmountFromMYR(line);
    });

    const taxMYR = subtotalMYR * 0.06;
    const feeMYR = subtotalMYR * 0.015;
    const totalMYR = subtotalMYR + taxMYR + feeMYR;

    // 更新购物车页面的总额显示
    document.getElementById('cartSubtotal').textContent = formatAmountFromMYR(subtotalMYR);
    document.getElementById('cartTax').textContent = formatAmountFromMYR(taxMYR);
    document.getElementById('cartFee').textContent = formatAmountFromMYR(feeMYR);
    document.getElementById('cartTotal').textContent = formatAmountFromMYR(totalMYR);
    
    // 更新结账页面的总额显示
    if (document.getElementById('subtotalDisplay')) {
        document.getElementById('subtotalDisplay').textContent = formatAmountFromMYR(subtotalMYR);
        document.getElementById('taxDisplay').textContent = formatAmountFromMYR(taxMYR);
        document.getElementById('feeDisplay').textContent = formatAmountFromMYR(feeMYR);
        document.getElementById('totalDisplay').textContent = formatAmountFromMYR(totalMYR);
    }

    // 同步订单摘要
    renderOrderSummary(rows, { subtotalMYR, taxMYR, feeMYR, totalMYR });
}

function renderOrderSummary(rows, totals) {
    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = '';
    rows.forEach(row => {
        const name = row.querySelector('td').textContent;
        const qty = Number(row.querySelector('.qty-input').value) || 0;
        if (qty <= 0) return;
        const base = Number(row.dataset.basePrice || 0);
        const lineMYR = base * qty;
        const div = document.createElement('div');
        div.className = 'order-item';
        div.innerHTML = `
            <span>${name} x ${qty}</span>
            <span>${formatAmountFromMYR(lineMYR)}</span>
        `;
        orderItems.appendChild(div);
    });

    document.getElementById('summarySubtotal').textContent = formatAmountFromMYR(totals.subtotalMYR);
    document.getElementById('summaryTax').textContent = formatAmountFromMYR(totals.taxMYR);
    document.getElementById('summaryFee').textContent = formatAmountFromMYR(totals.feeMYR);
    document.getElementById('summaryTotal').textContent = formatAmountFromMYR(totals.totalMYR);
    document.getElementById('summaryCurrency').textContent = currentCurrency;
}

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

    // 购物车 & 结账逻辑
    const cartBody = document.getElementById('cartBody');
    const currencySelect = document.getElementById('currencySelect');
    const customRate = document.getElementById('customRate');
    const applyRateBtn = document.getElementById('applyRate');
    const clearCartBtn = document.getElementById('clearCart');
    const proceedBtn = document.getElementById('proceedBtn');

    // 数量调整
    cartBody?.addEventListener('click', (e) => {
        if (e.target.classList.contains('qty-btn')) {
            const action = e.target.dataset.action;
            const input = e.target.parentElement.querySelector('.qty-input');
            const current = Number(input.value) || 1;
            if (action === 'inc') input.value = current + 1;
            if (action === 'dec' && current > 1) input.value = current - 1;
            updateCartDisplay();
        }
        if (e.target.classList.contains('remove-item')) {
            e.target.closest('tr').remove();
            updateCartDisplay();
        }
    });

    cartBody?.addEventListener('change', (e) => {
        if (e.target.classList.contains('qty-input')) {
            const val = Math.max(1, Number(e.target.value) || 1);
            e.target.value = val;
            updateCartDisplay();
        }
    });

    clearCartBtn?.addEventListener('click', () => {
        cartBody.querySelectorAll('tr').forEach(tr => tr.remove());
        updateCartDisplay();
    });

    // 货币切换
    currencySelect?.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        updatePricingCards();
        updateCartDisplay();
    });

    applyRateBtn?.addEventListener('click', () => {
        const val = Number(customRate.value);
        if (val > 0) {
            liveRates[currentCurrency] = val;
            updatePricingCards();
            updateCartDisplay();
            alert(`已应用自定义汇率：1 MYR = ${val} ${currentCurrency}`);
        } else {
            liveRates = { ...defaultRates };
            updatePricingCards();
            updateCartDisplay();
            alert('已恢复默认汇率');
        }
    });

    // 添加商品到购物车函数
    function addItemToCart(id, name, price) {
        // 检查商品是否已在购物车中
        const existingItem = cartBody.querySelector(`tr[data-id="${id}"]`);
        
        if (existingItem) {
            // 如果已存在，增加数量
            const qtyInput = existingItem.querySelector('.qty-input');
            qtyInput.value = Number(qtyInput.value) + 1;
        } else {
            // 如果不存在，创建新行
            const newRow = document.createElement('tr');
            newRow.dataset.id = id;
            newRow.dataset.basePrice = price;
            newRow.innerHTML = `
                <td>${name}</td>
                <td class="unit-price">${formatAmountFromMYR(price)}</td>
                <td>
                    <div class="qty-control">
                        <button class="qty-btn" data-action="dec">-</button>
                        <input type="number" min="1" value="1" class="qty-input" />
                        <button class="qty-btn" data-action="inc">+</button>
                    </div>
                </td>
                <td class="line-subtotal">${formatAmountFromMYR(price)}</td>
                <td><button class="link-btn remove-item" data-lang="delete">删除</button></td>
            `;
            cartBody.appendChild(newRow);
        }
        
        // 更新购物车显示
        updateCartDisplay();
        
        // 显示添加成功提示
        const add_to_cart_success = currentLang === 'zh' ? `${name} 已成功加入购物车！` : `${name} has been successfully added to cart!`;
        alert(add_to_cart_success);
    }
    
    // 为加入购物车按钮添加事件监听器
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);
            addItemToCart(id, name, price);
        });
    });
    
    // 初始金额显示
    updatePricingCards();
    updateCartDisplay();
    
    // 付款方式选择的JavaScript备选方案（针对不支持:has()选择器的浏览器）
    const paymentLabels = document.querySelectorAll('.payment-options label');
    const paymentInputs = document.querySelectorAll('.payment-options input[type="radio"]');
    
    // 为每个单选按钮添加事件监听器
    paymentInputs.forEach(input => {
        input.addEventListener('change', () => {
            // 移除所有标签的active类
            paymentLabels.forEach(label => label.classList.remove('active'));
            // 为当前选中的单选按钮的父标签添加active类
            const parentLabel = input.closest('label');
            if (parentLabel) {
                parentLabel.classList.add('active');
            }
        });
    });
    
    // 初始化，为默认选中的付款方式添加active类
    const checkedInput = document.querySelector('.payment-options input[type="radio"]:checked');
    if (checkedInput) {
        const parentLabel = checkedInput.closest('label');
        if (parentLabel) {
            parentLabel.classList.add('active');
        }
    }

    // 结账校验
    proceedBtn?.addEventListener('click', () => {
        const name = document.getElementById('customerName')?.value.trim();
        const email = document.getElementById('customerEmail')?.value.trim();
        const phone = document.getElementById('customerPhone')?.value.trim();
        const eta = document.getElementById('deliveryEta')?.value.trim();
        const refund = document.getElementById('refundPolicy')?.checked;
        const terms = document.getElementById('termsPolicy')?.checked;
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'FPX';

        if (!name || !email || !phone) {
            alert('请完整填写 Full Name / Email / Phone');
            return;
        }
        if (!refund || !terms) {
            alert('请勾选并同意 Refund Policy 与 Terms & Privacy');
            return;
        }

        const summaryTotal = document.getElementById('summaryTotal')?.textContent || '';
        const message = `
最终确认：
- 姓名：${name}
- 邮箱：${email}
- 电话：${phone}
- 交付时间：${eta}
- 付款方式：${paymentMethod}
- 应付金额：${summaryTotal}
确认后将跳转至支付渠道。`;
        alert(message);
    });
});