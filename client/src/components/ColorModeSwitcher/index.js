import { useColorMode, IconButton, } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const ColorModeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            {colorMode === 'dark' ? (
                <IconButton boxShadow={'dark-lg'} onClick={toggleColorMode} borderRadius={'full'} icon={<SunIcon />} />)
                : (<IconButton boxShadow={'dark-lg'} onClick={toggleColorMode} borderRadius={'full'} icon={<MoonIcon />} />)}
        </>
    )
}