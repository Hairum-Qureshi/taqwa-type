import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Account from "./Account";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import TypingPractice from "./TypingPractice";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/user/:user_id/account" element={<Account />} />
				<Route path="/practice/surah/:surah_no" element={<TypingPractice />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
