import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const updateNews =  async ()=> {
    props.setProgress(10);
    const { category, pageSize } = props;
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=de70f4775db1448e8fbbe73e9edd7359&page=${page}&pageSize=${pageSize}`;

    setLoading(true);
    const data = await fetch(url);
    props.setProgress(30);
    const parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false);
    props.setProgress(100);

  }
  useEffect(() => {
    document.title = `${props.category} - ShazamNews`;
    updateNews();
    // eslint-disable-next-line 
  }, [])
  

  const fetchMoreData = async () => {
    const { category, pageSize } = props;
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=de70f4775db1448e8fbbe73e9edd7359&page=${page+1}&pageSize=${pageSize}`;
    setPage(page+1);
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
  return (
      <>
        <h2 className="text-center" style={{ margin: "35px 0px" }}>
          ShazamNews - Top {props.category} Headlines{" "}
        </h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-2 " key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                ); 
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News;
