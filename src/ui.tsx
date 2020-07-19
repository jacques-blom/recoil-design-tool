import styled, {createGlobalStyle} from 'styled-components'

export const Sidebar = styled.div`
    width: 300px;
    height: 100%;
    background-color: #2e2f30;
    padding: 20px;
`

export const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
`

export const GlobalStyles = createGlobalStyle`
    body {
        color: #FFF;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #1D1E1F;
    }

    * {
        box-sizing: border-box;
    }
`
