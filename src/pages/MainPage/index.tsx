import React, { useRef } from 'react'
import cn from 'classnames'
import { FiArrowUpRight } from 'react-icons/fi'
import { Button, Card, Page } from '../../../admiral'
import image from '/images/main-page.svg'
import twitterIcon from '/images/twitter.svg'
import styles from './MainPage.module.scss'

const MainPage = () => {
    const ArrowDownIcon = useRef(<FiArrowUpRight className={styles.icon} />).current
    const TwitterIcon = useRef(<img src={twitterIcon} alt="twitter" />).current

    return (
        <div className={styles.page}>
            <Card className={styles.page__wrapper}>
                <div className={styles.page__container}>
                    <h1 className={styles.page__title}>Welcome to Admiral! &#9996;&#127995;</h1>
                    <h3 className={styles.page__descr}>
                        We have prepared several demos to show you how to use the control panel and
                        demonstrate all of its features. We hope that these demos will help you
                        better understand how everything works and how this control panel can make
                        your work easier.
                    </h3>
                    <ul className={styles.page__actions}>
                        <li>
                            <a
                                href="https://github.com/dev-family/admiral"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    view="ghost"
                                    className={styles.button}
                                    iconRight={ArrowDownIcon}
                                >
                                    Project repository
                                </Button>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://twitter.com/dev___family"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    view="ghost"
                                    className={cn(styles.button, styles['button--twitter'])}
                                    iconLeft={TwitterIcon}
                                    iconRight={ArrowDownIcon}
                                >
                                    Our twitter
                                </Button>
                            </a>
                        </li>
                        <li>
                            <a href="https://dev.family" target="_blank" rel="noopener noreferrer">
                                <Button
                                    view="ghost"
                                    className={styles.button}
                                    iconRight={ArrowDownIcon}
                                >
                                    Development team
                                </Button>
                            </a>
                        </li>

                        <li>
                            <a href="mailto:admiral@dev.family">
                                <Button
                                    view="ghost"
                                    className={cn(styles.button, styles['button--connect_with_us'])}
                                    iconRight={ArrowDownIcon}
                                >
                                    <span>Connect with us:</span>
                                    <span className={styles.button__link}>admiral@dev.family</span>
                                </Button>
                            </a>
                        </li>
                    </ul>

                    <img className={styles.page__image} src={image} alt="Welcome to Admiral!" />
                </div>
            </Card>
        </div>
    )
}

export default MainPage
