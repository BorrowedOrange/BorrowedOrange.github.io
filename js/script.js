/*
   Talak Patel Portfolio - Interactive Mechanics
   Vanilla JS powering premium micro-interactions
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 2. Navigation Scroll Effect
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active nav link based on scroll section
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Terminal Simulator Widget
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    
    // Command history
    const terminalCommands = {
        help: 'Available commands:\n  about     - Brief biography\n  skills    - Core technical competencies\n  projects  - Highlighted project summary\n  contact   - Get email, phone, and links\n  clear     - Clean the screen',
        about: 'Talak Patel | Web Frontend Engineer @ Canonical\n-----------------------------------------------\nBSc Software Engineering graduate from USIU-Africa.\nFocused on building responsive, highly accessible interfaces for the Ubuntu-ecosystem.\nPassionate about React/Next.js, performance optimization, and clean fintech-grade integrations.',
        skills: 'Technical Skills:\n  - Frontend: Next.js, React.js, JavaScript, WordPress\n  - Backend/DB: Python, SQL, REST APIs, Supabase, Firebase\n  - Integrations: M-Pesa Daraja API, Vercel, Stripe\n  - Tools: GitHub Copilot, OpenAI API, Asana, Jira',
        projects: 'Highlighted Projects:\n  - dplfestive.com (Active Maintenance) - Events platform\n  - wealthwaveinstitute.com (Active Maintenance) - FinTech Education\n  - afriqueexplorer.com (Active Maintenance) - Supabase travel platform\n  - Saikan Cleaning App (In Progress) - Flutter Booking application\n  Run command "projects" or click on the Portfolio section below to see details!',
        contact: 'Get in Touch:\n  - Email: talakp39@gmail.com\n  - Phone: +254 715 591 405 / +254 737 470 584\n  - Location: Nairobi, Kenya (Remote availability)\n  - Swahili/English/Hindi bilingual support.'
    };

    // Initialize terminal welcome message
    const printTerminalWelcome = () => {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output';
        outputDiv.innerText = 'Talak Patel Terminal v1.0.0\nType "help" to view list of commands.\n';
        terminalBody.insertBefore(outputDiv, terminalInput.closest('.terminal-input-line'));
    };
    printTerminalWelcome();

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandText = terminalInput.value.trim().toLowerCase();
                terminalInput.value = '';

                // Create echo line
                const echoLine = document.createElement('div');
                echoLine.className = 'terminal-input-line';
                echoLine.innerHTML = `<span class="terminal-prompt">guest@talakpatel:~$</span> <span style="color: #f8fafc;">${commandText}</span>`;
                terminalBody.insertBefore(echoLine, terminalInput.closest('.terminal-input-line'));

                if (commandText === '') return;

                // Handle clear command
                if (commandText === 'clear') {
                    const outputs = terminalBody.querySelectorAll('.terminal-output, .terminal-input-line:not(:last-child)');
                    outputs.forEach(el => el.remove());
                    return;
                }

                // Create response output
                const responseLine = document.createElement('div');
                responseLine.className = 'terminal-output';
                
                if (terminalCommands[commandText]) {
                    responseLine.innerText = terminalCommands[commandText];
                } else {
                    responseLine.innerText = `Command not found: "${commandText}". Type "help" for a list of valid commands.`;
                }

                terminalBody.insertBefore(responseLine, terminalInput.closest('.terminal-input-line'));
                
                // Keep scrolled to bottom of terminal
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    // 4. Project Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. Interactive Modals (Project Detail Info)
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalStatus = document.getElementById('modal-status');
    const modalTechList = document.getElementById('modal-tech-list');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features');
    const modalLink = document.getElementById('modal-link');

    // Rich data for modals
    const projectsDetailData = {
        'dplfestive.com': {
            title: 'dplfestive.com',
            status: 'Active - Monthly Maintenance',
            statusClass: 'status-maintenance',
            tech: ['Vanilla JS', 'Custom HTML5/CSS3', 'CMS API', 'Tailored Themes'],
            desc: 'A premium, custom e-commerce and events platform. It integrates a bespoke frontend design with client CMS administration panels for seamless events ticketing and merchant sales.',
            features: [
                'Bespoke CMS integration for live event ticketing updates',
                'Fully responsive web layout compatible with legacy devices',
                'Advanced security hardening and monthly server backups',
                'Integrated analytics tracking for ticketing click-through optimizations'
            ],
            linkText: 'Visit Website',
            url: 'https://dplfestive.com'
        },
        'mom3ntum.com': {
            title: 'mom3ntum.com',
            status: 'Active - Monthly Maintenance',
            statusClass: 'status-maintenance',
            tech: ['React.js', 'Bootstrap Grid', 'My Club Manager API', 'CSS Transitions'],
            desc: 'A sports club management platform. Integrates directly with My Club Manager API to manage team schedules, match fixtures, client registrations, and member subscriptions.',
            features: [
                'Real-time API integrations with sports backend software databases',
                'Modern UI built from scratch using sleek, fast client components',
                'Dynamic fixtures tables and user dashboards for league standings',
                'Automated membership reminders and registration forms'
            ],
            linkText: 'Visit Website',
            url: 'https://mom3ntum.com'
        },
        'afriqueexplorer.com': {
            title: 'afriqueexplorer.com',
            status: 'Active - Monthly Maintenance',
            statusClass: 'status-maintenance',
            tech: ['Supabase', 'Vanilla JS', 'Dynamic Rendering', 'SEO Optimization'],
            desc: 'Travel and tourism booking platform featuring database interactions, user-friendly enquiry flows, and lightning-fast static page generation for high SEO ratings.',
            features: [
                'Dynamic content rendering with lightning-fast pagination',
                'Supabase cloud backend for client enquiries and booking records',
                'Optimized Lighthouse metrics for top search visibility',
                'Elegant booking filters for activities and travel locations'
            ],
            linkText: 'Visit Website',
            url: 'https://afriqueexplorer.com'
        },
        'robotcafe.co.ke': {
            title: 'robotcafe.co.ke',
            status: 'Active - Monthly Maintenance',
            statusClass: 'status-maintenance',
            tech: ['WordPress', 'Custom Theme Development', 'PHP', 'Reservation Plugins'],
            desc: 'A high-performance WordPress restaurant site. Features tailored UI themes, menu boards, reservation bookings, and security patches to protect customer credentials.',
            features: [
                'Bespoke WordPress layout designed specifically for high restaurant conversion',
                'Interactive table reservation flow powered by responsive booking libraries',
                'Dynamic menu management for quick daily modifications',
                'Hardened WP login endpoints and regular database validation'
            ],
            linkText: 'Visit Website',
            url: 'https://robotcafe.co.ke'
        },
        'wealthwaveinstitute.com': {
            title: 'wealthwaveinstitute.com',
            status: 'Active - Monthly Maintenance',
            statusClass: 'status-maintenance',
            tech: ['Next.js', 'Supabase PostgreSQL', 'News API', 'M-Pesa Daraja API'],
            desc: 'A comprehensive financial education and fintech dashboard. Integrates real-time news feeds alongside mobile payments using Safaricom\'s M-Pesa API.',
            features: [
                'Secure M-Pesa Daraja C2B/B3C merchant API endpoint pipelines',
                'Supabase relational schema structure handling user profiles and authentication',
                'Next.js components for dashboard speeds and page generation',
                'Live financial ticker news stream updating asynchronously'
            ],
            linkText: 'Visit Website',
            url: 'https://wealthwaveinstitute.com'
        },
        'chineselivingroom.com': {
            title: 'chineselivingroom.com',
            status: 'Active',
            statusClass: 'status-completed',
            tech: ['UI/UX Design', 'M-Pesa API', 'Bootstrap', 'Reservation API'],
            desc: 'End-to-end web deployment for a client looking for a premium dining reservation website. Integrates automated table allocation and mobile payment collections.',
            features: [
                'Custom interactive UI mockup conversion directly to clean HTML/JS code',
                'Integrated M-Pesa instant payment confirmation callbacks',
                'E-ticketing table reservation validation at the counter',
                'Complete SEO optimization raising local search rankings by 40%'
            ],
            linkText: 'Visit Website',
            url: 'https://chineselivingroom.com'
        },
        'regisrestaurant.co.ke': {
            title: 'regisrestaurant.co.ke',
            status: 'Active',
            statusClass: 'status-completed',
            tech: ['Branding', 'CMS Setup', 'Responsive Design', 'Vanilla CSS'],
            desc: 'A complete branding and website build for a hospitality business, focusing on high visual appeal and simple client menu updates.',
            features: [
                'Stunning color scheme highlighting premium hospitality brand aesthetics',
                'CMS panel allowing restaurant managers to modify pricing in seconds',
                'Responsive design showing pixel-perfect menu images on mobile screens',
                'Optimized web assets for rapid load times over mobile network channels'
            ],
            linkText: 'Visit Website',
            url: 'https://regisrestaurant.co.ke'
        },
        'tsukutsukumenu.com': {
            title: 'tsukutsukumenu.com',
            status: 'Active',
            statusClass: 'status-completed',
            tech: ['Mobile First Design', 'Dynamic Menu', 'Vanilla JS', 'Local Storage'],
            desc: 'Digital, contactless QR code menu platform for instant restaurant menus on guest smartphones.',
            features: [
                'Ultra-light code footprint loading in under 400ms',
                'Mobile-first grid layouts for convenient single-handed usage',
                'Dynamic filters sorting food dishes by allergies, availability, or ratings',
                'Zero-dependency build for robust reliability'
            ],
            linkText: 'Visit Website',
            url: 'https://tsukutsukumenu.com'
        },
        'saikan-cleaning': {
            title: 'Saikan Cleaning Services App',
            status: 'In Progress',
            statusClass: 'status-inprogress',
            tech: ['Flutter (iOS/Android)', 'Supabase DB', 'Supabase Auth', 'M-Pesa API'],
            desc: 'A cross-platform mobile booking application for professional cleaning crews, managing schedules, notifications, and client balances in real time.',
            features: [
                'Dynamic booking calendar managing service frequencies (daily, weekly, monthly)',
                'Supabase Auth and real-time database syncing customer request queues',
                'Integrated M-Pesa merchant payment status screens',
                'Nairobi-wide geographic assignment module'
            ],
            linkText: 'Project Repository / In Progress',
            url: '#'
        },
        'kinetic-claims': {
            title: 'Kinetic Claims',
            status: 'In Progress',
            statusClass: 'status-inprogress',
            tech: ['React / Next.js', 'Supabase', 'API Design', 'File Storage'],
            desc: 'A high-performance claims management and automated verification portal designed to accelerate insurance workflows.',
            features: [
                'Optimized insurance claims verification workflow reducing administrative review time',
                'Supabase Storage document and invoice upload verification pipelines',
                'Role-based dashboard systems for policyholders, adjusters, and supervisors',
                'REST API backend communication optimizing database read/write speeds'
            ],
            linkText: 'In Progress',
            url: '#'
        }
    };

    // Open Modal function
    const openModal = (projectId) => {
        const data = projectsDetailData[projectId];
        if (!data) return;

        modalTitle.innerText = data.title;
        modalStatus.innerText = data.status;
        
        // Reset status classes and apply active one
        modalStatus.className = 'project-status ' + data.statusClass;
        
        // Populate tech tags
        modalTechList.innerHTML = '';
        data.tech.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.innerText = tag;
            modalTechList.appendChild(span);
        });

        modalDescription.innerText = data.desc;

        // Populate features list
        modalFeatures.innerHTML = '';
        data.features.forEach(feat => {
            const li = document.createElement('li');
            li.innerText = feat;
            modalFeatures.appendChild(li);
        });

        // Set live link
        if (data.url === '#') {
            modalLink.style.display = 'none';
        } else {
            modalLink.style.display = 'inline-flex';
            modalLink.href = data.url;
            modalLink.innerHTML = `${data.linkText} <span>↗</span>`;
        }

        // Activate overlay
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling underneath
    };

    // Attach click events to "View Details" buttons
    const viewDetailBtns = document.querySelectorAll('.project-more');
    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    // Close Modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // restore scrolling
    };

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // 6. Scroll Reveal Animation Engine (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // trigger animation once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 7. Clipboard copying for contact items
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const valToCopy = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(valToCopy).then(() => {
                const origText = btn.innerHTML;
                btn.innerHTML = '✓ Copied!';
                btn.style.color = '#10b981';
                setTimeout(() => {
                    btn.innerHTML = origText;
                    btn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // 8. Contact Form submission logic (FormSubmit AJAX Integration)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';

            const formData = {
                name: document.getElementById('form-name').value,
                email: document.getElementById('form-email').value,
                message: document.getElementById('form-msg').value
            };

            fetch('https://formsubmit.co/ajax/talakp39@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = '✓ Message Sent!';
                submitBtn.style.background = '#10b981';
                submitBtn.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.2)';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                    submitBtn.style.boxShadow = '';
                }, 3000);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                submitBtn.innerHTML = '✗ Error Sending';
                submitBtn.style.background = '#ef4444';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
            });
        });
    }
});
