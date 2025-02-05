
// import { type Editor } from '@tiptap/react';
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Underline,
    Link,
    Quote,
    Undo,
    Redo,
    Code,
} from 'lucide-react'
import { useCallback } from 'react';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Tool_bar = ({ editor }: any) => {

    useCallback(() => {
        if (!editor) return null

        //docs.google 
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("hyperlink").unsetHyperlink().run();

            return;
        }

        // update link
        editor.chain().focus().extendMarkRange("hyperlink").setHyperlink({ href: url }).run();

        editor.commands.editHyperlink({
            newText: 'New Text',
            newURL: 'https://new-url.com'
        });


        editor.commands.setHyperlink({
            href: '<https://example.com>'
        });

        //end docs.gooogle
    }, [editor])


    if (!editor) {
        return null;
    }

    return (
        <div className='px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700'>
            <div className='flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap'>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleBold().run()
                    }}

                    className={
                        editor.isActive('bold')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400 p-2'}
                >
                    <Bold className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleItalic().run()
                    }}

                    className={
                        editor.isActive('italic')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Italic className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleUnderline().run()
                    }}

                    className={
                        editor.isActive('underline')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Underline className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleStrike().run()
                    }}

                    className={
                        editor.isActive('strike')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Strikethrough className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleHeading({ level: 1 }).run()
                    }}

                    className={
                        editor.isActive('heading', { level: 1 })
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Heading1 className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleHeading({ level: 2 }).run()
                    }}

                    className={
                        editor.isActive('heading', { level: 2 })
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Heading2 className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleBulletList().run()
                    }}

                    className={
                        editor.isActive('bulletList')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <List className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleOrderedList().run()
                    }}
                    className={
                        editor.isActive('orderedList')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <ListOrdered className='w-5 h-5' />
                </button>
                <button onClick={(e) => {
                    e.preventDefault()
                    editor.chain().focus().setHyperlink()
                }
                }>
                    <Link className='w-5 h-5' /></button>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().toggleBlockquote().run()
                    }}
                    className={
                        editor.isActive('blockquote')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Quote className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().setCode().run()
                    }}
                    className={
                        editor.isActive('code')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Code className='w-5 h-5' />
                </button>

                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().undo().run()
                    }}
                    className={
                        editor.isActive('undo')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Undo className='w-5 h-5' />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        editor?.chain().focus().redo().run()
                    }}
                    className={
                        editor.isActive('redo')
                            ? 'bg-sky-200 p-2 text-white rounded-lg'
                            : 'text-sky-400'}
                >
                    <Redo className='w-5 h-5' />
                </button>
            </div>
        </div>
    )
}