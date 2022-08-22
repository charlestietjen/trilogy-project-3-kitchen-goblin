import { useColorMode, IconButton, } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

export const ColorModeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            {colorMode === 'dark' ? (
                <IconButton m={[3, null, 10]} backdropFilter={'auto'} backdropBlur={'0.1em'} boxShadow={'dark-lg'} bg='blackAlpha.600' onClick={toggleColorMode} borderRadius={'full'} icon={<SunIcon />} />)
                : (<IconButton m={[3, null, 10]} backdropFilter={'auto'} backdropBlur={'0.1em'} boxShadow={'dark-lg'} bg='blackAlpha.600' onClick={toggleColorMode} borderRadius={'full'} icon={<MoonIcon />} />)}
        </>
    )
}