import React, { useState } from "react";
// import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const MultiSelect = ({ options, label, value, onChange }) => {
  //   const theme = useTheme();
  const [selectedValues, setSelectedValues] = useState(value || []);

  const handleChange = (event) => {
    const {
      target: { value: selectedItems },
    } = event;
    setSelectedValues(selectedItems);
    onChange(selectedItems);
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          fullWidth
          size="small"
          value={selectedValues}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip size="small" key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              //   style={getStyles(option, selectedValues, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelect;
