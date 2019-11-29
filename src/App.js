import React, { PureComponent } from 'react';
import {
    DataSearch,
    ReactiveBase,
    ResultCard,
    RangeSlider,
    MultiList,
    ReactiveList,
    RatingsFilter,
    SelectedFilters
} from '@appbaseio/reactivesearch';

import './App.css';

class App extends PureComponent {
    render() {
        return (
            <ReactiveBase
                app="good-books-ds"
                credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
            >
                <div className="navbar">
                    <div className="logo">
                        The Booksearch App
                    </div>
                    <DataSearch
                        componentId="Search"
                        dataField={['original_title', 'original_title.search', 'authors', 'authors.search']}
                        queryFormat="and"
                        iconPosition="left"
                        placeholder="Search for a book title or an author"
                        autosuggest={false}
                        className="datasearch"
                        innerClass={{
                            input: 'searchbox',
                            list: 'suggestionlist',
                        }}
                    />
                </div>
                <div className="display">
                    <div className="leftSidebar">
                        <RangeSlider
                            componentId="Publication year"
                            dataField="original_publication_year"
                            title="Book publication year"
                            range={{
                                start: 1930,
                                end: 2019,
                            }}
                            rangeLabels={{
                                start: '1930',
                                end: '2019',
                            }}
                            tooltipTrigger="always"
                        />
                        <RatingsFilter
                            componentId="Average rating"
                            dataField="average_rating"
                            data={[
                                { start: 4, end: 5, label: '4 & up' },
                                { start: 3, end: 5, label: '3 & up' },
                                { start: 2, end: 5, label: '2 & up' },
                                { start: 1, end: 5, label: 'All' },
                            ]}
                        />
                        <MultiList
                            componentId="Author"
                            dataField="authors.raw"
                            title="Authors"
                            size={1000}
                            showCheckbox={true}//default value
                            sortBy="asc"
                            className="authors"
                            innerClass={{
                                list: "author-list"
                            }}
                            showSearch={true}//default value
                            showFilter={false}
                            placeholder="Filter by author name"
                            filterLabel="Authors"

                        />
                    </div>
                    <div className="mainBar">
                        <SelectedFilters />
                        <ReactiveList
                            componentId="SearchResult"
                            dataField="original_title"
                            size={20}
                            /* pagination={true}
                            paginationAt="both"
                            URLParams={true} */
                            infiniteScroll={true}
                            sortOptions={
                                [
                                    {
                                        "label": "Publication year",
                                        "dataField": "original_publication_year",
                                        "sortBy": "desc",
                                    },
                                    {
                                        "label": "Average rating",
                                        "dataField": "average_rating",
                                        "sortBy": "desc",
                                    },
                                ]
                            }
                            react={{
                                and: [
                                    "Search",
                                    "Average rating",
                                    "Publication year",
                                    "Author"
                                ]
                            }}
                            render={({ data }) => (
                                <ReactiveList.ResultCardsWrapper>
                                {data.map(item => (
                                    <ResultCard key={item.id}>
                                    <ResultCard.Image src={item.image} />
                                    <ResultCard.Title>
                                        <div className="book-title">
                                            {item.title}
                                        </div>
                                    </ResultCard.Title>

                                    <ResultCard.Description>
                                        <div className="authors-list">
                                            {`by ${item.authors}`}
                                        </div>
                                        <div className="avg-rating">
                                            {`${item.average_rating} ★`}
                                        </div>
                                        <div className="pub-year">
                                            {item.original_publication_year}
                                        </div>
                                    </ResultCard.Description>
                                    </ResultCard>
                                ))}
                                </ReactiveList.ResultCardsWrapper>
                            )}
                            renderError={(error) => (
                                <div>
                                    Something went wrong!<br/>Error details<br/>{error}
                                </div>
                            )
                        }
                        />
                    </div>
                </div>
            </ReactiveBase>
        );
    }
}
export default App;
