

export const useHttp = () => {

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}) => {

        try {
            const response = await fetch(url, {method, body, headers});
            console.log(url)
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            
            const data = await response.json();
            
            return data;

        } catch (error) {
            throw error;
        }
    };

    return {request};
};