export type MaestroFieldType =
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "select";

export type MaestroRelation = {
  model: string;
  valueField: string;
  labelField: string;
  endpoint: string;
};

export type MaestroField = {
  key: string;
  label: string;
  type: MaestroFieldType;
  visibleInTable?: boolean;
  editable?: boolean;
  required?: boolean;
  relation?: MaestroRelation;
};

export type MaestroConfig = {
  label: string;
  model: string;
  group: string;
  endpoint: string;
  primaryKey: string;
  displayField: string;
  fields: MaestroField[];
};

export const maestrosConfig: MaestroConfig[] = [
  {
    label: "Región",
    model: "Region",
    group: "Geográficos",
    endpoint: "/api/admin/maestros/Region",
    primaryKey: "idRegion",
    displayField: "region",
    fields: [
      { key: "idRegion", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "nro", label: "N°", type: "number", visibleInTable: false, editable: true },
      { key: "region", label: "Región", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "capital", label: "Capital", type: "text", visibleInTable: false, editable: true },
      { key: "zona", label: "Zona", type: "text", visibleInTable: false, editable: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Provincia",
    model: "Provincia",
    group: "Geográficos",
    endpoint: "/api/admin/maestros/Provincia",
    primaryKey: "idProvincia",
    displayField: "provincia",
    fields: [
      { key: "idProvincia", label: "ID", type: "number", visibleInTable: false, editable: false },
      {
        key: "idRegion",
        label: "Región",
        type: "select",
        visibleInTable: false,
        editable: true,
        required: true,
        relation: {
          model: "Region",
          valueField: "idRegion",
          labelField: "region",
          endpoint: "/api/admin/maestros/Region",
        },
      },
      { key: "provincia", label: "Provincia", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Comuna",
    model: "Comuna",
    group: "Geográficos",
    endpoint: "/api/admin/maestros/Comuna",
    primaryKey: "idComuna",
    displayField: "comuna",
    fields: [
      { key: "idComuna", label: "ID", type: "number", visibleInTable: false, editable: false },
      {
        key: "idRegion",
        label: "Región",
        type: "select",
        visibleInTable: false,
        editable: true,
        required: true,
        relation: {
          model: "Region",
          valueField: "idRegion",
          labelField: "region",
          endpoint: "/api/admin/maestros/Region",
        },
      },
      {
        key: "idProvincia",
        label: "Provincia",
        type: "select",
        visibleInTable: false,
        editable: true,
        required: true,
        relation: {
          model: "Provincia",
          valueField: "idProvincia",
          labelField: "provincia",
          endpoint: "/api/admin/maestros/Provincia",
        },
      },
      { key: "comuna", label: "Comuna", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Estado de Cliente",
    model: "ClienteEstado",
    group: "Cliente / Negocio",
    endpoint: "/api/admin/maestros/ClienteEstado",
    primaryKey: "idEstadoCliente",
    displayField: "estadoCliente",
    fields: [
      { key: "idEstadoCliente", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "estadoCliente", label: "Estado", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "descripcionEstadoCliente", label: "Descripción", type: "text", visibleInTable: false, editable: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Tipo Empresa Legal",
    model: "TipoEmpresaLegal",
    group: "Cliente / Negocio",
    endpoint: "/api/admin/maestros/TipoEmpresaLegal",
    primaryKey: "idEmpresaLegal",
    displayField: "tipoEmpresa",
    fields: [
      { key: "idEmpresaLegal", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "codigo", label: "Código", type: "text", visibleInTable: false, editable: true, required: true },
      { key: "tipoEmpresa", label: "Tipo Empresa", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "tamano", label: "Tamaño", type: "text", visibleInTable: false, editable: true },
      { key: "descripcion", label: "Descripción", type: "text", visibleInTable: false, editable: true },
      { key: "ley", label: "Ley", type: "text", visibleInTable: false, editable: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Riesgo Cliente",
    model: "RiesgoCliente",
    group: "Cliente / Negocio",
    endpoint: "/api/admin/maestros/RiesgoCliente",
    primaryKey: "idRiesgoCliente",
    displayField: "riesgoCliente",
    fields: [
      { key: "idRiesgoCliente", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "riesgoCliente", label: "Riesgo", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "descripcionRiesgoCliente", label: "Descripción", type: "text", visibleInTable: false, editable: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Relación Comercial",
    model: "RelacionComercial",
    group: "Cliente / Negocio",
    endpoint: "/api/admin/maestros/RelacionComercial",
    primaryKey: "idRelacionComercial",
    displayField: "relacionComercial",
    fields: [
      { key: "idRelacionComercial", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "relacionComercial", label: "Relación Comercial", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "descripcionRelacionCliente", label: "Descripción", type: "text", visibleInTable: false, editable: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Tamaño Empresa",
    model: "TamanoEmpresa",
    group: "Cliente / Negocio",
    endpoint: "/api/admin/maestros/TamanoEmpresa",
    primaryKey: "idTamEmpresa",
    displayField: "tamEmpresa",
    fields: [
      { key: "idTamEmpresa", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "tamEmpresa", label: "Tamaño Empresa", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "descripcion", label: "Descripción", type: "text", visibleInTable: false, editable: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Tipo Dirección",
    model: "TipoDireccion",
    group: "Dirección",
    endpoint: "/api/admin/maestros/TipoDireccion",
    primaryKey: "idTipoDir",
    displayField: "tipoDir",
    fields: [
      { key: "idTipoDir", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "tipoDir", label: "Tipo Dirección", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Rubro",
    model: "Rubro",
    group: "Actividad Económica",
    endpoint: "/api/admin/maestros/Rubro",
    primaryKey: "idRubro",
    displayField: "rubro",
    fields: [
      { key: "idRubro", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "rubro", label: "Rubro", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Subrubro",
    model: "Subrubro",
    group: "Actividad Económica",
    endpoint: "/api/admin/maestros/Subrubro",
    primaryKey: "idSubrubro",
    displayField: "subrubro",
    fields: [
      { key: "idSubrubro", label: "ID", type: "number", visibleInTable: false, editable: false },
      {
        key: "idRubro",
        label: "Rubro",
        type: "select",
        visibleInTable: false,
        editable: true,
        required: true,
        relation: {
          model: "Rubro",
          valueField: "idRubro",
          labelField: "rubro",
          endpoint: "/api/admin/maestros/Rubro",
        },
      },
      { key: "subrubro", label: "Subrubro", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Actividad",
    model: "Actividad",
    group: "Actividad Económica",
    endpoint: "/api/admin/maestros/Actividad",
    primaryKey: "idActividad",
    displayField: "actividad",
    fields: [
      { key: "idActividad", label: "ID", type: "number", visibleInTable: false, editable: false },
      {
        key: "idRubro",
        label: "Rubro",
        type: "select",
        visibleInTable: false,
        editable: true,
        required: true,
        relation: {
          model: "Rubro",
          valueField: "idRubro",
          labelField: "rubro",
          endpoint: "/api/admin/maestros/Rubro",
        },
      },
      {
        key: "idSubrubro",
        label: "Subrubro",
        type: "select",
        visibleInTable: false,
        editable: true,
        required: true,
        relation: {
          model: "Subrubro",
          valueField: "idSubrubro",
          labelField: "subrubro",
          endpoint: "/api/admin/maestros/Subrubro",
        },
      },
      { key: "codigoSii", label: "Código SII", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "actividad", label: "Actividad", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "afectoIva", label: "Afecto IVA", type: "boolean", visibleInTable: false, editable: true },
      { key: "categoria", label: "Categoría", type: "text", visibleInTable: false, editable: true },
      { key: "palabrasClave", label: "Palabras Clave", type: "text", visibleInTable: false, editable: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Tipo Teléfono",
    model: "TipoTelefono",
    group: "Contacto",
    endpoint: "/api/admin/maestros/TipoTelefono",
    primaryKey: "idTipoTel",
    displayField: "tipoTel",
    fields: [
      { key: "idTipoTel", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "tipoTel", label: "Tipo Teléfono", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Tipo Contacto",
    model: "TipoContacto",
    group: "Contacto",
    endpoint: "/api/admin/maestros/TipoContacto",
    primaryKey: "idTipoContacto",
    displayField: "tipoContacto",
    fields: [
      { key: "idTipoContacto", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "tipoContacto", label: "Tipo Contacto", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Estado Contacto",
    model: "EstadoContacto",
    group: "Contacto",
    endpoint: "/api/admin/maestros/EstadoContacto",
    primaryKey: "idEstadoCont",
    displayField: "estadoContacto",
    fields: [
      { key: "idEstadoCont", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "estadoContacto", label: "Estado Contacto", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },

  {
    label: "Roles",
    model: "Rol",
    group: "Sistema",
    endpoint: "/api/admin/maestros/Rol",
    primaryKey: "idRol",
    displayField: "rol",
    fields: [
      { key: "idRol", label: "ID", type: "number", visibleInTable: false, editable: false },
      { key: "rol", label: "Rol", type: "text", visibleInTable: true, editable: true, required: true },
      { key: "vigente", label: "Vigente", type: "boolean", visibleInTable: true, editable: true },
      { key: "fechaMod", label: "Fecha modificación", type: "date", visibleInTable: false, editable: false },
      { key: "usuarioMod", label: "Usuario modificación", type: "text", visibleInTable: false, editable: false },
    ],
  },
];

export const getMaestroByModel = (model: string) => {
  return maestrosConfig.find(
    (maestro) => maestro.model.toLowerCase() === model.toLowerCase()
  );
};

export const getMaestroGroups = () => {
  return Array.from(new Set(maestrosConfig.map((maestro) => maestro.group)));
};

export const getMaestrosByGroup = (group: string) => {
  return maestrosConfig.filter((maestro) => maestro.group === group);
};