let image = new Image();
let imageLoaded = false;   // ✅ important flag

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Get sliders
let brightnessSlider = document.getElementById("brightnessSlider");
let contrastSlider   = document.getElementById("contrastSlider");
let grayscaleSlider  = document.getElementById("grayscaleSlider");
let saturationSlider = document.getElementById("saturationSlider");
let sepiaSlider      = document.getElementById("sepiaSlider");
let hueRotateSlider  = document.getElementById("hueRotateSlider");

// Upload image
function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;              // ✅ prevents crash

    image.src = URL.createObjectURL(file);
    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        imageLoaded = true;
        applyFilter();
    };
}

// Apply filters
function applyFilter() {
    if (!imageLoaded) return;        // ✅ prevents error

    ctx.filter = `
        brightness(${brightnessSlider.value}%)
        contrast(${contrastSlider.value}%)
        grayscale(${grayscaleSlider.value}%)
        saturate(${saturationSlider.value}%)
        sepia(${sepiaSlider.value}%)
        hue-rotate(${hueRotateSlider.value}deg)
    `;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

// Reset image to defaults
function resetImage() {
    if (!imageLoaded) return;

    brightnessSlider.value = 100;
    contrastSlider.value   = 100;
    grayscaleSlider.value  = 0;
    saturationSlider.value = 100;
    sepiaSlider.value      = 0;
    hueRotateSlider.value  = 0;
    applyFilter();
}

// Save edited image
function saveImage() {
    if (!imageLoaded) return;

    let link = document.createElement("a");
    link.download = "edited_image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}




const sliders = document.querySelectorAll('input[type="range"]');

sliders.forEach(slider => {
    updateSliderColor(slider);

    slider.addEventListener("input", () => {
        updateSliderColor(slider);
        applyFilter(); // already exists in your project
    });
});

function updateSliderColor(slider) {
    const value = slider.value;
    const max = slider.max;
    const percent = (value / max) * 100;

    let color;

    /* Grading logic */
    if (percent < 40) {
        color = "#00c6ff";   // Blue
    } else if (percent < 70) {
        color = "#fbd786";   // Yellow
    } else {
        color = "#ff512f";   // Red
    }

    slider.style.background = `
        linear-gradient(
            to right,
            ${color} ${percent}%,
            #ddd ${percent}%
        )
    `;
}


