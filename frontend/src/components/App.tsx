import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Account from "./account-related/Account";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import TypingPractice from "./typing-related/TypingPractice";
import SurahInfo from "./quran-related/SurahInfo";
import Reference from "./quran-related/Reference";
import About from "./About";
import TypingPracticeSection from "./typing-related/TypingPracticeSection";
import PasswordReset from "./auth-related/PasswordReset";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/user/:user_id/account" element={<Account />} />
				<Route path="/practice/surah/:surah_no" element={<TypingPractice />} />
				<Route path="/practice/surah/:surah_no/section/:section_no/:ayahs" element={<TypingPracticeSection />} />
				<Route path="/practice/surah/:surah_no/info" element={<SurahInfo />} />
				<Route path="/:surah_no/:ayahs" element={<Reference />} />
				<Route path="/about" element={<About />} />
				<Route path="/password-reset/:token" element={<PasswordReset />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
