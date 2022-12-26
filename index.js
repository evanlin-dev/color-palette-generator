document.addEventListener("keydown", function(event) {
    // Check if the "ctrl" and "v" keys are pressed
    if (event.ctrlKey && event.key === "v") {
        // The "ctrl+v" keypress has been detected
    }
});

function displayImage(){
    document.getElementById("image-input").addEventListener("change", function() {
        // Get the selected file
        var file = this.files[0];
        // Create a new FileReader object
        var reader = new FileReader();
        // Set the reader onload event to display the image
        reader.onload = function() {
            document.getElementById("display-file").innerHTML = "<img src='" + reader.result + "'>";
        };
        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    });
}

window.addEventListener("load", function() {
    document.getElementById("image-input").value = "";
});
window.addEventListener("load", displayImage);