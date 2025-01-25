export const initializeDarkMode = () => {
    const darkModePreference = localStorage.getItem("darkMode");
    console.log("Initializing dark mode with preference:", darkModePreference);
    if (darkModePreference === "true" || (!darkModePreference && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  export const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    console.log("Toggling dark mode. Is dark mode now:", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode ? "true" : "false");
  };