import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function Search() {
  const [input, setInput] = useState("");
  const handleSubmitInput = (e: React.KeyboardEvent<object>) => {
    const target = e.target as HTMLInputElement;
    const keyCode = e.keyCode;
    if (keyCode === 13) {
      e.preventDefault();
      setInput(target.value);
    }
  };
  console.log(input);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onKeyDown={(e) => handleSubmitInput(e)}
      />
    </Box>
  );
}
