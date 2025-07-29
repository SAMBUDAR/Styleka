# PowerShell script to add dark mode toggle to all HTML files in Styleka project

# Get all HTML files in the directory
$htmlFiles = Get-ChildItem -Path "c:\Users\Bipasha\OneDrive\Desktop\vs codes\gssoc25\working\Styleka" -Filter "*.html" | Where-Object { $_.Name -notmatch "index|shop|about" }

Write-Host "Found $($htmlFiles.Count) HTML files to update (excluding already updated files)"

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Check if dark-mode.css is already included
    if ($content -notmatch 'dark-mode\.css') {
        # Add dark-mode.css link after Font Awesome CSS
        $content = $content -replace '(link rel="stylesheet" href="https://cdnjs\.cloudflare\.com/ajax/libs/font-awesome/6\.4\.2/css/all\.min\.css">)', '$1`r`n    <link rel="stylesheet" href="dark-mode.css">'
    }
    
    # Check if theme toggle button exists in header
    if ($content -notmatch 'theme-toggle') {
        # Find the header section and add theme toggle
        $headerPattern = '(<div id="mobile">[\s\S]*?</div>\s*</section>)'
        $replacement = '<div class="header-controls">`r`n            <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">`r`n                <i class="fas fa-moon" id="theme-icon"></i>`r`n            </button>`r`n            <div id="mobile">`r`n                <a href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a> `r`n                <i id="bar" class="fas fa-outdent"></i>`r`n            </div>`r`n        </div>`r`n    </section>'
        
        $content = $content -replace $headerPattern, $replacement
    }
    
    # Check if theme-manager.js is already included
    if ($content -notmatch 'theme-manager\.js') {
        # Add theme-manager.js before script.js
        $content = $content -replace '(<script src="script\.js"></script>)', '    <script src="theme-manager.js"></script>`r`n    $1'
    }
    
    # Write the updated content back to file
    $content | Set-Content $file.FullName -NoNewline
    
    Write-Host "Updated: $($file.Name)"
}

Write-Host "All HTML files have been updated with dark mode functionality!"
