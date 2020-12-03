import React, { useState } from "react";
import UserInfo from "./UserInfo";
const nullArrow = {
  id: 0,
  firstName: 0,
  lastName: 0,
  email: 0,
  phone: 0,
};

const Table = (props) => {
  let [arrowPositions, setArrowPositions] = useState(nullArrow);

  const toggleArrow = (e) => {
    // 0 - initial state, after click becomes ascending order, arrow position is not changed
    // 1 - ascending order, after click change arrow position and make descending order
    // 2 - descending order, after click return to state 1
    // on any click not affected arrows go to state 0
    const field = e.target.closest("th").dataset.field;
    let newState = 0;
    if (arrowPositions[field] === 0) {
      newState = 1;
    } else if (arrowPositions[field] === 1) {
      newState = 2;
    } else {
      newState = 1;
    }
    setArrowPositions({
      ...nullArrow,
      [field]: newState,
    });
    if (newState === 1) {
      props.onSort(field, "ascending");
    } else {
      props.onSort(field, "descending");
    }
  };

  let [unfoldedIndex, setUnfoldedIndex] = useState(-1);
  // async to wait until the information is rendered before scrolling down
  const unfoldRow = async (e) => {
    await setUnfoldedIndex(
      // compute the clicked index based on the current page
      (props.page - 1) * 50 +
        Number(e.target.closest("tr").getAttribute("name"))
    );
    window.scrollTo(0, document.body.scrollHeight);
  };
  return (
    <div>
      <table className="ui celled large table">
        <thead>
          <tr>
            {Object.keys(nullArrow).map((field, index) => (
              <th
                key={index + props.data.length}
                onClick={toggleArrow}
                data-field={field}
                className="three wide"
              >
                {field}
                <i
                  className={
                    arrowPositions[field] === 2
                      ? "angle up icon"
                      : "angle down icon"
                  }
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data
            // select only 50 elements of the array based on the active page
            .slice((props.page - 1) * 50, props.page * 50)
            .map((entry, index) => (
              <tr key={index} name={index} onClick={unfoldRow}>
                <td>{entry.id}</td>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>{entry.email}</td>
                <td>{entry.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* show info only when a user first clicks */}
      {unfoldedIndex !== -1 && <UserInfo person={props.data[unfoldedIndex]} />}
    </div>
  );
};

export default Table;
