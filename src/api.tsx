import queryString, {ParsedUrlQueryInput} from 'querystring'

export const apiUrl = (lambda: string, queryParams?: ParsedUrlQueryInput) => {
    let url = `${process.env.REACT_APP_API_BASE}/${lambda}`
    if (queryParams) url += '?' + queryString.stringify(queryParams)

    return url
}

export const callApi = (lambda: string, queryParams?: ParsedUrlQueryInput) => {
    return fetch(apiUrl(lambda, queryParams)).then((res) => res.json())
}
