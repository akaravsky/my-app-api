import React from 'react';

import { IconButton, Badge } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const ThumbUpBadgeButton = ({
    onClick,
    badgeContent
}: {
    onClick: () => void;
    badgeContent: string | number;
}): JSX.Element => {
    return (
        <IconButton edge="end" aria-label="like" onClick={onClick}>
            <Badge
                badgeContent={badgeContent}
                color="secondary"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <ThumbUpIcon />
            </Badge>
        </IconButton>
    );
};

export default ThumbUpBadgeButton;
