import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface Palette {
      accent: Palette['primary'];
      backgground: Palette['primary'];
    }
  
    interface PaletteOptions {
      accent?: PaletteOptions['primary'];
      backgground: Palette['primary'];
    }
  }

const theme = createTheme({
    palette:{
        primary:{
            main: "rgb(66, 102, 175)"
        },
        secondary:{
            main:"#f50057",
            light: "#e91e63"
        },
        accent:{
            main: "#ff1744"
        },
        background:{
            main: "#282c34",
            light: "#474e5d",
            dark: "rgb(20, 20, 34)"
        }
    },

});
export default theme;