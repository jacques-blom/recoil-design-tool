import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100px;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    background-color: #101010;

    a {
        color: #da3084;
    }
`

const Link: React.FC<{href: string}> = ({href, children}) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
        here
    </a>
)

export const Banner: React.FC = () => {
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
