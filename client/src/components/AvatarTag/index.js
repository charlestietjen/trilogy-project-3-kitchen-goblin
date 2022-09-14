import React from 'react'
import { Tag, TagLabel, Avatar, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const AvatarTag = ({ username, avatar, size }) => {
    const boxSize = size || 'sm'
    return (
        <Tag bg={'action.500'} as={Link} to={`/user/${username}`} paddingX={2} paddingY={1} size={'lg'}>
            <Avatar ml={-1} mr={2} size={boxSize} src={avatar} />
            <TagLabel>{username}</TagLabel>
        </Tag>
    )
}