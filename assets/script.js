
// Global variables
let currentStep = 1;
let totalSteps = 5;
let currentLanguage = 'en';
let translations = {};
let experienceCount = 0;
let educationCount = 0;
let languageCount = 0;
let skills = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadLanguage(currentLanguage);
    initializeTheme();
    initializeFormNavigation();
    initializeSkillsInput();
    initializeDynamicSections();
    loadFromLocalStorage();
    updateProgress();
    
    // Auto-save functionality
    const form = document.getElementById('resume-form');
    form.addEventListener('input', debounce(saveToLocalStorage, 500));
});

// Language Management
async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        translations = await response.json();
        currentLanguage = lang;
        updatePageLanguage();
    } catch (error) {
        console.error('Error loading language:', error);
        // Fallback to default language if loading fails
        if (lang !== 'en') {
            loadLanguage('en');
        }
    }
}

function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[key];
            } else {
                element.textContent = translations[key];
            }
        }
    });
    
    // Update placeholders
    updatePlaceholders();
}

function updatePlaceholders() {
    const placeholderElements = [
        { id: 'skills-input', key: 'skills_placeholder' },
        { selector: '[name*="[company]"]', key: 'company_placeholder' },
        { selector: '[name*="[title]"]', key: 'job_title_placeholder' },
        { selector: '[name*="[description]"]', key: 'description_placeholder' },
        { selector: '[name*="[school]"]', key: 'school_placeholder' },
        { selector: '[name*="[degree]"]', key: 'degree_placeholder' },
        { selector: '[name*="[language]"]', key: 'language_placeholder' }
    ];
    
    placeholderElements.forEach(item => {
        const elements = item.id ? 
            [document.getElementById(item.id)] : 
            document.querySelectorAll(item.selector);
        
        elements.forEach(element => {
            if (element && translations[item.key]) {
                element.placeholder = translations[item.key];
            }
        });
    });
}

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Form Navigation
function initializeFormNavigation() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const generateBtn = document.getElementById('generate-btn');
    
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    
    // Language selector
    const languageSelector = document.getElementById('language-selector');
    languageSelector.addEventListener('change', (e) => {
        loadLanguage(e.target.value);
    });
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
            updateNavigationButtons();
            
            if (currentStep === 5) {
                generatePreview();
            }
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
        updateNavigationButtons();
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(stepElement => {
        stepElement.classList.remove('active');
    });
    
    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${step}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update progress steps
    document.querySelectorAll('.progress-steps .step').forEach((stepElement, index) => {
        if (index + 1 <= step) {
            stepElement.classList.add('active');
        } else {
            stepElement.classList.remove('active');
        }
    });
}

function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const percentage = (currentStep / totalSteps) * 100;
    progressFill.style.width = percentage + '%';
}

function updateNavigationButtons() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const generateBtn = document.getElementById('generate-btn');
    
    // Show/hide previous button
    prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    
    // Show/hide next and generate buttons
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        generateBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        generateBtn.style.display = 'none';
    }
}

// Form Validation
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"].form-step`);
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--border-color)';
        }
    });
    
    if (!isValid) {
        showError(translations.fill_required_fields || 'Please fill in all required fields');
    }
    
    return isValid;
}

// Skills Management
function initializeSkillsInput() {
    const skillsInput = document.getElementById('skills-input');
    const skillsContainer = document.getElementById('skills-tags');
    const hiddenSkillsInput = document.getElementById('skills');
    
    skillsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const skill = this.value.trim();
            if (skill && !skills.includes(skill)) {
                addSkill(skill);
                this.value = '';
            }
        }
    });
    
    function addSkill(skill) {
        skills.push(skill);
        updateSkillsDisplay();
        updateHiddenSkillsInput();
    }
    
    function removeSkill(skill) {
        const index = skills.indexOf(skill);
        if (index > -1) {
            skills.splice(index, 1);
            updateSkillsDisplay();
            updateHiddenSkillsInput();
        }
    }
    
    function updateSkillsDisplay() {
        skillsContainer.innerHTML = '';
        skills.forEach(skill => {
            const tag = document.createElement('div');
            tag.className = 'skill-tag';
            tag.innerHTML = `
                ${skill}
                <span class="remove" onclick="removeSkillFromList('${skill}')">&times;</span>
            `;
            skillsContainer.appendChild(tag);
        });
    }
    
    function updateHiddenSkillsInput() {
        hiddenSkillsInput.value = JSON.stringify(skills);
    }
    
    // Make removeSkill available globally
    window.removeSkillFromList = removeSkill;
}

// Dynamic Sections Management
function initializeDynamicSections() {
    initializeExperienceSection();
    initializeEducationSection();
    initializeLanguageSection();
}

function initializeExperienceSection() {
    const addBtn = document.getElementById('add-experience');
    addBtn.addEventListener('click', addExperienceItem);
    experienceCount = 1; // We start with one item
}

function addExperienceItem() {
    const container = document.getElementById('experience-container');
    const newItem = document.createElement('div');
    newItem.className = 'experience-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label data-lang="company_name">Company Name</label>
                <input type="text" name="experience[${experienceCount}][company]" required>
            </div>
            <div class="form-group">
                <label data-lang="job_title">Job Title</label>
                <input type="text" name="experience[${experienceCount}][title]" required>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label data-lang="start_date">Start Date</label>
                <input type="month" name="experience[${experienceCount}][start_date]" required>
            </div>
            <div class="form-group">
                <label data-lang="end_date">End Date</label>
                <input type="month" name="experience[${experienceCount}][end_date]">
                <label class="checkbox-label">
                    <input type="checkbox" name="experience[${experienceCount}][current]"> 
                    <span data-lang="current_job">Current Job</span>
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label data-lang="job_description">Job Description</label>
            <textarea name="experience[${experienceCount}][description]" rows="3" required></textarea>
        </div>
        
        <button type="button" class="btn-secondary" onclick="removeExperienceItem(this)">
            <span data-lang="remove">Remove</span>
        </button>
    `;
    
    container.appendChild(newItem);
    experienceCount++;
    updatePageLanguage(); // Update translations for new elements
}

function initializeEducationSection() {
    const addBtn = document.getElementById('add-education');
    addBtn.addEventListener('click', addEducationItem);
    educationCount = 1; // We start with one item
}

function addEducationItem() {
    const container = document.getElementById('education-container');
    const newItem = document.createElement('div');
    newItem.className = 'education-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label data-lang="school_name">School/University</label>
                <input type="text" name="education[${educationCount}][school]" required>
            </div>
            <div class="form-group">
                <label data-lang="degree">Degree</label>
                <input type="text" name="education[${educationCount}][degree]" required>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label data-lang="start_date">Start Date</label>
                <input type="month" name="education[${educationCount}][start_date]" required>
            </div>
            <div class="form-group">
                <label data-lang="end_date">End Date</label>
                <input type="month" name="education[${educationCount}][end_date]" required>
            </div>
        </div>
        
        <div class="form-group">
            <label data-lang="education_description">Description</label>
            <textarea name="education[${educationCount}][description]" rows="2"></textarea>
        </div>
        
        <button type="button" class="btn-secondary" onclick="removeEducationItem(this)">
            <span data-lang="remove">Remove</span>
        </button>
    `;
    
    container.appendChild(newItem);
    educationCount++;
    updatePageLanguage(); // Update translations for new elements
}

function initializeLanguageSection() {
    const addBtn = document.getElementById('add-language');
    addBtn.addEventListener('click', addLanguageItem);
    languageCount = 1; // We start with one item
}

function addLanguageItem() {
    const container = document.getElementById('languages-container');
    const newItem = document.createElement('div');
    newItem.className = 'language-item';
    newItem.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <input type="text" name="languages[${languageCount}][language]" placeholder="Language" required>
            </div>
            <div class="form-group">
                <select name="languages[${languageCount}][proficiency]" required>
                    <option value="" data-lang="select_proficiency">Select Proficiency</option>
                    <option value="Beginner" data-lang="beginner">Beginner</option>
                    <option value="Intermediate" data-lang="intermediate">Intermediate</option>
                    <option value="Advanced" data-lang="advanced">Advanced</option>
                    <option value="Native" data-lang="native">Native</option>
                </select>
            </div>
        </div>
        
        <button type="button" class="btn-secondary" onclick="removeLanguageItem(this)">
            <span data-lang="remove">Remove</span>
        </button>
    `;
    
    container.appendChild(newItem);
    languageCount++;
    updatePageLanguage(); // Update translations for new elements
}

// Global functions for removing items
window.removeExperienceItem = function(button) {
    button.parentElement.remove();
};

window.removeEducationItem = function(button) {
    button.parentElement.remove();
};

window.removeLanguageItem = function(button) {
    button.parentElement.remove();
};

// Local Storage Management
function saveToLocalStorage() {
    const formData = new FormData(document.getElementById('resume-form'));
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add skills array
    data.skills = skills;
    data.currentStep = currentStep;
    data.currentLanguage = currentLanguage;
    
    localStorage.setItem('resumeBuilderData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Restore form fields
            Object.keys(data).forEach(key => {
                const element = document.querySelector(`[name="${key}"]`);
                if (element) {
                    element.value = data[key];
                }
            });
            
            // Restore skills
            if (data.skills) {
                skills = data.skills;
                updateSkillsDisplay();
            }
            
            // Restore current step and language
            if (data.currentStep) {
                currentStep = data.currentStep;
                showStep(currentStep);
                updateProgress();
                updateNavigationButtons();
            }
            
            if (data.currentLanguage) {
                document.getElementById('language-selector').value = data.currentLanguage;
                loadLanguage(data.currentLanguage);
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Preview Generation
function generatePreview() {
    const formData = new FormData(document.getElementById('resume-form'));
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    data.skills = skills;
    
    const previewContainer = document.getElementById('resume-preview');
    previewContainer.innerHTML = generateResumeHTML(data);
}

function generateResumeHTML(data) {
    return `
        <div class="resume-preview-content">
            <header class="resume-header">
                <h1>${data.full_name || ''}</h1>
                <h2>${data.professional_title || ''}</h2>
                <div class="contact-info">
                    <span>${data.email || ''}</span>
                    <span>${data.phone || ''}</span>
                    ${data.linkedin ? `<span>${data.linkedin}</span>` : ''}
                    ${data.website ? `<span>${data.website}</span>` : ''}
                </div>
            </header>
            
            <section class="resume-section">
                <h3>Professional Summary</h3>
                <p>${data.summary || ''}</p>
            </section>
            
            ${data.skills && data.skills.length ? `
            <section class="resume-section">
                <h3>Skills</h3>
                <div class="skills-list">
                    ${data.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
            </section>
            ` : ''}
            
            <section class="resume-section">
                <h3>Work Experience</h3>
                <div class="experience-list">
                    <!-- Experience items will be generated based on form data -->
                    <div class="experience-item">
                        <h4>Experience details will appear here</h4>
                    </div>
                </div>
            </section>
            
            <section class="resume-section">
                <h3>Education</h3>
                <div class="education-list">
                    <!-- Education items will be generated based on form data -->
                    <div class="education-item">
                        <h4>Education details will appear here</h4>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showError(message) {
    // Simple error display - can be enhanced with toast notifications
    alert(message);
}

function showSuccess(message) {
    // Simple success display - can be enhanced with toast notifications
    alert(message);
}

// Auto-detect browser language
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const supportedLanguages = ['en', 'pt-br', 'es', 'fr', 'ru'];
    
    // Check if browser language is supported
    if (supportedLanguages.includes(browserLang)) {
        return browserLang;
    }
    
    // Check for language code without region
    const langCode = browserLang.split('-')[0];
    if (supportedLanguages.includes(langCode)) {
        return langCode;
    }
    
    // Check for Portuguese variation
    if (browserLang.startsWith('pt')) {
        return 'pt-br';
    }
    
    // Default to English
    return 'en';
}

// Initialize with browser language detection
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('resumeBuilderLanguage');
    const defaultLanguage = savedLanguage || detectBrowserLanguage();
    
    document.getElementById('language-selector').value = defaultLanguage;
    loadLanguage(defaultLanguage);
});
