from flask import render_template, url_for, flash, redirect, request
from Foodimg2Ing import app
from Foodimg2Ing.output import output
import os

def get_sample_images():
    # Only look in demo_imgs directory
    demo_dir = os.path.join(app.root_path, 'static', 'images', 'demo_imgs')
    
    try:
        # Create demo_imgs directory if it doesn't exist
        os.makedirs(demo_dir, exist_ok=True)
        
        # Get images from demo_imgs directory
        demo_images = []
        for f in os.listdir(demo_dir):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                file_path = os.path.join(demo_dir, f)
                if os.path.getsize(file_path) > 0:  # Only include non-empty files
                    demo_images.append(f)
        
        print(f"Found images in demo_imgs: {demo_images}")  # Debug print
        return demo_images
    except Exception as e:
        print(f"Error reading sample images: {e}")  # Debug print
        return []

@app.route('/', methods=['GET'])
def home():
    sample_images = get_sample_images()
    print(f"Sample images being passed to template: {sample_images}")  # Debug print
    return render_template('layout.html', sample_images=sample_images)

@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html')

@app.route('/', methods=['POST', 'GET'])
def predict():
    imagefile = request.files['imagefile']
    if imagefile and imagefile.filename:
        # Create the directory if it doesn't exist
        upload_dir = os.path.join(app.root_path, 'static', 'images', 'demo_imgs')
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save the file with proper extension
        filename = imagefile.filename
        image_path = os.path.join(upload_dir, filename)
        imagefile.save(image_path)
        
        # Verify the file was saved and is readable
        if os.path.exists(image_path):
            try:
                img = "/images/demo_imgs/" + filename
                title, ingredients, recipe = output(image_path)
                sample_images = get_sample_images()  # Get sample images
                return render_template('predict.html', title=title, ingredients=ingredients, recipe=recipe, img=img, sample_images=sample_images)
            except Exception as e:
                print(f"Error processing image: {e}")
                sample_images = get_sample_images()  # Get sample images
                return render_template('home.html', error="Error processing image. Please try again.", sample_images=sample_images)
        else:
            sample_images = get_sample_images()  # Get sample images
            return render_template('home.html', error="Error saving image. Please try again.", sample_images=sample_images)
    sample_images = get_sample_images()  # Get sample images
    return render_template('home.html', error="No image selected.", sample_images=sample_images)

@app.route('/<samplefoodname>')
def predictsample(samplefoodname):
    imagefile = os.path.join(app.root_path, 'static', 'images', str(samplefoodname) + ".jpg")
    img = "/images/" + str(samplefoodname) + ".jpg"
    title, ingredients, recipe = output(imagefile)
    return render_template('predict.html', title=title, ingredients=ingredients, recipe=recipe, img=img)