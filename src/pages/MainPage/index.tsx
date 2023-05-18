import React from 'react'
import { Button, Page } from '../../../admiral'
import image from '/public/images/main-page.svg'
import styles from './MainPage.module.scss'

const MainPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.page__container}>
                <h1 className={styles.page__title}>Welcome to Admiral! ✌🏻</h1>
                <h3 className={styles.page__descr}>
                    We have prepared several demos to show you how to use the control panel and
                    demonstrate all of its features. We hope that these demos will help you better
                    understand how everything works and how this control panel can make your work
                    easier.
                </h3>
                <ul className={styles.page__actions}>
                    <li>
                        <Button>Our twitter</Button>
                    </li>
                    <li>
                        <Button>Development team</Button>
                    </li>
                    <li>
                        <Button>Project repository</Button>
                    </li>
                    <li>
                        <Button>
                            <span>Connect with us:</span>
                            <a href="mailto:admiral@dev.family">admiral@dev.family</a>
                        </Button>
                    </li>
                </ul>

                <img className={styles.page__image} src={image} alt="Welcome to Admiral!" />
            </div>
        </div>
    )
}

export default MainPage
