import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from 'react-spring'
import NavigationMenu from "./NavigationMenu"
import "../Style/Components/Navigation.scss"

function Navigation() {
    const [show, setShow] = useState(false)
    const menuTransitions = useTransition(show, null, {
        from: { position: 'fixed', opacity: 0, left: '-31%' },
        enter: { opacity: 1, left: '0' },
        leave: { opacity: 0, left: '-31%' },
    })
    const maskTransitions = useTransition(show, null, {
        from: { position: 'fixed', opacity: 0 },
        enter: { opacity: 0.3 },
        leave: { opacity: 0 },
    })

    return (
        <div className="navigation">
            <FontAwesomeIcon class="navigation__nav-button" icon={faBars} onClick={() => setShow(!show)}/>
            {
                maskTransitions.map(({ item, key, props }) =>
                item && <animated.div className="navigation__background" key={key} style={props} onClick={() => setShow(!show)}>
                </animated.div>
            )
            }
            {
                menuTransitions.map(({ item, key, props }) =>
                    item && <animated.div className="navigation__menu" key={key} style={props}>
                        <NavigationMenu closeMenu={() => setShow(false)}/>
                    </animated.div>
                )
            }
        </div>
    )
}

export default Navigation