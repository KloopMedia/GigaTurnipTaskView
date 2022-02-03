
const useHelpers = () => {

    const parseId = (id: string | undefined) => {
        if (id) {
            return parseInt(id)
        } else {
            throw new Error("No id");
        }
    }

    return {
        parseId,
    };
};

export default useHelpers
