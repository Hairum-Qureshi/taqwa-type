import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="w-full h-auto text-white bg-slate-800 p-2">
			<Link to="/">
				<h1 className="text-xl">Taqwa Type</h1>
			</Link>
		</div>
	);
}
