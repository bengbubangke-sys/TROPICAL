// 语言资源文件
const languages = {
    en: {
        // 导航栏
        nav_home: 'Home',
        nav_services: 'Services',
        nav_solutions: 'Solutions',
        nav_about: 'About Us',
        nav_contact: 'Contact Us',
        
        // 英雄区域
        hero_title: 'Intelligent Digital Transformation',
        hero_subtitle: 'Leveraging advanced AI technology to provide comprehensive digital solutions for businesses, driving growth and innovation.',
        hero_cta1: 'Learn Services',
        hero_cta2: 'Contact Us',
        
        // 服务区域
        services_title: 'Our Services',
        services_subtitle: 'Providing comprehensive AI-driven digital services to meet business needs at different stages',
        service_1_title: 'AI Consulting',
        service_1_desc: 'Professional AI strategy planning and implementation consulting to help enterprises develop digital transformation roadmaps.',
        service_2_title: 'Machine Learning Development',
        service_2_desc: 'Customized machine learning model development and deployment to solve complex business problems.',
        service_3_title: 'Data Analysis',
        service_3_desc: 'In-depth data analysis and visualization to uncover data value and drive business decisions.',
        service_4_title: 'Cloud Infrastructure',
        service_4_desc: 'Elastic and secure cloud infrastructure setup and optimization to support efficient operation of AI applications.',
        
        // 解决方案区域
        solutions_title: 'Industry Solutions',
        solutions_subtitle: 'Tailored AI solutions for different industry characteristics',
        solution_1_title: 'Fintech',
        solution_1_desc: 'AI solutions for financial risk control, customer profiling, quantitative trading, etc.',
        solution_2_title: 'Retail & E-commerce',
        solution_2_desc: 'Personalized recommendations, demand forecasting, intelligent customer service and other retail AI applications.',
        solution_3_title: 'Smart Manufacturing',
        solution_3_desc: 'Predictive maintenance, quality inspection, supply chain optimization and other industrial AI solutions.',
        
        // 关于我们区域
        about_title: 'About Tropical Penguin',
        about_desc1: 'We are a team of AI experts, data scientists, and software engineers dedicated to providing businesses with cutting-edge digital AI solutions.',
        about_desc2: 'With rich industry experience and technical accumulation, we help customers achieve business innovation and growth, and maintain competitiveness in the digital age.',
        about_stats_case: 'Success Cases',
        about_stats_client: 'Enterprise Clients',
        about_stats_satisfaction: 'Customer Satisfaction',
        
        // 联系我们区域
        contact_title: 'Contact Us',
        contact_subtitle: 'Contact us anytime to learn more about AI digital solutions',
        contact_info_address: 'Address',
        contact_info_address_detail: 'FBRA LLC 1023 E LincolnwayCheyenne, WY 82001',
        contact_info_phone: 'Phone',
        contact_info_phone_detail: '(929)305-0668',
        contact_info_email: 'Email',
        contact_info_email_detail: 'agent@firstbase.io',
        contact_form_name: 'Your Name',
        contact_form_email: 'Your Email',
        contact_form_subject: 'Subject',
        contact_form_message: 'Your Message',
        contact_form_submit: 'Send Message',
        
        // 页脚
        footer_quick_links: 'Quick Links',
        footer_follow_us: 'Follow Us',
        footer_copyright: '© 2024 Tropical Penguin AI. All rights reserved.',
        
        // 表单验证
        form_error: 'Please fill in all required fields!',
        form_success: 'Thank you for your message! We will contact you soon.'
    },
    
    zh: {
        // 导航栏
        nav_home: '首页',
        nav_services: '服务',
        nav_solutions: '解决方案',
        nav_about: '关于我们',
        nav_contact: '联系我们',
        
        // 英雄区域
        hero_title: '智能数字化转型',
        hero_subtitle: '利用先进的人工智能技术，为企业提供全方位的数字化解决方案，助力业务增长与创新。',
        hero_cta1: '了解服务',
        hero_cta2: '联系我们',
        
        // 服务区域
        services_title: '我们的服务',
        services_subtitle: '提供全面的AI驱动数字化服务，满足企业不同阶段的发展需求',
        service_1_title: 'AI咨询服务',
        service_1_desc: '专业的AI战略规划与实施咨询，帮助企业制定数字化转型路线图。',
        service_2_title: '机器学习开发',
        service_2_desc: '定制化的机器学习模型开发与部署，解决复杂业务问题。',
        service_3_title: '数据分析',
        service_3_desc: '深度数据分析与可视化，挖掘数据价值，驱动业务决策。',
        service_4_title: '云基础设施',
        service_4_desc: '弹性、安全的云基础设施搭建与优化，支持AI应用高效运行。',
        
        // 解决方案区域
        solutions_title: '行业解决方案',
        solutions_subtitle: '针对不同行业特点，提供量身定制的AI解决方案',
        solution_1_title: '金融科技',
        solution_1_desc: '智能风控、客户画像、量化交易等金融AI解决方案。',
        solution_2_title: '零售电商',
        solution_2_desc: '个性化推荐、需求预测、智能客服等零售AI应用。',
        solution_3_title: '智能制造',
        solution_3_desc: '预测性维护、质量检测、供应链优化等工业AI解决方案。',
        
        // 关于我们区域
        about_title: '关于Tropical Penguin',
        about_desc1: '我们是一支由AI专家、数据科学家和软件工程师组成的团队，致力于为企业提供最先进的数字化AI解决方案。',
        about_desc2: '凭借丰富的行业经验和技术积累，我们帮助客户实现业务创新与增长，在数字化时代保持竞争力。',
        about_stats_case: '成功案例',
        about_stats_client: '企业客户',
        about_stats_satisfaction: '客户满意度',
        
        // 联系我们区域
        contact_title: '联系我们',
        contact_subtitle: '随时与我们联系，了解更多关于AI数字化解决方案的信息',
        contact_info_address: '地址',
        contact_info_address_detail: 'FBRA LLC 1023 E LincolnwayCheyenne, WY 82001',
        contact_info_phone: '电话',
        contact_info_phone_detail: '(929)305-0668',
        contact_info_email: '邮箱',
        contact_info_email_detail: 'agent@firstbase.io',
        contact_form_name: '您的姓名',
        contact_form_email: '您的邮箱',
        contact_form_subject: '主题',
        contact_form_message: '您的留言',
        contact_form_submit: '发送留言',
        
        // 页脚
        footer_quick_links: '快速链接',
        footer_follow_us: '关注我们',
        footer_copyright: '© 2024 Tropical Penguin AI. 保留所有权利。',
        
        // 表单验证
        form_error: '请填写所有必填字段！',
        form_success: '感谢您的留言！我们会尽快与您联系。'
    }
};