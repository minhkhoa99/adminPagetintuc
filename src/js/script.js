export const toggleSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    if (sidebar) {
      sidebar.classList.toggle("collapsed");
    }
  };
  
  export const toggleTheme = () => {
    toggleLocalStorage();
    toggleRootClass();
  };
  
  export const toggleRootClass = () => {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const inverted = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', inverted);
  };
  
  export const toggleLocalStorage = () => {
    if (isLight()) {
      localStorage.removeItem("light");
    } else {
      localStorage.setItem("light", "set");
    }
  };
  
  export const isLight = () => {
    return localStorage.getItem("light");
  };