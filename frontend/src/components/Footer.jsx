import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-secondary border-t border-border py-8 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-subtitle text-sm text-center md:text-left">
                    © {new Date().getFullYear()} Ziad Mohamed. All rights reserved.
                </p>

                <div className="flex items-center gap-6">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-blue transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-blue transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-subtitle hover:text-blue transition-colors">
                        <Twitter size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
