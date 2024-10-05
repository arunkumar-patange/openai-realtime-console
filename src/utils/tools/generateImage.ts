// src/utils/tools/generateImage.ts

export const generateImage = async (params: { prompt: string }) => {
    const { prompt } = params;
    try {
      const response = await fetch(
        `https://api-dev.braininc.net/be/lambda/function/stableai?json=true&prompt=${encodeURIComponent(prompt)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'token a1c8d8acedb03aa810aa9c4ff053b90e10ddc985', // Replace with your actual API token
            'Content-Type': 'application/json',
          },
        }
      );
  
      const data = await response.json();
  
      if (data && data.cdn_url) {
        return data.cdn_url; // Return the generated image URL
      } else {
        console.error('No image found in the response');
        throw new Error('No image found'); // Throw an error if no image is found
      }
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image'); // Throw an error on fetch failure
    }
  };
  
  // Tool metadata for generateImage
  export const generateImageTool = {
    name: 'generate_image',
    description: 'Generates an image based on a prompt.',
    parameters: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'The prompt for the image generation.',
        },
      },
      required: ['prompt'],
    },
  };