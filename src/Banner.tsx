import React from 'react'
import styled from 'styled-components'
import {BsHeartFill} from 'react-icons/bs'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    background-color: #101010;
    padding: 20px;

    a {
        color: #da3084;
    }
`

const Link: React.FC<{href: string}> = ({href, children = 'here'}) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
    </a>
)

export const TopBanner: React.FC = () => {
    if (!process.env.REACT_APP_NETLIFY) return null

    return (
        <Container>
            <div>This design tool was built to show how to use Recoil and React Suspense.</div>
            <div>
                Check out the tutorial video series{' '}
                <Link href="https://www.youtube.com/watch?v=Hkd9gMYuYu4&list=PLY-nQKxN_zxBmZJBXQYPQOqOI5C6IdNxH&index=2" />{' '}
                and the code <Link href="https://github.com/jacques-blom/recoil-design-tool" />.
            </div>
        </Container>
    )
}

export const BottomBanner: React.FC = () => {
    if (!process.env.REACT_APP_NETLIFY) return null

    return (
        <Container style={{flexDirection: 'row'}}>
            Built with <BsHeartFill fill="#da3084" style={{margin: '0 10px'}} /> in beautiful Cape Town by&nbsp;
            <Link href="https://twitter.com/jacques_codes">@jacques_codes</Link>
        </Container>
    )
}
