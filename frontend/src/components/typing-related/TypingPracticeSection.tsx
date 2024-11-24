import { useParams } from "react-router-dom";
import useSurah from "../../hooks/useSurah"

export default function TypingPracticeSection() {

  const { englishSurahData, sections } = useSurah();

  const { surah_no, section_no } = useParams();

  // TODO - consider adding the WPM in a div that moves down as your scroll down so that users are bale to see their WPM and accuracy as they type

  return (
    <div>
      <div className = "lg:w-3/5 lg:m-auto mx-4 p-2 text-lg leading-9 mt-10">
          <h1 className = "text-2xl font-semibold text-center my-5">Section {section_no}, Verses {sections[Number(section_no) - 1]?.verses}</h1>
            {englishSurahData.map((surah, index) => {
              return (
                <span key = {index} className = "text-slate-400"> ({surah.verse}) {surah.text}</span>
              )
            })
          }
        <div className = "flex justify-center">
        <button className = "border-2 px-5 my-5 border-black rounded-md" onClick = {() => window.location.href = `/practice/surah/${surah_no}/section/${section_no}/${sections[Number(section_no)]?.verses}`}>Next Section</button>
        </div>
      </div>
    </div>
  )
}
