import { useColorMode, IconButton, } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const ColorModeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            {colorMode === 'dark' ? (
                <IconButton m={[3, null, 10]} boxShadow={'dark-lg'} onClick={toggleColorMode} borderRadius={'full'} icon={<SunIcon />} />)
                : (<IconButton m={[3, null, 10]} boxShadow={'dark-lg'} onClick={toggleColorMode} borderRadius={'full'} icon={<MoonIcon />} />)}
        </>
    )
}