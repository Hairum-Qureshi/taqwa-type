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
  const [startTimer, setStartTimer] = useState(true); // TODO - set to false
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(true); // TODO - set to false
  const [charIndex, setCharIndex] = useState(0);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [correctAndIncorrect, setCorrectAndIncorrect] = useState<string[]>([]);

  // TODO - need to figure out why the first character doesn't start with an underline on page load

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    setCorrectAndIncorrect(Array(charRefs.current.length).fill(""));
  }, []);

  function handleChange(e) {
    // TODO - see if you can implement an accuracy param too
    if (charRefs.current) {
      const characters = charRefs.current; 
      let currentChar = charRefs.current[charIndex]; // stores current span tag
      let typedChar = e.target.value.slice(-1); // takes the last character typed and stores it
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
          correctAndIncorrect[charIndex] = "text-red-500";
        }

        if (charIndex === characters.length - 1) setIsTyping(false); // completed the section
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

  // useEffect(() => {
    
  //   if (startTimer) {
  //     setTimeout(() => {
  //       setTimer((prev) => prev + 1);
  //     }, 1000);
  //   }
    
  // }, [startTimer, timer]);

  const allChars = englishSurahData.flatMap((surah: Verse) =>
    ` (${surah.verse}) ${surah.text}`.split("")
  );

  return (
    <div className = "bg-slate-900">
      <div className = "lg:w-3/5 lg:m-auto mx-4 p-2 text-lg leading-9 mt-10 relative">
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
        <div className = "flex justify-center">
        <button className = "border-2 px-5 my-5 border-black rounded-md" onClick = {() => window.location.href = `/practice/surah/${surah_no}/section/${section_no}/${sections[Number(section_no)]?.verses}`}>Next Section</button>
        </div>
      </div>
    </div>
    // <div>
    //   <div className = "lg:w-3/5 lg:m-auto mx-4 p-2 text-lg leading-9 mt-10">
    //       <h1 className = "text-2xl font-semibold text-center my-5">Section {section_no}, Verses {sections[Number(section_no) - 1]?.verses}</h1>
    //         {englishSurahData.map((surah, index) => {
    //           return (
    //             <span key = {index} className = "text-slate-400"> ({surah.verse}) {surah.text}</span>
    //           )
    //         })
    //       }
    //     <div className = "flex justify-center">
    //     <button className = "border-2 px-5 my-5 border-black rounded-md" onClick = {() => window.location.href = `/practice/surah/${surah_no}/section/${section_no}/${sections[Number(section_no)]?.verses}`}>Next Section</button>
    //     </div>
    //   </div>
    // </div>
  )
}
