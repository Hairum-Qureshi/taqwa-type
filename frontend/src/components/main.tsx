import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "../app/store.ts";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "../css/index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<App />
				</Provider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</GoogleOAuthProvider>
	</StrictMode>
);
