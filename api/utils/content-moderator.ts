import dotenv from "dotenv";
import path from "path";

dotenv.config();

const sightengine = require("sightengine")(process.env.SIGHTENGINE_KEY, process.env.SIGHTENGINE_API_SECRET);

export default async function isNSFW(image_src: string): Promise<boolean> {
    try {
        let result;

        // Check if the image is a local file or a URL
        if (path.isAbsolute(image_src)) {
            // For local files
            result = await sightengine.check(['nudity', 'type', 'properties', 'wad']).set_file(image_src);
        } else {
            // For URLs
            result = await sightengine.check(['nudity', 'type', 'properties', 'wad']).set_url(image_src);
        }

        // NSFW conditions
        const isNudityNSFW = result.nudity.safe < 0.85; // Adjust threshold as needed
        const isAlcoholNSFW = result.alcohol >= 1; // Threshold for alcohol detection
        const isWeaponNSFW = result.weapon >= 2; // Threshold for weapon detection

        // Return true if any condition flags the image as NSFW
        return isNudityNSFW || isAlcoholNSFW || isWeaponNSFW;
    } catch (error) {
        console.error("Error detecting NSFW content:", error);
        // Default to safe in case of an error
        return false;
    }
}
