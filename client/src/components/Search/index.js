import {
    IconButton,
    Input,
    Grid,
    GridItem
} from '@chakra-ui/react';
import {
    SearchIcon
} from '@chakra-ui/icons';

export const Search = ({ recipes }) => {
    return (
    <Grid boxShadow={'lg'} alignSelf='center' w='35vmax' display='flex' gap={1}>
        <GridItem w='100%'>
            <Input />
        </GridItem>
        <GridItem>
            <IconButton icon={<SearchIcon />} />
        </GridItem>
    </Grid>
    )}