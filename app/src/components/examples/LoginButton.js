import React from 'react';
import { Button, Icon } from 'react-native-ui-kitten';

export const FacebookIcon = (style) => (
    <Icon name='facebook' {...style} />
);

export const LoginButton = () => (
    <Button icon={FacebookIcon}>Login with Facebook</Button>
);
