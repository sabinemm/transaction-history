"use client";
import { useState } from "react";
import { ItemsList } from "./components/List";
import { Wrapper } from "./components/Wrapper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Home() {
  const [address, setAddress] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAddress(event.target.value as string);
  };

  const options = [
    "cudos1nj49l56x7sss5hqyvfmctxr3mq64whg273g3x5",
    "cudos1c3qgr4df6u3awsz6rqwkxcpsef7aau7p23pew5",
    "cudos1genudzpvqe2t9k64xwueua35a8kfvl3fc6uc62",
    "cudos1qy475hk07ngugq7dlwg94yjw0yye7yjl8djrsn",
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        header
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        {/*   TODO: input */}
        <Wrapper>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="address-label">Address:</InputLabel>
              <Select
                labelId="Address"
                id="address-select"
                value={address}
                label="Address"
                onChange={handleChange}
              >
                {options.map((option, index) => (
                  <MenuItem value={option} key={index}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <ItemsList address={address} />
        </Wrapper>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </main>
  );
}
