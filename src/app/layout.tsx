import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "버블챗 Bubble Chat",
	description: "실시간 채팅 앱 버블챗 Bubble Chat",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider localization={koKR}>
			<html
				lang="ko"
				suppressHydrationWarning
			>
				<body className={cn(font.className, "bg-white, dark:bg-[#313338]")}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem={false}
						storageKey="bubble-theme"
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
