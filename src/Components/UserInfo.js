import React from "react";
const UserInfo = (props) => {
  let person = props.person;
  return (
    <div className="ui description">
      <div className="item">
        <p>
          Выбран пользователь: <b>{`${person.firstName} ${person.lastName}`}</b>
        </p>
      </div>
      <div className="item">
        <p>
          <b>Описание: </b>
          <p>{person.description}</p>
        </p>
      </div>
      <div className="item">
        <p>
          Адрес проживания: <b>{person.address?.streetAddress}</b>{" "}
        </p>
      </div>
      <div className="item">
        <p>
          Город: <b>{person.address?.city}</b>
        </p>
      </div>
      <div className="item">
        <p>
          Провинция / штат: <b>{person.address?.state}</b>
        </p>
      </div>
      <div className="item">
        <p>
          Индекс: <b>{person.address?.zip}</b>
        </p>
      </div>
    </div>
  );
};
export default UserInfo;
