import React, {useState} from 'react'
import { useEditor, EditorContent, ReactRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'

import { Tool_bar } from './tool_bar';

// import './styles.scss'

import {
  Hyperlink,
  previewHyperlinkModal,
  setHyperlinkModal,
} from "@docs.plus/extension-hyperlink";
// extension-hyperlink

// import editor_contents from "./editor_content";

const Tiptap_wysiwyg = ({value, on_change, label, error}) => {

  const editor = useEditor({
     editorProps: {
        attributes: {
          class: 'flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-900 items-start rounded font-medium text-[16px] outline-none wysiwyg max-w-none',
        },
        
        transformPastedText(text) {
          return text.toUpperCase()
        }
      },
      
    extensions: [
      // StarterKit,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
      // Link.configure({
      //   openOnClick:false,
      //   autolink:true,
      // }),

      Hyperlink.configure({
        hyperlinkOnPaste: false,
        openOnClick: true,
        autolink: false,
        protocols: [
          {
            scheme: 'tel',
            optionalSlashes: true
          }
        ],
        modals: {
         
          previewHyperlink:  previewHyperlinkModal,
          setHyperlink: setHyperlinkModal,
          },
          
      
        
        // validate: href => /^https?:\/\//.test(href),

      }), 
      // HorizontalRule,
    ],
    content: value,
    onUpdate({ editor }) {
      
      
      const content = editor.getHTML();
          on_change(content)
    },

  })

  return (
    <div className=''>
      <h1 className=''>{label}</h1>
        
      <Tool_bar editor={editor} />

        <EditorContent editor={editor} style={{whiteSpace: "pre-line"}}/>
    </div>
  )
}

export  {Tiptap_wysiwyg}