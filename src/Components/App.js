import React, { useState } from "react";
import Table from "./Table";
import CreateArea from "./CreateArea";
import { Button, Pagination } from "semantic-ui-react";
import { arr1, arr2 } from "../defaultInfo";

const App = () => {
  // data stores the array of all objects
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  //did a user choose the number of entries?
  let [chosen, setChosen] = useState(false);

  const onGetEntries = (e) => {
    console.log(e.target);
    setChosen(true);
    var url = "";
    if (e.target.dataset.size === "small") {
      url =
        "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    } else {
      url =
        "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
    }
    // while loading we show the loading screen
    const get = async () => {
      var newData;
      try {
        const response = await fetch(url);
        newData = await response.json();
        setData(newData);
        setLoading(false);
      } catch (err) {
        setTimeout(() => {
          if (e.target.dataset.size === "small") {
            newData = arr1;
          } else {
            newData = arr2;
          }
          setData(newData);
          setLoading(false);
        }, 1500);
      }
    };
    get();
  };

  const onSort = (field, typeOfSort) => {
    let newArray = [...data];
    // if the field is a number use arifmetic comparator
    if (typeof newArray[0][field] === "number") {
      newArray.sort((a, b) => {
        // ascending or descending order based on 2d argument
        if (typeOfSort === "ascending") {
          return a[field] - b[field];
        }
        return b[field] - a[field];
      });
    } else {
      // string comparator
      newArray.sort((a, b) => {
        console.log(a[field]);
        if (typeOfSort === "ascending") {
          return a[field].localeCompare(b[field]);
        }
        return b[field].localeCompare(a[field]);
      });
    }
    setData(newArray);
  };

  let [activePage, setActivePage] = useState(1);
  const onPaginationChange = (e, paginationData) => {
    console.log(paginationData.activePage);
    setActivePage(paginationData.activePage);
  };

  let numOfPages = Math.ceil(data.length / 50);

  const onSubmit = (newElement) => {
    let newArray = [...data];
    // add the new element to the array
    newArray.splice((activePage - 1) * 50, 0, newElement);
    console.log(newArray);
    setData(newArray);
  };

  if (!chosen) {
    //initial screen
    return (
      <div className="buttons-centered">
        <h1>Choose the number:</h1>
        <Button
          onClick={onGetEntries}
          content="32 entries"
          color="violet"
          size="large"
          data-size="small"
        />
        <Button
          onClick={onGetEntries}
          content="1000 entries"
          color="green"
          size="large"
          data-size="large"
        />
      </div>
    );
    // loading screen
  } else if (loading) {
    return (
      <div className="ui active dimmer">
        <div className="ui big text loader">Loading</div>
      </div>
    );
  } else {
    // maing screen
    return (
      <div>
        <CreateArea page={activePage} data={data} onSubmit={onSubmit} />
        <Table
          data={data}
          setData={setData}
          onSort={onSort}
          page={activePage}
        />
        <Pagination
          activePage={activePage}
          onPageChange={onPaginationChange}
          totalPages={numOfPages}
          pointing
          secondary
        />
      </div>
    );
  }
};

export default App;
