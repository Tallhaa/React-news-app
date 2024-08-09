import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import moment from "moment";
import LoadMore from "./LoadMore";
import newsLogo from "../newslogo/logo.png";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(5);
  useEffect(() => {
    GetNews();
  }, []);

  const FinalSearch = async () => {
    if (search) {
      const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
      console.log(apiKey);
      try {
        setLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${search}&apiKey=${apiKey}`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        console.log(result);

        setNews(result.articles);
        setCount(5);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const GetNews = async () => {
    const apiKey = process.env.REACT_APP_NEWSAPI_KEY;
    console.log(apiKey);
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      console.log(result);

      setNews(result.articles);
      setCount(5);
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
            className="max-w-[100px] rounded-full cursor-pointer"
            onClick={GetNews}
            src={newsLogo}
            alt=""
          />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <input
            className="py-2 px-1 w-[350px] h-[50px] outline border-black rounded-md "
            type="text"
            value={search}
            placeholder="type..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={FinalSearch}
            className="h-[50px] rounded-lg bg-green-400 hover:bg-green-500 py-2 px-4"
          >
            <FaSearch className="text-white" />
          </button>
        </div>
      </div>
      <h1 className="Montserrat font-bold text-center text-5xl mb-8">
        News App
      </h1>
      {loading && <h1 className="text-center my-10">Loading..</h1>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 overflow-hidden">
        {news.slice(0, count).map((item, i) => (
          <div className="shadow-md px-4 py-3" key={i}>
            <div>
              {item.urlToImage && (
                <img
                  className="w-full mb-2 rounded-md h-48"
                  src={item.urlToImage}
                  alt={item.name}
                />
              )}
            </div>
            <h3 className="Montserrat text-4xl mb-2">{item.title}</h3>
            <div className="inline-flex">
              <p className="Hind text-slate-500 pb-2 mr-2">
                {moment(item.publishedAt).format("MMMM Do YYYY")}
              </p>
              <p className="Hind text-slate-800 mr-2">From </p>

              <p className="Hind font-bold text-blue-800 pb-2 mr-2">
                {item.source.name}
              </p>

              <p className="Hind font-bold text-blue-800 pb-2 mr-2">
                {item.name}
              </p>
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
        ))}
      </div>

      {count < news.length && (
        <LoadMore news={news} count={count} setCount={setCount} />
      )}
    </>
  );
};

export default NewsList;
