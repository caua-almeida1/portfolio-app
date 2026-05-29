import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import emailjs from "@emailjs/browser";

function Contact({ t }) {
    const [toast, setToast] = useState({
        show: false,
        leaving: false,
        type: "success",
        title: "",
        description: ""
    });

    const pageRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [isSending, setIsSending] = useState(false);

    useEffect(() => {

        gsap.fromTo(
            pageRef.current,
            {
                scale: 0.985,
                opacity: 0,
                y: 12
            },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "expo.out"
            }
        );

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const closeToast = () => {

        setToast(prev => ({
            ...prev,
            leaving: true
        }));

        setTimeout(() => {

            setToast({
                show: false,
                leaving: false,
                type: "success",
                title: "",
                description: ""
            });

        }, 400);

    };

    const showToastMessage = (
        type,
        title,
        description
    ) => {

        setToast({
            show: true,
            leaving: false,
            type,
            title,
            description
        });

        setTimeout(() => {
            closeToast();
        }, 4000);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.message.trim()
        ) {

            showToastMessage(
                "error",
                "Campos obrigatórios",
                "Preencha todas as informações do formulário."
            );

            return;
        }

        try {

            setIsSending(true);

            await emailjs.send(
                "service_hx4yfsy",
                "template_o8yztaj",
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                "tMJVDClKcwp_Q0b0M"
            );

            showToastMessage(
                "success",
                "Email enviado :)",
                "Sua mensagem foi enviada com sucesso."
            );

            setFormData({
                name: "",
                email: "",
                message: ""
            });

        } catch (error) {

            console.error(error);

            showToastMessage(
                "error",
                "Erro ao enviar",
                "Ocorreu um problema ao enviar sua mensagem."
            );

        } finally {

            setIsSending(false);

        }

    };

    return (
        <div className="app">

            <main
                className="contact-page"
                ref={pageRef}
            >

                <section className="contact-page__hero">

                    <div className="section-container">

                        <div className="contact-page__wrapper">

                            {/* LEFT SIDE */}
                            <div className="contact-page__content">

                                <span className="contact-page__label">
                                    {t.contactPage.label}
                                </span>

                                <h1 className="contact-page__title">
                                    {t.contactPage.title.normal}{" "}
                                    <span>
                                        {t.contactPage.title.highlight}
                                    </span>
                                </h1>

                                <p className="contact-page__description">
                                    {t.contactPage.description}
                                </p>

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="contact-page__form-wrapper">

                                <form
                                    className="contact-page__form"
                                    onSubmit={handleSubmit}
                                >

                                    <div className="contact-page__field">

                                        <label>
                                            {t.contactPage.form.name}
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={
                                                t.contactPage.form.namePlaceholder
                                            }
                                        />

                                    </div>

                                    <div className="contact-page__field">

                                        <label>
                                            {t.contactPage.form.email}
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={
                                                t.contactPage.form.emailPlaceholder
                                            }
                                        />

                                    </div>

                                    <div className="contact-page__field">

                                        <label>
                                            {t.contactPage.form.message}
                                        </label>

                                        <textarea
                                            rows="6"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder={
                                                t.contactPage.form.messagePlaceholder
                                            }
                                        />

                                    </div>
                                    <p className="contact-page__helper">
                                        {t.contactPage.form.helperText}{" "}

                                        <a
                                            href="https://www.linkedin.com/in/caua-goncalves-de-almeida-44866a324/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            LinkedIn
                                        </a>
                                    </p>

                                    <button
                                        type="submit"
                                        className="contact-page__submit"
                                    >

                                        <span className="contact-page__submit-content">

                                            <span className="contact-page__submit-text">
                                                {isSending
                                                    ? "Enviando..."
                                                    : t.contactPage.form.button}
                                            </span>

                                            <span className="contact-page__submit-icon">
                                                <Icon icon="solar:arrow-right-linear" />
                                            </span>

                                        </span>

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

            {toast.show && (

                <div
                    className={`
            contact-toast
            ${toast.leaving ? "contact-toast--out" : ""}
            ${toast.type === "error"
                            ? "contact-toast--error"
                            : ""}
        `}
                >

                    <div className="contact-toast__icon">

                        <Icon
                            icon={
                                toast.type === "success"
                                    ? "mingcute:check-fill"
                                    : "wordpress:error"
                            }
                        />

                    </div>

                    <div className="contact-toast__content">

                        <p className="contact-toast__title">
                            {toast.title}
                        </p>

                        <p className="contact-toast__description">
                            {toast.description}
                        </p>

                    </div>

                    <button
                        className="contact-toast__close"
                        onClick={closeToast}
                    >

                        <Icon icon="mingcute:close-line" />

                    </button>

                </div>

            )}
        </div>
    );
}

export default Contact;