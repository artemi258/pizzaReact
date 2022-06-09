

export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => {

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            console.log(body)
            const data = await response.json();
            return data;

        } catch (error) {
            throw error;
        }
    };

    return {request};
};