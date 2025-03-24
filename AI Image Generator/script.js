document.getElementById('image-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const prompt = document.getElementById('prompt').value;
    const imageContainer = document.getElementById('generated-image');
  
    // Show a loading message or spinner
    imageContainer.src = '';
    imageContainer.alt = 'Loading...';
  
    try {
      // Stability AI API endpoint
      const apiKey = 'sk-2XOTIj910O6GRGALBHiFcl4TysijMSx1FPKXTSPArIOiagPd'; // Replace with your Stability AI API key
      const apiUrl = 'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: prompt, // User's input prompt
              weight: 1.0
            }
          ],
          cfg_scale: 7, // Creativity vs. prompt adherence
          height: 512, // Image height
          width: 512, // Image width
          steps: 30, // Number of diffusion steps
          samples: 1 // Number of images to generate
        })
      });
  
      if (!response.ok) {
        throw new Error(`Failed to generate image: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Extract the base64 image data from the response
      const imageData = data.artifacts[0].base64;
  
      // Display the generated image
      imageContainer.src = `data:image/png;base64,${imageData}`;
      imageContainer.alt = 'Generated Image';
    } catch (error) {
      console.error('Error:', error);
      imageContainer.alt = 'Error generating image';
    }
  });