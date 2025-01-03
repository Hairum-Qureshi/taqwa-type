import { useParams } from "react-router-dom";
import useSurah from "../../hooks/useSurah";
import { Verse } from "../../interfaces";
import useTypingGame, { CharStateType } from "react-typing-game-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { ring2 } from "ldrs";
import useProgressSaver from "../../hooks/useProgressSaver";

ring2.register();

export default function TypingPracticeSection() {
	// TODO - fix accuracy; it doesn't seem to be 100% accurate (heh)
	// TODO - it seems like if you go back to fix your error, it does not count it against you
	// TODO - you're able to manipulate the verse pairings in the URL to get those verse pairings instead of the section pairings allocated; see if you can make sure the user isn't able to do that/cause any problems when you save the designated user stats for that surah's section
	// TODO - change font family (currently it's "")
	// TODO - add colors to the buttons and make sure the colors are different if they're disabled
	// TODO - The loading spinner doesn't appear to be animated for some reason

	const { englishSurahData, sections } = useSurah();
	const [currentVersesIndex, setCurrentVersesIndex] = useState(0);
  const { saveProgress } = useProgressSaver();

	const { surah_no, section_no, ayahs } = useParams();

	useEffect(() => {
		if (ayahs) {
			const sectionIndex = sections
				.map(section => section.verses)
				.indexOf(ayahs);
			setCurrentVersesIndex(sectionIndex);
		}
	}, [currentVersesIndex, section_no]);

	let groupedVerses = "";
	englishSurahData.map((surah: Verse, index: number) => {
		groupedVerses += `${
			index === 0
				? `(${surah.verse}) ${surah.text}`
				: ` (${surah.verse}) ${surah.text}`
		}`;
	});

	const {
		states: { chars, charsState, currIndex, correctChar, startTime, endTime },
		actions: { insertTyping, resetTyping, deleteTyping }
	} = useTypingGame(groupedVerses);

	const totalMilliseconds = Number(endTime! - startTime!);
	const minutes = Math.floor(totalMilliseconds / 60000); // 1 minute = 60,000 ms
	const seconds = Math.floor((totalMilliseconds % 60000) / 1000); // Remaining seconds
	const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")}`;
	// bg-slate-900 h-full min-h-screen

  const [accuracy, SetAccuracy] = useState("0%");
  const [wpm, setWPM] = useState('0');
  const [timeSpent, setTimeSpent] = useState("00:00:00");

  useEffect(() => {
    if(currIndex === chars.length - 1) {
      SetAccuracy(`${Math.round((correctChar / chars.length) * 100)}%`);
      setWPM(Math.abs(
        Math.round(
          chars.length / 5 / ((endTime! - startTime!) / 60000)
        )
      ).toString());
      setTimeSpent(formattedTime);

      saveProgress(`${Math.round((correctChar / chars.length) * 100)}%`, Math.abs(
        Math.round(
          chars.length / 5 / ((endTime! - startTime!) / 60000)
        )
      ).toString(), formattedTime);
    }
  }, [currIndex]);

	return (
		<div className="">
			<div className="lg:w-3/5 lg:m-auto mx-4 p-2 text-lg leading-9 mt-10 relative">
				{section_no && (
					<h1 className="text-2xl font-semibold text-center my-5 text-black">
						Section {section_no}, Chapter {surah_no} Verse{sections[currentVersesIndex]?.verses.split("-").length > 1 ? "s " : " "}
						{sections[currentVersesIndex]?.verses}
					</h1>
				)}
				<div className="my-2 rounded-md bg-sky-800 p-2 text-white flex items-center text-sm">
					<span className="mx-1 text-xl">
						<FontAwesomeIcon icon={faCircleInfo} />
					</span>
					&nbsp;
					<span className="ml-2">
						▶ To start, click on the text and begin typing! Your timer starts the moment you click on the text <br />▶ To start
						over, hit the escape
						<span className="rounded-sm border-1 border-slate-400 text-xs ml-1 text-center items-center bg-slate-300 text-black inline-block w-8 font-mono">
							ESC
						</span>{" "}
						button <br />▶ If it appears as though you typed all the characters
						correctly but your accuracy is not 100%, chances are you might have
						missed a space
					</span>
				</div>
				{!groupedVerses ? (
					<div className="text-center mt-20">
						<span>
							<l-ring-2 size="40" speed="1.75" color="black"></l-ring-2>
						</span>
					</div>
				) : (
					<div
						className="tracking-widest outline-none"
						onKeyDown={e => {
							e.preventDefault();
							const key = e.key;
							if (key === "Escape") {
								resetTyping();
								return;
							}

							if (key === "Backspace") {
								deleteTyping(false);
								return;
							}

							if (key.length === 1) {
								insertTyping(key);
							}
						}}
						tabIndex={0}
					>
						{chars.split("").map((char, index) => {
							const state = charsState[index];
							const isNext = index === currIndex;
							const color =
								state === CharStateType.Incomplete
									? "black"
									: state === CharStateType.Correct
									? "green"
									: "red";
							return (
								<span
									key={char + index}
									style={{
										color,
										fontWeight: isNext ? "bold" : "normal",
										textDecoration: isNext ? "underline" : "none",
										fontFamily: ""
									}}
								>
									{char}
								</span>
							);
						})}
					</div>
				)}
				{currIndex === chars.length - 1 && (
					<div className="text-center mt-5">
						<div className="text-black">
							<h2 className="text-black font-semibold text-xl">
								Your Stats For This Section
							</h2>
							<p>Total Time: {timeSpent}</p>
							<p>
								Accuracy: {accuracy}
							</p>
							<p>
								WPM:{" "}
								{wpm}
							</p>
						</div>
						<button
							onClick={resetTyping}
							className="bg-slate-700 border-slate-400 hover:bg-slate-600 rounded-md px-2 mt-2 text-white"
						>
							Restart
						</button>
					</div>
				)}
				<div className="flex justify-center">
					{section_no && (
						<>
							{currentVersesIndex !== 0 && (
								<button
									className="border-2 px-5 my-5 border-black rounded-md"
									onClick={() =>
										(window.location.href = `/practice/surah/${surah_no}/section/${section_no}/${
											sections[
												(sections.length + currentVersesIndex - 1) %
													sections.length
											].verses
										}`)
									}
								>
									Prev Section
								</button>
							)}
							{(sections.length + currentVersesIndex + 1) % sections.length !==
								0 ? (
								<button
									className="border-2 px-5 my-5 border-black rounded-md"
									onClick={() =>
										(window.location.href = `/practice/surah/${surah_no}/section/${section_no}/${
											sections[
												(sections.length + currentVersesIndex + 1) %
													sections.length
											].verses
										}`)
									}
								>
									Next Section
								</button>
							) : <button
              className="border-2 px-5 my-5 border-black rounded-md" onClick={() =>
										(window.location.href = `/practice/surah/${surah_no}`)}>Return To Index</button>}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
