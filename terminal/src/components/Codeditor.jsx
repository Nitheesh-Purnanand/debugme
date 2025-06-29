import React, { useRef } from 'react'
import {Editor} from "@monaco-editor/react"
import "/src/app.css"
import { useState } from 'react'
import Languageselector from './Languageselector'
import { CODE_SNIPPETS } from './constants'
import { Box, HStack } from '@chakra-ui/react'
import Output from './Output'
const Codeditor = () => {
    const [value,setValue] = useState(CODE_SNIPPETS["javascript"])
    const [language,setLanguage] = useState('javascript')
    const editorRef = useRef()

    const onmount = (editor)=>{
        editorRef.current = editor;
        editor.focus();
    }
    const onselect = (language)=>{
        setLanguage(language)
        setValue(CODE_SNIPPETS[language])
    }
  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
        <Languageselector language={language} onselect={onselect}></Languageselector>
        <Editor className='editor' width="50vw" theme='vs-dark' value={value} 
        onChange={(value)=>setValue(value)}
        onMount={onmount}
        language={language} defaultValue="// some comment" />
        </Box>
        <Output editorRef={editorRef} language={language}></Output>
      </HStack>
    </Box>
  )
}

export default Codeditor