import { useState, useEffect } from 'react'

const useFetch = (url) =>
{
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>
    {
        const abortController = new AbortController()

        setTimeout(() =>
        {
            fetch(url, { signal: abortController.signal })
                .then((response) =>
                {
                    if (!response.ok)
                    {
                        throw Error('could not fetch the data for that resource')
                    }
                    return response.json()
                })
                .then((data) =>
                {
                    setData(data)
                    setIsPending(false)
                    setError(null)
                })
                .catch((error) =>
                {
                    if (error.name === "AbortError")
                    {
                        console.log('fetch aborted')
                    }
                    else
                    {
                        setError(error.message)
                        setIsPending(false)
                    }
                })
        }, 1000)

        return () => abortController.abort()
    }, [url])

    return {
        data,
        isPending,
        error
    }
}

export default useFetch
