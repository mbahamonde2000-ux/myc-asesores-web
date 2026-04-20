"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  X,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12 },
  }),
};

const services = [
  {
    title: "Estructuración financiera",
    text: "Ordenamos la estructura financiera de tu empresa, generando visibilidad, control y una base sólida para la toma de decisiones.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    icon: BarChart3,
  },
  {
    title: "Gestión y control operativo",
    text: "Implementamos procesos claros y medibles que permiten controlar la operación, reducir errores y mejorar la eficiencia del negocio.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    icon: Briefcase,
  },
  {
    title: "Tecnología y herramientas a medida",
    text: "Desarrollamos soluciones adaptadas a tu empresa, integrando tecnología que realmente se ajusta a tu forma de trabajar.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    icon: ShieldCheck,
  },
];

const pillars = [
  "Diagnóstico ejecutivo del negocio",
  "Definición de prioridades y módulos clave",
  "Implementación gradual con foco práctico",
  "Acompañamiento continuo y mejora permanente",
];

const navItems = [
  { label: "Problemas", href: "#problemas", id: "problemas" },
  { label: "Solución", href: "#propuesta", id: "propuesta" },
  { label: "Servicios", href: "#servicios", id: "servicios" },
  { label: "Caso", href: "#caso", id: "caso" },
  { label: "Contacto", href: "#contacto", id: "contacto" },
  
];

export default function MyCAsesoresLanding() {
    const [activeSection, setActiveSection] = useState("problemas");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

useEffect(() => {
  const sectionIds = ["problemas", "propuesta", "servicios", "caso", "contacto"];

  const handleScroll = () => {
    const scrollBottom = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollBottom >= documentHeight - 180) {
      setActiveSection("contacto");
      return;
    }

    const viewportMiddle = window.innerHeight * 0.35;
    let currentSection = sectionIds[0];

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;

      const rect = element.getBoundingClientRect();

      if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
        currentSection = id;
        break;
      }

      if (rect.top <= viewportMiddle) {
        currentSection = id;
      }
    }

    setActiveSection(currentSection);
  };

  handleScroll();
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, []);

  const handleNavClick = (href: string) => {
  setMobileMenuOpen(false);

  if (!href.startsWith("#")) {
    window.location.href = href;
    return;
  }

  const targetId = href.replace("#", "");
  const element = document.getElementById(targetId);

  if (element) {
    const headerOffset = 96;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.09),transparent_18%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_22%),linear-gradient(to_bottom,#0a0a0a,#121212,#0a0a0a)]" />
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-10">
          <div className="flex h-10 items-center">
            <Image
              src="/Logo.png"
              alt="MyC Asesores"
              width={100}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <nav className="hidden items-center gap-8 md:flex">
  {navItems.map((item) => {
    const isInternalSection = item.href.startsWith("#");
    const isActive = isInternalSection && activeSection === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNavClick(item.href)}
        className="group relative text-sm transition"
      >
        <span
          className={`transition ${
            isActive ? "text-white" : "text-neutral-400 group-hover:text-white"
          }`}
        >
          {item.label}
        </span>
        <span
          className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </button>
    );
  })}
</nav>

         <div className="flex items-center gap-3">
  <a
    href="/seccion-clientes"
    className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-neutral-200 sm:inline-flex"
  >
    <ShieldCheck className="h-4 w-4" />
    Clientes
  </a>

  <a
    href="https://wa.me/56934680515"
    target="_blank"
    rel="noreferrer"
    className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:inline-flex"
  >
    <MessageCircle className="h-4 w-4" />
    WhatsApp
  </a>

  <button
    type="button"
    onClick={() => setMobileMenuOpen((prev) => !prev)}
    className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10 md:hidden"
    aria-label="Abrir menú"
  >
    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
  </button>
</div>
        </div>

        {mobileMenuOpen && (
  <div className="border-t border-white/10 bg-neutral-950/95 px-5 py-4 md:hidden">
    <div className="flex flex-col gap-3">
  {navItems.map((item) => {
    const isActive = activeSection === item.id;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleNavClick(item.href)}
        className={`rounded-xl px-3 py-3 text-left text-sm transition ${
          isActive
            ? "bg-white text-black"
            : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        {item.label}
      </button>
    );
  })}

  {/* 👉 AQUÍ VA EL BOTÓN NUEVO */}
  <a
    href="/seccion-clientes"
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
  >
    <ShieldCheck className="h-4 w-4" />
    Sección Clientes
  </a>

  {/* 👇 ESTE YA LO TENÍAS */}
  <a
    href="https://wa.me/56934680515"
    target="_blank"
    rel="noreferrer"
    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
  >
    <MessageCircle className="h-4 w-4" />
    WhatsApp
  </a>
</div>
  </div>
)}
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-28 sm:px-6 lg:grid-cols-2 lg:px-10 lg:pb-28 lg:pt-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300"
            >
              Consultoría estratégica, financiera y tecnológica para tu pyme
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Recupera el control de tu empresa y toma decisiones con información real
              <span className="block text-neutral-400">y toma decisiones con información real</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg"
            >
              En MyC Asesores ayudamos a pymes a salir del desorden, recuperar el control y
              construir una operación preparada para crecer, mediante procesos claros y
              herramientas adaptadas a su realidad.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="mailto:contacto@mycasesores.cl?subject=Solicitud%20de%20reunión&body=Hola,%20quiero%20agendar%20una%20reunión%20para%20revisar%20mi%20empresa."
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-neutral-200"
              >
                Agenda un diagnóstico inicial
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Ver servicios
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
              className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {[
                ["Visión", "Ejecutiva y práctica"],
                ["Control", "Operativo y financiero"],
                ["Escala", "Soluciones preparadas para crecer"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <div className="text-sm uppercase tracking-[0.22em] text-neutral-400">
                    {title}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-neutral-200">{text}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-2 top-8 hidden h-20 w-20 rounded-full bg-white/10 blur-2xl sm:block"
            />
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 bottom-8 hidden h-24 w-24 rounded-full bg-white/10 blur-2xl sm:block"
            />

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900/70 shadow-2xl shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80"
                alt="Equipo de consultoría corporativa"
                className="h-[320px] w-full object-cover sm:h-[420px]"
              />
              <div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
                {[
                  ["Estrategia", "Definición de prioridades"],
                  ["Gestión", "Procesos con trazabilidad"],
                  ["Tecnología", "Herramientas para operar mejor"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-neutral-400">
                      {title}
                    </div>
                    <div className="mt-2 text-sm text-neutral-200">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="problemas" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">
            Problemas que resolvemos
          </div>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
            Si esto te suena familiar, podemos ayudarte.
          </h2>
        </motion.div>
        <p className="mt-4 text-neutral-300 max-w-2xl">
        La mayoría de las empresas no falla por falta de ventas, sino por falta de control:
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            "Falta de claridad financiera para tomar decisiones",
            "Procesos desordenados o poco controlados",
            "Crecimiento sin estructura ni control",
            "Información dispersa o poco confiable",
            "Dependencia excesiva de personas clave",
            "Sistemas que no se adaptan al negocio",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 text-neutral-300"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      <section id="propuesta" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">
              Propuesta de valor
            </div>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
              Una asesoría que conecta negocio, operación y tecnología.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300 sm:text-lg">
              Combinamos experiencia ejecutiva, visión financiera y capacidad de
              implementación para entregar soluciones reales que se traducen en control,
              eficiencia y crecimiento.
            </p>
            <p className="mt-6 text-lg font-semibold text-white">
              La empresa no se adapta al sistema. El sistema se adapta a la empresa.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {pillars.map((item, index) => (
              <motion.div
                key={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                custom={index}
                className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 text-neutral-200"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="metodologia" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">
              Cómo trabajamos
            </div>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
              Un enfoque práctico, claro y orientado a resultados.
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              "Diagnóstico financiero y operativo del negocio",
              "Identificación de puntos críticos y prioridades",
              "Diseño de procesos y estructura de control",
              "Implementación de herramientas adaptadas a la empresa",
              "Acompañamiento continuo y mejora permanente",
              "Enfoque práctico, no teórico",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={index}
                className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 text-neutral-300"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">
            Servicios
          </div>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
            Una propuesta corporativa, clara y ejecutable.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={index}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900/70"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-neutral-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-neutral-400">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="caso" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">
            Caso aplicado
          </div>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
            De crecimiento desordenado a operación controlada.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6"
          >
            <div className="text-sm text-neutral-400">Cliente</div>
            <div className="mt-2 text-lg font-semibold text-white">
              Empresa de servicios profesionales
            </div>
            <div className="mt-2 text-sm text-neutral-400">
              Pyme en proceso de crecimiento
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={1}
            className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6"
          >
            <div className="text-sm text-neutral-400">Situación inicial</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>- Crecimiento sin estructura financiera clara</li>
              <li>- Información dispersa en múltiples planillas</li>
              <li>- Falta de control sobre ingresos y costos</li>
              <li>- Procesos operativos poco definidos</li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={2}
            className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6"
          >
            <div className="text-sm text-neutral-400">Solución implementada</div>
            <ul className="mt-3 space-y-2 text-sm text-neutral-300">
              <li>- Estructuración financiera del negocio</li>
              <li>- Definición de procesos y puntos de control</li>
              <li>- Centralización de la información de gestión</li>
              <li>- Implementación de herramienta adaptada a la operación</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-neutral-200"
        >
          Resultado: la empresa pasó de operar con información dispersa y sin control, a tener visibilidad financiera clara, procesos definidos y capacidad real de toma de decisiones, quedando preparada para escalar.
        </motion.div>
      </section>

      <section id="credibilidad" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">
            Por qué MyC Asesores
          </div>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
            Experiencia, criterio y ejecución real.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            "Experiencia en instituciones financieras y entorno corporativo",
            "Enfoque práctico: implementamos, no solo diagnosticamos",
            "Soluciones adaptadas a cada empresa, no modelos genéricos",
            "Integración de finanzas, operación y tecnología",
            "Acompañamiento cercano en todo el proceso",
            "Resultados enfocados en control, eficiencia y crecimiento",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={index}
              className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 text-neutral-300"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

<section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
  <div className="text-center">
    <h2 className="text-3xl font-black sm:text-4xl">
      Ordenar tu empresa no es opcional si quieres crecer.
    </h2>
    <p className="mt-4 text-neutral-400">
      Mientras antes tomes control, mejores decisiones vas a poder tomar.
    </p>
  </div>
</section>



      <section id="contacto" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-12"
        >

          
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">
              Contacto
            </div>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">
              Solicita un diagnóstico inicial y ordena tu empresa para crecer con control.
            </h2>
            <p className="mt-5 text-base leading-8 text-neutral-300 sm:text-lg">
              Agenda una conversación inicial y revisemos cómo estructurar tu empresa,
              mejorar el control y tomar decisiones con mayor claridad.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <motion.a
              whileHover={{ y: -4 }}
              href="mailto:contacto@mycasesores.cl"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="rounded-2xl bg-white/10 p-3 text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-neutral-400">Correo</div>
                <div className="break-all font-medium text-white">
                  contacto@mycasesores.cl
                </div>
              </div>
            </motion.a>

           {/* <motion.a
              whileHover={{ y: -4 }}
              href="tel:+56934680515"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="rounded-2xl bg-white/10 p-3 text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-neutral-400">Teléfono</div>
                <div className="font-medium text-white">+56 9 3468 0515</div>
              </div>
            </motion.a>*/}

            <motion.a
              whileHover={{ y: -4 }}
              href="https://wa.me/56934680515"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="rounded-2xl bg-white/10 p-3 text-white">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-neutral-400">WhatsApp</div>
                <div className="font-medium text-white">Escríbenos ahora</div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}