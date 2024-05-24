export default function setTheme() {
    let theme = LuigiClient.uxManager().getCurrentTheme() || 'sap_fiori_3';
    const themeUrl = `https://cdn.jsdelivr.net/npm/@sap-theming/theming-base-content@11.1.48/content/Base/baseLib/${theme}/css_variables.css`;
    const themeTag = document.querySelector('#_theme');
    if (themeTag) {
        document.head.removeChild(themeTag);
    }

    const link = document.createElement('link');
    link.id = '_theme';
    link.href = themeUrl;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}