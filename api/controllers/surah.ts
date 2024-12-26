import { Request, Response } from "express";
import User from "../models/user";

const saveProgress = async (req:Request, res:Response) => {
    const { decimalAccuracy, numWPM, surahHasSections, timeSpent, surahNameEng, surah_no, numVerses } = req.body;
    try {
        const uid: string = req.cookies.decoded_uid;
        const user = await User.findById({ _id: uid }).lean();

        if(!user!.surahs) {
            // if the user does not have an array called "surahs", add it
            if(!surahHasSections) {
                const existingSurah = await User.findOne({
                    _id: uid,
                    "surahs.chapterNo": surah_no 
                });

                // prevent duplicate data from being appended to the array
                if(!existingSurah) {
                    await User.updateOne({
                        _id: uid
                    }, {
                        $set: {
                            surahs: [{
                                uid,
                                chapterName: surahNameEng,
                                chapterNo: surah_no,
                                noVerses: numVerses,
                                wpm: numWPM,
                                accuracy: decimalAccuracy,
                                isCompleted: true,
                                timeSpent,
                                progress: 100.0,
                                completionStatus: "Completed"
                            }]
                        }
                    });
                } 
            }
        }
        // if the surahs array exists and the surah does NOT have sections
        else if(user!.surahs && !surahHasSections) {
            if(!surahHasSections) {
                await User.updateOne({
                    _id: uid
                }, {
                    surahs: [{
                        uid,
                        chapterName: surahNameEng,
                        chapterNo: surah_no,
                        noVerses: numVerses,
                        wpm: numWPM,
                        accuracy: decimalAccuracy,
                        isCompleted: true,
                        timeSpent,
                        progress: 100.0,
                        completionStatus: "Completed"
                    }]       
                });
            }
        }
    } catch (error) {
        console.log(
			"There was an error (surah.ts file, saveProgress function)",
			(error as Error).toString().red.bold
		);
    }

}

export { saveProgress };