import { Box,Text,Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { executecode } from './api';

const Output = ({editorRef,language}) => {
    const toast = useToast();
    const [output,setOutput] =useState(null)
    const [isloading,setLoading] = useState(false)
    const [iserror,setError] = useState(false)
    const runcode = async ()=>{
        const sourcecode = editorRef.current.getValue();
        if(!sourcecode)return
        try {
            setLoading(true)
            const {run:result} = await executecode(language,sourcecode) 
            setOutput(result.output.split("\n"))
            result.stderr ? setError(true):setError(false)
        } catch (error) {
            toast({
                title:"An error occurred",
                description : error.message || "unable to run code",
                status:"error",duration:6000,
            })
        }finally{
            setLoading(false)
        }
    }
  return (
    <Box w="50%">
        <Text mb={2} fontSize="lg">Output</Text>
        <Button variant='outlinr' colorScheme='green' mb={4} border="2px solid black" onClick={runcode} isLoading={isloading}>Run code</Button>
        <Box 
        height="75vh" p={2} border='2px solid black' color={iserror?"red.400":""} borderRadius={4} borderColor= {iserror?"red.500":"#333"}
        >{output?
        output.map((line,i)=>(<Text key={i}>{line}</Text>))
        :"Click on Run code to execute!!"}</Box>
    </Box>
  )
}

export default Output