import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import moment from "moment";
import LoadMore from "./LoadMore";

const NewsList = () => {
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState("");
    const [finalsearch, setFinalSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(5);
    useEffect(() => {
        GetNews();
    }, [finalsearch]);

    const FinalSearch = () => {
        setFinalSearch(search);
        setSearch("");
        setCount(5)
    };

    const GetNews = async () => {
        const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${finalsearch}&count=30&safeSearch=Strict`;
        const options = {
            method: "GET",
            headers: {
                "X-BingApis-SDK": "true",
                "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
                "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
            },
        };

        try {
            setLoading(true);
            const response = await fetch(url, options);
            const result = await response.json();
            setNews(result.value);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="flex flex-nowrap justify-between px-10 my-8">
                <div className="inline-flex mb-2">
                    <img
                        className="max-w-[50px] rounded-lg"
                        src="https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"
                        alt=""
                    />
                    <h3 className="Montserrat text-2xl px-2">News</h3>
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                    <input
                        className="py-2 px-1 outline border-black rounded-md "
                        type="text"
                        value={search}
                        placeholder="type..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={FinalSearch}
                        className="rounded-lg bg-green-400 hover:bg-green-500 py-2 px-4"
                    >
                        <FaSearch className="text-white" />
                    </button>
                </div>
            </div>
            <h1 className="Montserrat font-bold text-center text-5xl mb-8">News App</h1>
            {
                loading && <h1 className="text-center my-10">Loading..</h1>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10 overflow-hidden">
                {
                    news.length > 0 ? (news.slice(0, count).map((item, i) =>
                        <div className="shadow-md px-4 py-3" key={i}>
                            <div >
                                {item.image && item.image.thumbnail && (
                                    <img
                                        className="w-full mb-2 rounded-md h-48"
                                        src={item.image.thumbnail.contentUrl}
                                        alt={item.name}
                                    />
                                )}
                            </div>
                            <h3 className="Montserrat text-4xl mb-2">{item.name}</h3>
                            <div className="inline-flex">
                                <p className="Hind text-slate-500 pb-2 mr-2">
                                    {moment(item.datePublished).format("MMMM Do YYYY")}
                                </p>
                                <p className="Hind text-slate-800 mr-2">From </p>
                                {item.provider.map((providerdata, i) => (
                                    <p
                                        key={i}
                                        className="Hind font-bold text-blue-800 pb-2 mr-2"
                                    >
                                        {providerdata.name}
                                    </p>
                                ))}
                            </div>
                            <p className="Hind mb-6 text-base">{item.description}</p>
                            <a
                                className="Montserrat font-medium text-white bg-blue-500 hover:bg-blue-400 rounded-sm px-5 py-2.5 mb-3"
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Read more
                            </a>
                        </div>
                    ))
                        : null
                }
            </div>
            {
                news.length > 0 ? <LoadMore count={count} setCount={setCount} />
                    : null
            }
        </>
    );
};

export default NewsList;
