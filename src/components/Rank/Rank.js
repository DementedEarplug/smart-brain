import React, { useState, useEffect } from "react";

const Rank = ({ name, entries }) => {
  const getRankBadge = async (entries) => {
    try {
      const response = await fetch(
        `https://3ou1ysdmvb.execute-api.us-east-1.amazonaws.com/rank?entries=${entries}`
      );
      const data = await response.json();
      setBadge(data.rank);
    } catch (error) {
      console.error("Something went wrong");
      console.error(error);
    }
  };

  const [badge, setBadge] = useState("");

  useEffect(() => {
    if (entries) getRankBadge(entries);
  }, [entries]);

  return (
    <div>
      <div className='white f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>{`${entries}`}</div>
      <div className='white f3'>{`Rank badge ${badge}`}</div>
    </div>
  );
};

export default Rank;
