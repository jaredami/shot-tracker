export function calcPercentage(value, totalValue) {
  return Math.floor((value / totalValue) * 100);
}

export const userSelectStyles = {
  control: (base, state) => ({
    ...base,
    background: "#222626",
    // Match with the menu
    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
    // Overwrites the different states of border
    borderColor: state.isFocused ? "#5c8688" : null,
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrites the different states of border
      borderColor: state.isFocused ? "#5c8688" : "#dedae0",
    },
  }),
  input: (base) => ({
    ...base,
    color: "#dedae0",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#dedae0",
  }),
  menu: (base) => ({
    ...base,
    // Override border radius to match the box
    borderRadius: 0,
    // Kill the gap
    marginTop: 0,
    background: "#2d3134",
  }),
  menuList: (base) => ({
    ...base,
    // Kill the white space on first and last option
    padding: 0,
  }),
  option: (styles, state) => {
    return {
      ...styles,
      backgroundColor: state.isFocused ? "#505155" : null,
    };
  },
};
