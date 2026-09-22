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
        skills: 'Technical Skills:\n  - Frontend & Mobile: Flutter, Dart, iOS, Next.js, React.js, JavaScript, WordPress\n  - Backend/DB: Python, SQL, REST APIs, Supabase, Firebase\n  - Integrations: M-Pesa Daraja API, FinTech Security, Vercel, Stripe\n  - Tools: Xcode, Android Studio, GitHub Copilot, OpenAI API, Asana, Jira',
        projects: 'Highlighted Projects:\n  - Zenka Loan App iOS (Contract Shipped) - Flutter FinTech app with Android parity\n  - Kinetic Claims (Launching Nov 2026) - Insurance claims management platform\n  - Saikan Cleaning App (Launching Jan 2027) - Flutter booking application\n  - dplfestive.com (Active Maintenance) - Events platform\n  - afriqueexplorer.com (Active Maintenance) - Supabase travel platform\n  Run command "projects" or click on the Portfolio section below to see details!',
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
        'zenka-loan-app': {
            title: 'Zenka Loan App (iOS)',
            status: 'Completed (Contract Handover)',
            statusClass: 'status-completed',
            tech: ['Flutter', 'Dart', 'iOS', 'RESTful APIs', 'FinTech Security', 'M-Pesa API', 'Android Parity', 'Knowledge Transfer'],
            desc: 'Contracted to develop the official Zenka Loan application for iOS from A to Z using Flutter, achieving 100% feature and workflow parity with their flagship Android application. Conducted comprehensive technical training and documentation for the internal team taking over.',
            features: [
                'Architected and engineered the iOS app using Flutter from scratch to production with 100% Android feature parity',
                'Built end-to-end loan application lifecycle: loan amount calculators, KYC validation, credit evaluation, and instant disbursement',
                'Integrated secure Safaricom M-Pesa Daraja repayment APIs with automated callback verification and balance reconciliation',
                'Implemented bank-grade client security, biometrics (Face ID / Touch ID), encrypted token management, and secure API handshakes',
                'Conducted structured knowledge-transfer sessions, code walkthroughs, and technical documentation to train the internal engineering team'
            ],
            linkText: 'Contract Handover Complete',
            url: '#'
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
        'saikan-cleaning': {
            title: 'Saikan Cleaning Services App',
            status: 'Launching January 2027',
            statusClass: 'status-upcoming',
            tech: ['Flutter (iOS/Android)', 'Supabase DB', 'Supabase Auth', 'M-Pesa API'],
            desc: 'A cross-platform mobile booking application for professional cleaning crews, managing schedules, notifications, and client balances in real time. Official release scheduled for January 2027.',
            features: [
                'Dynamic booking calendar managing service frequencies (daily, weekly, monthly)',
                'Supabase Auth and real-time database syncing customer request queues',
                'Integrated M-Pesa merchant payment status screens',
                'Nairobi-wide geographic assignment module',
                'Production deployment and app store rollout launching January 2027'
            ],
            linkText: 'Launching January 2027',
            url: '#'
        },
        'kinetic-claims': {
            title: 'Kinetic Claims',
            status: 'Launching November 2026',
            statusClass: 'status-upcoming',
            tech: ['Flutter / Web', 'Supabase', 'API Design', 'Document Verification'],
            desc: 'A high-performance claims management and automated verification portal designed to accelerate insurance workflows. Scheduled for official launch in November 2026.',
            features: [
                'Optimized insurance claims verification workflow reducing administrative review time',
                'Supabase Storage document and invoice upload verification pipelines',
                'Role-based dashboard systems for policyholders, adjusters, and supervisors',
                'REST API backend communication optimizing database read/write speeds',
                'Scheduled for production launch and client onboarding in November 2026'
            ],
            linkText: 'Launching November 2026',
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
                const checkIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                btn.innerHTML = `${checkIcon} Copied!`;
                btn.style.color = '#059669';
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
                const checkIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:6px;"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                submitBtn.innerHTML = `${checkIcon} Message Sent!`;
                submitBtn.style.background = '#059669';
                submitBtn.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.25)';
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
                const errorIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-right:6px;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
                submitBtn.innerHTML = `${errorIcon} Error Sending`;
                submitBtn.style.background = '#dc2626';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
            });
        });
    }
});
