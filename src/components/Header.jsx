import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";

function Header({ t, language, changeLanguage, scrollToSection }) {

    const navigate = useNavigate();
    const location = useLocation();

    const isContactPage = location.pathname === "/contact";

    return (
        <header className="portfolio-header">
            <div className="portfolio-header__container">

                <button
                    className="portfolio-header__logo"
                    onClick={() => {
                        navigate("/");

                        setTimeout(() => {
                            scrollToSection("inicio");
                        }, 100);
                    }}
                >
                    cauã • dev
                </button>

                <nav className="portfolio-header__nav">

                    <button
                        className={`portfolio-header__button ${!isContactPage
                            ? "portfolio-header__button--active"
                            : ""
                            }`}
                        onClick={() => {
                            navigate("/");
                            setTimeout(() => {
                                scrollToSection("inicio");
                            }, 100);
                        }}
                    >
                        {t.nav.home}
                    </button>

                    <button
                        className="portfolio-header__button"
                        onClick={() => {
                            navigate("/");
                            setTimeout(() => {
                                scrollToSection("projetos");
                            }, 100);
                        }}
                    >
                        {t.nav.projects}
                    </button>

                    <button
                        className="portfolio-header__button"
                        onClick={() => {
                            navigate("/");
                            setTimeout(() => {
                                scrollToSection("sobre");
                            }, 100);
                        }}
                    >
                        {t.nav.about}
                    </button>

                    <button
                        className={`portfolio-header__button portfolio-header__button--primary ${isContactPage
                            ? "portfolio-header__button--active"
                            : ""
                            }`}
                        onClick={() => navigate("/contact")}
                    >
                        <span className="portfolio-header__button-content">

                            <span className="portfolio-header__button-text">
                                {t.nav.contact}
                            </span>

                            <span className="portfolio-header__button-icon">
                                <Icon icon="solar:arrow-right-linear" />
                            </span>

                        </span>
                    </button>

                    <div className="language-switch">

                        <button
                            className={`language-switch__button ${language === "pt" ? "active" : ""
                                }`}
                            onClick={() => changeLanguage("pt")}
                        >
                            PT
                        </button>

                        <div className="language-switch__divider" />

                        <button
                            className={`language-switch__button ${language === "en" ? "active" : ""
                                }`}
                            onClick={() => changeLanguage("en")}
                        >
                            EN
                        </button>

                    </div>

                    <button className="portfolio-header__menu">
                        <Icon icon="solar:hamburger-menu-linear" />
                    </button>

                </nav>
            </div>
        </header>
    );
}

export default Header;