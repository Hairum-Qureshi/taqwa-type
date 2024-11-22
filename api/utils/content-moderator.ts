import dotenv from "dotenv";

dotenv.config();

const sightengine = require('sightengine')(process.env.SIGHTENGINE_KEY, process.env.SIGHTENGINE_API_SECRET);

export default async function isNSFW(image_path: string): Promise<boolean> {
    try {
        // Detect nudity, weapons, alcohol, drugs, and faces in an image
        const result = await sightengine
            .check(['nudity', 'type', 'properties', 'wad'])
            .set_url(image_path);

        // NSFW conditions
        const isNudityNSFW = result.nudity.safe < 0.85; // Adjust threshold as needed
        const isAlcoholNSFW = result.alcohol >= 1; // Threshold for alcohol detection
        const isWeaponNSFW = result.weapon >= 2; // Threshold for weapon detection

        // Return true if any condition flags the image as NSFW
        return isNudityNSFW || isAlcoholNSFW || isWeaponNSFW;
    } catch (error) {
        console.error('Error detecting NSFW content:', error);
        // Consider logging or handling the error appropriately
        return false; // Default to safe in case of an error
    }
}
