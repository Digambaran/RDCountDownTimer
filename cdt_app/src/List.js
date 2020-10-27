import React from "react";

const List = React.memo(props => {
  const {data} = props;
  return (
    <div className="List">
      <table className="List_table">
        <thead>
          <tr>
            <th>Start time</th>
            <th>lap time</th>
            <th>end time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(obj => (
            <tr>
              <td>
                <p>
                  {obj.start.h}:{obj.start.m}:{obj.start.s}:{obj.start.ms}
                </p>
              </td>
              <td>
                {" "}
                <p
                  className={
                    obj.s > 20 || obj.m > 0 || obj.h > 0 > 20 ? "redflag" : ""
                  }>
                  {obj.lap.h}:{obj.lap.m}:{obj.lap.s}:{obj.lap.ms}
                </p>
              </td>
              <td>
                {" "}
                <p>
                  {obj.end.h}:{obj.end.m}:{obj.end.s}:{obj.end.ms}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
export default List;
