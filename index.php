
<?php
session_start();

// Handle form submission
if ($_POST && isset($_POST['action']) && $_POST['action'] === 'generate_resume') {
    // Store form data in session for PDF generation
    $_SESSION['resume_data'] = $_POST;
    
    // Redirect to PDF generation
    if (isset($_POST['template'])) {
        header("Location: pdf/generate.php?template=" . $_POST['template']);
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="en" id="html-root">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Resume Builder</title>
    <link rel="stylesheet" href="assets/style.css">
    <link rel="stylesheet" href="assets/dark-mode.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <h1 class="logo" data-lang="app_title">Smart Resume Builder</h1>
                <div class="header-controls">
                    <!-- Language Selector -->
                    <select id="language-selector" class="language-selector">
                        <option value="en">English</option>
                        <option value="pt-br">Português</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="ru">Русский</option>
                    </select>
                    
                    <!-- Theme Toggle -->
                    <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
                        <span class="theme-icon">🌙</span>
                    </button>
                </div>
            </div>
        </header>

        <!-- Progress Bar -->
        <div class="progress-container">
            <div class="progress-bar">
                <div class="progress-fill" id="progress-fill"></div>
            </div>
            <div class="progress-steps">
                <div class="step active" data-step="1">
                    <span data-lang="step_personal">Personal</span>
                </div>
                <div class="step" data-step="2">
                    <span data-lang="step_experience">Experience</span>
                </div>
                <div class="step" data-step="3">
                    <span data-lang="step_education">Education</span>
                </div>
                <div class="step" data-step="4">
                    <span data-lang="step_skills">Skills</span>
                </div>
                <div class="step" data-step="5">
                    <span data-lang="step_preview">Preview</span>
                </div>
            </div>
        </div>

        <!-- Main Form -->
        <main class="main-content">
            <form id="resume-form" method="POST" action="">
                <input type="hidden" name="action" value="generate_resume">
                
                <!-- Step 1: Personal Information -->
                <div class="form-step active" data-step="1">
                    <h2 data-lang="personal_info">Personal Information</h2>
                    
                    <div class="form-group">
                        <label for="full_name" data-lang="full_name">Full Name</label>
                        <input type="text" id="full_name" name="full_name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="professional_title" data-lang="professional_title">Professional Title</label>
                        <input type="text" id="professional_title" name="professional_title" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="summary" data-lang="summary">Professional Summary</label>
                        <textarea id="summary" name="summary" rows="4" required></textarea>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email" data-lang="email">Email</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone" data-lang="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="linkedin" data-lang="linkedin">LinkedIn</label>
                            <input type="url" id="linkedin" name="linkedin">
                        </div>
                        <div class="form-group">
                            <label for="website" data-lang="website">Website/Portfolio</label>
                            <input type="url" id="website" name="website">
                        </div>
                    </div>
                </div>

                <!-- Step 2: Work Experience -->
                <div class="form-step" data-step="2">
                    <h2 data-lang="work_experience">Work Experience</h2>
                    
                    <div id="experience-container">
                        <div class="experience-item">
                            <div class="form-row">
                                <div class="form-group">
                                    <label data-lang="company_name">Company Name</label>
                                    <input type="text" name="experience[0][company]" required>
                                </div>
                                <div class="form-group">
                                    <label data-lang="job_title">Job Title</label>
                                    <input type="text" name="experience[0][title]" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label data-lang="start_date">Start Date</label>
                                    <input type="month" name="experience[0][start_date]" required>
                                </div>
                                <div class="form-group">
                                    <label data-lang="end_date">End Date</label>
                                    <input type="month" name="experience[0][end_date]">
                                    <label class="checkbox-label">
                                        <input type="checkbox" name="experience[0][current]"> 
                                        <span data-lang="current_job">Current Job</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label data-lang="job_description">Job Description</label>
                                <textarea name="experience[0][description]" rows="3" required></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <button type="button" id="add-experience" class="btn-secondary">
                        <span data-lang="add_experience">+ Add Experience</span>
                    </button>
                </div>

                <!-- Step 3: Education -->
                <div class="form-step" data-step="3">
                    <h2 data-lang="education">Education</h2>
                    
                    <div id="education-container">
                        <div class="education-item">
                            <div class="form-row">
                                <div class="form-group">
                                    <label data-lang="school_name">School/University</label>
                                    <input type="text" name="education[0][school]" required>
                                </div>
                                <div class="form-group">
                                    <label data-lang="degree">Degree</label>
                                    <input type="text" name="education[0][degree]" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label data-lang="start_date">Start Date</label>
                                    <input type="month" name="education[0][start_date]" required>
                                </div>
                                <div class="form-group">
                                    <label data-lang="end_date">End Date</label>
                                    <input type="month" name="education[0][end_date]" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label data-lang="education_description">Description</label>
                                <textarea name="education[0][description]" rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <button type="button" id="add-education" class="btn-secondary">
                        <span data-lang="add_education">+ Add Education</span>
                    </button>
                </div>

                <!-- Step 4: Skills & Languages -->
                <div class="form-step" data-step="4">
                    <h2 data-lang="skills_languages">Skills & Languages</h2>
                    
                    <div class="form-group">
                        <label for="skills" data-lang="skills">Skills</label>
                        <div class="skills-input-container">
                            <input type="text" id="skills-input" placeholder="Type a skill and press Enter">
                            <div id="skills-tags" class="skills-tags"></div>
                            <input type="hidden" id="skills" name="skills">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label data-lang="languages_spoken">Languages Spoken</label>
                        <div id="languages-container">
                            <div class="language-item">
                                <div class="form-row">
                                    <div class="form-group">
                                        <input type="text" name="languages[0][language]" placeholder="Language" required>
                                    </div>
                                    <div class="form-group">
                                        <select name="languages[0][proficiency]" required>
                                            <option value="" data-lang="select_proficiency">Select Proficiency</option>
                                            <option value="Beginner" data-lang="beginner">Beginner</option>
                                            <option value="Intermediate" data-lang="intermediate">Intermediate</option>
                                            <option value="Advanced" data-lang="advanced">Advanced</option>
                                            <option value="Native" data-lang="native">Native</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button type="button" id="add-language" class="btn-secondary">
                            <span data-lang="add_language">+ Add Language</span>
                        </button>
                    </div>
                    
                    <div class="form-group">
                        <label for="certifications" data-lang="certifications">Certifications (Optional)</label>
                        <textarea id="certifications" name="certifications" rows="3" placeholder="List your certifications, one per line"></textarea>
                    </div>
                </div>

                <!-- Step 5: Preview & Generate -->
                <div class="form-step" data-step="5">
                    <h2 data-lang="preview_generate">Preview & Generate</h2>
                    
                    <div class="template-selection">
                        <h3 data-lang="choose_template">Choose Template</h3>
                        <div class="template-options">
                            <label class="template-option">
                                <input type="radio" name="template" value="modern" checked>
                                <div class="template-preview">
                                    <div class="template-name" data-lang="modern_template">Modern</div>
                                </div>
                            </label>
                            <label class="template-option">
                                <input type="radio" name="template" value="classic">
                                <div class="template-preview">
                                    <div class="template-name" data-lang="classic_template">Classic</div>
                                </div>
                            </label>
                            <label class="template-option">
                                <input type="radio" name="template" value="minimal">
                                <div class="template-preview">
                                    <div class="template-name" data-lang="minimal_template">Minimal</div>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <div class="resume-preview" id="resume-preview">
                        <!-- Preview will be generated here -->
                    </div>
                </div>

                <!-- Navigation Buttons -->
                <div class="form-navigation">
                    <button type="button" id="prev-btn" class="btn-secondary" style="display: none;">
                        <span data-lang="previous">Previous</span>
                    </button>
                    <button type="button" id="next-btn" class="btn-primary">
                        <span data-lang="next">Next</span>
                    </button>
                    <button type="submit" id="generate-btn" class="btn-primary" style="display: none;">
                        <span data-lang="generate_pdf">Generate PDF</span>
                    </button>
                </div>
            </form>
        </main>
    </div>

    <script src="assets/script.js"></script>
</body>
</html>
