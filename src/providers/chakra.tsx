import { theme } from '@/config/chakra';
import {ChakraProvider} from '@chakra-ui/react'
import { ReactNode } from 'react';

export default function AppChakraProvider({children}:{children:ReactNode}){
    return (
        <ChakraProvider resetCSS theme={theme}>
            {children}
        </ChakraProvider>
    )
}