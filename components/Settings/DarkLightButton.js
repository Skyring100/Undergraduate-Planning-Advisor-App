
const { setTheme } = useThemeStore();
const [isDarkMode, setIsDarkMode] = useState(false);

const toggleTheme = () => {
  setIsDarkMode(!isDarkMode);
  setTheme(prevTheme => ({
    ...prevTheme,
    isDarkMode: !prevTheme.isDarkMode
  }));
};