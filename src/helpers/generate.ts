import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export const generateImage = async (imageUrl: string, prompt: string) => {
  try {
    const output = await replicate.run(
      "stability-ai/stable-diffusion", // modelo que estás utilizando
      {
        input: {
          image: imageUrl, // la URL de la imagen subida
          prompt: prompt, // el prompt con la transformación que deseas
        },
      }
    );
    return output;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Error generating image");
  }
};