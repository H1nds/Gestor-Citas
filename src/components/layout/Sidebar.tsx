// src/components/Sidebar.tsx
import { FaHome, FaUsers, FaShoppingBag } from "react-icons/fa";
import type { NavKey } from "../../types/index"; // <--- IMPORTAMOS DE TYPES

type Props = {
    active: NavKey;
    onNavigate: (key: NavKey) => void;
};

export default function Sidebar({ active, onNavigate }: Props) {
    const navItems = [
        { key: "ventas", icon: FaHome, label: "Inicio" },
        { key: "clientes", icon: FaUsers, label: "Clientes" },
        { key: "compras", icon: FaShoppingBag, label: "Compras" },
    ] as const;

    return (
        <aside className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-t border-gray-100 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] flex flex-row items-center justify-around px-2 z-50 lg:sticky lg:top-0 lg:h-screen lg:w-full lg:glass-panel lg:border-r-0 lg:rounded-r-3xl lg:flex-col lg:justify-start lg:py-8 lg:shadow-none transition-all">

            <div className="hidden lg:block mb-10 relative group cursor-pointer">
                <div className="absolute -inset-2 bg-gradient-to-r from-gold-500 to-gold-700 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <img src="/logo.svg" alt="Logo del Salón" className="w-full h-full object-contain drop-shadow-md transition-transform group-hover:scale-105" />
                </div>
            </div>

            <nav className="flex flex-row lg:flex-col gap-2 lg:gap-4 w-full px-2 lg:px-3 justify-around lg:justify-start">
                {navItems.map((item) => {
                    // Tipado forzado seguro ya que item.key coincide con los valores de NavKey
                    const key = item.key as NavKey;
                    const isActive = active === key;
                    return (
                        <button
                            key={key}
                            onClick={() => onNavigate(key)}
                            className={`group relative flex flex-col items-center justify-center p-2 lg:p-3 rounded-xl transition-all duration-300 flex-1 lg:flex-none ${isActive
                                    ? "bg-babyblue-50 text-babyblue-700 shadow-sm"
                                    : "text-gray-400 hover:bg-white/60 hover:text-gray-600"
                                }`}
                        >
                            <div className={`p-2 lg:p-3 rounded-full mb-1 transition-all ${isActive ? 'bg-babyblue-100 shadow-inner' : 'bg-transparent lg:bg-gray-50 group-hover:bg-white lg:shadow-sm'}`}>
                                <item.icon size={20} className={`transition-transform ${isActive ? 'scale-105' : 'group-hover:scale-110'} text-[18px] lg:text-[20px]`} />
                            </div>
                            <span className={`text-[9px] lg:text-[10px] font-bold tracking-widest uppercase ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>

                            {isActive && (
                                <>
                                    {/* Indicador en versión escritorio (izquierda) */}
                                    <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-babyblue-500 rounded-r-full" />
                                    {/* Indicador en versión móvil (arriba) */}
                                    <span className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 h-1 w-8 bg-babyblue-500 rounded-b-full" />
                                </>
                            )}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}