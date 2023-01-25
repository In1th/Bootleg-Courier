/** @jsxImportSource @emotion/react */
import { observer } from 'mobx-react';
import { css } from '@emotion/react';
import { Button, Divider, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel } from '@mui/material';
import { Google, Preview, Visibility, VisibilityOff } from '@mui/icons-material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { useStore } from '../hooks/useStore';

type LoginDto = {
    username: string | undefined,
    password: string | undefined
};

export const LogInScreen = observer(() => {
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState({ password: undefined, username: undefined } as LoginDto);

    const {appStore} = useStore();

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const setUsername = (name: string) => setLogin(prev => ({ ...prev, username: name }))
    const setPassword = (name: string) => setLogin(prev => ({ ...prev, password: name }))

    const showPasswordJSX = (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );

    const onLogIn = () => {
        console.log('a',(login.username ?? '') !== '',(login.password ?? '') !== '')
        if ((login.username ?? '') !== '' && (login.password ?? '') !== ''){
            console.log('a')
            appStore.setLoggedIn(true);
        }
    }

    return (
        <section
            css={css`
                height: 100vh;
                width: 100vw;
                background-image: url('login-background.avif');
                display: flex;
                align-items: center;
                justify-content: center;
            `}>
            <form
                css={css`
                        height: 50%;
                        aspect-ratio: 1;
                        background-color: rgba(255, 255, 255, 1);
                        border-radius: 10px;
                        display: flex;
                        flex-direction: column;
                        align-itmes: center;
                        justify-content: center;
                        padding: 30px;
                        gap: 30px;
                    `}>
                <section css={css`display: flex; gap: 20px; color: #1976d2; justify-content: center;`}>
                    <LocalShippingIcon css={css`width: 30px; height: 30px;`} />
                    <p css={css`font-family: 'Lobster', cursive; align-self: center; font-size: 1.5rem;`}>Shipping Company</p>
                </section>
                <Button variant="contained" startIcon={<Google />} css={css`border-radius: 20px;`}>
                    Sign in with Google
                </Button>
                <Divider />
                <section
                    css={css`
                        display: flex; 
                        flex-direction: column; 
                        border-radius: 5px;
                        padding: 20px;
                        gap: 20px;`}>
                    <FormControl>
                        <InputLabel htmlFor="email-input" error={login.username === ''}>Email</InputLabel>
                        <OutlinedInput
                            id="email-input" label="E-mail"
                            css={css`border-radius: 20px;`}
                            error={login.username === ''}
                            onChange={e => setUsername(e.currentTarget.value)}
                            aria-describedby="username-error-text" />
                            <FormHelperText id="username-error-text" error>{login.username === ''? 'Please state an email adress' : ''}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password-input" error={login.password === ''}>Password</InputLabel>
                        <OutlinedInput
                            id="password-input"
                            type={showPassword ? 'text' : 'password'}
                            css={css`border-radius: 20px;`}
                            error={login.password === ''}
                            onChange={e => setPassword(e.currentTarget.value)}
                            aria-describedby="password-error-text"
                            endAdornment={showPasswordJSX}
                            label="Password" />
                            <FormHelperText id="password-error-text" error>{login.password === ''? 'Please state an email adress' : ''}</FormHelperText>
                    </FormControl>
                </section>
                <Button variant='contained' css={css`border-radius: 20px;`} onClick={onLogIn}>Sign in</Button>
            </form>
        </section>
    )
})