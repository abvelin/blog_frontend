import type { Metadata } from "next";
// import My_link from "../../components/my_link";
// import { Inter } from "next/font/google";
// import "./globals.css";
import My_link from "@/components/my_link";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "app management",
    description: "this the only place for managing the app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-wrap flex-1 min-h-screen gap-4 m-4">
            <div className="flex flex-col w-1/6 bg-red-500 ">
                <h1>Dashboard</h1>
                <My_link href="/manage/categories" name="categories" />
                <My_link href="/manage/tags" name="tags" />

                <h1>Posts</h1>
                <div className='flex flex-col gap-3 px-2'>
                    <My_link href="/manage/posts" name="list" />
                    <My_link href="/manage/posts/sort" name="sort" />
                    <My_link href="/manage/posts/create" name="add" />
                </div>
            </div>


            {children}
        </div>
    );
}
