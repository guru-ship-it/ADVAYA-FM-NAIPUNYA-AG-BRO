import os
import fitz  # PyMuPDF
from PIL import Image

def convert_pdf_to_webp(pdf_path, output_folder, prefix):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    print(f"Converting {pdf_path}...")
    try:
        # Open PDF document
        doc = fitz.open(pdf_path)
        
        for i in range(len(doc)):
            page = doc.load_page(i)
            # Higher resolution for better quality (zoom factor 2)
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            
            # Convert pixmap to PIL Image
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            
            # Define output path
            output_filename = f"{prefix}_p{i+1}.webp"
            output_path = os.path.join(output_folder, output_filename)
            
            # Save as WebP with optimization
            img.save(output_path, "WEBP", quality=80, method=6)
            print(f"  Saved: {output_filename}")
        
        doc.close()
            
    except Exception as e:
        print(f"Error converting {pdf_path}: {e}")

if __name__ == "__main__":
    downloads = r"C:\Users\gurup\Downloads"
    output_base = r"d:\ADVAYA_FM_ELITE\app\assets\webxr\temp_storybooks"
    
    # Mapping based on Master Manifest
    pdf_mapping = {
        "Foundations.pdf": "m1",
        "The Driver of the Virtual Cabin.pdf": "m2",
        "The Steering Wheel of Respect.pdf": "m3",
        "Vajra Guard.pdf": "m4",
        "The Three-Second Shield.pdf": "m5",
        "Defensive II.pdf": "m6",
        "Night Watch.pdf": "m7",
        "First Guard.pdf": "m8"
    }

    for pdf_name, prefix in pdf_mapping.items():
        pdf_path = os.path.join(downloads, pdf_name)
        if os.path.exists(pdf_path):
            convert_pdf_to_webp(pdf_path, output_base, prefix)
        else:
            print(f"Warning: {pdf_name} not found in Downloads.")

    print("Conversion complete.")
