const LoadMore = ({ count, setCount }) => {

    const loadmoreData = () => {
        setCount(count + 5)
    }
    return (
        <div className="flex justify-center my-6">
            <button className="w-40 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" onClick={loadmoreData}>
                Load More
            </button>
        </div>
    )
}

export default LoadMore;