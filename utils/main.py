import docx
import json
import re

def extract_data_from_docx(file_path):
    doc = docx.Document(file_path)
    data = []
    current_entry = {}
    text_content = ""
    
    for paragraph in doc.paragraphs:
        line = paragraph.text.strip()
        
        if line.startswith("link:"):
            if current_entry:
                current_entry["text"] = text_content.strip()
                data.append(current_entry)
                current_entry = {}
                text_content = ""
            current_entry["link"] = line.split("link:")[1].strip()
        elif line.startswith("Titulo:"):
            current_entry["title"] = line.split("Titulo:")[1].strip()
        elif line.startswith("Año:"):
            current_entry["year"] = line.split("Año:")[1].strip()
        elif line.startswith("Palabras clave:"):
            current_entry["keywords"] = line.split("Palabras clave:")[1].strip()
        elif line.startswith("Texto:") or line.startswith("texto:"):
            text_content = line.split("Texto:")[1].strip() + "\n"
        elif "*Fin texto*" in line:
            current_entry["text"] = text_content.strip()
            data.append(current_entry)
            current_entry = {}
            text_content = ""
        elif current_entry and "text" not in current_entry:
            text_content += line + "\n"
    
    # Add the last entry if it exists
    if current_entry:
        current_entry["text"] = text_content.strip()
        data.append(current_entry)
    
    return data

def save_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# Usage
input_file = "bibilio.docx"
output_file = "output.json"

extracted_data = extract_data_from_docx(input_file)
save_to_json(extracted_data, output_file)

print(f"Data has been extracted and saved to {output_file}")
