"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { getSession } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Building2,
  ChevronDown,
  ChevronUp,
  FileText,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

type SessionUser = {
  id: number;
  nombre: string;
  username: string;
  role: "admin" | "usuario" | "cliente";
  clientId?: number | null;
};

type Client = {
  id: number;
  razonSocial: string;
  rut: string;
  giro: string;
  contacto: string;
  correo: string;
  telefono: string;
  direccion: string;
  comuna: string;
  ciudad: string;
};

type ClientDocument = {
  id: number;
  clientId: number;
  nombre: string;
  categoria: string;
  fecha: string;
  archivo: string;
};

type ClientService = {
  id: number;
  clientId: number;
  nombre: string;
  estado: string;
  fechaInicio: string;
  descripcion: string;
};

const CLIENTS_STORAGE_KEY = "myc_clients_v2";
const CLIENT_DOCUMENTS_STORAGE_KEY = "myc_client_documents_v1";
const CLIENT_SERVICES_STORAGE_KEY = "myc_client_services_v1";

const SERVICE_STATUS_OPTIONS = [
  "Activo",
  "En implementación",
  "Pausado",
  "Finalizado",
];

const emptyClientForm: Omit<Client, "id"> = {
  razonSocial: "",
  rut: "",
  giro: "",
  contacto: "",
  correo: "",
  telefono: "",
  direccion: "",
  comuna: "",
  ciudad: "",
};

const emptyDocumentForm = {
  nombre: "",
  categoria: "",
  fecha: "",
  archivo: "",
};

const emptyServiceForm = {
  nombre: "",
  estado: "",
  fechaInicio: "",
  descripcion: "",
};

const initialDemoClient: Client = {
  id: 1,
  razonSocial: "Cliente Demo SpA",
  rut: "76.123.456-7",
  giro: "Servicios de consultoría y apoyo empresarial",
  contacto: "Mariano Bahamonde",
  correo: "cliente@demo.cl",
  telefono: "+56 9 1234 5678",
  direccion: "Av. Principal 1234",
  comuna: "La Reina",
  ciudad: "Santiago",
};

const initialDemoDocuments: ClientDocument[] = [
  {
    id: 1,
    clientId: 1,
    nombre: "Contrato de prestación de servicios",
    categoria: "Contrato",
    fecha: "2026-04-02",
    archivo: "/documentos/cliente-demo/contrato-servicios.pdf",
  },
  {
    id: 2,
    clientId: 1,
    nombre: "Informe inicial de diagnóstico",
    categoria: "Informe",
    fecha: "2026-04-10",
    archivo: "/documentos/cliente-demo/informe-diagnostico.pdf",
  },
  {
    id: 3,
    clientId: 1,
    nombre: "Propuesta de trabajo",
    categoria: "Propuesta",
    fecha: "2026-04-14",
    archivo: "/documentos/cliente-demo/propuesta-trabajo.pdf",
  },
];

const initialDemoServices: ClientService[] = [
  {
    id: 1,
    clientId: 1,
    nombre: "Estructuración financiera",
    estado: "Activo",
    fechaInicio: "2026-04-01",
    descripcion:
      "Ordenamiento financiero, visibilidad de indicadores y apoyo en la toma de decisiones.",
  },
  {
    id: 2,
    clientId: 1,
    nombre: "Gestión y control operativo",
    estado: "Activo",
    fechaInicio: "2026-04-08",
    descripcion:
      "Diseño de procesos, control operativo y mejora de trazabilidad interna.",
  },
  {
    id: 3,
    clientId: 1,
    nombre: "Tecnología y herramientas a medida",
    estado: "En implementación",
    fechaInicio: "2026-04-15",
    descripcion:
      "Apoyo en soluciones tecnológicas adaptadas a la realidad de la empresa.",
  },
];

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<SessionUser | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [documents, setDocuments] = useState<ClientDocument[]>([]);
  const [services, setServices] = useState<ClientService[]>([]);

  const [form, setForm] = useState<Omit<Client, "id">>(emptyClientForm);
  const [editingClientId, setEditingClientId] = useState<number | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);

  const [expandedClientId, setExpandedClientId] = useState<number | null>(null);
  const [expandedDocumentId, setExpandedDocumentId] = useState<number | null>(null);
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDocumentFormOpen, setIsDocumentFormOpen] = useState(false);
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);

  const [savedMessage, setSavedMessage] = useState("");
  const [documentsMessage, setDocumentsMessage] = useState("");
  const [servicesMessage, setServicesMessage] = useState("");

  const [search, setSearch] = useState("");
  const [selectedClientIdForDocuments, setSelectedClientIdForDocuments] =
    useState<number | null>(1);
  const [selectedClientIdForServices, setSelectedClientIdForServices] =
    useState<number | null>(1);

  const [documentForm, setDocumentForm] = useState(emptyDocumentForm);
  const [serviceForm, setServiceForm] = useState(emptyServiceForm);

  useEffect(() => {
    const session = getSession() as SessionUser | null;

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.role !== "admin") {
      router.push("/login");
      return;
    }

    setUser(session);

    const storedClients = localStorage.getItem(CLIENTS_STORAGE_KEY);

    if (!storedClients) {
      const initialClients = [initialDemoClient];
      setClients(initialClients);
      localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(initialClients));
    } else {
      try {
        const parsedClients = JSON.parse(storedClients) as Client[];

        if (!Array.isArray(parsedClients) || parsedClients.length === 0) {
          const initialClients = [initialDemoClient];
          setClients(initialClients);
          localStorage.setItem(
            CLIENTS_STORAGE_KEY,
            JSON.stringify(initialClients)
          );
        } else {
          setClients(parsedClients);
        }
      } catch (error) {
        console.error("Error al cargar clientes desde localStorage:", error);
        const initialClients = [initialDemoClient];
        setClients(initialClients);
        localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(initialClients));
      }
    }

    const storedDocuments = localStorage.getItem(CLIENT_DOCUMENTS_STORAGE_KEY);

    if (!storedDocuments) {
      setDocuments(initialDemoDocuments);
      localStorage.setItem(
        CLIENT_DOCUMENTS_STORAGE_KEY,
        JSON.stringify(initialDemoDocuments)
      );
    } else {
      try {
        const parsedDocuments = JSON.parse(storedDocuments) as ClientDocument[];

        if (!Array.isArray(parsedDocuments)) {
          setDocuments(initialDemoDocuments);
          localStorage.setItem(
            CLIENT_DOCUMENTS_STORAGE_KEY,
            JSON.stringify(initialDemoDocuments)
          );
        } else {
          setDocuments(parsedDocuments);
        }
      } catch (error) {
        console.error("Error al cargar documentos desde localStorage:", error);
        setDocuments(initialDemoDocuments);
        localStorage.setItem(
          CLIENT_DOCUMENTS_STORAGE_KEY,
          JSON.stringify(initialDemoDocuments)
        );
      }
    }

    const storedServices = localStorage.getItem(CLIENT_SERVICES_STORAGE_KEY);

    if (!storedServices) {
      setServices(initialDemoServices);
      localStorage.setItem(
        CLIENT_SERVICES_STORAGE_KEY,
        JSON.stringify(initialDemoServices)
      );
    } else {
      try {
        const parsedServices = JSON.parse(storedServices) as ClientService[];

        if (!Array.isArray(parsedServices)) {
          setServices(initialDemoServices);
          localStorage.setItem(
            CLIENT_SERVICES_STORAGE_KEY,
            JSON.stringify(initialDemoServices)
          );
        } else {
          setServices(parsedServices);
        }
      } catch (error) {
        console.error("Error al cargar servicios desde localStorage:", error);
        setServices(initialDemoServices);
        localStorage.setItem(
          CLIENT_SERVICES_STORAGE_KEY,
          JSON.stringify(initialDemoServices)
        );
      }
    }
  }, [router]);

  useEffect(() => {
    if (clients.length > 0 && selectedClientIdForDocuments === null) {
      setSelectedClientIdForDocuments(clients[0].id);
    }
  }, [clients, selectedClientIdForDocuments]);

  useEffect(() => {
    if (clients.length > 0 && selectedClientIdForServices === null) {
      setSelectedClientIdForServices(clients[0].id);
    }
  }, [clients, selectedClientIdForServices]);

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return clients;

    return clients.filter((client) => {
      return (
        client.razonSocial.toLowerCase().includes(term) ||
        client.rut.toLowerCase().includes(term) ||
        client.contacto.toLowerCase().includes(term) ||
        client.correo.toLowerCase().includes(term) ||
        client.comuna.toLowerCase().includes(term) ||
        client.ciudad.toLowerCase().includes(term)
      );
    });
  }, [clients, search]);

  const selectedClient = useMemo(() => {
    return (
      clients.find((client) => client.id === selectedClientIdForDocuments) ?? null
    );
  }, [clients, selectedClientIdForDocuments]);

  const selectedServiceClient = useMemo(() => {
    return (
      clients.find((client) => client.id === selectedClientIdForServices) ?? null
    );
  }, [clients, selectedClientIdForServices]);

  const selectedClientDocuments = useMemo(() => {
    if (!selectedClientIdForDocuments) return [];
    return documents.filter(
      (doc) => doc.clientId === selectedClientIdForDocuments
    );
  }, [documents, selectedClientIdForDocuments]);

  const selectedClientServices = useMemo(() => {
    if (!selectedClientIdForServices) return [];
    return services.filter((service) => service.clientId === selectedClientIdForServices);
  }, [services, selectedClientIdForServices]);

  const handleChange = (field: keyof Omit<Client, "id">, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDocumentChange = (
    field: keyof typeof emptyDocumentForm,
    value: string
  ) => {
    setDocumentForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceChange = (
    field: keyof typeof emptyServiceForm,
    value: string
  ) => {
    setServiceForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyClientForm);
    setEditingClientId(null);
  };

  const closeForm = () => {
    resetForm();
    setIsFormOpen(false);
  };

  const resetDocumentForm = () => {
    setDocumentForm(emptyDocumentForm);
  };

  const closeDocumentForm = () => {
    resetDocumentForm();
    setIsDocumentFormOpen(false);
  };

  const resetServiceForm = () => {
    setServiceForm(emptyServiceForm);
    setEditingServiceId(null);
  };

  const closeServiceForm = () => {
    resetServiceForm();
    setIsServiceFormOpen(false);
  };

  const showSavedMessage = (message: string) => {
    setSavedMessage(message);
    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  const showDocumentsMessage = (message: string) => {
    setDocumentsMessage(message);
    setTimeout(() => {
      setDocumentsMessage("");
    }, 3000);
  };

  const showServicesMessage = (message: string) => {
    setServicesMessage(message);
    setTimeout(() => {
      setServicesMessage("");
    }, 3000);
  };

  const persistClients = (updatedClients: Client[]) => {
    setClients(updatedClients);
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(updatedClients));
  };

  const persistDocuments = (updatedDocuments: ClientDocument[]) => {
    setDocuments(updatedDocuments);
    localStorage.setItem(
      CLIENT_DOCUMENTS_STORAGE_KEY,
      JSON.stringify(updatedDocuments)
    );
  };

  const persistServices = (updatedServices: ClientService[]) => {
    setServices(updatedServices);
    localStorage.setItem(
      CLIENT_SERVICES_STORAGE_KEY,
      JSON.stringify(updatedServices)
    );
  };

  const getNextClientId = () => {
    if (clients.length === 0) return 1;
    return Math.max(...clients.map((client) => client.id)) + 1;
  };

  const getNextDocumentId = () => {
    if (documents.length === 0) return 1;
    return Math.max(...documents.map((doc) => doc.id)) + 1;
  };

  const getNextServiceId = () => {
    if (services.length === 0) return 1;
    return Math.max(...services.map((service) => service.id)) + 1;
  };

  const isFormValid =
    form.razonSocial.trim() !== "" &&
    form.rut.trim() !== "" &&
    form.contacto.trim() !== "" &&
    form.correo.trim() !== "";

  const isDocumentFormValid =
    selectedClientIdForDocuments !== null &&
    documentForm.nombre.trim() !== "" &&
    documentForm.categoria.trim() !== "" &&
    documentForm.fecha.trim() !== "" &&
    documentForm.archivo.trim() !== "";

  const isServiceFormValid =
    selectedClientIdForServices !== null &&
    serviceForm.nombre.trim() !== "" &&
    serviceForm.estado.trim() !== "" &&
    serviceForm.fechaInicio.trim() !== "" &&
    serviceForm.descripcion.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid) return;

    if (editingClientId !== null) {
      const updatedClients = clients.map((client) =>
        client.id === editingClientId
          ? {
              ...client,
              ...form,
            }
          : client
      );

      persistClients(updatedClients);
      showSavedMessage("Cliente actualizado correctamente.");
      closeForm();
      return;
    }

    const newClient: Client = {
      id: getNextClientId(),
      ...form,
    };

    const updatedClients = [...clients, newClient];
    persistClients(updatedClients);
    setSelectedClientIdForDocuments(newClient.id);
    setSelectedClientIdForServices(newClient.id);
    showSavedMessage("Cliente creado correctamente.");
    closeForm();
  };

  const handleAddDocument = () => {
    if (!isDocumentFormValid || selectedClientIdForDocuments === null) return;

    const newDocument: ClientDocument = {
      id: getNextDocumentId(),
      clientId: selectedClientIdForDocuments,
      ...documentForm,
    };

    const updatedDocuments = [...documents, newDocument];
    persistDocuments(updatedDocuments);
    closeDocumentForm();
    showDocumentsMessage("Documento agregado correctamente.");
  };

  const handleDeleteDocument = (documentId: number) => {
    const updatedDocuments = documents.filter((doc) => doc.id !== documentId);
    persistDocuments(updatedDocuments);

    if (expandedDocumentId === documentId) {
      setExpandedDocumentId(null);
    }

    showDocumentsMessage("Documento eliminado correctamente.");
  };

  const handleSaveService = () => {
    if (!isServiceFormValid || selectedClientIdForServices === null) return;

    if (editingServiceId !== null) {
      const updatedServices = services.map((service) =>
        service.id === editingServiceId
          ? {
              ...service,
              clientId: selectedClientIdForServices,
              ...serviceForm,
            }
          : service
      );

      persistServices(updatedServices);
      closeServiceForm();
      showServicesMessage("Servicio actualizado correctamente.");
      return;
    }

    const newService: ClientService = {
      id: getNextServiceId(),
      clientId: selectedClientIdForServices,
      ...serviceForm,
    };

    const updatedServices = [...services, newService];
    persistServices(updatedServices);
    closeServiceForm();
    showServicesMessage("Servicio agregado correctamente.");
  };

  const handleEditService = (service: ClientService) => {
    setSelectedClientIdForServices(service.clientId);
    setServiceForm({
      nombre: service.nombre,
      estado: service.estado,
      fechaInicio: service.fechaInicio,
      descripcion: service.descripcion,
    });
    setEditingServiceId(service.id);
    setIsServiceFormOpen(true);

    const servicesSection = document.getElementById("gestion-servicios");
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleDeleteService = (serviceId: number) => {
    const updatedServices = services.filter((service) => service.id !== serviceId);
    persistServices(updatedServices);

    if (expandedServiceId === serviceId) {
      setExpandedServiceId(null);
    }

    showServicesMessage("Servicio eliminado correctamente.");
  };

  const handleEdit = (client: Client) => {
    setForm({
      razonSocial: client.razonSocial,
      rut: client.rut,
      giro: client.giro,
      contacto: client.contacto,
      correo: client.correo,
      telefono: client.telefono,
      direccion: client.direccion,
      comuna: client.comuna,
      ciudad: client.ciudad,
    });

    setEditingClientId(client.id);
    setIsFormOpen(true);

    const formSection = document.getElementById("gestion-cliente");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleExpandedClient = (clientId: number) => {
    setExpandedClientId((prev) => (prev === clientId ? null : clientId));
  };

  const toggleExpandedDocument = (documentId: number) => {
    setExpandedDocumentId((prev) => (prev === documentId ? null : documentId));
  };

  const toggleExpandedService = (serviceId: number) => {
    setExpandedServiceId((prev) => (prev === serviceId ? null : serviceId));
  };

  const handleNewClient = () => {
    if (isFormOpen && editingClientId === null) {
      setIsFormOpen(false);
      resetForm();
      return;
    }

    resetForm();
    setIsFormOpen(true);

    const formSection = document.getElementById("gestion-cliente");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNewDocument = () => {
    if (isDocumentFormOpen) {
      closeDocumentForm();
      return;
    }

    resetDocumentForm();
    setIsDocumentFormOpen(true);

    const docsSection = document.getElementById("gestion-documentos");
    if (docsSection) {
      docsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNewService = () => {
    if (isServiceFormOpen && editingServiceId === null) {
      closeServiceForm();
      return;
    }

    resetServiceForm();
    setIsServiceFormOpen(true);

    const servicesSection = document.getElementById("gestion-servicios");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCancelEdit = () => {
    setSavedMessage("");
    closeForm();
  };

  const handleCancelDocument = () => {
    setDocumentsMessage("");
    closeDocumentForm();
  };

  const handleCancelService = () => {
    setServicesMessage("");
    closeServiceForm();
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <DashboardHeader
        title="Panel Administrador"
        userName={user.nombre}
        role="Administrador"
        navItems={[
          {
            label: "Clientes registrados",
            href: "#clientes-registrados",
            isPrimary: true,
          },
          { label: "Gestión de clientes", href: "#gestion-cliente" },
          { label: "Documentos", href: "#gestion-documentos" },
          { label: "Servicios", href: "#gestion-servicios" },
        ]}
      />

      <div className="grid gap-4">
        <section className="rounded-[2rem] border border-white/10 bg-neutral-900/70 p-6 shadow-2xl shadow-black/20">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
            <Building2 className="h-4 w-4" />
            Gestión interna MyC Asesores
          </div>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Bienvenido, {user.nombre}
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-400 sm:text-base">
            Administra la cartera de clientes, revisa sus fichas y mantén
            actualizada la información disponible en el portal cliente.
          </p>
        </section>

        <section
          id="clientes-registrados"
          className="scroll-mt-48 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                Base de clientes
              </div>
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Clientes registrados
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300">
                Total: {clients.length}
              </div>

              <button
                type="button"
                onClick={handleNewClient}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                <Plus className="h-4 w-4" />
                Nuevo
              </button>
            </div>
          </div>

          <div className="mt-5">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por razón social, RUT, contacto, correo o ubicación"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
            />
          </div>

          <div className="mt-6 space-y-3">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => {
                const isExpanded = expandedClientId === client.id;

                return (
                  <div
                    key={client.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-semibold text-white">
                            {client.razonSocial}
                          </h4>
                          <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
                            ID {client.id}
                          </span>
                        </div>

                        <div className="mt-2 grid gap-1 text-sm text-neutral-400 md:grid-cols-2">
                          <p>
                            <span className="text-neutral-500">RUT:</span>{" "}
                            {client.rut || "—"}
                          </p>
                          <p>
                            <span className="text-neutral-500">Contacto:</span>{" "}
                            {client.contacto || "—"}
                          </p>
                          <p>
                            <span className="text-neutral-500">Correo:</span>{" "}
                            {client.correo || "—"}
                          </p>
                          <p>
                            <span className="text-neutral-500">Ubicación:</span>{" "}
                            {[client.comuna, client.ciudad]
                              .filter(Boolean)
                              .join(", ") || "—"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => toggleExpandedClient(client.id)}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              Ocultar ficha
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              Ver ficha
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleEdit(client);
                            setSelectedClientIdForDocuments(client.id);
                            setSelectedClientIdForServices(client.id);
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                        >
                          <Pencil className="h-4 w-4" />
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedClientIdForDocuments(client.id);
                            const docsSection =
                              document.getElementById("gestion-documentos");
                            if (docsSection) {
                              docsSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                        >
                          <FileText className="h-4 w-4" />
                          Documentos
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedClientIdForServices(client.id);
                            const servicesSection =
                              document.getElementById("gestion-servicios");
                            if (servicesSection) {
                              servicesSection.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                        >
                          <Briefcase className="h-4 w-4" />
                          Servicios
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                        <GridItem
                          label="Razón social"
                          value={client.razonSocial}
                        />
                        <GridItem label="RUT" value={client.rut} />
                        <GridItem label="Giro" value={client.giro} />
                        <GridItem label="Contacto" value={client.contacto} />
                        <GridItem label="Correo" value={client.correo} />
                        <GridItem label="Teléfono" value={client.telefono} />
                        <GridItem label="Dirección" value={client.direccion} />
                        <GridItem label="Comuna" value={client.comuna} />
                        <GridItem label="Ciudad" value={client.ciudad} />
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-neutral-400">
                No se encontraron clientes con ese criterio de búsqueda.
              </div>
            )}
          </div>
        </section>

        <section
          id="gestion-cliente"
          className="scroll-mt-48 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                Gestión de cliente
              </div>
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                {editingClientId !== null
                  ? "Editar ficha de cliente"
                  : "Crear nuevo cliente"}
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                {isFormOpen
                  ? "Completa o ajusta la información de la ficha seleccionada."
                  : "Haz clic en “Nuevo” para desplegar la ficha de creación o usa “Editar” en un cliente existente."}
              </p>
            </div>

            <button
              type="button"
              onClick={
                editingClientId !== null ? handleCancelEdit : handleNewClient
              }
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              {isFormOpen ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ocultar ficha
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Nuevo
                </>
              )}
            </button>
          </div>

          {savedMessage && (
            <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {savedMessage}
            </div>
          )}

          {isFormOpen && (
            <>
              <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
                <ProfileInput
                  label="Razón social"
                  value={form.razonSocial}
                  onChange={(value) => handleChange("razonSocial", value)}
                />
                <ProfileInput
                  label="RUT"
                  value={form.rut}
                  onChange={(value) => handleChange("rut", value)}
                />
                <ProfileInput
                  label="Giro"
                  value={form.giro}
                  onChange={(value) => handleChange("giro", value)}
                />
                <ProfileInput
                  label="Contacto"
                  value={form.contacto}
                  onChange={(value) => handleChange("contacto", value)}
                />
                <ProfileInput
                  label="Correo"
                  value={form.correo}
                  onChange={(value) => handleChange("correo", value)}
                />
                <ProfileInput
                  label="Teléfono"
                  value={form.telefono}
                  onChange={(value) => handleChange("telefono", value)}
                />
                <ProfileInput
                  label="Dirección"
                  value={form.direccion}
                  onChange={(value) => handleChange("direccion", value)}
                />
                <ProfileInput
                  label="Comuna"
                  value={form.comuna}
                  onChange={(value) => handleChange("comuna", value)}
                />
                <ProfileInput
                  label="Ciudad"
                  value={form.ciudad}
                  onChange={(value) => handleChange("ciudad", value)}
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  {editingClientId !== null
                    ? "Guardar cambios"
                    : "Crear cliente"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </button>
              </div>

              <p className="mt-4 text-xs leading-6 text-neutral-500">
                Campos mínimos requeridos: razón social, RUT, contacto y correo.
              </p>
            </>
          )}
        </section>

        <section
          id="gestion-documentos"
          className="scroll-mt-48 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                Gestión documental
              </div>
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Documentos por cliente
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Selecciona un cliente y administra la documentación visible en su
                portal.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <label className="mb-2 block text-sm text-neutral-400">
                Cliente seleccionado
              </label>
              <select
                value={selectedClientIdForDocuments ?? ""}
                onChange={(e) => {
                  setSelectedClientIdForDocuments(Number(e.target.value));
                  setExpandedDocumentId(null);
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
              >
                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                    className="bg-neutral-900"
                  >
                    {client.razonSocial} - ID {client.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {documentsMessage && (
            <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {documentsMessage}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Documentos cargados
                </h4>
                <p className="mt-1 text-sm text-neutral-400">
                  {selectedClient
                    ? `${selectedClientDocuments.length} documento(s) asociados a ${selectedClient.razonSocial}.`
                    : "No hay cliente seleccionado."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNewDocument}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                {isDocumentFormOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Nuevo documento
                  </>
                )}
              </button>
            </div>

            {isDocumentFormOpen && (
              <>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <SimpleInput
                    label="Nombre del documento"
                    value={documentForm.nombre}
                    onChange={(value) => handleDocumentChange("nombre", value)}
                    placeholder="Ej. Informe mensual"
                  />

                  <SimpleInput
                    label="Categoría"
                    value={documentForm.categoria}
                    onChange={(value) => handleDocumentChange("categoria", value)}
                    placeholder="Ej. Informe, Contrato, Propuesta"
                  />

                  <SimpleInput
                    label="Fecha"
                    type="date"
                    value={documentForm.fecha}
                    onChange={(value) => handleDocumentChange("fecha", value)}
                  />

                  <SimpleInput
                    label="Ruta o enlace del archivo"
                    value={documentForm.archivo}
                    onChange={(value) => handleDocumentChange("archivo", value)}
                    placeholder="/documentos/cliente-demo/archivo.pdf"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleAddDocument}
                    disabled={!isDocumentFormValid}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    Guardar documento
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelDocument}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 space-y-3">
              {selectedClientDocuments.length > 0 ? (
                selectedClientDocuments.map((doc) => {
                  const isExpanded = expandedDocumentId === doc.id;

                  return (
                    <div
                      key={doc.id}
                      className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-neutral-300" />
                            <h5 className="font-semibold text-white">
                              {doc.nombre}
                            </h5>
                          </div>

                          <div className="mt-2 grid gap-1 text-sm text-neutral-400 md:grid-cols-2">
                            <p>
                              <span className="text-neutral-500">Categoría:</span>{" "}
                              {doc.categoria}
                            </p>
                            <p>
                              <span className="text-neutral-500">Fecha:</span>{" "}
                              {doc.fecha}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => toggleExpandedDocument(doc.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                Ocultar detalle
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                Ver detalle
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                          <GridItem label="Nombre" value={doc.nombre} />
                          <GridItem label="Categoría" value={doc.categoria} />
                          <GridItem label="Fecha" value={doc.fecha} />
                          <GridItem label="Cliente ID" value={String(doc.clientId)} />
                          <GridItem label="Documento ID" value={String(doc.id)} />
                          <GridItem label="Archivo" value={doc.archivo} />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-neutral-400">
                  No hay documentos asociados a este cliente.
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          id="gestion-servicios"
          className="scroll-mt-48 rounded-[2rem] border border-white/10 bg-neutral-900/70 p-5 shadow-2xl shadow-black/20"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                Gestión de servicios
              </div>
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Servicios por cliente
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Selecciona un cliente y administra los servicios visibles en su
                portal.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <label className="mb-2 block text-sm text-neutral-400">
                Cliente seleccionado
              </label>
              <select
                value={selectedClientIdForServices ?? ""}
                onChange={(e) => {
                  setSelectedClientIdForServices(Number(e.target.value));
                  setExpandedServiceId(null);
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
              >
                {clients.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                    className="bg-neutral-900"
                  >
                    {client.razonSocial} - ID {client.id}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {servicesMessage && (
            <div className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {servicesMessage}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">
                  Servicios cargados
                </h4>
                <p className="mt-1 text-sm text-neutral-400">
                  {selectedServiceClient
                    ? `${selectedClientServices.length} servicio(s) asociados a ${selectedServiceClient.razonSocial}.`
                    : "No hay cliente seleccionado."}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNewService}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                {isServiceFormOpen ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Nuevo servicio
                  </>
                )}
              </button>
            </div>

            {isServiceFormOpen && (
              <>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <SimpleInput
                    label="Nombre del servicio"
                    value={serviceForm.nombre}
                    onChange={(value) => handleServiceChange("nombre", value)}
                    placeholder="Ej. Estructuración financiera"
                  />

                  <div>
  <label className="mb-2 block text-sm text-neutral-300">
    Estado
  </label>
  <select
    value={serviceForm.estado}
    onChange={(e) => handleServiceChange("estado", e.target.value)}
    className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-black outline-none focus:border-white/20"
  >
    <option value="" className="bg-white text-black">
      Selecciona un estado
    </option>
    {SERVICE_STATUS_OPTIONS.map((status) => (
      <option
        key={status}
        value={status}
        className="bg-white text-black"
      >
        {status}
      </option>
    ))}
  </select>
</div>

                  <SimpleInput
                    label="Fecha de inicio"
                    type="date"
                    value={serviceForm.fechaInicio}
                    onChange={(value) => handleServiceChange("fechaInicio", value)}
                  />

                  <SimpleTextArea
                    label="Descripción"
                    value={serviceForm.descripcion}
                    onChange={(value) => handleServiceChange("descripcion", value)}
                    placeholder="Describe brevemente el alcance del servicio"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSaveService}
                    disabled={!isServiceFormValid}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" />
                    {editingServiceId !== null
                      ? "Guardar cambios"
                      : "Guardar servicio"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelService}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 space-y-3">
              {selectedClientServices.length > 0 ? (
                selectedClientServices.map((service) => {
                  const isExpanded = expandedServiceId === service.id;

                  return (
                    <div
                      key={service.id}
                      className="rounded-2xl border border-white/10 bg-neutral-900/70 p-4"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-neutral-300" />
                            <h5 className="font-semibold text-white">
                              {service.nombre}
                            </h5>
                          </div>

                          <div className="mt-2 grid gap-1 text-sm text-neutral-400 md:grid-cols-2">
                            <p>
                              <span className="text-neutral-500">Estado:</span>{" "}
                              {service.estado}
                            </p>
                            <p>
                              <span className="text-neutral-500">Inicio:</span>{" "}
                              {service.fechaInicio}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => toggleExpandedService(service.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                Ocultar detalle
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                Ver detalle
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEditService(service)}
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                          >
                            <Pencil className="h-4 w-4" />
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteService(service.id)}
                            className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20"
                          >
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                          <GridItem label="Nombre" value={service.nombre} />
                          <GridItem label="Estado" value={service.estado} />
                          <GridItem label="Fecha de inicio" value={service.fechaInicio} />
                          <GridItem label="Cliente ID" value={String(service.clientId)} />
                          <GridItem label="Servicio ID" value={String(service.id)} />
                          <GridItem label="Descripción" value={service.descripcion} />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-neutral-400">
                  No hay servicios asociados a este cliente.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function GridItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:shadow-xl hover:shadow-black/20">
      <div
        style={{ backgroundColor: "#262626" }}
        className="border-b border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-neutral-300"
      >
        {label}
      </div>

      <div
        style={{ backgroundColor: "#3a3a3a" }}
        className="px-4 py-3.5 text-sm font-medium leading-6 text-white transition duration-200 group-hover:bg-[#444444]"
      >
        {value || "—"}
      </div>
    </div>
  );
}

function ProfileInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/70 shadow-lg shadow-black/10">
      <div
        style={{ backgroundColor: "#262626" }}
        className="border-b border-white/10 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-neutral-300"
      >
        {label}
      </div>

      <div style={{ backgroundColor: "#3a3a3a" }} className="px-4 py-3.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm font-medium text-white outline-none transition focus:border-white/20"
        />
      </div>
    </div>
  );
}

function SimpleInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-neutral-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
      />
    </div>
  );
}

function SimpleTextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm text-neutral-300">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-2xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/20"
      />
    </div>
  );
}