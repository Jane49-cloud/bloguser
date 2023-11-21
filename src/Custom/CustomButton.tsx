import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomPrimaryButtonProps extends ButtonProps {
    children: ReactNode;
}

export const CustomPrimaryButton: React.FC<CustomPrimaryButtonProps> = ({ children, ...rest }) => {
    return (
        <Button variant="contained" color="primary" {...rest}>
            {children}
        </Button>
    );
};

export default CustomPrimaryButton;
