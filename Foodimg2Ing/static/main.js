const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector("#foodimage");
const imgform=document.querySelector("#foodimgform");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;

function defaultBtnActive(){
    const defaultBtn = document.getElementById("default-btn");
    defaultBtn.click();    
}

document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const defaultBtn = document.getElementById('default-btn');
    const uploadBtn = document.querySelector('.upload-btn');

    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        uploadArea.classList.add('highlight');
    }

    function unhighlight(e) {
        uploadArea.classList.remove('highlight');
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                defaultBtn.files = files;
                displayImage(file);
            } else {
                showError('Please upload an image file');
            }
        }
    }

    function displayImage(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.id = 'foodimage';
            img.alt = 'Uploaded food image';
            
            // Clear the upload area and add the new image
            const uploadArea = document.getElementById('uploadArea');
            uploadArea.innerHTML = '';
            uploadArea.appendChild(img);
            
            // Add fade-in animation
            img.classList.add('fade-in');
            
            // Show the process button
            const processContainer = document.querySelector('.process-button-container');
            if (processContainer) {
                processContainer.style.display = 'block';
                processContainer.classList.add('show');
            }
        }
        reader.readAsDataURL(file);
    }

    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message fade-in';
        errorDiv.textContent = message;
        
        uploadArea.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Handle click on upload area
    uploadArea.addEventListener('click', () => {
        defaultBtn.click();
    });

    // Handle file selection
    defaultBtn.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFiles(this.files);
        }
    });

    // Add loading state to upload button
    uploadBtn.addEventListener('click', function() {
        this.classList.add('loading');
        this.innerHTML = '<div class="loader"></div> Processing...';
    });
});

function myFunctab1() {
    document.getElementById("tab2").style.display = "none";
    document.getElementById("tab1").style.display = "block";
    document.getElementById("tabbtn2").className="nav-link"
    document.getElementById("tabbtn1").className="nav-link active"
    
    
}

function myFunctab2() {
    document.getElementById("tab1").style.display = "none";
    document.getElementById("tab2").style.display = "block";
    document.getElementById("tabbtn1").className="nav-link"
    document.getElementById("tabbtn2").className="nav-link active"
}

function select(filename){
    img.src = "/static/images/"+filename
    wrapper.classList.add("active");
    document.getElementById("info").style.display = "none";
    document.getElementById("loading").style.display = "block";
    document.getElementById("close").click()
}

function showSampleImages() {
    const modal = new bootstrap.Modal(document.getElementById('sampleImagesModal'));
    modal.show();
}

function selectSampleImage(filename) {
    const form = document.getElementById('foodimgform');
    const fileInput = document.getElementById('default-btn');
    
    // Create a new file input
    const newFileInput = document.createElement('input');
    newFileInput.type = 'file';
    newFileInput.name = 'imagefile';
    
    // Create a File object from the sample image
    fetch(`/static/images/demo_imgs/${filename}`)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], filename, { type: blob.type });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
            
            // Show the image
            const reader = new FileReader();
            reader.onload = function() {
                const result = reader.result;
                const uploadArea = document.getElementById("uploadArea");
                uploadArea.innerHTML = `<img id="foodimage" src="${result}" alt="Uploaded food image">`;
                
                // Show the process button
                const processContainer = document.querySelector('.process-button-container');
                if (processContainer) {
                    processContainer.style.display = 'block';
                    processContainer.classList.add('show');
                }
            }
            reader.readAsDataURL(file);
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('sampleImagesModal'));
            modal.hide();
        });
}

function processImage() {
    const form = document.getElementById('foodimgform');
    const processBtn = document.querySelector('.process-btn');
    const resultsColumn = document.querySelector('.results-column');
    
    // Disable the button and show loading state
    processBtn.disabled = true;
    processBtn.innerHTML = '<div class="loader"></div> Generating Recipe...';
    
    // Show loading state in results column
    if (resultsColumn) {
        resultsColumn.innerHTML = '<div class="text-center"><div class="loader"></div><p class="mt-3">Generating your recipe...</p></div>';
    }
    
    // Submit the form
    form.submit();
}

function displayResults(results) {
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper.classList.add('has-results');
    
    // Rest of your results display code
}

function resetForm() {
    // Clear the file input
    document.getElementById('default-btn').value = '';
    
    // Reset the upload area to show the placeholder
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <div class="upload-placeholder">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Drag & Drop or Click to Upload</p>
        </div>
    `;
    
    // Hide the process button
    const processContainer = document.querySelector('.process-button-container');
    if (processContainer) {
        processContainer.style.display = 'none';
        processContainer.classList.remove('show');
    }
    
    // Reset any active states
    uploadArea.classList.remove('active');
    uploadArea.classList.remove('highlight');
    
    // Clear the results section
    const resultsColumn = document.querySelector('.results-column');
    if (resultsColumn) {
        resultsColumn.innerHTML = '';
    }
    
    // Reset the form
    document.getElementById('foodimgform').reset();
}

    

