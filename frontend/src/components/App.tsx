import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Account from "./account-related/Account";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import TypingPractice from "./TypingPractice";
import SurahInfo from "./SurahInfo";
import Reference from "./Reference";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/user/:user_id/account" element={<Account />} />
				<Route path="/practice/surah/:surah_no" element={<TypingPractice />} />
				<Route path="/practice/surah/:surah_no/info" element={<SurahInfo />} />
				<Route path="/:surah_no/:ayahs" element={<Reference />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
