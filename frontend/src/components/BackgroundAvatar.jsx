import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    const nameVal = name.name
    if (typeof nameVal !== 'string') {
        console.log(name)
        return {
            sx: {
                bgcolor: '#000', // Default color
            },
            children: '??', // Default initials
        };
    }

    return {
        sx: {
            bgcolor: stringToColor(nameVal),
        },
        children: `${nameVal.split(' ')[0][0]}${nameVal.split(' ')[1][0]}`,
    };
}

export default function BackgroundLetterAvatars({ name }) {
    return (
        // <Stack direction="row" spacing={2}>
        <Avatar {...stringAvatar({ name })} />

        // </Stack>
    );
}
