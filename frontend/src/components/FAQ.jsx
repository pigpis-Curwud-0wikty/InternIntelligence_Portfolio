import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What core skills do I have?",
            answer: "I specialize in Front-end development using React, Next.js, and Tailwind CSS. I also have experience with backend technologies like Node.js and databases."
        },
        {
            question: "Can I build a professional website from scratch?",
            answer: "Yes, I can handle the entire process from design to deployment, ensuring a high-quality, responsive, and performant website."
        },
        {
            question: "Am I able to work with APIs?",
            answer: "Absolutely! I have extensive experience integrating third-party APIs and building custom API endpoints for data fetching and manipulation."
        },
        {
            question: "Can I edit or improve an existing website?",
            answer: "Yes, I can audit your existing website, identify areas for improvement, and implement changes to enhance performance, accessibility, and user experience."
        }
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQ</h2>
                    <p className="text-subtitle max-w-2xl">
                        Frequently Asked Questions
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-border rounded-xl overflow-hidden bg-secondary transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-lg">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="text-blue flex-shrink-0" />
                                ) : (
                                    <Plus className="text-blue flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-6 pt-2 text-green-500 font-meduim text-lg border-t border-border/50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
