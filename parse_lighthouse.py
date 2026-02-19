
import json
import re
import sys

def parse_lighthouse_report(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'window.__LIGHTHOUSE_JSON__ =' not in content:
            print("Could not find Lighthouse JSON in the file.")
            return

        start_index = content.find('window.__LIGHTHOUSE_JSON__ =') + len('window.__LIGHTHOUSE_JSON__ =')
        end_index = content.find('</script>', start_index)
        
        if end_index == -1:
             # Fallback, maybe it's at the end of file
             end_index = len(content)
        
        json_content_raw = content[start_index:end_index].strip()
        # Remove trailing semicolon if present
        if json_content_raw.endswith(';'):
            json_content_raw = json_content_raw[:-1]
            
        data = json.loads(json_content_raw)

        print(f"Lighthouse Version: {data.get('lighthouseVersion')}")
        print(f"URL: {data.get('finalUrl')}")
        print("-" * 30)

        # Check audits
        audits = data.get('audits', {})
        categories = data.get('categories', {}) # Report items structure usually groups by category
        
        # If categories exist, we can show scores for PWA, Performance, Accessibility, etc.
        if categories:
             print("Category Scores:")
             for cat_id, cat_data in categories.items():
                 score = cat_data.get('score')
                 if score is not None:
                     print(f"  {cat_data.get('title')}: {int(score * 100)}")
             print("-" * 30)

        print("Failing Audits (Score < 0.9):")
        for audit_id, audit in audits.items():
            score = audit.get('score')
             # Score display mode: 'numeric', 'binary'
            if score is not None and score < 0.9:
                 print(f"[{audit_id}] {audit.get('title')} - Score: {score}")
                 # print(f"  Description: {audit.get('description')}")
                 display_value = audit.get('displayValue')
                 if display_value:
                     print(f"  Value: {display_value}")
                 
                 # Print failing items if any (e.g. unoptimized images)
                 details = audit.get('details')
                 if details and details.get('items'):
                     print(f"  Items ({len(details['items'])}):")
                     for item in details['items'][:5]: # Show first 5 items
                         # Try to print some useful info from item
                         print(f"    - {item}")
                 print("")

    except Exception as e:
        print(f"Error parsing file: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python parse_lighthouse.py <path_to_html_file>")
    else:
        parse_lighthouse_report(sys.argv[1])
