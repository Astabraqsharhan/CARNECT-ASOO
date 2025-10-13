import { Phone, Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-gray-300 text-gray-800 py-6 mt-20 text-center font-sans">
      {/* شعار Carnect */}
      <div className="mb-4">
        <h2 className="text-4xl font-extrabold tracking-widest">
          <span className="text-sky-400">C</span>arnect
        </h2>
        <p className="text-base text-gray-800 max-w-2xl mx-auto mt-2 leading-relaxed">
          خدمات سيارات متكاملة، تنظيف وفحص وصيانة باحترافية عالية
        </p>
      </div>

      {/* معلومات الاتصال */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-center gap-3">
          <Phone size={18} className="text-gray-800" />
          <span className="text-gray-800 text-base">077012345678</span>
        </div>

        <div className="flex justify-center gap-3 flex-col md:flex-row items-center">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-800"/> 
            <a href="mailto:astabraqsharhan@gmail.com" className="hover:text-gray-600">
              astabraqsharhan@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-800"/> 
            <a href="mailto:shhd88334@gmail.com" className="hover:text-gray-600">
              shhd88334@gmail.com
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-2">
          <a href="https://github.com/YourGitHubUsername" target="_blank" rel="noreferrer">
            <Github className="text-sky-400 hover:text-gray-800" />
          </a>
          <a href="https://www.linkedin.com/in/astabraq-sharhan-838431360" target="_blank" rel="noreferrer">
            <Linkedin className="text-sky-400 hover:text-gray-800" />
          </a>
          <a href="https://www.linkedin.com/in/shahad-as-had-ali-664339382" target="_blank" rel="noreferrer">
            <Linkedin className="text-sky-400 hover:text-gray-800" />
          </a>
          <a href="https://www.linkedin.com/in/fatima-asaad?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer">
            <Linkedin className="text-sky-400 hover:text-gray-800" />
          </a>
        </div>
      </div>

      {/* الحقوق */}
      <div className="border-t border-gray-400 text-center text-sm mt-6 pt-3 text-gray-800">
        © {new Date().getFullYear()} Carnect. جميع الحقوق محفوظة.
        <div className="mt-2 text-lg font-semibold text-gray-800">
          تصميم وتطوير: استبرق - شهد - فاطمة
        </div>
      </div>
    </footer>
  );
}