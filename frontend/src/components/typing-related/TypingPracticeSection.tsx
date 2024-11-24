import { useParams } from "react-router-dom";
import useSurah from "../../hooks/useSurah"
import { useEffect, useRef, useState } from "react";
import { Verse } from "../../interfaces";

export default function TypingPracticeSection() {

  const { englishSurahData, sections } = useSurah();

  const { surah_no, section_no } = useParams();

  // TODO - consider adding the WPM in a div that moves down as your scroll down so that users are bale to see their WPM and accuracy as they type
  // OR BETTER YET - have it display at the end
  // TODO - add a restart button

  const [timer, setTimer] = useState(1);
  const [numMistakes, setNumMistakes] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [startTimer, setStartTimer] = useState(false); // TODO - set to false
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false); // TODO - set to false
  const [charIndex, setCharIndex] = useState(0);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [correctAndIncorrect, setCorrectAndIncorrect] = useState<string[]>([]);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    setCorrectAndIncorrect(Array(charRefs.current.length).fill(""));
  }, []);

  function handleChange(e) {
    // TODO - see if you can implement an accuracy param too
    if (charRefs.current) {
      const characters = charRefs.current; 
      const currentChar = charRefs.current[charIndex]; // stores current span tag
      const typedChar = e.target.value.slice(-1); // takes the last character typed and stores it

      if (charIndex < characters.length && startTimer) { // TODO - make sure startTimer is true
        if (!isTyping) setIsTyping(true);
        if (currentChar && typedChar === currentChar.textContent) { // extracts text from that span tag
          setCharIndex(charIndex + 1);
          correctAndIncorrect[charIndex] = "text-green-600";
        } 
        else {
          // TODO - see if you're still able to go back, if you can't, implement a feature to allow you to go back        
          setCharIndex(charIndex + 1);
          setNumMistakes(numMistakes + 1);
          console.log(currentChar, typedChar === currentChar?.textContent)
          correctAndIncorrect[charIndex] = "text-red-500";
        }

        if (charIndex === characters.length - 1) {
          setIsTyping(false);
          setStartTimer(false);
        } // completed the section
      }
      // if (e.key === 'Backspace') { // works with onKeyUp, however, sometimes skips over characters for some reason
      //   setCharIndex(charIndex - 1 < 0 ? 0 : charIndex - 1);
      //   currentChar = charRefs.current[charIndex - 1];
      // }
      else {
        setIsTyping(false);
      }
    }
  }

  // TODO - you might wanna implement some logic to detect when the user reaches the end of the section and once they have, stop the timer
  // TODO - check why in mobile view, there's a sliver of a white background at the top

  // ! BUG - it seems like if you press the text or something, you have to refresh the page to start over because it 'freezes' and scrolling down as you type is an issue also

  useEffect(() => {
    
    if (startTimer) {
      setTimeout(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    
  }, [startTimer, timer]);

  useEffect(() => {

    if(!isTyping) {
      const correctChars = charIndex - numMistakes;
      let calcWPM = Math.round((correctChars / 5 / timer) * 60);
      calcWPM = calcWPM < 0 || !calcWPM || calcWPM === Infinity ? 0 : calcWPM;

      const numCorrect = correctAndIncorrect.reduce((accumulator, currentValue) => {
        return currentValue === "text-green-600" ? accumulator + 1 : accumulator;
      }, 0);

      const percentageAccuracy = numCorrect / correctAndIncorrect.length;

      setWPM(calcWPM);
      setAccuracy(percentageAccuracy);

      console.log('time:', timer);
      console.log('wpm', wpm);
      console.log('accuracy', `${accuracy || 0}%`);

    }

  }, [isTyping]);

  const allChars = englishSurahData.flatMap((surah: Verse, index: number) => 
    `${index === 0 ? `(${surah.verse}) ${surah.text}` : ` (${surah.verse}) ${surah.text}`}`.split("")
  );  

  // TODO - figure out how to make the entire screen with the color slate-900
  // TODO - when the stats are displayed, make sure to convert the seconds to minutes if they exceed 60!
  // TODO - make sure to let the user know that when they press the button, they have to press the text to start (see if you can avoid this)

  return (
    <div className = "bg-slate-900 min-h-full max-h-screen">
      <div className = "lg:w-3/5 lg:m-auto mx-4 p-2 text-lg leading-9 mt-10 relative">
      <button className = "text-white" onClick = {() => setStartTimer(true)}>Press to start typing!</button>
          <h1 className = "text-2xl font-semibold text-center my-5 text-white">Section {section_no}, Verses {sections[Number(section_no) - 1]?.verses}</h1>
          <input type="text" className = "absolute opacity-0 outline-none bg-transparent" ref = {inputRef} onChange = {handleChange} />
          <div className = "tracking-widest">
            {allChars.map((char, index) => (
              <span
                key={index}
                className={`text-slate-500 ${index === charIndex ? "border-b-2 border-b-white w-10 text-white" : ""} ${correctAndIncorrect[index]}`}
                ref={(e) => (charRefs.current[index] = e)}
              >
                {char}
              </span>
            ))}
          </div>
          {!isTyping && 
          <div className = "text-center mt-5">
          <h2 className = "text-white font-semibold text-xl">Your Stats For This Section</h2>
          <div>
            <p className = "text-yellow-300">Accuracy: {Math.round(accuracy * 100) || 0}%</p>
            <p className = "text-yellow-300">WPM: {wpm}</p>
            <p className = "text-yellow-300">Time: {wpm} seconds</p>
          </div>
        </div>}
        <div className = "flex justify-center">
        <button className = "border-2 px-5 my-5 border-black rounded-md" onClick = {() => window.location.href = `/practice/surah/${surah_no}/section/${section_no}/${sections[Number(section_no)]?.verses}`}>Next Section</button>
        </div>
      </div>
    </div>
  )
}
