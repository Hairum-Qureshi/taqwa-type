import { useParams } from "react-router-dom";
import useSurah from "../../hooks/useSurah"
import { Verse } from "../../interfaces";
import useTypingGame, { CharStateType } from 'react-typing-game-hook';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function TypingPracticeSection() {

  // TODO - fix accuracy; it doesn't seem to be 100% accurate (heh)

  const { englishSurahData, sections } = useSurah();

  const { surah_no, section_no } = useParams();

  let groupedVerses = "";
  englishSurahData.map((surah: Verse, index: number) => {
    groupedVerses += `${index === 0 ? `(${surah.verse}) ${surah.text}` : ` (${surah.verse}) ${surah.text}`}`
  });   

  const {
    states: { chars, charsState, currIndex,
      correctChar,
      startTime,
      endTime },
    actions: { insertTyping, resetTyping, deleteTyping }
  } = useTypingGame(groupedVerses);

  const totalMilliseconds = Number(endTime! - startTime!);
  const minutes = Math.floor(totalMilliseconds / 60000); // 1 minute = 60,000 ms
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000); // Remaining seconds
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// bg-slate-900 h-full min-h-screen
  return (
    <div className = "">
      <div className = "lg:w-3/5 lg:m-auto mx-4 p-2 text-lg leading-9 mt-10 relative">
          {section_no && <h1 className = "text-2xl font-semibold text-center my-5 text-black">Section {section_no}, Verses {sections[Number(section_no) - 1]?.verses}</h1>}
          <div className="my-2 rounded-md bg-sky-800 p-2 text-white flex items-center text-sm">
          <span className="mx-1 text-xl">
            <FontAwesomeIcon icon={faCircleInfo} />
          </span>&nbsp;
          <span className="ml-2">
            Please note that even if you hit backspace to fix your error, it will still be counted against you. <br />
            ▶ To start, click on the text and begin typing! <br />
            ▶ To start over, hit the escape 
            <span className="rounded-sm border-1 border-slate-400 text-xs ml-1 text-center items-center bg-slate-300 text-black inline-block w-8 font-mono">
              ESC
            </span> button
          </span>
        </div>
          <div className = "tracking-widest outline-none"
              onKeyDown={e => {
                e.preventDefault();
                const key = e.key;
                if (key === 'Escape') {
                  resetTyping();
                  return;
                }

                if (key === 'Backspace') {
                  deleteTyping(false);
                  return;
                }

                if (key.length === 1) {
                  insertTyping(key);
                }
              }}
              tabIndex={0}
            >
              {chars.split('').map((char, index) => {
                let state = charsState[index];
                const isNext = index === currIndex; 
                let color =
                  state === CharStateType.Incomplete
                    ? 'black'
                    : state === CharStateType.Correct
                    ? 'green'
                    : 'red';
                return (
                  <span
                    key={char + index}
                    style={{
                      color,
                      fontWeight: isNext ? 'bold' : 'normal', 
                      textDecoration: isNext ? 'underline' : 'none'
                    }}>
                    {char}
                  </span>
                );
              })}
          </div>
          {currIndex === chars.length -1 && <div className = "text-center mt-5">
         <div className = 'text-black'>
            <h2 className = "text-black font-semibold text-xl">Your Stats For This Section</h2>
            <p>Total Time: {formattedTime}</p>
            <p>Accuracy: {`${Math.round((correctChar / chars.length) * 100)}%`}</p>
            <p>WPM: {Math.abs(Math.round((chars.length / 5) / ((endTime! - startTime!) / 60000)))}</p>
          </div>
          <button onClick = {resetTyping} className = "bg-slate-700 border-slate-400 hover:bg-slate-600 rounded-md px-2 mt-2 text-white">Restart</button>
        </div>}
        <div className = "flex justify-center">
          {section_no && <button className = "border-2 px-5 my-5 border-black rounded-md" onClick = {() => window.location.href = `/practice/surah/${surah_no}/section/${section_no}/${sections[Number(section_no)]?.verses}`}>Next Section</button>
        }
        </div>
      </div>
    </div>
  )
}
