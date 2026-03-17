"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Briefcase, ChevronRight, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";

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
    title: "Consultoría financiera",
    text: "Análisis, control y planificación para apoyar decisiones con mayor claridad y respaldo.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    icon: BarChart3,
  },
  {
    title: "Optimización de procesos",
    text: "Diseño de flujos eficientes, trazables y escalables para mejorar la operación del negocio.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    icon: Briefcase,
  },
  {
    title: "Transformación digital",
    text: "Implementación de soluciones tecnológicas y plataformas adaptadas a la realidad de cada empresa.",
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

export default function MyCAsesoresLanding() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.09),transparent_18%),radial-gradient(circle_at_left,rgba(255,255,255,0.05),transparent_22%),linear-gradient(to_bottom,#0a0a0a,#121212,#0a0a0a)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-10">
          <div>
            <div className="text-2xl font-black tracking-[0.28em] text-white">MYC</div>
            <div className="text-[11px] uppercase tracking-[0.38em] text-neutral-400">Asesores</div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-neutral-400 md:flex">
            <a href="#servicios" className="transition hover:text-white">Servicios</a>
            <a href="#propuesta" className="transition hover:text-white">Propuesta</a>
            <a href="#contacto" className="transition hover:text-white">Contacto</a>
          </nav>

          <a
            href="https://wa.me/56934680515"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:px-10 lg:pb-28 lg:pt-20">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300"
            >
              Consultoría estratégica, financiera y tecnológica
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
              className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Soluciones corporativas
              <span className="block text-neutral-400">para ordenar, controlar y crecer</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg"
            >
              En MyC Asesores apoyamos a empresas que necesitan una mirada ejecutiva, control operativo y herramientas concretas para tomar mejores decisiones.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-neutral-200"
              >
                Agendar reunión
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
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="text-sm uppercase tracking-[0.22em] text-neutral-400">{title}</div>
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
                    <div className="text-xs uppercase tracking-[0.22em] text-neutral-400">{title}</div>
                    <div className="mt-2 text-sm text-neutral-200">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">Servicios</div>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">Una propuesta corporativa, clara y ejecutable.</h2>
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

      <section id="propuesta" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={fadeUp}>
            <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">Propuesta de valor</div>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">Una asesoría que conecta negocio, operación y tecnología.</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300 sm:text-lg">
              Combinamos experiencia ejecutiva, visión financiera y capacidad de implementación para entregar soluciones reales que se traducen en control, eficiencia y crecimiento.
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

      <section id="contacto" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-12"
        >
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.32em] text-neutral-400">Contacto</div>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl lg:text-5xl">Conversemos sobre tu próxima etapa de crecimiento.</h2>
            <p className="mt-5 text-base leading-8 text-neutral-300 sm:text-lg">
              Si estás evaluando mejorar procesos, fortalecer control o desarrollar nuevas herramientas de gestión, podemos ayudarte a diseñar una solución clara y escalable.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <motion.a
              whileHover={{ y: -4 }}
              href="mailto:m.bahamonde2000@gmail.com"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="rounded-2xl bg-white/10 p-3 text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-neutral-400">Correo</div>
                <div className="break-all font-medium text-white">m.bahamonde2000@gmail.com</div>
              </div>
            </motion.a>

            <motion.a
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
            </motion.a>

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
