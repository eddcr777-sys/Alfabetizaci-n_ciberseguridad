import os
import glob

html_files = glob.glob('*.html')
for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'estilos-base.css' not in content:
        if '</head>' in content:
            parts = content.rsplit('</head>', 1)
            content = parts[0] + '    <link rel="stylesheet" href="estilos-base.css" />\n</head>' + parts[1]
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Added estilos-base.css to {file}")
