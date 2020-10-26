import React from "react";

const List = React.memo(props => {
  const {data} = props;
  return (
    <div className="List">
      {data.map(obj => (
        <p key={obj.ms} className={obj.s > 20 ? "redflag" : ""}>
          {obj.h}:{obj.m}:{obj.s}:{obj.ms}
        </p>
      ))}
    </div>
  );
});
export default List;
