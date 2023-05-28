import React, { useState, useEffect } from 'react'
import styles from './header.module.scss'
import styled from '@emotion/styled'
//link
import Link from 'next/link';
import { useRouter } from 'next/router'
//function
import { themeMode } from '../../public/styleComponent/theme';
//action
import { APP_NAME } from '../../config';
import { isAuth, signout } from '../../actions/auth';
//material
import Dropdown from '../materialComponents/Dropdown';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/slices/theme/theme';
import { selectThemeMode } from '../../redux/slices/theme/themeSelector';

const TopMenu = ({ color, opacity }) => {
    const theme = useSelector(selectThemeMode)
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        isAuth() ? setAuth(true) : setAuth(false);
    }, [])

    const router = useRouter()
    const dispatch = useDispatch()

    const isActive = (path) => {
        if (router.pathname === path) return { color: color ? color : theme.active }
        else return { color: opacity ? opacity : theme.text }
    }

    const Topbar = styled.div`
        `
    const HyperText = styled.span`
        & :hover{
            color:${color ? color : theme.active};
        }
        `
    return (
        <Topbar className={`${styles.topbar}`}>
            <div className={styles.topLink}>
                <Link href="/">
                    <HyperText
                        className={`${styles.text}`}
                        style={isActive("/")}
                    >
                        <HyperText>
                            {APP_NAME}
                        </HyperText>
                    </HyperText>
                </Link>
            </div>

            {!auth && (
                <div className={styles.topCenter}>
                    <div className={`${styles.topLink} `}>
                        <Link href="/auth/signin">
                            <HyperText
                                className={styles.text}
                                style={isActive("/auth/signin")}>
                                <HyperText>
                                    Login
                                </HyperText>
                            </HyperText>
                        </Link>
                    </div>
                    <div className={`${styles.topLink} ms-2`}>
                        <Link href="/auth/signup">
                            <HyperText
                                className={styles.text}
                                style={isActive("/auth/signup")}>
                                <HyperText>
                                    Register
                                </HyperText>
                            </HyperText>
                        </Link>
                    </div>
                </div>
            )}
            <div className={styles.topEnd}>
                <div className={styles.topLink}>
                    <Dropdown
                        color={{ bg: theme.primary }}
                        position="right"
                        title="Theme"
                        link={[
                            {
                                name: "Light Mode",
                                func: (() => { dispatch(setTheme(themeMode.light)) })
                            },
                            {
                                name: "Dark Mode",
                                func: (() => { dispatch(setTheme(themeMode.dark)) })
                            },
                            {
                                name: "Navy Mode",
                                func: (() => { dispatch(setTheme(themeMode.blue)) })

                            },
                        ]}

                    />
                </div>
                <div>


                    {auth && (
                        <div className={styles.topLink}>
                            <Dropdown
                                color={{ bg: theme.primary }}
                                position="right"
                                title="Account"
                                link={[
                                    {
                                        name: isAuth().name,
                                        link: isAuth().role === 1 ? "/admin" : "/user"
                                    },
                                    {
                                        name: "Signout",
                                        func: () => signout(() => router.push({
                                            pathname: "/auth/signin",
                                            query: { from: router.pathname }
                                        })
                                        )
                                    },
                                ]}

                            />

                        </div>
                    )}
                </div>


            </div>
        </Topbar>
    )
}

export default TopMenu