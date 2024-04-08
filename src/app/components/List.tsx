"use client";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";

import { ListItem, ListItemProps } from "./ListItem";

export const ItemsList = ({ address }: { address: string }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  /*   TODO: extract to a separate function */
  /*  TO DO: pretty error handling and loading state
   */
  const URL = "https://explorer-gql.cudos.org/v1/graphql";
  useEffect(() => {
    const submission = {
      operationName: "GetMessagesByAddress",
      variables: {
        limit: 51,
        offset: 0,
        types: "{}",
        address: `{${address}}`,
      },
      query:
        'query GetMessagesByAddress($address: _text, $limit: bigint = 50, $offset: bigint = 0, $types: _text = "{}") {\n  messagesByAddress: messages_by_address(\n    args: {addresses: $address, types: $types, limit: $limit, offset: $offset}\n  ) {\n    transaction {\n      height\n      hash\n      success\n      messages\n      logs\n      block {\n        height\n        timestamp\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
    };
    const fetchData = async () => {
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submission),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newData = await response.json();
        setData(newData.data.messagesByAddress);
      } catch (error) {
        setError((error as Error).message);
        console.error((error as Error).message);
      }
    };

    fetchData();
  }, [address]);

  if (data) {
    return (
      <List
        sx={{ width: "100%", maxWidth: 1200 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/* TODO: types */}
        {/*  @ts-ignore */}
        {data?.map((item: { transaction: ListItemProps }, index: React.Key) => (
          <ListItem key={index} item={item.transaction} />
        ))}
      </List>
    );
  } else {
    return (
      <div className="flex w-full h-full align-middle m-auto">
        <CircularProgress />
      </div>
    );
  }
};
