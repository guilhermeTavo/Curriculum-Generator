
<?php
session_start();
require_once '../vendor/autoload.php'; // Assuming Composer is used for dependencies

use Dompdf\Dompdf;
use Dompdf\Options;

if (!isset($_SESSION['resume_data'])) {
    header('Location: ../index.php');
    exit;
}

$resumeData = $_SESSION['resume_data'];
$template = $_GET['template'] ?? 'modern';
$theme = $_GET['theme'] ?? 'light';

// Generate HTML for PDF
$htmlContent = generateResumeHTML($resumeData, $template, $theme);

// Configure Dompdf
$options = new Options();
$options->set('defaultFont', 'DejaVu Sans');
$options->set('isRemoteEnabled', true);
$options->set('isHtml5ParserEnabled', true);

$dompdf = new Dompdf($options);
$dompdf->loadHtml($htmlContent);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();

// Output PDF
$filename = 'resume_' . date('Y-m-d_H-i-s') . '.pdf';
$dompdf->stream($filename, array('Attachment' => true));

function generateResumeHTML($data, $template, $theme) {
    $themeClass = $theme === 'dark' ? 'dark-theme' : 'light-theme';
    
    $html = '<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Resume - ' . htmlspecialchars($data['full_name'] ?? '') . '</title>
        <style>' . getResumeCSS($template, $theme) . '</style>
    </head>
    <body class="' . $themeClass . '">
        <div class="resume-container">';
    
    switch ($template) {
        case 'modern':
            $html .= generateModernTemplate($data);
            break;
        case 'classic':
            $html .= generateClassicTemplate($data);
            break;
        case 'minimal':
            $html .= generateMinimalTemplate($data);
            break;
        default:
            $html .= generateModernTemplate($data);
    }
    
    $html .= '</div></body></html>';
    
    return $html;
}

function getResumeCSS($template, $theme) {
    $baseCSS = '
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: "DejaVu Sans", Arial, sans-serif;
            line-height: 1.6;
            font-size: 12px;
        }
        
        .light-theme {
            background-color: #ffffff;
            color: #1e293b;
        }
        
        .dark-theme {
            background-color: #1e293b;
            color: #f1f5f9;
        }
        
        .resume-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
        }
        
        .resume-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 20px;
        }
        
        .resume-header h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #2563eb;
        }
        
        .resume-header h2 {
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 15px;
            color: #64748b;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 11px;
        }
        
        .resume-section {
            margin-bottom: 25px;
        }
        
        .resume-section h3 {
            font-size: 16px;
            font-weight: bold;
            color: #2563eb;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        
        .experience-item,
        .education-item {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        
        .item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 5px;
        }
        
        .item-title {
            font-weight: bold;
            font-size: 13px;
        }
        
        .item-company {
            font-weight: normal;
            color: #64748b;
            font-size: 12px;
        }
        
        .item-date {
            font-size: 11px;
            color: #64748b;
        }
        
        .item-description {
            font-size: 11px;
            line-height: 1.5;
            margin-top: 5px;
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .skill-item {
            background-color: #2563eb;
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 10px;
        }
        
        .languages-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
        
        .language-item {
            font-size: 11px;
        }
        
        .language-name {
            font-weight: bold;
        }
        
        .proficiency {
            color: #64748b;
        }
    ';
    
    if ($theme === 'dark') {
        $baseCSS .= '
            .dark-theme .skill-item {
                background-color: #3b82f6;
            }
            
            .dark-theme .resume-section h3 {
                color: #3b82f6;
                border-bottom-color: #334155;
            }
            
            .dark-theme .resume-header {
                border-bottom-color: #3b82f6;
            }
            
            .dark-theme .resume-header h1 {
                color: #3b82f6;
            }
        ';
    }
    
    return $baseCSS;
}

function generateModernTemplate($data) {
    $html = '<div class="resume-header">
        <h1>' . htmlspecialchars($data['full_name'] ?? '') . '</h1>
        <h2>' . htmlspecialchars($data['professional_title'] ?? '') . '</h2>
        <div class="contact-info">';
    
    if (!empty($data['email'])) {
        $html .= '<span>' . htmlspecialchars($data['email']) . '</span>';
    }
    if (!empty($data['phone'])) {
        $html .= '<span>' . htmlspecialchars($data['phone']) . '</span>';
    }
    if (!empty($data['linkedin'])) {
        $html .= '<span>' . htmlspecialchars($data['linkedin']) . '</span>';
    }
    if (!empty($data['website'])) {
        $html .= '<span>' . htmlspecialchars($data['website']) . '</span>';
    }
    
    $html .= '</div></div>';
    
    // Professional Summary
    if (!empty($data['summary'])) {
        $html .= '<div class="resume-section">
            <h3>Professional Summary</h3>
            <p>' . nl2br(htmlspecialchars($data['summary'])) . '</p>
        </div>';
    }
    
    // Skills
    if (!empty($data['skills'])) {
        $skills = json_decode($data['skills'], true);
        if ($skills && is_array($skills)) {
            $html .= '<div class="resume-section">
                <h3>Skills</h3>
                <div class="skills-list">';
            foreach ($skills as $skill) {
                $html .= '<span class="skill-item">' . htmlspecialchars($skill) . '</span>';
            }
            $html .= '</div></div>';
        }
    }
    
    // Work Experience
    $html .= '<div class="resume-section">
        <h3>Work Experience</h3>';
    
    // Process experience data (simplified for this example)
    $html .= '<div class="experience-item">
        <div class="item-header">
            <div>
                <div class="item-title">' . htmlspecialchars($data['experience[0][title]'] ?? 'Position Title') . '</div>
                <div class="item-company">' . htmlspecialchars($data['experience[0][company]'] ?? 'Company Name') . '</div>
            </div>
            <div class="item-date">' . formatDate($data['experience[0][start_date]'] ?? '') . ' - ' . formatDate($data['experience[0][end_date]'] ?? 'Present') . '</div>
        </div>
        <div class="item-description">' . nl2br(htmlspecialchars($data['experience[0][description]'] ?? '')) . '</div>
    </div>';
    
    $html .= '</div>';
    
    // Education
    $html .= '<div class="resume-section">
        <h3>Education</h3>';
    
    $html .= '<div class="education-item">
        <div class="item-header">
            <div>
                <div class="item-title">' . htmlspecialchars($data['education[0][degree]'] ?? 'Degree') . '</div>
                <div class="item-company">' . htmlspecialchars($data['education[0][school]'] ?? 'School Name') . '</div>
            </div>
            <div class="item-date">' . formatDate($data['education[0][start_date]'] ?? '') . ' - ' . formatDate($data['education[0][end_date]'] ?? '') . '</div>
        </div>';
    
    if (!empty($data['education[0][description]'])) {
        $html .= '<div class="item-description">' . nl2br(htmlspecialchars($data['education[0][description]'])) . '</div>';
    }
    
    $html .= '</div></div>';
    
    // Languages
    $html .= '<div class="resume-section">
        <h3>Languages</h3>
        <div class="languages-list">';
    
    if (!empty($data['languages[0][language]'])) {
        $html .= '<div class="language-item">
            <span class="language-name">' . htmlspecialchars($data['languages[0][language]']) . '</span> - 
            <span class="proficiency">' . htmlspecialchars($data['languages[0][proficiency]'] ?? '') . '</span>
        </div>';
    }
    
    $html .= '</div></div>';
    
    // Certifications
    if (!empty($data['certifications'])) {
        $html .= '<div class="resume-section">
            <h3>Certifications</h3>
            <p>' . nl2br(htmlspecialchars($data['certifications'])) . '</p>
        </div>';
    }
    
    return $html;
}

function generateClassicTemplate($data) {
    // Similar structure but with classic styling
    return generateModernTemplate($data);
}

function generateMinimalTemplate($data) {
    // Similar structure but with minimal styling
    return generateModernTemplate($data);
}

function formatDate($date) {
    if (empty($date)) return '';
    
    $timestamp = strtotime($date);
    if ($timestamp === false) return $date;
    
    return date('M Y', $timestamp);
}
?>
