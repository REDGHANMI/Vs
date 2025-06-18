
export interface Document {
  id: string;
  station_uuid: string;
  nom_fichier: string;
  type_document: "contrat" | "autorisation" | "certificat" | "plan_securite" | "autre";
  date_upload: string;
  url_fichier: string;
}

export const mockDocuments: Document[] = [
  {
    id: "doc_001",
    station_uuid: "sta_001",
    nom_fichier: "Contrat_Location_2023.pdf",
    type_document: "contrat",
    date_upload: "2024-11-15T10:30:00Z",
    url_fichier: "https://example.com/docs/Contrat_Location_2023.pdf"
  },
  {
    id: "doc_002",
    station_uuid: "sta_002",
    nom_fichier: "Autorisation_Exploitation.pdf",
    type_document: "autorisation",
    date_upload: "2023-06-20T09:00:00Z",
    url_fichier: "https://example.com/docs/Autorisation_Exploitation.pdf"
  },
  {
    id: "doc_003",
    station_uuid: "sta_003",
    nom_fichier: "Certificat_Conformite_2022.pdf",
    type_document: "certificat",
    date_upload: "2022-09-14T15:45:00Z",
    url_fichier: "https://example.com/docs/Certificat_Conformite_2022.pdf"
  },
  {
    id: "doc_004",
    station_uuid: "sta_004",
    nom_fichier: "Contrat_Assurance.pdf",
    type_document: "contrat",
    date_upload: "2024-01-10T12:10:00Z",
    url_fichier: "https://example.com/docs/Contrat_Assurance.pdf"
  },
  {
    id: "doc_005",
    station_uuid: "sta_005",
    nom_fichier: "Plan_Securite_Incendie.pdf",
    type_document: "plan_securite",
    date_upload: "2023-03-01T08:20:00Z",
    url_fichier: "https://example.com/docs/Plan_Securite_Incendie.pdf"
  }
];
