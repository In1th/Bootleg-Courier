/** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStore } from '../hooks/useStore';
import { AppView } from './AppView';
import { LogInScreen } from './LogInScreen';

export const LandingPage = observer(() => {

    const { appStore } = useStore();

    if (appStore.loggedIn) {
        return (<LogInScreen />);
    }

    return (
        <AppView/>
    )
})