import { Request, Response } from "express";
import User from "../models/user";
import { IUser } from "../interfaces";

async function updateUserData(
	uid: string,
	surahNameEng: string,
	surah_no: number,
	numVerses: number,
	numWPM: number,
	decimalAccuracy: number,
	timeSpent: string
) {
	await User.updateOne(
		{
			_id: uid
		},
		{
			$push: {
				surahs: [
					{
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
					}
				]
			},
			$inc: {
				totalSurahsCompleted: 1
			}
		}
	);
}

async function updateUserStats(uid: string, user: IUser) {
	// ! The code for this *might* not work for the surahs that have sections involved

	const [getTotal] = await User.aggregate([
		{ $match: { _id: uid } }, // Match the document
		{
			$project: {
				totalWPM: { $sum: "$surahs.wpm" } // Sum up the wpm values
			}
		}
	]);

	const [getTotalAccuracy] = await User.aggregate([
		{
			$match: { _id: uid }
		},
		{
			$unwind: "$surahs"
		},
		{
			$group: {
				_id: null,
				totalAccuracy: {
					$sum: {
						$toDecimal: "$surahs.accuracy" // Convert Decimal128 to a number for summing
					}
				}
			}
		}
	]);

	const totalWPM = getTotal.totalWPM;
	const totalAccuracy = getTotalAccuracy.totalAccuracy;

	await User.updateOne(
		{ _id: uid },
		{
			$set: {
				wordsPerMinute: totalWPM / (user.totalSurahsCompleted + 1),
				accuracy: totalAccuracy / (user.totalSurahsCompleted + 1)
			}
		}
	);
}

const saveProgress = async (req: Request, res: Response) => {
	const {
		decimalAccuracy,
		numWPM,
		timeSpent,
		surahNameEng,
		surah_no,
		numVerses,
	} = req.body;
	try {
		const uid: string = req.cookies.decoded_uid;
		const user: IUser = await User.findById({ _id: uid }).lean() as IUser;

		// ! NOTE: for surahs that DO have sections, you'll need to make sure the user completes all the sections before incrementing the totalSurahsCompleted property *****

		if (user && !user.surahs) {
			// if the user does not have an array called "surahs", add it
            const existingSurah = await User.findOne({
                _id: uid,
                "surahs.chapterNo": surah_no
            });

            // prevent duplicate data from being appended to the array
            if (!existingSurah) {
                await updateUserData(
                    uid,
                    surahNameEng,
                    surah_no,
                    numVerses,
                    numWPM,
                    decimalAccuracy,
                    timeSpent
                );
            }

            await updateUserStats(uid, user);
			
		}
		else if (user && user.surahs) {
			await updateUserData(
				uid,
				surahNameEng,
				surah_no,
				numVerses,
				numWPM,
				decimalAccuracy,
				timeSpent
			);
			await updateUserStats(uid, user);
		}
	} catch (error) {
		console.log(
			"There was an error (surah.ts file, saveProgress function)",
			(error as Error).toString().red.bold
		);
	}
};

export { saveProgress };
