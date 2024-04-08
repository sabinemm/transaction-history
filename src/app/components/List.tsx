"use client";
import React, { useEffect, useState } from "react";

export const List = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const submission = {
      operationName: "GetMessagesByAddress",
      variables: {
        limit: 51,
        offset: 0,
        types: "{}",
        address: "{cudos178qftghhlhgqphg8r3jssjnf4rggupxqfjk0ld}",
      },
      query:
        'query GetMessagesByAddress($address: _text, $limit: bigint = 50, $offset: bigint = 0, $types: _text = "{}") {\n  messagesByAddress: messages_by_address(\n    args: {addresses: $address, types: $types, limit: $limit, offset: $offset}\n  ) {\n    transaction {\n      height\n      hash\n      success\n      messages\n      logs\n      block {\n        height\n        timestamp\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
    };
    const fetchData = async () => {
      const response = await fetch(
        "https://explorer-gql.cudos.org/v1/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submission),
        }
      );
      const newData = await response.json();
      console.log(111, newData.data.messagesByAddress);
      setData(newData.data.messagesByAddress);
    };

    fetchData();
  }, []);

  if (data) {
    return <div>data</div>;
  } else {
    return null;
  }
};
