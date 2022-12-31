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
        // Create an image element
        var image = new Image();
        // Set the reader onload event to display the image
        reader.onload = function() {
            document.getElementById("display-file").innerHTML = "<img src='" + reader.result + "'>";
            image.src = reader.result;
            // Set the 'onload' event handler for the image
            image.onload = function() {
                // Create a canvas element
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // Set the dimensions of the canvas to match the image
                canvas.width = image.width;
                canvas.height = image.height;
                // Draw the image onto the canvas
                ctx.drawImage(image, 0, 0);
                // Get the image data
                var imageData = ctx.getImageData(0, 0, image.width, image.height);
                // The image data is stored in the 'data' property of the ImageData object
                var pixelData = imageData.data;
                // Create an empty array to store the colors
                var colors = [];
                var chunkSize = 512;
                // Iterate through the pixel data
                for (var i = 0; i < pixelData.length; i += chunkSize) {
                    // Initialize arrays for the values of the red, green, blue, and alpha channels
                    var redValues = [];
                    var greenValues = [];
                    var blueValues = [];
                    var alphaValues = [];
                    // Iterate through the pixels in the current chunk
                    for (var j = 0; j < chunkSize; j += 4) {
                    // Add the values of the red, green, blue, and alpha channels to the corresponding arrays
                    redValues.push(pixelData[i + j]);
                    greenValues.push(pixelData[i + j + 1]);
                    blueValues.push(pixelData[i + j + 2]);
                    alphaValues.push(pixelData[i + j + 3]);
                    }
                    // Sort the values of the red, green, blue, and alpha channels
                    redValues.sort((a, b) => a - b);
                    greenValues.sort((a, b) => a - b);
                    blueValues.sort((a, b) => a - b);
                    alphaValues.sort((a, b) => a - b);
                    // Select the middle value of the red, green, blue, and alpha channels
                    var medianR = redValues[Math.floor(redValues.length / 2)];
                    var medianG = greenValues[Math.floor(greenValues.length / 2)];
                    var medianB = blueValues[Math.floor(blueValues.length / 2)];
                    var medianA = alphaValues[Math.floor(alphaValues.length / 2)];
                    // Create a color object for the current chunk
                    var color = { r: medianR, g: medianG, b: medianB, a: medianA };
                    // Add the color to the colors array
                    colors.push(color);
                }
                document.getElementById("div-continuous").innerHTML = ``;
                colorPalette(colors);
            };
        };
        // Read the selected file as a data URL
        reader.readAsDataURL(file);
    });
}

function colorPalette(colors){
    // create svg element
    var svg = d3
        .select("#div-continuous")
        .append("svg")
        .attr("width", 800)
        .attr("height", 400);
    // Create a color scale based on the colors in the pixel data
    var colorScale = d3
        .scaleQuantize()
        .domain([0, colors.length])
        .range(colors.map(color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`));
    // Create a data array of the same length as the pixel data
    var data = Array(colors.length).fill().map((_, i) => i);
    
    svg.selectAll(".firstrow")
        .data(data)
        .enter()
        .append("rect")
        .style("border", "1px solid black")
        .attr("x", function(d, i) {
            return 30 + i * 55;
        }) // Set the x position of the rectangle based on the width of the rectangle
        .attr("y", 50)  // Set the y position of the rectangle
        .attr("width", 55)  // Set the width of the rectangle
        .attr("height", 55)  // Set the height of the rectangle
        .attr("fill", function(d) {
            return colorScale(d);
        }); // Set the fill color of the rectangle
}

window.addEventListener("load", function() {
    document.getElementById("image-input").value = "";
});

window.addEventListener("load", displayImage);